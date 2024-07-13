import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../context/search.js";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faStar, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/cloth2.jpg'
import '../styles/cart.css'
import debounce from 'lodash/debounce';
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
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

    const addToCart = async (pid, color, qauntity_str, size) => {
        try {
            console.log(qauntity_str);
            console.log(`${process.env.REACT_APP_API}/api/v1/user/update_cart`);
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/user/update_cart`,
                { pid, color, qauntity_str, size },
                { headers: { "Authorization": user.token } }
            );
            console.log('success');
            getCartItems();
        } catch (error) {
            console.log(error);
        }
    };

    const removeItemFromCart = async (pid, color, size) => {
        try {
            console.log(`${process.env.REACT_APP_API}/api/v1/user/remove_item_from_cart`);
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/user/remove_item_from_cart`,
                { pid, color, size },
                { headers: { "Authorization": user.token } }
            );
            console.log('success');
            getCartItems();
        } catch (error) {
            console.log(error);
        }
    };

    // Wrap the addToCart call with debounce
    const debouncedAddToCart = useCallback(
        debounce((ci, index, updatedQuantities) => {
            console.log(updatedQuantities);
            if (updatedQuantities[index] !== undefined) {
                let qauntity_str = updatedQuantities[index].toString();
                addToCart(ci.pid, ci.color, qauntity_str, ci.size);
            }
        }, 1000), // 1000ms debounce delay
        []
    );

    useEffect(() => {
        // getAllCategories();
        getCartItems();
        return () => {
            console.log('Cleanup on component unmount after getting cart items');
        };
    }, []);

    useEffect(() => {
        if (quantity) {
            localStorage.setItem('quantity', JSON.stringify(quantity));
        }
        return () => {
            console.log('Cleanup on component unmount after setting quantity local storage');
        };
    }, [quantity]);

    const incrementQuantity = (ci, index) => {
        console.log(quantity);
        const updatedQuantities = [...quantity];
        const newQuantity = parseInt(updatedQuantities[index]) + 1;
        if (newQuantity <= 10) {
            updatedQuantities[index] = newQuantity;
            setQuantity(updatedQuantities);
            localStorage.setItem('quantity', JSON.stringify(updatedQuantities));
            debouncedAddToCart(ci, index, updatedQuantities); // Pass the updated quantities
        }
    };

    const decrementQuantity = (ci, index) => {
        console.log(quantity);
        const updatedQuantities = [...quantity];
        const newQuantity = parseInt(updatedQuantities[index]) - 1;
        if (newQuantity >= 1) {
            updatedQuantities[index] = newQuantity;
            setQuantity(updatedQuantities);
            localStorage.setItem('quantity', JSON.stringify(updatedQuantities));
            debouncedAddToCart(ci, index, updatedQuantities); // Pass the updated quantities
        } else {
            // Remove the item from cart
            const remainingQuantities = [...updatedQuantities.slice(0, index), ...updatedQuantities.slice(index + 1)];
            setQuantity(remainingQuantities);
            localStorage.setItem('quantity', JSON.stringify(remainingQuantities));
            console.log(remainingQuantities);
            removeItemFromCart(ci.pid, ci.color, ci.size);
        }
    };

    // const handleQuantityChange = (e, ci, index) => {
    //     const value = parseInt(e.target.value);
    //     console.log(value);
    //     console.log(quantity);
    //     const updatedQuantities = [...quantity];
    //     updatedQuantities[index] = value;
    //     setQuantity(updatedQuantities);
    //     debouncedAddToCart(ci, index);
    // };


    return (
        <Layout title={"Search results"}>
            <div className="cart_container">
                <div className="cart_left">
                    <div className="cart_header">
                        <h3>Shopping Cart</h3>
                        <h4 className="price_tag">Price</h4>
                    </div>
                    <div className="all_carts">
                        {cartItems?.map((ci, index) => (
                            <>
                                <div className="cart">
                                    <div className="cart_img">
                                        <img src={ci?.images[0]} alt="" />
                                    </div>
                                    <div className="cart_details">
                                        <div className="cart_name">
                                            <h3>{ci?.name}</h3>
                                        </div>
                                        <div className="cart_avail">
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
                                        <div className="cart_rate">
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                        </div>
                                        <div className="product_color">
                                            <h4>Color: <span className="color-highlight">{ci.color}</span></h4>
                                        </div>
                                        <div className="product_size">
                                            <h4>Size: <span className="size-highlight">{ci.size}</span></h4>
                                        </div>
                                        <div className="product_category">
                                            <h4>Category: <span className="category-highlight">{ci.category}</span></h4>
                                        </div>
                                        <div className="cart_quantity">
                                            <div className="quantity_control">
                                                <button className="quantity_btn" onClick={() => decrementQuantity(ci, index)}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <input
                                                    type="number"
                                                    className="quantity_input"
                                                    value={quantity[index]}
                                                    min={0}
                                                    max={10}
                                                    readOnly={true}
                                                />
                                                <button className="quantity_btn" onClick={() => incrementQuantity(ci, index)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                                <div className="vertical-divider"></div>
                                                <Link className="remove_text" onClick={() => removeItemFromCart(ci.pid, ci.color, ci.size)}>
                                                    Remove
                                                </Link>
                                                <div className="vertical-divider"></div>
                                                <Link className="see_more">
                                                    See more like this
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart_price">
                                        <h4>₹{ci.price}.00</h4>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="cart_right">
                    <div className="price_header">
                        <h3>Price Details</h3>
                    </div>
                    <div className="price_details">
                        <div className="price_detail">
                            <h4>Price ({cartItems.length} items): </h4>
                            <h4 className="price_highlight">₹{price.reduce((partialSum, a) => partialSum + a, 0)}.00</h4>
                        </div>
                        {/* <div className="price_detail">
                            <h4>Discount: </h4>
                            <h4 className="price_highlight">-₹200</h4>
                        </div> */}
                        <div className="price_detail">
                            <h4>Delivery Charges: </h4>
                            <h4 className="price_highlight">₹33.00</h4>
                        </div>
                        <div className="price_total">
                            <h4>Total Amount: </h4>
                            <h4 className="total_highlight">₹{price.reduce((partialSum, a) => partialSum + a, 0) + 33}.00</h4>
                        </div>
                        <div className="price_buy_div">
                            <button className="price_buy">Buy Now</button>
                        </div>
                    </div>
                    <div className="might_like">
                        <div className="like_header">
                            <h3>You might also like</h3>
                        </div>
                        <div className="all_like">
                            <div className="like_card">
                                <div className="like_img">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="like_details">
                                    <div className="like_name">
                                        <h3>Blue Indigo Polo T-shirt</h3>
                                    </div>
                                    <div className="like_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="like_price">
                                        <h4>₹799.00</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="like_card">
                                <div className="like_img">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="like_details">
                                    <div className="like_name">
                                        <h3>Blue Indigo Polo T-shirt</h3>
                                    </div>
                                    <div className="like_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="like_price">
                                        <h4>₹799.00</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="like_card">
                                <div className="like_img">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="like_details">
                                    <div className="like_name">
                                        <h3>Blue Indigo Polo T-shirt</h3>
                                    </div>
                                    <div className="like_rate">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <div className="like_price">
                                        <h4>₹799.00</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default Cart;