import React, { useState } from "react";
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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function Sell() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: null,
        name: "",
        address: "",
        description: "",
        regPrice: 0,
        discountedPrice: 0,
        images: {},
    });

    const { name, address, description, regPrice, discountedPrice, images } = formData;

    const navigate = useNavigate();

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
        if (images.length > 7) {
            toast.error("Maximum 7 images are allowed.");
            setLoading(false);
            return;
        } else {
            // get the array of urls for all images uploaded
            const imgUrls = await Promise.all(
                [...images].map((image) =>
                    storeImage(image).catch((error) => {
                        setLoading(false);
                        toast.error("Images not uploaded.");
                        return;
                    })
                )
            );
            const formDataCopy = {
                ...formData,
                imgUrls: imgUrls,
                uid: auth.currentUser.uid,
                timestamp: serverTimestamp(),
            };
            delete formDataCopy.images;

            // upload list info to firestore
            const docRef = await addDoc(collection(db, "listings"), formDataCopy);

            setLoading(false);
            toast.success("Listing created");
            navigate(`/listings/${formDataCopy.category}/${docRef.id}`);
        }
    };

    /**
     * upload a given image file to Firebase Cloud Storage
     * ref: https://firebase.google.com/docs/storage/web/upload-files
     *
     * @param {*} image is an image file
     * @returns a Promise with the storage url of image if resolved, or an error if rejected
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
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="max-w-md px-2 mx-auto">
            <MainTitle>Sell An Item</MainTitle>
            <form onSubmit={handleFormSubmit}>
                <label className="text-lg mt-6 font-semibold">Sell / Rent</label>
                <div className="flex">
                    <div className="w-full mr-2">
                        <OptionButton
                            type="button"
                            id="category"
                            value="sell"
                            rounded
                            onClick={handleOnClick}
                            highLight={formData.category === "sell"}
                        >
                            Sell
                        </OptionButton>
                    </div>
                    <div className="w-full ml-2">
                        <OptionButton
                            type="button"
                            id="category"
                            value="rent"
                            rounded
                            onClick={handleOnClick}
                            highLight={formData.category === "rent"}
                        >
                            Rent
                        </OptionButton>
                    </div>
                </div>
                <div className="mt-6">
                    <label htmlFor="name" className="text-lg mt-6 font-semibold">
                        Name
                    </label>
                    <StandardInput
                        id="name"
                        value={name}
                        onChange={handleOnChange}
                        maxLength="32"
                        minLength="5"
                        textSmall
                        required
                        rounded
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="address" className="text-lg font-semibold">
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
                    <label htmlFor="description" className="text-lg font-semibold">
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
                <div className="mt-6 flex">
                    <div className="mr-2 w-full">
                        <label htmlFor="regPrice" className="text-lg font-semibold">
                            Regular Price
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
                    <div className="ml-2 w-full">
                        <label htmlFor="discountedPrice" className="text-lg font-semibold">
                            Discounted Price
                        </label>
                        <StandardInput
                            type="number"
                            id="discountedPrice"
                            value={discountedPrice}
                            onChange={handleOnChange}
                            textSmall
                            min="0"
                            max={regPrice}
                            rounded
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <label htmlFor="images" className="text-lg font-semibold">
                        Images
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
                        required
                        rounded
                        border
                    ></StandardInput>
                </div>
                <div className="mt-6">
                    <Button primary uppercase rounded shadow>
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
}
