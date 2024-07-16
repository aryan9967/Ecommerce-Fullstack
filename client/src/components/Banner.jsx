import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import b1 from '../images/banner5a.jpeg'
import b2 from '../images/banner6b.jpeg'
import b3 from '../images/banner7.jpg'
import b4 from '../images/banner8.jpg'
import '../styles/Components/banner.css'
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay, EffectCreative } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import toast from 'react-hot-toast';
import axios from 'axios';

const Banner = () => {
    const navigate = useNavigate();
    const [banners, setBanners] = useState(null)


    const getBanners = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/banner/get_all_banner`
            );
            console.log(data);
            if (data) {
                setBanners(data);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while getting category');
        }
    }

    useEffect(() => {
        getBanners();
    }, []);

    return (
        <>
            <Swiper
                cssMode={true}
                navigation={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                mousewheel={true}
                keyboard={true}
                modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
                className="banner"
            >

                {banners?.map((b) => (
                    <>
                        <SwiperSlide>
                            <img className="banner_img" src={b?.imageurl} alt="" />
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
        </>
    );
};

export default Banner;
