import React from 'react';
import './input.sass';

const Input = ({
    value,
    onChange,
    placeholder,
}) => {
    return (
        <input 
            className="app-input" 
            onChange={onChange ? onChange : null} 
            placeholder={placeholder}
            value={value}/>
    )
}

export default Input;