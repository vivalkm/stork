import React from "react";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { primary_blue } from "../util/colors";
import useMyListingsContext from "../hooks/useMyListingsContext";
import { toast } from "react-toastify";

export default function ListingCard({ listing }) {
    const numToDelimited = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const { deleteListingById, deleteImages } = useMyListingsContext();

    const navigate = useNavigate();

    const handleOnDelete = () => {
        if (window.confirm(`Are you sure to delete item ${listing.name}?`)) {
            deleteImages(listing.imagesInfo);
            if (deleteListingById(listing.id)) {
                toast.success(`Listing for ${listing.name} is deleted.`);
            } else {
                toast.success(`Failed to delete listing for ${listing.name}.`);
            }
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

    return (
        <li className="relative mt-4 bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150">
            <Link className="contents" to={`/listings/${listing.category}/${listing.id}`}>
                <img
                    className="w-full h-[170px] object-scale-down hover:scale-105 transition-scale duration-200 ease-in"
                    loading="lazy"
                    src={coverImage.imgUrl}
                    alt="cover"
                />
                <Moment
                    className={`absolute top-2 left-2 bg-[${primary_blue}] rounded-full px-2 py-1 shadow-lg font-semibold text-xs uppercase text-white`}
                    fromNow
                >
                    {listing.timestamp?.toDate()}
                </Moment>
                <div className="w-full p-[10px] flex justify-center space-x-1">
                    <MdLocationOn className="h-5 w-5 text-green-600" />
                    <p className="font-semibold text-sm text-gray-600 truncate">
                        {listing.address}
                    </p>
                </div>
                <div className="font-semibold text-xl truncate">{listing.name}</div>
                <p className="font-semibold text-gray-700 text-sm">
                    $
                    {listing.offer
                        ? numToDelimited(listing.discountedPrice)
                        : numToDelimited(listing.regPrice)}
                </p>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {listing.category}
                    </span>
                </div>
            </Link>
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
        </li>
    );
}
