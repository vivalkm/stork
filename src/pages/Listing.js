import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
// Import Swiper styles
import "swiper/css/bundle";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { primary_blue } from "../util/colors";
import { MdLocationOn } from "react-icons/md";
import useAuthContext from "../hooks/useAuthContext";
import Button from "../components/Button";
import Contact from "../components/Contact";

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contactSeller, setContactSeller] = useState(false);

    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId]);

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    };

    const { user } = useAuthContext();

    const numToDelimited = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    if (loading) {
        return <div>Loading</div>;
    } else {
        const renderedSlide = listing.imagesInfo.map((imgInfo, index) => {
            return (
                <SwiperSlide key={index}>
                    <div
                        className="relative w-full overflow-hidden h-[300px] rounded"
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
                <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                    <div className="w-full md:w-[50%]">
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
                <div className="flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg lg: space-x-5">
                    <div className="w-full ">
                        <div className={`text-[${primary_blue}] mb-3 font-bold text-2xl`}>
                            {listing.name}
                        </div>
                        <div className="w-full flex mt-6 mb-3 space-x-1">
                            <MdLocationOn className="h-6 w-6 text-green-600" />
                            <p className="font-semibold text-md text-gray-600">{listing.address}</p>
                        </div>
                        <div className="mt-3 mb-3">
                            <span className="font-semibold">Description - </span>
                            {listing.description}
                        </div>
                        <div className="text-semibold">
                            <span className="font-semibold mt-3 mb-3">Price - </span>$
                            {numToDelimited(listing.regPrice)}
                        </div>
                        <div className="font-semibold mt-3 mb-3">
                            <span className="font-semibold ">Category - </span>
                            {listing.category}
                        </div>
                        {user?.uid !== listing.uid && !contactSeller && (
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
                        {user?.uid !== listing.uid && contactSeller && (
                            <div>
                                <Contact listing={listing} />
                            </div>
                        )}
                    </div>
                    <div className="w-full z-10 overflow-x-hidden"></div>
                </div>
                <div className="mb-6"></div>
            </div>
        );
    }
}
