import React, { useState } from 'react';
import './styles/toolbar.sass';
import MenuItem from './menu-item';
import { saveFontSize, saveTabSize, saveWrapLine } from '../../store/actions/settings-actions';
import { connect } from 'react-redux';
import { selectSettings } from '../../store/selectors';
import AddLibrary from '../form/add-library';
const Toolbar = ({
    saveFontSize,
    saveTabSize,
    settings: {
        fontSize,
        tabSize,
        wrapLine,
        libraries = [],
    },
    saveWrapLine,
}) => {
    const [addLibrary, setAddLibrary] = useState(false);
    const closeAddLibrary = () => {
        if(addLibrary === 'manage') window.location.reload();
        setAddLibrary(false);
    }
    const bindLibaries = () => {
        if(libraries.length > 0) {
            return libraries.map((itm) => {
                const d = {
                    title: itm.name,
                    noClick: true
                }
                return d;
            });
        }
        return [];
    }
    const menu = [
        {
            title: 'Format',
            list: [
                {
                    title: 'Font Size',
                    listItemClick: saveFontSize,
                    listValue: fontSize,
                    list: [
                        {title: '10', value: 10},
                        {title: '11', value: 11},
                        {title: '12', value: 12},
                        {title: '13', value: 13},
                        {title: '14', value: 14},
                        {title: '15', value: 15},
                        {title: '16', value: 16},
                        {title: '17', value: 17},
                        {title: '18', value: 18},
                        {title: '19', value: 19},
                        {title: '20', value: 20},
                        {title: '21', value: 21},
                    ]
                },
                {
                    title: 'Tab Size',
                    listItemClick: saveTabSize,
                    listValue: tabSize,
                    list: [
                        {title: '2', value: 2},
                        {title: '4', value: 4},
                        {title: '6', value: 6},
                    ]
                },
                {
                    title: 'Wrap Line',
                    savedTitleValue: wrapLine,
                    value: !wrapLine,
                    valueType: 'boolean',
                    onClick: saveWrapLine,
                }
            ]
        },
        {
            title: 'Libraries',
            listStyle: {minWidth: 210},
            list: [
                {
                    onClick: () => setAddLibrary('add'),
                    value: true,
                    title: 'Load Library',
                },
                {
                    onClick: () => setAddLibrary('manage'),
                    value: true,
                    title: 'Manage Libraries',
                },
                {divider: true},
                ...bindLibaries(),
            ]
        }
    ]
    return (
        <div className="h-toolbar">
            {menu.map((mn, idx) =>
                <MenuItem  
                    title={mn.title} 
                    listStyle={mn.listStyle}
                    index={idx} 
                    data={mn.list}
                    key={'tll-br-' + idx}/>
            )}
            {addLibrary && (
                <AddLibrary 
                    data={libraries}
                    mode={addLibrary}
                    onClose={() => closeAddLibrary()}/>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    settings: selectSettings(state),
});

export default connect(
    mapStateToProps,
    {saveFontSize, saveTabSize, saveWrapLine},
)(Toolbar);