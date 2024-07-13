import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import { useSearch } from "../../../context/search.js";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faStar, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import p1 from '../../../images/polo3.jpg'
import '../../../styles/manageProducts.css'
import { Link, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../../components/DashboardSidebar.jsx";

const ManageProducts = () => {
    const [quantity, setQuantity] = useState(1);
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

    const toCreateProduct = () => {
        navigate('/dashboard/create-product');
    }

    return (
        <Layout title={"Search results"}>
            <div className="dashboard_container">
                <DashboardSidebar />
                <div className="dashboard_content">
                    <div className="new_product">
                        <button className="new_product_btn" onClick={toCreateProduct}>Create new product</button>
                    </div>
                    <div className="product_container">
                        <div className="product_nav1">
                            <div className="product_text">102 results</div>
                            <div className="select_wrapper">
                                <select className="product_sort">
                                    <option value="" disabled>Sort</option>
                                    <option value="relevance">Relevance</option>
                                    <option value="price_lowToHIgh">Price: low to high</option>
                                    <option value="price_highToHIgh">Price: high to low</option>
                                </select>
                            </div>
                        </div>
                        <div className="product_content">
                            <div className="cards">
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="crdimg">
                                        <img src={p1} alt="" />
                                    </div>
                                    <div className="crd_content">
                                        <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                        <div className="crd_rating">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <p className="crd_price">₹799.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;