import React, { useState } from "react";
import '../styles/Components/toggleButton.css'

const ToggleButton = ({ setGender }) => {
    const [genderToggle, setGenderToggle] = useState('male')

    const handleToggle = (selectedGender) => {
        setGender(selectedGender);
        setGenderToggle(selectedGender);
    };

    return (
        <div className="toggle-button-container">
            <button
                className={`toggle-button-male ${genderToggle === "male" ? "active" : ""}`}
                onClick={() => handleToggle("male")}
            >
                Male
            </button>
            <button
                className={`toggle-button-female ${genderToggle === "female" ? "active" : ""}`}
                onClick={() => handleToggle("female")}
            >
                Female
            </button>
            <button
                className={`toggle-button-other ${genderToggle === "other" ? "active" : ""}`}
                onClick={() => handleToggle("other")}
            >
                Other
            </button>
        </div>
    );
};

export default ToggleButton;
