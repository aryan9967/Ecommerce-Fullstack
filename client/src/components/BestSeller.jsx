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
import '../styles/Components/bestSeller.css'
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import toast from 'react-hot-toast';

const BestSeller = () => {
    const [parr, setParr] = useState([photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10])
    const navigate = useNavigate();
    const [bestSeller, setBestSeller] = useState(() => {
        const storedBestSeller = localStorage.getItem('best_seller');
        return storedBestSeller ? JSON.parse(storedBestSeller) : null;
    });


    const getBestSeller = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get_bestseller`
            );
            console.log('bs data:', data);
            if (data) {
                setBestSeller(data);
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
        getBestSeller();
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
                    702: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    896: {
                        slidesPerView: 5,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                }}
                modules={[Autoplay, Mousewheel, Navigation, Keyboard]}
                className="bestSeller"
            >
                {bestSeller?.map((bs) => (
                    <>
                        <SwiperSlide>
                            <div className="card" onClick={() => toProductDetails(bs.pid)}>
                                <div className="crdimg">
                                    <img src={bs.main_image} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">{bs.product_name}</h3>
                                    <div className="crd_rating">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <p className="crd_price">₹{bs.display_price}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
        </>
    );
};

export default BestSeller;
