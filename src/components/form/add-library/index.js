import React, { useState } from 'react';
import './add-lib.sass';
import Modal, { Footer } from '../../common/modal';
import { Button, Input } from './../../../lib';
import { connect } from 'react-redux';
import { addLibraries, removeLibraries } from '../../../store/actions/settings-actions';

const AddLibrary = ({
    mode,
    data,
    addLibraries,
    onClose,
    removeLibraries,
}) => {
    const [libUrl, setLibUrl] = useState('');
    const onAdd = () => {
        const d = {
            name: libUrl.split('/').pop(),
            src: libUrl,
            id: new Date().toISOString(),
        };
        if(libUrl && libUrl.length > 0) {
            addLibraries(d);
            onClose();
        }
        
    }
    const onRemove = lib => {
        if(removeLibraries) {
            removeLibraries(lib);
        }
    }
    return (
        <Modal 
            title={`${mode === 'add' ? 'Add' : 'Manage'} Library`} 
            onClose={onClose}>
            {mode === 'add' ? (
                <div>
                    <Input 
                        onChange={(e) => setLibUrl(e.target.value)} 
                        value={libUrl}
                        placeholder={'http://'}/>
                </div>
            ) : (
                <div className="manage-lib">
                    {data && data.map((lib, idx) =>
                        <div className="lib-item" key={lib.id}>
                            <div className="idx">{idx + 1}</div>
                            <div className="name">{lib.name}</div>
                            <a className="link" href={lib.src} target="_blank">{lib.src}</a>
                            <div className="actions">
                                <Button onClick={() => onRemove(lib)}>Delete</Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {mode === 'add' && (
                <Footer>
                    <Button filled onClick={onAdd}>Add Library</Button>
                </Footer>
            )}
        </Modal>
    )
}
export default connect(
    null,
    {addLibraries, removeLibraries},
)(AddLibrary);