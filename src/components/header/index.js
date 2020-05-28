import React from 'react';
import './styles/header.sass';
import Toolbar from '../toolbal';
const Header = () => {
    return (
        <div className="app-header">
            <div className="app-header-c">
                <div className="l">
                    <div className="logo">
                        <span className="j">J</span><span className="s">S</span>
                    </div>
                    <div className="l-content">
                        <div className="l-top">
                            <div className="title">Practise<span className="j">J</span><span className="s">S</span></div>
                        </div>
                        <div className="l-toolbar">
                            <Toolbar />
                        </div>
                    </div>
                    
                </div>
                <div className="r"></div>
            </div>
        </div>
    )
}

export default Header;