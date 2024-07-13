import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faMinus, faCartShopping, faShoppingCart, faArrowLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import p1 from '../../images/polo3.jpg';
import photo1 from '../../images/cloth2.jpg'
import photo2 from '../../images/cloth3.jpg'
import photo3 from '../../images/cloth4.jpg'
import photo4 from '../../images/cloth5.jpg'
import photo5 from '../../images/cloth6.jpg'
import photo6 from '../../images/cloth7.jpg'
import photo7 from '../../images/cloth8.jpg'
import photo8 from '../../images/cloth9.jpg'
import photo9 from '../../images/cloth10.jpg'
import photo10 from '../../images/cloth11.jpg'
import profile from '../../images/profile1e.jpg';
import '../../styles/profile.css';

const Profile = () => {
    const [parr, setParr] = useState([photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10])
    const [quantity, setQuantity] = useState(1);
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setIsRegistered(true);
            return JSON.parse(storedUser);
        } else {
            setIsRegistered(false);
            return null;
        }
    });
    const navigate = useNavigate()

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

    const toDashboard = () => {
        navigate('/dashboard/user');
    };

    useEffect(() => {
        if (!isRegistered) {
            navigate('/');
        }
        return () => {
            console.log('Cleanup on component unmount after getting cart items');
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("auth");
        navigate("/");
    };

    return (
        <Layout title={'Your Profile'}>
            <div className="profile_container">
                <div className="profile_details">
                    <div className="profile_photo">
                        <img src={profile} alt="" />
                        <button className="photo_btn">Change Photo</button>
                    </div>
                    <div className="profile_info">
                        <div className="profile_name">
                            <h3>{user?.user?.name}</h3>
                        </div>
                        {user?.user?.address && (
                            <>
                                <div className="profile_address">
                                    <h4>{user?.user?.address}</h4>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="profile_btn">
                        <button className="dashboard_btn" onClick={toDashboard}>Dashboard</button>
                        <button className="logout_btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="profile_order">
                    <div className="order_header">
                        <h3>Previous Orders</h3>
                        <h4 className="price_tag">Price</h4>
                    </div>
                    <div className="order_cards">
                        {parr?.map((p) => (
                            <>
                                <div className="order_card">
                                    <div className="order_img">
                                        <img src={p} alt="" />
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
                                        <div className="order_color">
                                            <h4>Color: <span className="color-highlight">{"Black"}</span></h4>
                                        </div>
                                        <div className="order_size">
                                            <h4>Size: <span className="size-highlight">{"XL"}</span></h4>
                                        </div>
                                        <div className="order_category">
                                            <h4>Category: <span className="category-highlight">{"Polo Tshirt"}</span></h4>
                                        </div>
                                        <div className="order_buys">
                                            <div className="order_buy">
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
                                    <div className="order_price">
                                        <h4>₹799.00</h4>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;