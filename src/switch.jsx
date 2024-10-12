
import React from 'react';
import './App.css';
import './App.jsx'

const Switch = ({ sortAsc, handleSortToggleClick }) => {
    return (
        <div>

            <input
                className="react-switch-checkbox"
                id="react-switch-new"
                type="checkbox"
                checked={sortAsc}
                onChange={handleSortToggleClick}
            />
            <label
                style={{ background: sortAsc && '#a0624e' }}
                className="react-switch-label"
                htmlFor="react-switch-new"
            >

                <span className="react-switch-button" />

            </label>
            <p className='sort-titles'> Sort title in ascendant or descendant order</p>
        </div>
    );
};

export default Switch;