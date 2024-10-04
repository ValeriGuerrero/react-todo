
import React from 'react';
import './App.css';
import './App.jsx'

const Switch = ({ sortAsc, handleSortToggleClick }) => {
    return (
        <>

            <input
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
                checked={sortAsc}
                onChange={handleSortToggleClick}
            />
            <label
                style={{ background: sortAsc && '#a0624e' }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >

                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default Switch;