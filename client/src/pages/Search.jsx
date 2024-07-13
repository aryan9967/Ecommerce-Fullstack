import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../context/search.js";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import '../styles/search.css'

const Search = () => {
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1799]);
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
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="crdimg">
                                    <img src={p1} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">Blue Indigo Polo T-shirt</h3>
                                    <div className="crd_rating">
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                        <span class="material-symbols-outlined">
                                            star
                                        </span>
                                    </div>
                                    <p className="crd_price">₹799.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;