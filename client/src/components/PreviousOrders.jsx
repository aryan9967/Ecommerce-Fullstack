import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import '../styles/Components/previousOrders.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import CurrentOrders from "./CurrentOrders";

const PreviousOrders = () => {
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
            <div className="previous_orders">
                <div className="previous_order_header">
                    <h3>Previous Orders</h3>
                    <h4 className="price_tag">Price</h4>
                </div>
                <div className="previous_order_cards">
                    {currentOrders?.map((co, index) => (
                        <>
                            <div className="previous_order_card" key={index}>
                                <div className="previous_order_img">
                                    <img src={co?.products[0]?.image} alt="" />
                                </div>
                                <div className="previous_order_details">
                                    <div className="previous_order_name ">
                                        <h3>{co?.products[0]?.name}</h3>
                                    </div>
                                    <div className="previous_order_avail">
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
                                    <div className="previous_order_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="previous_order_color">
                                        <h4>Color: <span className="color-highlight">{co?.products[0]?.color}</span></h4>
                                    </div>
                                    <div className="previous_order_size">
                                        <h4>Size: <span className="size-highlight">{"L"}</span></h4>
                                    </div>
                                    <div className="previous_order_category">
                                        <h4>Category: <span className="category-highlight">{"Printed Tshirt"}</span></h4>
                                    </div>
                                    <div className="previous_order_buys">
                                        <div className="previous_order_buy">
                                            <button className="buy_again">Buy again</button>
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
                                <div className="previous_order_price ">
                                    <h4>₹{co?.products[0]?.price}.00</h4>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PreviousOrders;