import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import '../styles/Components/editProfile.css'
import { useNavigate } from "react-router-dom";
import ToggleButton from "./ToggleGender";
import RadioGender from "./RadioGender";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
    const [errors, setErrors] = useState({});
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [alternativePhone, setAlternativePhone] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log(storedUser);
        if (storedUser) {
            setIsRegistered(true);
            setFname(storedUser?.user?.name?.split(" ")[0]);
            setLname(storedUser?.user?.name?.split(" ")[1]);
            setPhone(storedUser?.user?.phone);
            setEmail(storedUser?.user?.email);
            setDob(storedUser?.user?.dob);
            setAlternativePhone(storedUser?.user?.alternative_phone);
            setGender(storedUser?.user?.gender);
            return storedUser;
        } else {
            setIsRegistered(false);
            return null;
        }
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "fname") setFname(value);
        if (id === "lname") setLname(value);
        if (id === "alternative_phone") setAlternativePhone(value);
        if (id === "email") setEmail(value);
        if (id === "dob") setDob(value);
        if (id === "gender") setGender(value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        let name = fname + ' ' + lname;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('alternative_phone', alternativePhone);
        formData.append('email', email);
        formData.append('dob', dob);
        formData.append('gender', gender);
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
        return () => {
            console.log('Cleanup on component unmount after checking user details');
        };
    }, []);

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/user/get_user_details`,
                { headers: { "Authorization": user.token } }
            );
            console.log("user data: ", data);
            setIsRegistered(true);
            setFname(data?.name?.split(" ")[0]);
            setLname(data?.name?.split(" ")[1]);
            setPhone(data?.phone);
            setEmail(data?.email);
            setDob(data?.dob);
            setAlternativePhone(data?.alternative_phone);
            setGender(data?.gender);
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

    return (
        <>
            <div className="edit_profile">
                <div className="edit_profile_content">
                    <div className="edit_profile_title">
                        <h4>Edit Profile</h4>
                    </div>
                    <div className="edit_profile_details">
                        {/* <div className="change_phone">
                            <div className="phone_details">
                                <h4 className="phone_tag">Phone Number</h4>
                                <h4 className="phone_value">9326242640</h4>
                            </div>
                            <div className="phone_btn_container">
                                <button className="phone_btn">Change</button>
                            </div>
                        </div> */}
                        <div className="edit_form">
                            <div className="inpbar_container">
                                <div className="inpbar">
                                    <input type="text"
                                        value={fname}
                                        id="fname"
                                        onChange={handleChange}
                                        placeholder="First Name" />
                                </div>
                                <div className="inpbar">
                                    <input type="text"
                                        value={lname}
                                        id="lname"
                                        onChange={handleChange}
                                        placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="inpbar_container">
                                <div className="inpbar">
                                    <input type="text"
                                        value={email}
                                        id="email"
                                        onChange={handleChange}
                                        placeholder="Email" />
                                </div>
                                <div className="inpbar">
                                    <input type="date"
                                        value={dob}
                                        id="dob"
                                        onChange={handleChange}
                                        placeholder="" />
                                </div>
                            </div>
                            <div className="inpbar_container">
                                <div className="inpbar">
                                    <input type="text"
                                        value={alternativePhone}
                                        id="alternative_phone"
                                        onChange={handleChange}
                                        placeholder="Alternative Phone" />
                                </div>
                                <div className="inpbar">
                                    <div className="select_wrapper">
                                        <select className="gender_select" id="gender" value={gender} onChange={handleChange}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="gender_toggle">
                                <ToggleButton setGender={setGender} />
                            </div> */}
                            <div className="update_btn_container">
                                <button className="update_btn" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile;