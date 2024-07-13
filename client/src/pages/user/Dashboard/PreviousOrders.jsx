import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import { useSearch } from "../../../context/search.js";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import p1 from '../../../images/polo3.jpg'
import '../../../styles/previousOrders.css'
import { Link, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../../components/DashboardSidebar.jsx";

const PreviousOrders = () => {
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1799]);
    const navigate = useNavigate();
    // const [values, setValues] = useSearch();
    // console.log(values);

    const handlePriceChange = (newValue) => {
        setPriceRange(newValue);
    };

    const toggleOption = (dropdownId) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [dropdownId]: !prevState[dropdownId]
        }));
    }

    return (
        <Layout title={"Search results"}>
            <div className="dashboard_container">
                <DashboardSidebar />
                <div className="dashboard_content">
                    <div className="previous_orders">
                        <div className="order_header">
                            <h3>Previous Orders</h3>
                            <h4 className="price_tag">Price</h4>
                        </div>
                        <div className="order_cards">
                            <div className="order_card">
                                <div className="order_img">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="order_details">
                                    <div className="order_name">
                                        <h3>Blue Indigo Polo T-shirt</h3>
                                    </div>
                                    <div className="order_avail">
                                        <h5>In stock</h5>
                                    </div>
                                    <div className="order_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="order_size">
                                        <h4>Size: <span className="size-highlight">XL</span></h4>
                                    </div>
                                    <div className="order_color">
                                        <h4>Color: <span className="category-highlight">Black</span></h4>
                                    </div>
                                    <div className="order_buys">
                                        <div className="order_buy">
                                            <button className="buy_again">Buy again</button>
                                            <div className="vertical-divider"></div>
                                            <div className="quantity_container">
                                                <h4 className="qty_tag">Qty:</h4>
                                                <h4 className="qty_amount">2</h4>
                                                <FontAwesomeIcon className="qty_down" icon={faAngleDown} />
                                            </div>
                                            <div className="vertical-divider"></div>
                                            <Link className="remove_text">
                                                View More
                                            </Link>
                                            <div className="vertical-divider"></div>
                                            <Link className="see_more">
                                                See more like this
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="order_price">
                                    <h4>₹799.00</h4>
                                </div>
                            </div>
                            <div className="order_card">
                                <div className="order_img">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="order_details">
                                    <div className="order_name">
                                        <h3>Blue Indigo Polo T-shirt</h3>
                                    </div>
                                    <div className="order_avail">
                                        <h5>In stock</h5>
                                    </div>
                                    <div className="order_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="order_size">
                                        <h4>Size: <span className="size-highlight">XL</span></h4>
                                    </div>
                                    <div className="order_color">
                                        <h4>Color: <span className="category-highlight">Black</span></h4>
                                    </div>
                                    <div className="order_buys">
                                        <div className="order_buy">
                                            <button className="buy_again">Buy again</button>
                                            <div className="vertical-divider"></div>
                                            <div className="quantity_container">
                                                <h4 className="qty_tag">Qty:</h4>
                                                <h4 className="qty_amount">2</h4>
                                                <FontAwesomeIcon className="qty_down" icon={faAngleDown} />
                                            </div>
                                            <div className="vertical-divider"></div>
                                            <Link className="remove_text">
                                                View More
                                            </Link>
                                            <div className="vertical-divider"></div>
                                            <Link className="see_more">
                                                See more like this
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="order_price">
                                    <h4>₹799.00</h4>
                                </div>
                            </div>
                            <div className="order_card">
                                <div className="order_img">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="order_details">
                                    <div className="order_name">
                                        <h3>Blue Indigo Polo T-shirt</h3>
                                    </div>
                                    <div className="order_avail">
                                        <h5>In stock</h5>
                                    </div>
                                    <div className="order_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="order_size">
                                        <h4>Size: <span className="size-highlight">XL</span></h4>
                                    </div>
                                    <div className="order_color">
                                        <h4>Color: <span className="category-highlight">Black</span></h4>
                                    </div>
                                    <div className="order_buys">
                                        <div className="order_buy">
                                            <button className="buy_again">Buy again</button>
                                            <div className="vertical-divider"></div>
                                            <div className="quantity_container">
                                                <h4 className="qty_tag">Qty:</h4>
                                                <h4 className="qty_amount">2</h4>
                                                <FontAwesomeIcon className="qty_down" icon={faAngleDown} />
                                            </div>
                                            <div className="vertical-divider"></div>
                                            <Link className="remove_text">
                                                View More
                                            </Link>
                                            <div className="vertical-divider"></div>
                                            <Link className="see_more">
                                                See more like this
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="order_price">
                                    <h4>₹799.00</h4>
                                </div>
                            </div>
                            <div className="order_card">
                                <div className="order_img">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="order_details">
                                    <div className="order_name">
                                        <h3>Blue Indigo Polo T-shirt</h3>
                                    </div>
                                    <div className="order_avail">
                                        <h5>In stock</h5>
                                    </div>
                                    <div className="order_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="order_size">
                                        <h4>Size: <span className="size-highlight">XL</span></h4>
                                    </div>
                                    <div className="order_color">
                                        <h4>Color: <span className="category-highlight">Black</span></h4>
                                    </div>
                                    <div className="order_buys">
                                        <div className="order_buy">
                                            <button className="buy_again">Buy again</button>
                                            <div className="vertical-divider"></div>
                                            <div className="quantity_container">
                                                <h4 className="qty_tag">Qty:</h4>
                                                <h4 className="qty_amount">2</h4>
                                                <FontAwesomeIcon className="qty_down" icon={faAngleDown} />
                                            </div>
                                            <div className="vertical-divider"></div>
                                            <Link className="remove_text">
                                                View More
                                            </Link>
                                            <div className="vertical-divider"></div>
                                            <Link className="see_more">
                                                See more like this
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="order_price">
                                    <h4>₹799.00</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PreviousOrders;