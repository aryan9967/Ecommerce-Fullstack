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

const QuantityController = () => {
    const navigate = useNavigate();

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };
    return (
        <>
            <div className="product_quantity">
                <h3>Quantity:</h3>
                <div className="quantity_control">
                    <button className="quantity_btn" onClick={decrementQuantity}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                        type="number"
                        className="quantity_input"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                    />
                    <button className="quantity_btn" onClick={incrementQuantity}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuantityController;
