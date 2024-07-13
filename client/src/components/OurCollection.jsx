import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactSlider from "react-slider";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.png'
import photo1 from '../images/cloth2.jpg'
import photo2 from '../images/cloth3.jpg'
import photo3 from '../images/cloth4.jpg'
import photo4 from '../images/cloth5.jpg'
import photo5 from '../images/cloth6.jpg'
import photo6 from '../images/cloth7.jpg'
import photo7 from '../images/cloth8.jpg'
import photo8 from '../images/cloth9.jpg'
import photo9 from '../images/cloth10.jpg'
import photo10 from '../images/cloth11.jpg'
import photo11 from '../images/cloth12.jpg'
import photo12 from '../images/cloth13.jpg'
import photo13 from '../images/cloth14.jpg'
import photo14 from '../images/cloth15.jpg'
import photo15 from '../images/cloth16.jpg'
import photo16 from '../images/cloth17.jpg'
import '../styles/Components/ourCollection.css'
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import axios from 'axios';

const OurCollection = () => {
    const [parr, setParr] = useState([photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16])
    const navigate = useNavigate();
    const [ourCollection, setOurCollection] = useState(() => {
        const storedBestSeller = localStorage.getItem('best_seller');
        return storedBestSeller ? JSON.parse(storedBestSeller) : null;
    });

    const getOurCollection = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get_bestseller`
            );
            console.log('oc data:', data);
            if (data) {
                setOurCollection(data);
                localStorage.setItem('best_seller', JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while getting category');
        }
    }

    const toProductDetails = async (pid) => {
        navigate(`/product/${pid}`)
    }

    useEffect(() => {
        getOurCollection();
    }, []);

    return (
        <>
            <Swiper
                cssMode={true}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={7}
                mousewheel={true}
                keyboard={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                }}
                modules={[Autoplay, Mousewheel, Navigation, Keyboard]}
                className="ourCollection"
            >
                {ourCollection?.map((oc) => (
                    <>
                        <SwiperSlide>
                            <div className="card" onClick={() => toProductDetails(oc.pid)}>
                                <div className="crdimg">
                                    <img src={oc.main_image} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">{oc.product_name}</h3>
                                    <div className="crd_rating">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <p className="crd_price">₹{oc.display_price}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
        </>
    );
};

export default OurCollection;
