import React, { useEffect, useState } from "react";
import MainTitle from "../components/MainTitle";
import Button from "../components/Button";
import StandardInput from "../components/StandardInput";
import OptionButton from "../components/OptionButton";
import StandardTextArea from "../components/StandardTextArea";
import Spinner from "../components/Spinner";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
import useMyListingsContext from "../hooks/useMyListingsContext";
import { toTitleCase } from "../util/text";

export default function EditListing() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        category: null,
        name: "",
        address: "",
        description: "",
        regPrice: 0,
        images: {},
        imagesInfo: [],
    });
    const { name, address, description, regPrice, imagesInfo, images } = formData;

    // track imageInfo for images to be deleted
    const [imagesDeleted, setImagesDeleted] = useState([]);

    // get listing data from firestore based on listingId
    const params = useParams();
    useEffect(() => {
        let isMounted = true;
        async function fetchListing() {
            try {
                const docRef = doc(db, "listings", params.listingId);
                const docSnap = await getDoc(docRef);
                if (isMounted && docSnap.exists()) {
                    setFormData({ ...docSnap.data() });
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchListing();
        return () => {
            isMounted = false;
        };
    }, [params]);

    const { deleteImages, uid } = useMyListingsContext();

    // check current user must be equal to user who created the listing
    if (!loading && formData.uid !== uid) {
        toast.error("You don't have permission to edit this listing.");
        navigate("/");
    }

    // controlled input for the form data
    const handleOnClick = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };
    const handleOnChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.files ? event.target.files : event.target.value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (images?.length + imagesInfo?.length > 6) {
            toast.error("Maximum 6 images including existing images are allowed.");
            setLoading(false);
            return;
        } else {
            // delete images from storage
            deleteImages(imagesDeleted);

            // get the array of image obj {imgName, imgUrl} for all images uploaded
            const uploadedImages =
                images?.length > 0
                    ? await Promise.all(
                          [...images].map((img) =>
                              storeImage(img).catch((error) => {
                                  setLoading(false);
                                  toast.error("Images not uploaded.");
                                  return;
                              })
                          )
                      )
                    : [];

            // update record in firestore
            const formDataCopy = {
                ...formData,
                name: formData.name.toLowerCase(),
                imagesInfo: [...imagesInfo, ...uploadedImages],
                timestamp: serverTimestamp(),
            };
            delete formDataCopy.images;
            try {
                const docRef = doc(db, "listings", params.listingId);
                await setDoc(docRef, formDataCopy);
                setLoading(false);
                toast.success("Listing updated");
                navigate(`/listings/${formData.category}/${docRef.id}`);
            } catch (error) {
                console.log(error);
            }
        }
    };

    /**
     * upload a given image file to Firebase Cloud Storage
     * ref: https://firebase.google.com/docs/storage/web/upload-files
     *
     * @param {*} image is an image file
     * @returns a Promise with the image obj {imgName, imgUrl} if resolved, or an error if rejected
     */
    const storeImage = async (image) => {
        const storage = getStorage();
        return new Promise((resolve, reject) => {
            const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    reject(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve({ imgName: filename, imgUrl: downloadURL });
                    });
                }
            );
        });
    };

    /**
     * Once an event is triggered, status formData/imagesDeleted are updated by removing/including
     * the imageInfo of the associate image
     *
     * @param {*} event is the event that triggers image deletion entry
     */
    const handleToDeleteImage = async (event) => {
        try {
            const newImagesInfo = [];
            for (let imageInfo of imagesInfo) {
                if (imageInfo.imgName !== event.target.id) {
                    newImagesInfo.push({ ...imageInfo });
                } else {
                    setImagesDeleted([...imagesDeleted, imageInfo]);
                }
            }

            setFormData({
                ...formData,
                imagesInfo: newImagesInfo,
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <Spinner />;
    } else {
        // to show all existing images
        const renderedImages = imagesInfo?.map((imageInfo) => {
            return (
                <img
                    key={imageInfo.imgUrl}
                    loading="lazy"
                    src={imageInfo.imgUrl}
                    className="w-[150px] h-[150px] object-scale-down border border-gray-400 bg-white shadow-md hover:scale-150 rounded-md transition duration-150"
                    id={imageInfo.imgName}
                    onClick={handleToDeleteImage}
                    alt="item pic"
                />
            );
        });

        return (
            <div className="max-w-md px-2 mx-auto">
                <MainTitle>Edit Listing</MainTitle>
                <form onSubmit={handleFormSubmit} className="mt-6">
                    <label className="text-sm mt-6 font-semibold">For Sale / For Free</label>
                    <div className="flex">
                        <div className="w-full mr-2">
                            <OptionButton
                                type="button"
                                id="category"
                                value="sale"
                                rounded
                                onClick={handleOnClick}
                                highLight={formData.category === "sale"}
                            >
                                Sale
                            </OptionButton>
                        </div>
                        <div className="w-full ml-2">
                            <OptionButton
                                type="button"
                                id="category"
                                value="free"
                                rounded
                                onClick={handleOnClick}
                                highLight={formData.category === "free"}
                            >
                                Free
                            </OptionButton>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="name" className="text-sm mt-6 font-semibold">
                            Name
                        </label>
                        <StandardInput
                            id="name"
                            value={toTitleCase(name)}
                            onChange={handleOnChange}
                            maxLength="32"
                            minLength="4"
                            textSmall
                            required
                            rounded
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="address" className="text-sm font-semibold">
                            Address
                        </label>
                        <StandardInput
                            id="address"
                            value={address}
                            onChange={handleOnChange}
                            maxLength="100"
                            minLength="5"
                            textSmall
                            rounded
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="description" className="text-sm font-semibold">
                            Description
                        </label>
                        <StandardTextArea
                            id="description"
                            value={description}
                            onChange={handleOnChange}
                            maxLength="1000"
                            textSmall
                            rows="3"
                            rounded
                        >
                            Description
                        </StandardTextArea>
                    </div>
                    {formData.category === "sale" && (
                        <div className="mt-6">
                            <label htmlFor="regPrice" className="text-sm font-semibold">
                                Price ($)
                            </label>
                            <StandardInput
                                type="number"
                                id="regPrice"
                                value={regPrice}
                                onChange={handleOnChange}
                                textSmall
                                min="0"
                                required
                                rounded
                            />
                        </div>
                    )}
                    <div className="mt-6">
                        <label htmlFor="images" className="text-sm font-semibold">
                            Upload New Images
                        </label>
                        <StandardInput
                            id="images"
                            type="file"
                            accept="image/*"
                            onChange={handleOnChange}
                            maxLength="1000"
                            textSmall
                            rows="3"
                            multiple
                            required={imagesInfo.length === 0}
                            rounded
                            border
                        ></StandardInput>
                    </div>
                    <div className="mt-6">
                        <p className="text-sm font-semibold">Existing Images</p>
                        <div className="grid grid-cols-3 gap-1">{renderedImages}</div>
                    </div>
                    <div className="mt-6">
                        <Button primary uppercase rounded shadow>
                            Update
                        </Button>
                    </div>
                </form>
                <div className="mb-6 "></div>
            </div>
        );
    }
}
