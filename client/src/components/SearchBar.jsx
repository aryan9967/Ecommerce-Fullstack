import React, { useState, useEffect, useRef } from 'react';
import '../styles/Components/searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        navigate(`/search/${keyword.toLowerCase()}`);
        inputRef.current.blur(); // Remove focus from the input field
    };

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <>
            <div className="search_bar">
                <div className="search-box">
                    <input placeholder="Search..."
                        className="srch_inp"
                        type='search'
                        ref={inputRef}
                        value={keyword}
                        maxLength={"25"}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} />
                    <div className="search-box-icon">
                        <button className="btn-icon-content" onClick={handleSearch}>
                            <FontAwesomeIcon className='srch_icon' icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
