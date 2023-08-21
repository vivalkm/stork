import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
// Import Swiper styles
import "swiper/css/bundle";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

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
                {listing.name} {listing.price} {listing.category}
            </div>
        );
    }
}
