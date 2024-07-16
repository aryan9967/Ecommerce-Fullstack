import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactSlider from "react-slider";
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
import '../styles/Components/newlyArrived.css'
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import toast from 'react-hot-toast';
import axios from 'axios';

const NewlyArrived = () => {
    const [parr, setParr] = useState([photo10, photo9, photo8, photo7, photo6, photo5, photo4, photo3, photo2, photo1])
    const navigate = useNavigate();
    const [newlyArrived, setNewlyArrived] = useState(() => {
        const storedBestSeller = localStorage.getItem('best_seller');
        return storedBestSeller ? JSON.parse(storedBestSeller) : null;
    });

    const getNewlyArrived = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get_bestseller`
            );
            console.log('na data:', data);
            if (data) {
                setNewlyArrived(data);
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
        getNewlyArrived();
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
                className="newlyArrived"
            >
                {newlyArrived?.map((na) => (
                    <>
                        <SwiperSlide>
                            <div className="card" onClick={() => toProductDetails(na?.pid)}>
                                <div className="crdimg">
                                    <img src={na?.main_image} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">{na?.product_name}</h3>
                                    <div className="crd_rating">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <p className="crd_price">₹{na?.display_price}.00</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
        </>
    );
};

export default NewlyArrived;
