import React, { useState, useEffect, useRef } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../DB/FirebaseAuth.js';
import Layout from '../../components/Layout/Layout.jsx';
import axios from 'axios';
import { useAuth } from '../../context/auth.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import l1 from '../../images/login3c.jpg'
import '../../styles/loginUser.css';

const LoginUser = () => {
    var phone, otp, userVerify, uid;
    const [btnText, setBtnText] = useState('Get OTP');
    const [user, setUser] = useAuth();
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;
    const navigate = useNavigate();


    const recaptchaRef = useRef(null);

    useEffect(() => {
        if (!recaptchaRef.current) {
            recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha', {
                size: 'invisible',
                callback: (response) => {
                    console.log('Recaptcha solved', response);
                }
            });

            recaptchaRef.current.render().then(function (widgetId) {
                recaptchaRef.current.widgetId = widgetId;
            }).catch(error => {
                console.log('Recaptcha render error:', error);
            });
        }
    }, [user]);

    const sendOtp = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors
        if (retryCount >= maxRetries) {
            setError("Too many requests. Please try again later.");
            return;
        }
        try {
            var otpInput = document.getElementById('otp');
            var phoneInput = document.getElementById("phone");
            phone = phoneInput.value;
            var phoneNumber = '+91' + phone;
            const recaptcha = recaptchaRef.current;
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
            // setUser(confirmation);
            userVerify = confirmation;
            setBtnText('Verify OTP');
            setOnClickHandler(() => verifyOtp);
            console.log(phoneInput);
            phoneInput.parentElement.style.display = 'none'
            console.log(otpInput);
            otpInput.parentElement.style.display = "flex"
            otpInput.style.pointerEvents = 'auto';
            otpInput.style.opacity = '1';
        } catch (error) {
            if (error.code === 'auth/too-many-requests') {
                setError("Too many requests. Please try again later.");
                // Implement exponential backoff
                const delay = Math.pow(2, retryCount) * 1000;
                setTimeout(() => {
                    setRetryCount(retryCount + 1);
                    sendOtp();
                }, delay);
            } else {
                setError("Failed to send OTP. Please try again.");
                console.error("Error sending OTP:", error);
            }
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            var phoneInput = document.getElementById("phone");
            var otpInput = document.getElementById("otp");
            otp = otpInput.value;
            const data = await userVerify.confirm(otp);
            data.uid = data.user.uid;
            uid = data.uid;
            data.phone = data.user.phoneNumber;
            phone = data.user.phoneNumber;
            console.log(data);
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login-user`,
                { uid }
            );
            if (res && res.data.success) {
                toast.success(res.data.message, { duration: 3000 });
                setUser({
                    ...user,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('user', JSON.stringify(res.data));
            }
            console.log(phoneInput);
            phoneInput.parentElement.style.display = 'flex'
            console.log(otpInput);
            otpInput.parentElement.style.display = "none"
            setBtnText('Get OTP');
            setOnClickHandler(() => sendOtp);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const toRegis = () => {
        navigate('/register-user');
    }

    const toSeller = () => {
        navigate('/login/seller')
    }

    const [onClickHandler, setOnClickHandler] = useState(() => sendOtp);

    return (
        <Layout title={'Login - Ecommerce Website'}>
            <div className="login_container">
                <div className="login_content">
                    <div className="login_image">
                        <img src={l1} alt="" />
                    </div>
                    <div className="login_form">
                        <div className="log_title">
                            <h2>LOGIN</h2>
                        </div>
                        <form className='log_form' action="">
                            <div className="inpbar">
                                <h4>Phone Number</h4>
                                <input
                                    id='phone'
                                    type="tel"
                                    pattern='[0-9]{10}'
                                    placeholder='' />
                            </div>
                            <div id='recaptcha'></div>
                            <div className="otpbar">
                                <h4>OTP</h4>
                                <input
                                    id='otp'
                                    type="text"
                                    pattern='[0-9]{6}'
                                    placeholder='' />
                            </div>
                            <button className='log_btn' onClick={onClickHandler}>
                                {btnText}
                            </button>
                        </form>
                        <div className="divider-container">
                            <div className="line"></div>
                            <span className="divider-text">New to Moulik?</span>
                            <div className="line"></div>
                        </div>
                        <div className='signin_phone'>
                            <button className="phone_text" onClick={toRegis}>Sign up with Phone Number</button>
                            <button className="phone_icon_btn" onClick={toRegis}>
                                <FontAwesomeIcon className='phone_icon' icon={faPhone} />
                            </button>
                        </div>
                        <div className="divider-container">
                            <div className="sellerline"></div>
                            <span className="divider-text">Selling for work?</span>
                            <div className="sellerline"></div>
                        </div>
                        <div className='signin_seller'>
                            <button className="seller_text" onClick={toSeller}>Sign in with seller's account</button>
                            <button className="seller_icon_btn" onClick={toSeller}>
                                <FontAwesomeIcon className='seller_icon' icon={faBagShopping} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LoginUser;
