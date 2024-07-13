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

const OfferCards = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="offer_container">
                <div className="offer_text">Offers</div>
                <div className="offer_cards">
                    {offers.map(offer => (
                        <div className="offer_card" key={offer.id}>
                            <h4>{offer.title}</h4>
                            <p>{offer.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OfferCards;
