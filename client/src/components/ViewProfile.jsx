import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faCamera } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/profile1e.jpg'
import '../styles/Components/viewProfile.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ViewProfile = () => {
    const [profileImg, setProfileImg] = useState(false);
    const [profileUrl, setProfileUrl] = useState(false);
    const [testUrl, setTestUrl] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log(storedUser);
        if (storedUser) {
            setIsRegistered(true);
            if (storedUser?.user?.photoUrl !== '') {
                setProfileUrl(storedUser?.user?.photoUrl)
            }
            return storedUser;
        } else {
            setIsRegistered(false);
            return null;
        }
    });
    const navigate = useNavigate();

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
            setProfileUrl(data?.photoUrl);
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

    const handleUpdate = async (file) => {
        const formData = new FormData();
        console.log(profileImg);
        formData.append('file', profileImg ? profileImg : file);
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

    const uploadProfileImage = () => {
        var img_file = document.getElementById('img_file');
        console.log(img_file);
        img_file.click();
    };

    const changeDefaultImage = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        setProfileImg(file);
        await handleUpdate(file)
    };

    const toEditProfile = () => {
        navigate('/dashboard/edit_profile')
    }

    return (
        <>
            <div className="view_profile">
                <div className="profile_content">
                    <div className="profile_main_details">
                        <div className="profile_img_container">
                            <input className="profile_img_change"
                                id="img_file"
                                type="file"
                                onChange={(e) => changeDefaultImage(e)} />
                            <img src={profileUrl ? profileUrl : p1} alt="" className="profile_img" />
                            <div className="camera_icon_container" onClick={uploadProfileImage}>
                                <FontAwesomeIcon className="camera_icon" icon={faCamera} />
                            </div>
                        </div>
                        <div className="profile_name_phone">
                            <div className="profile_name">
                                <h4>{user.user?.name}</h4>
                            </div>
                            <div className="profile_phone">
                                <h4>{user?.user?.phone.substring(3)}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="profile_optional_details">
                        {/* <div className="profile_optional_container">
                            <div className="profile_optional_tag">
                                <h4>Name:</h4>
                            </div>
                            <div className="profile_optional_value">
                                <h4>not added</h4>
                            </div>
                        </div>
                        <div className="profile_optional_container">
                            <div className="profile_optional_tag">
                                <h4>Contact:</h4>
                            </div>
                            <div className="profile_optional_value">
                                <h4>not added</h4>
                            </div>
                        </div> */}
                        <div className={`profile_optional_container`}>
                            <div className="profile_optional_tag">
                                <h4>Email Id:</h4>
                            </div>
                            <div className="profile_optional_value">
                                <h4 className={`${user?.user?.email ? 'present' : 'absent'}`}>{user?.user?.email ? user?.user?.email : "not added"}</h4>
                            </div>
                        </div>
                        <div className="profile_optional_container">
                            <div className="profile_optional_tag">
                                <h4>Gender:</h4>
                            </div>
                            <div className="profile_optional_value">
                                <h4 className={`${user?.user?.gender ? 'present' : 'absent'}`}>{user?.user?.gender ? user?.user?.gender : "not added"}</h4>
                            </div>
                        </div>
                        <div className="profile_optional_container">
                            <div className="profile_optional_tag">
                                <h4>DOB:</h4>
                            </div>
                            <div className="profile_optional_value">
                                <h4 className={`${user?.user?.dob ? 'present' : 'absent'}`}>{user?.user?.dob ? user?.user?.dob : "not added"}</h4>
                            </div>
                        </div>
                        <div className="profile_optional_container">
                            <div className="profile_optional_tag">
                                <h4>Location:</h4>
                            </div>
                            <div className="profile_optional_value">
                                <h4 className={`${user?.user?.address?.city ? 'present' : 'absent'}`}>{user?.user?.address?.city ? user?.user?.address?.city : "not added"}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="edit_profile_btn_container">
                        <button className="edit_profile_btn" onClick={toEditProfile}>Edit Profile</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProfile;