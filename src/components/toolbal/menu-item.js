import React, { useEffect, useState } from 'react';

const MenuItem = ({
    index,
    title,
    data,
    listStyle,
}) => {
    useEffect(() => {
        window.addEventListener('click', e => {
            const a = e.target.closest('.index-' + index);
            if(!a) {
                setVisible(false);
            }
        })
    }, []);
    const [visible, setVisible] = useState(false);
    const showMenu = e => {
        e.preventDefault();
        // e.stopPropagation();
        if(data && data.length > 0) {
            setVisible(!visible);
        }   
    }
    return (
        <div className={"menu-itm " + (visible ? 'visible' : '') + ' index-' + index} >
            <div 
                className={"menu-ttl"}
                onClick={showMenu}>
                    {title}
            </div>
            {visible && data && data.length > 0 && (
                <div className="menu-opt" style={listStyle ? listStyle : {}}>
                    {data.map((op, idx) =>
                        <Option 
                            title={op.title}
                            data={op.list}
                            closeMenu={() => setVisible(false)}
                            listValue={op.listValue}
                            savedTitleValue={op.savedTitleValue}
                            value={op.value}
                            valueType={op.valueType}
                            onClickTitle={op.onClick}
                            listItemClick={op.listItemClick}
                            menuIndex={index}
                            noClick={op.noClick}
                            divider={op.divider}
                            key={'opt-tllbr-menu-' + idx + index}/>
                    )}
                </div>
            )}
        </div>
    )
    
};


const Option = ({
    data,
    title,
    menuIndex,
    listItemClick,
    closeMenu,
    listValue,
    savedTitleValue,
    onClickTitle,
    value,
    valueType,
    noClick,
    divider,
}) => {
    const onClick = itm => {
        if(listItemClick) {
            listItemClick(itm.value ? itm.value : null);
            if(closeMenu) {
                closeMenu();
            }
        }
    }
    const onTitleTitle = () => {
        if(onClickTitle) {
            onClickTitle(value);
            closeMenu();
        }
    }
    return ( 
        divider ? 
        <div className="list-divider" /> :
        <div className="opt">
            <div 
                onClick={noClick ? null : onTitleTitle}
                className={
                    "opt-ttl " + 
                    (data && data.length > 0 ? ' has-list ' : '') + 
                    (valueType === 'boolean' && savedTitleValue ? ' selected ' : '') + 
                    (noClick ? ' noClick ' : '') + 
                    (savedTitleValue && value === savedTitleValue ? ' selected ' : '')
                }>{title}</div>
            {data && (
                <div className="opt-list">
                    {data.map((opt, idx) => 
                        <div 
                            onClick={() => onClick(opt)}
                            className={"opt-list-item " + (listValue && opt.value === listValue ? 'selected' : '')}
                            key={'tll-menu-' + menuIndex + idx}>
                            {opt.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MenuItem;