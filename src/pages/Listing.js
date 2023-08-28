import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { MdLocationOn } from "react-icons/md";
import { TbCurrencyDollarOff, TbCurrencyDollar } from "react-icons/tb";
import useAuthContext from "../hooks/useAuthContext";
import Button from "../components/Button";
import Contact from "../components/Contact";
import Map from "../components/Map";
import { numToDelimited, toTitleCase } from "../util/text";
import { defaultAvatar } from "../util/publicResources";

// import required modules and styels for using swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contactSeller, setContactSeller] = useState(false);
    const [userIsSeller, setUserIsSeller] = useState(false);
    const { user } = useAuthContext();
    const [avatarURL, setAvatarURL] = useState(defaultAvatar);

    useEffect(() => {
        // get listing data based on listing id in params
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false);
                setUserIsSeller(user?.uid === docSnap.data().uid);
            }
        }
        fetchListing();

        // get avatar url for the user who creates the giving listing
        const fetchAvatar = async () => {
            if (!loading) {
                const docRef = doc(db, "users", listing.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().photoURL) {
                    setAvatarURL(docSnap.data().photoURL);
                }
            }
        };
        fetchAvatar();
    }, [params.listingId, user?.uid, loading]);

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    };

    if (loading) {
        return <div>Loading</div>;
    } else {
        const renderedSlide = listing.imagesInfo.map((imgInfo, index) => {
            return (
                <SwiperSlide key={index}>
                    <div
                        className="relative w-full overflow-hidden h-[400px]"
                        style={{
                            background: `url(${imgInfo.imgUrl}) center no-repeat`,
                            backgroundSize: "contain",
                        }}
                    ></div>
                </SwiperSlide>
            );
        });

        return (
            <div>
                <div className="flex justify-center flex-wrap items-center max-w-4xl mx-auto rounded-t-lg shadow-lg">
                    <div className="w-full">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={pagination}
                            navigation={true}
                            effect="fade"
                            modules={[Autoplay, Pagination, Navigation, EffectFade]}
                            className="mySwiper"
                        >
                            {renderedSlide}
                        </Swiper>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-2 mx-auto bg-white max-w-4xl p-4 rounded-b-lg shadow-lg">
                    <div className="w-full">
                        <div className="h-10 flex">
                            <img
                                className="h-full aspect-square rounded-full border-gray-200 border-4 mr-2"
                                src={avatarURL}
                                alt="avatar"
                            />
                            <div className="text-primary-blue mb-3 font-bold text-2xl">
                                {toTitleCase(listing.name)}
                            </div>
                        </div>
                        <div className="w-full flex mt-6 mb-3 space-x-1">
                            <MdLocationOn className="h-6 w-6 text-green-600" />
                            <p className="font-semibold text-md text-gray-600">{listing.address}</p>
                        </div>
                        <div className="mt-3 mb-3">
                            <span className="font-semibold">Description: </span>
                            {listing.description}
                        </div>
                        {listing.category !== "free" && (
                            <div className="text-semibold">
                                <span className="font-semibold mt-3 mb-3">Price: </span>$
                                {numToDelimited(listing.regPrice)}
                            </div>
                        )}
                        <div className="flex justify-between font-semibold mt-3 mb-3 h-10">
                            <div className="bg-gray-200 rounded-full flex px-2 py-1 items-center">
                                {listing.category === "free" && (
                                    <TbCurrencyDollarOff className="h-full" />
                                )}
                                {listing.category === "sale" && (
                                    <TbCurrencyDollar className="h-full" />
                                )}
                                <div className="capitalize text-sm font-bold">
                                    {listing.category}
                                </div>
                            </div>
                        </div>
                        {!userIsSeller && !contactSeller && (
                            <div>
                                <Button
                                    primary
                                    rounded
                                    onClick={() => setContactSeller(true)}
                                    type="button"
                                >
                                    Contact Seller
                                </Button>
                            </div>
                        )}
                        {!userIsSeller && contactSeller && (
                            <div>
                                <Contact listing={listing} />
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-200 w-full h-[300px] md:h-full rounded">
                        <Map listing={listing} />
                    </div>
                </div>
                <div className="mb-6"></div>
            </div>
        );
    }
}
