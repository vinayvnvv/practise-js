import React from 'react';
import './button.sass';

export const Button = ({
    children,
    transparent,
    filled,
    link,
    onClick,
    large,
}) => {
    const classNames = ['app-btn'];
    if(transparent) classNames.push('transparent');
    if(filled) classNames.push('filled');
    if(link) classNames.push('link');
    if(large) classNames.push('large');
    return (
        <button 
            className={classNames.join(' ')} 
            onClick={onClick ? onClick : null}>
                {children}
        </button>
    );
};