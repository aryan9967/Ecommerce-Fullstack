import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import p1 from '../images/polo3.jpg'
import '../styles/Components/dashboardHeader.css'
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
    const { navigate } = useNavigate();

    return (
        <>
            <div className="dashboard_header">
                <div className="dashboard_header_content">
                    <div className="dashboard_header_tag">
                        <h3>Account</h3>
                    </div>
                    <div className="account_name">
                        <h4>Ayush Sharma</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardHeader;