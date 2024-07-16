import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import '../styles/Components/address.css'
import { useNavigate } from "react-router-dom";
import ToggleButton from "./ToggleGender";
import axios from "axios";
import toast from "react-hot-toast";

const Address = () => {
    const [addressLine1, setaddressLine1] = useState('');
    const [addressLine2, setaddressLine2] = useState('');
    const [contact, setcontact] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [pincode, setpincode] = useState('');
    const navigate = useNavigate()
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log(storedUser);
        if (storedUser) {
            setIsRegistered(true);
            setaddressLine1(storedUser?.user?.address?.street_line1);
            setaddressLine2(storedUser?.user?.address?.street_line2);
            setpincode(storedUser?.user?.address?.pincode);
            setcity(storedUser?.user?.address?.city);
            setstate(storedUser?.user?.address?.state);
            return storedUser;
        } else {
            setIsRegistered(false);
            return null;
        }
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "street1") setaddressLine1(value);
        if (id === "street2") setaddressLine2(value);
        if (id === "pincode") setpincode(value);
        if (id === "city") setcity(value);
        if (id === "state") setstate(value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const address = {
            street_line1: addressLine1,
            street_line2: addressLine2,
            pincode: pincode,
            city: city,
            state: state,
        }
        console.log(address);
        const formData = new FormData();
        formData.append('address', JSON.stringify(address));
        // formData.append('address', JSON.stringify(address));
        // Log FormData entries
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/user/update_user`,
                formData, {
                headers: {
                    "Authorization": user.token
                }
            });
            console.log('Response:', response.data);
            getUserDetails();
            if (response) {
                toast.success("User Details Updated Successfully");
            }
            // Perform any additional logic after a successful API call
        } catch (error) {
            console.error('Error:', error);
            // Handle the error appropriately
        }
    };

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/user/get_user_details`,
                { headers: { "Authorization": user.token } }
            );
            console.log("user data: ", data);
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
            toast.error('Something went wrong while getting category');
        }
    }

    async function getUserAddress() {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/v1/user/get_user_address`,
            {
                headers: { Authorization: user.token },
            }
        );
        console.log("user address", data);
        setaddressLine1(data.address["line1"]);
        setaddressLine2(data.address["line2"]);
        setcity(data.address["city"]);
        setstate(data.address["state"]);
        setcontact(data.contact);
        setpincode(data.address["zipCode"]);
    }

    async function fetchCityAndState() {
        if (pincode.length === 6) {
            console.log("pincode", pincode)
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/util/get_city_state?pincode=${pincode}`);
                console.log(response.status)
                console.log("PIN api", response.data);
                setcity(response.data.city);
                setstate(response.data.state);
            }
            catch (err) {
                if (err.response.status === 400) {
                    alert("Invalid api pin")
                }
            }
        }
    }

    useEffect(() => {
        if (!isRegistered) {
            navigate('/');
        }
        return () => {
            console.log('Cleanup on component unmount after checking user details');
        };
    }, []);

    useEffect(() => {
        getUserDetails()
        getUserAddress()
        return () => {
            console.log('Cleanup on component unmount after checking user details');
        };
    }, []);

    useEffect(() => {
        if (pincode) {
            fetchCityAndState();
        }
        return () => {
            console.log('Cleanup on component unmount after fetching city and state details');
        };
    }, [pincode]);


    return (
        <>
            <div className="address_container">
                <div className="address_content">
                    <div className="address_title">
                        <h4>Address</h4>
                    </div>
                    <div className="address_details">
                        <div className="address_form">
                            <div className="inpbar_container">
                                <div className="inpbar">
                                    <input type="text"
                                        placeholder="Street line 1"
                                        value={addressLine1}
                                        id="street1"
                                        onChange={handleChange}
                                        maxLength={'50'} />
                                </div>
                                <div className="inpbar">
                                    <input type="text"
                                        placeholder="Street line 2"
                                        value={addressLine2}
                                        id="street2"
                                        onChange={handleChange}
                                        maxLength={'50'} />
                                </div>
                            </div>
                            <div className="inpbar_container">
                                <div className="inpbar">
                                    <input type="text"
                                        placeholder="Pincode"
                                        value={pincode}
                                        id="pincode"
                                        onChange={handleChange}
                                        maxLength={'6'} />
                                </div>
                                <div className="inpbar">
                                    <input type="text"
                                        placeholder="City"
                                        maxLength={'15'}
                                        value={city}
                                        id="city"
                                        readOnly
                                        style={{ "cursor": "not-allowed" }} />
                                </div>
                            </div>
                            <div className="inpbar_container">
                                <div className="inpbar">
                                    <input type="text"
                                        placeholder="State"
                                        maxLength={'20'}
                                        value={state}
                                        id="state"
                                        readOnly
                                        style={{ "cursor": "not-allowed" }} />
                                </div>
                                <div className="inpbar">
                                </div>
                            </div>
                            <div className="address_btn_container">
                                <button className="address_btn" onClick={handleUpdate}>Add Address</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Address;