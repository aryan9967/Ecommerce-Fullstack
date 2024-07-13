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
    // const [values, setValues] = useSearch();
    // console.log(values);

    const toEditProfile = (e) => {
        console.log(e);
        const { id } = e.target;
        let button = document.getElementById(id);
        button.style.backgroundColor = "#f0e6fe";
        navigate('/dashboard/user');
    }

    const toCurrentOrders = (e) => {
        console.log(e);
        const { id } = e.target;
        let button = document.getElementById(id);
        button.style.backgroundColor = "#f0e6fe";
        console.log('toCurrentOrders');
        navigate('/dashboard/orders');
    }

    const toPreviousOrders = (e) => {
        console.log(e);
        const { id } = e.target;
        let button = document.getElementById(id);
        button.style.backgroundColor = "#f0e6fe";
        console.log('toCurrentOrders');
        navigate('/dashboard/previous_orders');
    }

    const toCartItems = (e) => {
        const { id } = e.target;
        let button = document.getElementById(id);
        button.style.backgroundColor = "#f0e6fe";
        console.log('toCurrentOrders');
        navigate('/dashboard/cart_items');
    }

    const toManageProducts = (e) => {
        console.log(e);
        const { id } = e.target;
        let button = document.getElementById(id);
        button.style.backgroundColor = "#f0e6fe";
        console.log('toCurrentOrders');
        navigate('/dashboard/manage_products');
    }

    const toSalesSummary = (e) => {
        console.log(e);
        const { id } = e.target;
        let button = document.getElementById(id);
        button.style.backgroundColor = "#f0e6fe";
        console.log('toCurrentOrders');
        navigate('/dashboard/sales_summary');
    }

    return (
        <>
            <div className="dashboard_sidebar">
                <div className="sidebar_content">
                    <div className="sidebar_btn">
                        <button className="sidebar_text" id="edit_profile" onClick={toEditProfile}>
                            <h4>Edit Profile</h4>
                        </button>
                    </div>
                    <div className="sidebar_btn">
                        <button className="sidebar_text" id="current_orders" onClick={toCurrentOrders}>
                            <h4>Orders</h4>
                        </button>
                    </div>
                    <div className="sidebar_btn">
                        <button className="sidebar_text" id="previous_orders" onClick={toPreviousOrders}>
                            <h4>Previous Orders</h4>
                        </button>
                    </div>
                    <div className="sidebar_btn">
                        <button className="sidebar_text" id="manage_products" onClick={toManageProducts}>
                            <h4>Manage Products</h4>
                        </button>
                    </div>
                    <div className="sidebar_btn">
                        <button className="sidebar_text" id="sales_summary" onClick={toSalesSummary}>
                            <h4>Sales Summary</h4>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSidebar;