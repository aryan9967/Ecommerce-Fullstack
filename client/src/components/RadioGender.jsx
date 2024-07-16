import React, { useState } from "react";
import '../styles/Components/radioGender.css'

const RadioGender = () => {
    const [gender, setGender] = useState("");

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <div className="gender-radio-container">
            <label className="gender-radio-label">
                <input
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleChange}
                    className="gender-radio-input"
                />
                Male
            </label>
            <label className="gender-radio-label">
                <input
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleChange}
                    className="gender-radio-input"
                />
                Female
            </label>
        </div>
    );
};

export default RadioGender;
