import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import { useSearch } from "../../../context/search.js";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import p1 from '../../../images/polo3.jpg'
import '../../../styles/createProduct.css'
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../../../components/DashboardSidebar.jsx";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const CreateProduct = () => {
    const [defImage, setDefImage] = useState(false);
    const [defImageURL, setDefImageURL] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1799]);
    const navigate = useNavigate();
    // const [values, setValues] = useSearch();
    // console.log(values);

    const handlePriceChange = (newValue) => {
        setPriceRange(newValue);
    };

    const toggleOption = (dropdownId) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [dropdownId]: !prevState[dropdownId]
        }));
    }

    const uploadDefaultImage = (n) => {
        var def_img = document.getElementById('def_img');
        console.log(def_img);
        def_img.click();
    };

    const changeDefaultImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSizeInKB = file.size / 1024;
            const fileSizeFormatted = fileSizeInKB >= 1000
                ? `${(fileSizeInKB / 1024).toFixed(1)} MB`
                : `${fileSizeInKB.toFixed(0)} KB`;
            file.sizeKB = fileSizeFormatted;
        }
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDefImageURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
        console.log(file); // Log files for debugging
        setDefImage(file);
    };

    const handleClearFile = () => {
        setDefImage(false);
        setDefImageURL(false)
        // Optionally, you can also clear the input field
        var def_img = document.getElementById('def_img');
        if (def_img) {
            def_img.value = null;
        }
    };

    return (
        <Layout title={"Search results"}>
            <div className="dashboard_container">
                <DashboardSidebar />
                <div className="dashboard_content">
                    <div className="create_product">
                        <div className="create_product_nav">
                            <h3>Create Product</h3>
                        </div>
                        <form className="create_form" action="">
                            <div className="name_price">
                                <div className="inpbar">
                                    <h4>Name of the product</h4>
                                    <input
                                        id='fname'
                                        type="text"
                                        placeholder='' />
                                </div>
                                <div className="inpbar">
                                    <h4>Default Price</h4>
                                    <input
                                        id='lname'
                                        type="number"
                                        placeholder='' />
                                </div>
                            </div>
                            <input
                                id='def_img'
                                type="file"
                                alt="Upload"
                                accept="image/*"
                                onChange={changeDefaultImage}
                                placeholder='' />
                            <div className="default_image">
                                <div className="img_tag">
                                    <h3>Default Image</h3>
                                </div>
                                <div className="def_img_container">
                                    <div className="def_img_upload">
                                        <button className="def_img_btn" onClick={uploadDefaultImage} type="button">Select Images</button>
                                        <h4 className="def_img_txt">Drop images here to upload</h4>
                                    </div>
                                    {defImage ? (
                                        <>
                                            <div className="img_container">
                                                <div className="img_content">
                                                    <div className="img_photo">
                                                        <img src={defImageURL ? defImageURL : ''} alt="" />
                                                    </div>
                                                    <div className="img_details">
                                                        <div className="img_name">
                                                            <h4>{defImage?.name}</h4>
                                                        </div>
                                                        <div className="img_size">
                                                            <h4>{defImage?.sizeKB}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="cancel_img">
                                                        <FontAwesomeIcon onClick={handleClearFile} className="cancel" icon={faXmark} />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                        : (
                                            <></>
                                        )}
                                </div>
                            </div>
                            <div className="color_container">
                                <div className="color_details"></div>
                                <div className="color_upload"></div>
                            </div>
                            <div className="update_btn_container">
                                <button className="update_btn">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;