import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import useMyListingsContext from "../hooks/useMyListingsContext";
import { toast } from "react-toastify";
import { TbCurrencyDollar, TbCurrencyDollarOff } from "react-icons/tb";
import { numToDelimited, toTitleCase } from "../util/text";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { defaultAvatar } from "../util/publicResources";

export default function ListingCard({ listing, editOn }) {
    const navigate = useNavigate();

    // handle event when the delete button is clicked by user
    const { deleteListingById, deleteImages, uid } = useMyListingsContext();
    const handleOnDelete = () => {
        if (listing.uid === uid) {
            if (window.confirm(`Are you sure to delete item ${listing.name}?`)) {
                deleteImages(listing.imagesInfo);
                if (deleteListingById(listing.id)) {
                    toast.success(`Listing for ${listing.name} is deleted.`);
                } else {
                    toast.success(`Failed to delete listing for ${listing.name}.`);
                }
            }
        } else {
            toast.error("You don't have the permission.");
        }
    };

    // get cover image, if not set, then choose the first image
    let coverImage = listing.imagesInfo[0];
    for (let imageInfo of listing.imagesInfo) {
        if (imageInfo.isCover) {
            coverImage = imageInfo;
            break;
        }
    }

    // get avatar url for the user who creates the giving listing
    const [avatarURL, setAvatarURL] = useState(defaultAvatar);
    useEffect(() => {
        const fetchAvatar = async () => {
            const docRef = doc(db, "users", listing.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().photoURL) {
                setAvatarURL(docSnap.data().photoURL);
            }
        };
        fetchAvatar();
    }, [listing]);

    return (
        <li className="relative bg-white border flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150">
            <Link className="contents" to={`/listings/${listing.category}/${listing.id}`}>
                <div className="h-full w-full pb-3 flex flex-col justify-center items-center bg-gray-100">
                    <img
                        className="w-full mt-2 h-[170px] object-scale-down hover:scale-105 transition-scale duration-200 ease-in"
                        loading="lazy"
                        src={coverImage.imgUrl}
                        alt="cover"
                    />
                    <Moment
                        className="absolute top-2 left-2 bg-primary-blue rounded-full px-2 py-1 shadow-lg font-semibold text-xs uppercase text-white"
                        fromNow
                    >
                        {listing.timestamp?.toDate()}
                    </Moment>
                    <img
                        className="absolute top-2 right-2 h-8 aspect-square rounded-full border-white border-4"
                        src={avatarURL}
                        alt="avatar"
                    />
                    <div className="w-full p-[10px] flex justify-center space-x-1">
                        <MdLocationOn className="h-5 w-5 text-green-600" />
                        <p className="font-semibold text-sm text-gray-600 truncate">
                            {listing.address}
                        </p>
                    </div>
                    <div className="font-semibold text-xl truncate">
                        {toTitleCase(listing.name)}
                    </div>

                    <p className="font-semibold text-gray-700 text-sm">
                        ${listing.category !== "free" ? numToDelimited(listing.regPrice) : "0"}
                    </p>

                    <div className="bg-gray-200 rounded-full flex mt-2 px-2 py-1 items-center">
                        {listing.category === "free" && <TbCurrencyDollarOff className="h-4 w-4" />}
                        {listing.category === "sale" && <TbCurrencyDollar className="h-4 w-4" />}
                        <div className="text-xs font-bold uppercase text-gray-700">
                            {listing.category}
                        </div>
                    </div>
                </div>
            </Link>
            {editOn && (
                <div className="absolute top-2 right-2 flex space-x-1 text-lg">
                    <AiFillEdit
                        className="text-gray-400 hover:text-gray-700 cursor-pointer"
                        onClick={() => {
                            navigate(`/edit-listing/${listing.id}`);
                        }}
                    />
                    <AiFillDelete
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                        onClick={handleOnDelete}
                    />
                </div>
            )}
        </li>
    );
}
