import React, { useState, useEffect } from 'react';
import '../styles/Components/searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    return (
        <>
            <div className="search_bar">
                <div className="search-box">
                    <input placeholder="Search..." className="srch_inp" type='search' />
                    <div className="search-box-icon">
                        <button className="btn-icon-content">
                            <FontAwesomeIcon className='srch_icon' icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
