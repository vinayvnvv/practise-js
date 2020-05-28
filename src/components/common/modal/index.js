import React from 'react';
import './modal.sass';

const Modal = ({
    onClose,
    title,
    children
}) => {
    return (
        <div className="app-modal">
            <div className="back-drop"/>
            <div className="modal-content">
                {title && (
                    <div className="modal-ttl">
                        <div className="ttl">{title}</div>
                        <div 
                            className="close" 
                            onClick={onClose}/>
                    </div>
                )}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

const Footer = ({
    children
}) => (
    <div className="modal-footer">{children}</div>
);
export {Footer}

export default Modal;