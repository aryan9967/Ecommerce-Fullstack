import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import '../styles/Components/dashboardSidebar.css'
import { useNavigate } from "react-router-dom";

const DashboardSidebar = () => {
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1799]);
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        const id = e.target.id || e.target.closest('.sidebar_text').id;
        console.log(id);
        if (id === "orders") navigate('/dashboard/orders');
        if (id === "view_profile") navigate('/dashboard/profile');
        if (id === "address") navigate('/dashboard/address');
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("auth");
        navigate("/");
    };

    return (
        <>
            <div className="dashboard_sidebar">
                <div className="sidebar_content">
                    <div className="sidebar_btn">
                        <div className="sidebar_tag">
                            <h3>Orders</h3>
                        </div>
                        <div className="sidebar_text"
                            id="orders"
                            onClick={handleNavigate}>
                            <h4>Orders & Returns</h4>
                        </div>
                    </div>
                    <div className="sidebar_btn">
                        <div className="sidebar_tag">
                            <h3>Account</h3>
                        </div>
                        <div className="sidebar_text"
                            id="view_profile"
                            onClick={handleNavigate}>
                            <h4>Profile</h4>
                        </div>
                        <div className="sidebar_text"
                            id="address"
                            onClick={handleNavigate}>
                            <h4>Address</h4>
                        </div>
                        <div className="sidebar_text" onClick={handleLogout}>
                            <h4>Logout</h4>
                        </div>
                    </div>
                    <div className="sidebar_btn">
                        <div className="sidebar_tag">
                            <h3>Legal</h3>
                        </div>
                        <div className="sidebar_text">
                            <h4>Term of Use</h4>
                        </div>
                        <div className="sidebar_text">
                            <h4>Privacy Policy</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSidebar;