import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import { useSearch } from "../../../context/search.js";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import p1 from '../../../images/cloth2.jpg'
import '../../../styles/orders.css'
import { Link, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../../components/DashboardSidebar.jsx";
import toast from "react-hot-toast";

const Orders = () => {
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1799]);
    const [cartItems, setCartItems] = useState(() => {
        const storedItems = localStorage.getItem('cartItems');
        return storedItems ? JSON.parse(storedItems) : null;
    });
    const [quantity, setQuantity] = useState(() => {
        const storedQuantity = localStorage.getItem('quantity');
        return storedQuantity ? JSON.parse(storedQuantity) : null;
    });
    const [price, setPrice] = useState(() => {
        const storedPrice = localStorage.getItem('price');
        return storedPrice ? JSON.parse(storedPrice) : null;
    });
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();
    // const [values, setValues] = useSearch();
    // console.log(values);

    const getCartItems = async () => {
        try {
            console.log(user);
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/user/fetch_cart?`,
                { headers: { "Authorization": user.token } }
            );
            console.log('get1:', data);
            setCartItems(data);
            const quantity_arr = data.map((d) => d.qauntity);
            setQuantity(quantity_arr);
            const price_arr = data.map((d) => d.price);
            setPrice(price_arr);
            localStorage.setItem('cartItems', JSON.stringify(data));
            localStorage.setItem('quantity', JSON.stringify(quantity_arr));
            localStorage.setItem('price', JSON.stringify(price_arr));
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while getting category');
        }
    }

    useEffect(() => {
        // getAllCategories();
        getCartItems();
        return () => {
            console.log('Cleanup on component unmount after getting cart items');
        };
    }, []);

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
                    <div className="orders_content">
                        <div className="order_header">
                            <h3>Current Orders</h3>
                            <h4 className="price_tag">Price</h4>
                        </div>
                        <div className="order_cards">
                            {cartItems?.map((ci, index) => (
                                <>
                                    <div className="order_card">
                                        <div className="order_img">
                                            <img src={ci?.images[0]} alt="" />
                                        </div>
                                        <div className="order_details">
                                            <div className="order_name">
                                                <h3>{ci?.name}</h3>
                                            </div>
                                            <div className="order_avail">
                                                {ci.in_stock ? (
                                                    <>
                                                        <h5>In stock</h5>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h5>Not in stock</h5>
                                                    </>
                                                )}
                                            </div>
                                            <div className="order_rate">
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                            </div>
                                            <div className="order_color">
                                                <h4>Color: <span className="color-highlight">{ci.color}</span></h4>
                                            </div>
                                            <div className="order_size">
                                                <h4>Size: <span className="size-highlight">{ci.size}</span></h4>
                                            </div>
                                            <div className="order_category">
                                                <h4>Category: <span className="category-highlight">{ci.category}</span></h4>
                                            </div>
                                            <div className="order_buys">
                                                <div className="order_buy">
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
                                                    <Link className="cancel_order">
                                                        Cancel Order
                                                    </Link>
                                                    <div className="vertical-divider"></div>
                                                    <Link className="see_more">
                                                        See more like this
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order_price">
                                            <h4>₹{ci.price}.00</h4>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;