import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import { useSearch } from "../../../context/search.js";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../../../images/polo3.jpg'
import '../../../styles/dashboard.css'
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../../../components/DashboardSidebar.jsx";
import axios from "axios";
import DashboardHeader from "../../../components/DashboardHeader.jsx";
import ViewProfile from "../../../components/ViewProfile.jsx";
import EditProfile from "../../../components/EditProfile.jsx";
import Address from "../../../components/Address.jsx";
import Orders from "../../../components/OrdersReturn.jsx";
import OrdersReturn from "../../../components/OrdersReturn.jsx";

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('viewProfile'); // State to manage the active component
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1799]);
    const [errors, setErrors] = useState({});
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });
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
    const navigate = useNavigate();
    // const [values, setValues] = useSearch();
    // console.log(values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "fname") setFname(value);
        if (name === "lname") setLname(value);
        if (name === "phone") setPhone(value);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const handlePriceChange = (newValue) => {
        setPriceRange(newValue);
    };

    const toggleOption = (dropdownId) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [dropdownId]: !prevState[dropdownId]
        }));
    }

    useEffect(() => {
        if (!isRegistered) {
            navigate('/');
        }
        return () => {
            console.log('Cleanup on component unmount after checking user details');
        };
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!address.street) newErrors.street = 'Street is required';
        if (!address.city) newErrors.city = 'City is required';
        if (!address.state) newErrors.state = 'State is required';
        if (!address.zip) {
            newErrors.zip = 'Zip is required';
        } else if (!/^\d{6}$/.test(address.zip)) {
            newErrors.zip = 'Zip code is invalid';
        }
        if (!address.country) newErrors.country = 'Country is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (validate()) {
            let name = fname + ' ' + lname;
            const formData = new FormData();
            formData.append('name', name);
            formData.append('address', JSON.stringify(address));
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
                // Perform any additional logic after a successful API call
            } catch (error) {
                console.error('Error:', error);
                // Handle the error appropriately
            }
        }
    };

    return (
        <Layout title={"Search results"}>
            <div className="dashboard_container">
                <DashboardHeader />
                <div className="dashboard_content">
                    <DashboardSidebar />
                    <ViewProfile />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;