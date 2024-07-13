import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';
import { useNavigate } from 'react-router-dom';
import SearchInput from "../Forms/SearchInput.jsx";
import toast from 'react-hot-toast';
import useCategory from '../../hooks/useCategory.js';
import '../../styles/Components/header.css'
import logo1 from '../../images/logo5.png'
import mlogo1 from '../../images/mainlogoa.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { GiMagnifyingGlass } from 'react-icons/gi';
import SearchBar from '../SearchBar.jsx';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [isRegistered, setIsRegistered] = useState(false);
    const categories = useCategory();
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
    const navigate = useNavigate();

    const logoClick = () => {
        navigate('/');
    }

    const toProfile = async (pid) => {
        navigate(`/profile`)
    }
    const toCart = async (pid) => {
        if (user && isRegistered) {
            navigate(`/cart`);
        } else {
            // Handle the case where user is not logged in or registered
            // You can redirect to login or display a message
            toast.error("User is not logged in or registered!");
            // Example: Redirect to login
            navigate(`/login-user`);
        }
    };


    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        });
        localStorage.removeItem('auth');
        toast.success('Logout Successfully');
        setIsRegistered(false); // Registration successful
    };

    return (
        <>
            <div id='marquee1' className="marquee">
                <p className="sliding-text">This is sliding text created with CSS animations for better accessibility.</p>
            </div>
            <div id='navbar1' className="navbar1">
                <div className="logo">
                    <img src={mlogo1} alt="" onClick={logoClick} />
                </div>
                <SearchBar />
                <ul className='right_nav'>
                    {isRegistered ? (
                        <>
                            <div className="profile_icon_container">
                                <li>
                                    <FontAwesomeIcon className='user_icon' onClick={toProfile} icon={faUser} />
                                </li>
                                <div className="line"></div>
                            </div>
                        </>
                    ) : (
                        <>
                            <li className="profile">
                                <Link className='login_link' to='/login-user'>Login</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <FontAwesomeIcon className='wishlist_icon' icon={faHeart} />
                    </li>
                    <li>
                        <FontAwesomeIcon className='cart_icon' onClick={toCart} icon={faCartShopping} />
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Header;
