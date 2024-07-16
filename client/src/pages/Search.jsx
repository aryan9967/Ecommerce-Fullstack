import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../context/search.js";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import photo1 from '../images/cloth2.jpg'
import photo2 from '../images/cloth3.jpg'
import photo3 from '../images/cloth4.jpg'
import photo4 from '../images/cloth5.jpg'
import photo5 from '../images/cloth6.jpg'
import photo6 from '../images/cloth7.jpg'
import photo7 from '../images/cloth8.jpg'
import photo8 from '../images/cloth9.jpg'
import photo9 from '../images/cloth10.jpg'
import photo10 from '../images/cloth11.jpg'
import '../styles/search.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


const Search = () => {
    const { keyword } = useParams();
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1799]);
    const [parr, setParr] = useState([photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10])
    const [searchProduct, setSearchProduct] = useState(() => {
        const storedItems = localStorage.getItem('search');
        return storedItems ? JSON.parse(storedItems) : null;
    });
    const navigate = useNavigate();
    // const [values, setValues] = useSearch();
    // console.log(values);

    const getProductByKeyword = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/search`,
                { keyword: keyword}
            );
            console.log('kd data:', data);
            if (data) {

                setSearchProduct(data);
                localStorage.setItem('search', JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while getting search');

        }
    }

    useEffect(() => {
        // getAllCategories();
        getProductByKeyword();
        return () => {
            console.log('Cleanup on component unmount after getting cart items');
        };
    }, [keyword]);

    const toProductDetails = async (pid) => {
        navigate(`/product/${pid}`)
    }

    const handlePriceChange = (newValue) => {
        setPriceRange(newValue);
    };

    const toggleOption = (dropdownId) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [dropdownId]: !prevState[dropdownId]
        }));
    }

    return (
        <Layout title={"Search results"}>
            <div className="search_container">
                <div className="filter_container">
                    <div className="filter_text">
                        <h3>Filters</h3>
                    </div>
                    <div className="filter_content">
                        <div className="filter_dropdown">
                            <div className="dropdown_btn">
                                <button className="dropdown_text" onClick={() => toggleOption('category')}>
                                    <h4>Category</h4>
                                </button>
                                <button className="dropdown_arrow" onClick={() => toggleOption('category')}>
                                    <FontAwesomeIcon id="category" icon={openDropdowns['category'] ? faAngleUp : faAngleDown} />
                                </button>
                            </div>
                            {openDropdowns['category'] && (
                                <div className="dropdown_content">
                                    <div className="dropdown_option">
                                        <input type="checkbox" name="polo" id="polo" />
                                        <div className="option_text">
                                            <label htmlFor="polo">Polo T-shirts [23]</label>
                                        </div>
                                    </div>
                                    <div className="dropdown_option">
                                        <input type="checkbox" name="round" id="round" />
                                        <div className="option_text">
                                            <label htmlFor="round">Round Neck T-shirts [16]</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="filter_dropdown">
                            <div className="dropdown_btn">
                                <button className="dropdown_text" onClick={() => toggleOption('size')}>
                                    <h4>Size</h4>
                                </button>
                                <button className="dropdown_arrow" onClick={() => toggleOption('size')}>
                                    <FontAwesomeIcon id="category" icon={openDropdowns['size'] ? faAngleUp : faAngleDown} />
                                </button>
                            </div>
                            {openDropdowns['size'] && (
                                <div className="dropdown_content">
                                    <div className="dropdown_option">
                                        <input type="checkbox" name="small" id="small" />
                                        <div className="option_text">
                                            <label htmlFor="small">S [47]</label>
                                        </div>
                                    </div>
                                    <div className="dropdown_option">
                                        <input type="checkbox" name="medium" id="medium" />
                                        <div className="option_text">
                                            <label htmlFor="medium">M [21]</label>
                                        </div>
                                    </div>
                                    <div className="dropdown_option">
                                        <input type="checkbox" name="large" id="large" />
                                        <div className="option_text">
                                            <label htmlFor="large">L [76]</label>
                                        </div>
                                    </div>
                                    <div className="dropdown_option">
                                        <input type="checkbox" name="xlarge" id="xlarge" />
                                        <div className="option_text">
                                            <label htmlFor="xlarge">XL [33]</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="filter_dropdown">
                            <div className="dropdown_btn">
                                <button className="dropdown_text" onClick={() => toggleOption('availability')}>
                                    <h4>Availability</h4>
                                </button>
                                <button className="dropdown_arrow" onClick={() => toggleOption('availability')}>
                                    <FontAwesomeIcon id="availability" icon={openDropdowns['availability'] ? faAngleUp : faAngleDown} />
                                </button>
                            </div>
                            {openDropdowns['availability'] && (
                                <div className="dropdown_content">
                                    <div className="dropdown_option">
                                        <input type="checkbox" name="instock" id="instock" />
                                        <div className="option_text">
                                            <label htmlFor="instock">In Stock [103]</label>
                                        </div>
                                    </div>
                                    <div className="dropdown_option">
                                        <input type="checkbox" name="outstock" id="outstock" />
                                        <div className="option_text">
                                            <label htmlFor="outstock">Out of Stock [7]</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="filter_dropdown">
                            <div className="dropdown_btn">
                                <button className="dropdown_text" onClick={() => toggleOption('price')}>
                                    <h4>Price</h4>
                                </button>
                                <button className="dropdown_arrow" onClick={() => toggleOption('price')}>
                                    <FontAwesomeIcon id="price" icon={openDropdowns['price'] ? faAngleUp : faAngleDown} />
                                </button>
                            </div>
                            {openDropdowns['price'] && (
                                <div className="dropdown-content">
                                    <div className="price-slider">
                                        <ReactSlider
                                            className="custom-slider"
                                            thumbClassName="custom-thumb"
                                            trackClassName="custom-track"
                                            value={priceRange}
                                            onChange={handlePriceChange}
                                            min={0}
                                            max={1799}
                                            step={10}
                                            withTracks
                                            pearling
                                            minDistance={10}
                                        />
                                    </div>
                                    <div className="price-inputs">
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            min={0}
                                            max={priceRange[1]}
                                            onChange={(e) => handlePriceChange([+e.target.value, priceRange[1]])}
                                        />
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            min={priceRange[0]}
                                            max={1799}
                                            onChange={(e) => handlePriceChange([priceRange[0], +e.target.value])}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="result_container">
                    <div className="result_nav1">
                        <div className="result_text">102 results</div>
                        <div className="select_wrapper">
                            <select className="result_sort">
                                <option value="" disabled>Sort</option>
                                <option value="relevance">Relevance</option>
                                <option value="price_lowToHIgh">Price: low to high</option>
                                <option value="price_highToHIgh">Price: high to low</option>
                            </select>
                        </div>
                    </div>
                    <div className="result_content">
                        <div className="cards">
                            {searchProduct?.map((sp) => (
                                <>
                                    <div className="card" key={sp?.pid} onClick={() => toProductDetails(sp?.pid)}>
                                        <div className="crdimg">
                                            <img src={sp?.main_image} alt="" />
                                        </div>
                                        <div className="crd_content">
                                            <h3 className="crd_name">{sp?.product_name}</h3>
                                            <div className="crd_rating">
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                                <FontAwesomeIcon className="star" icon={faStar} />
                                            </div>
                                            <p className="crd_price">₹{sp?.display_price}.00</p>
                                        </div>
                                    </div>

                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;