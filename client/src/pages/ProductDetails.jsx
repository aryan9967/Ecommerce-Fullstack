import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPlus, faMinus, faCartShopping, faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/cloth13.jpg'
import '../styles/productDetails.css';
import toast from "react-hot-toast";

const ProductDetails = () => {
    const { pid } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [colorData, setColorData] = useState(null);
    const [images, setImages] = useState(null);
    const [colors, setColors] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [sizeData, setSizeData] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const getProductDetails = async () => {
        try {
            console.log('get1:', pid);
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get_product_pid?pid=${pid}`
            );
            console.log('get1: ', data);
            const data1 = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get_color?pid=${pid}&color=${data.colors[0]}`
            );
            console.log('get2: ', data1.data);
            if (data) {
                setProductDetails(data);
                setColors(data.color_code);
            }
            if (data1) {
                setColorData(data1?.data);
                setImages(data1?.data?.images);
                setMainImage(data1?.data?.images[0]);
                setSizes(data1?.data?.sizes);
                setSizeData(data1?.data?.sizes[0]);
            }
            // setColorActive(data?.color_code[0]?.color_code);
            // setSizeActive(data1?.data?.sizes[0]?.size);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while getting category');
        }
    }

    const getColorDetails = async (color) => {
        console.log('get');
        try {
            console.log('get1:', pid, color);
            const data1 = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get_color?pid=${pid}&color=${color}`
            );
            console.log('get2:', data1.data);
            if (data1) {
                setColorData(data1.data);
                setImages(data1.data.images);
                setMainImage(data1?.data?.images[0]);
                setSizes(data1?.data?.sizes);
                setSizeData(data1?.data?.sizes[0]);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while getting category');
        }
    }

    const getSizeDetails = async (index) => {
        console.log('getSizeDetails');
        try {
            setSizeData(sizes[index]);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while getting size details');
        }
    }

    const addToCart = async () => {
        try {
            let pid = productDetails.pid;
            let color = colorData.color_name;
            let qauntity_str = "1";
            let size = sizeData.size;
            console.log(`${process.env.REACT_APP_API}/api/v1/user/update_cart`);
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/user/update_cart`,
                { pid, color, qauntity_str, size },
                { headers: { "Authorization": user.token } }
            );
            console.log('success');
            navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // getAllCategories();
        getProductDetails();
        return () => {
            console.log('Cleanup on component unmount');
        };
    }, []);

    useEffect(() => {
        if (productDetails?.color_code[0]?.color_code) {
            setColorActive(productDetails?.color_code[0]?.color_code);
        }
        // if (sizes[0]?.size) {
        //     setSizeActive(data1?.data?.sizes[0]?.size);
        // }
        return () => {
            console.log('Cleanup on component unmount');
        };
    }, [productDetails]);

    useEffect(() => {
        if (sizes && sizes.length > 0) {
            setSizeActive(sizes[0]?.size);
        }
    }, [sizes]); // Note the square brackets around `sizes`


    const offers = [
        { id: 1, title: "Offer 1", description: "Get 10% off" },
        { id: 2, title: "Offer 2", description: "Buy 1 Get 1 Free" },
        { id: 3, title: "Offer 3", description: "Free Shipping" },
        { id: 4, title: "Offer 4", description: "20% off on next purchase" }
    ];

    const productDescription = `
        This Blue Indigo Polo T-shirt is crafted from high-quality fabric that ensures maximum comfort and durability. The polo features a classic fit with a ribbed collar and sleeve cuffs, providing a timeless look. The breathable material keeps you cool and dry throughout the day, making it perfect for any casual or semi-formal occasion. Whether you're heading to a meeting, a casual outing, or a social event, this polo T-shirt will elevate your style effortlessly. The versatile color and design make it easy to pair with jeans, chinos, or shorts for a complete look.
    `;


    const changeMainImage = (url) => {
        setMainImage(url);
    };

    const handleColorChange = (id, color_name) => {
        setColorActive(id);
        if (color_name) {
            console.log(color_name);
        }
        getColorDetails(color_name);
    };

    const handleSizeChange = (id, index) => {
        setSizeActive(id);
        getSizeDetails(index)
    };

    const setColorActive = (id) => {
        colors?.map(c => {
            var sideColor = document.getElementById(c.color_code);
            sideColor?.parentElement?.classList.remove("active");
        })
        var color = document.getElementById(id);
        color?.parentElement?.classList.add('active');
    };

    const setSizeActive = (id) => {
        sizes?.map(s => {
            var sideSizes = document.getElementById(s.size);
            sideSizes?.parentElement?.classList.remove("active");
        })
        var size = document.getElementById(id);
        size?.parentElement?.classList.add('active');
    };

    return (
        <Layout>
            <div className="product_container">
                <div className="details_container">
                    <div className="left_details">
                        <div className="back_nav">
                            <h4>
                                <Link className="back_link" to={'/'}>
                                    <FontAwesomeIcon className="back_arrow" icon={faArrowLeft} />Back to results
                                </Link>
                            </h4>
                        </div>
                        <div className="photo_container">
                            <div className="photo_sidebar">
                                {images?.map((img) => (
                                    <>
                                        <div className="pro_photo">
                                            <img src={img} alt="" onClick={() => changeMainImage(img)} />
                                        </div>
                                    </>
                                ))}
                            </div>
                            <div className="product_photo">
                                <div className="main_photo">
                                    <img src={mainImage} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right_details">
                        <div className="main_details">
                            <div className="product_name">
                                <h3>{productDetails?.product_name}</h3>
                            </div>
                            <div className="product_rate">
                                <FontAwesomeIcon className="star" icon={faStar} />
                                <FontAwesomeIcon className="star" icon={faStar} />
                                <FontAwesomeIcon className="star" icon={faStar} />
                                <FontAwesomeIcon className="star" icon={faStar} />
                                <FontAwesomeIcon className="star" icon={faStar} />
                            </div>
                            <div className="product_price">
                                <h4>₹{sizeData?.price}.00</h4>
                                <h5>(Inclusive of all taxes)</h5>
                            </div>
                            <div className="product_color">
                                <div className="color_title">
                                    <h3>Color - {colorData?.color_name}</h3>
                                </div>
                                <div className="all_colors">
                                    {colors?.map((clr) => (
                                        <>
                                            <div className="color_container"
                                                onClick={() => handleColorChange(clr.color_code, clr.color_name)}
                                                onLoad={() => setColorActive(productDetails?.color_code[0]?.color_code)}
                                                key={clr.color_code}>
                                                <div className="color active" id={clr.color_code} style={{ "backgroundColor": clr?.color_code }}></div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div className="product_size">
                                <div className="size_title">
                                    <h3>Size</h3>
                                </div>
                                <div className="all_size">
                                    {sizes?.map((s, index) => (
                                        <>
                                            <div className="size_container"
                                                onClick={() => handleSizeChange(s.size, index)}
                                                onLoad={() => setSizeActive(s?.size)}
                                                key={s.size}>
                                                <h4 className="size active" id={s.size}>{s.size}</h4>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div className="product_avail">
                                <h5>In stock</h5>
                            </div>
                        </div>
                        <div className="product_about">
                            <div className="about_title">
                                <h3>About the product</h3>
                            </div>
                            <div className="about_content">
                                {showMore ? productDetails?.description : `${productDetails?.description.substring(0, 164)}...`}
                                <span
                                    className="see_more"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? " See Less" : " See More"}
                                </span>
                            </div>
                        </div>
                        <div className="product_category">
                            <h4>Category: <span className="category-highlight">{productDetails?.category}</span></h4>
                        </div>

                        <button className="cart_btn" onClick={addToCart}>Add to Cart</button>
                        <button className="buy_btn">Buy Now</button>
                    </div>
                </div>
                <div className="related_products"></div>
            </div>
        </Layout>
    );
};

export default ProductDetails;