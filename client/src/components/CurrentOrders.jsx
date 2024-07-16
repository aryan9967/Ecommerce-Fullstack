import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import '../styles/Components/currentOrders.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const CurrentOrders = () => {
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1799]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [quantity, setQuantity] = useState(() => {
        const storedQuantity = localStorage.getItem('quantity');
        return storedQuantity ? JSON.parse(storedQuantity) : null;
    });
    const [price, setPrice] = useState(() => {
        const storedPrice = localStorage.getItem('price');
        return storedPrice ? JSON.parse(storedPrice) : null;
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setIsRegistered(true);
            setCurrentOrders(storedUser?.user?.current_orders);
            console.log(storedUser?.user?.current_orders);
            return storedUser;
        } else {
            setIsRegistered(false);
            return null;
        }
    });

    const navigate = useNavigate();
    // const [values, setValues] = useSearch();

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/user/get_user_details`,
                { headers: { "Authorization": user.token } }
            );
            console.log("user data: ", data);
            setIsRegistered(true);
            setCurrentOrders(data?.current_orders);
            // Retrieve the item from local storage
            let userData = localStorage.getItem('user');

            if (userData) {
                // Parse the item to a JavaScript object
                userData = JSON.parse(userData);

                // Update the specific field
                userData.user = data; // Example update

                // Stringify the updated object
                const updatedUser = JSON.stringify(userData);

                // Save the updated stringified object back to local storage
                localStorage.setItem('user', updatedUser);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        getUserDetails()
        return () => {
            console.log('Cleanup on component unmount after checking user details');
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
        <>
            <div className="current_orders">
                <div className="current_order_header">
                    <h3>Current Orders</h3>
                    <h4 className="price_tag">Price</h4>
                </div>
                <div className="current_order_cards">
                    {currentOrders?.map((co, index) => (
                        <>
                            <div className="current_order_card" key={index}>
                                <div className="current_order_img">
                                    <img src={co?.products[0]?.image} alt="" />
                                </div>
                                <div className="current_order_details">
                                    <div className="current_order_name">
                                        <h3>{co?.products[0]?.name}</h3>
                                    </div>
                                    <div className="current_order_avail ">
                                        {true ? (
                                            <>
                                                <h5>In stock</h5>
                                            </>
                                        ) : (
                                            <>
                                                <h5>Not in stock</h5>
                                            </>
                                        )}
                                    </div>
                                    <div className="current_order_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="current_order_color">
                                        <h4>Color: <span className="color-highlight">{co?.products[0].color}</span></h4>
                                    </div>
                                    <div className="current_order_size">
                                        <h4>Size: <span className="size-highlight">{"M"}</span></h4>
                                    </div>
                                    <div className="current_order_category">
                                        <h4>Category: <span className="category-highlight">{"Polo Tshirt"}</span></h4>
                                    </div>
                                    <div className="current_order_buys">
                                        <div className="current_order_buy">
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
                                <div className="current_order_price ">
                                    <h4>₹{co?.total_amount}.00</h4>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CurrentOrders;