import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import '../styles/Components/ordersReturn.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import CurrentOrders from "./CurrentOrders";
import PreviousOrders from "./PreviousOrders";

const OrdersReturn = () => {

    return (
        <>
            <div className="orders_return_container">
                <CurrentOrders />
                <PreviousOrders />
            </div>
        </>
    )
}

export default OrdersReturn;