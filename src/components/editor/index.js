import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools"
import { connect } from 'react-redux';
import { updateCode } from '../../store/actions/code-action';
import { selectCodeData, selectSettings } from '../../store/selectors';

const Editor = ({
    codeData,
    updateCode,
    settings,
}) => (
    <div>
        <AceEditor 
            width={'100%'}
            wrapEnabled={settings.wrapLine}
            value={codeData}
            onChange={updateCode}
            showPrintMargin={false}
            fontSize={settings.fontSize}
            tabSize={settings.tabSize}
            enableSnippets={true}
            height={window.innerHeight - 62}
            mode={'javascript'} 
            theme={'xcode'} />
    </div>
)

const mapStateToProps = state => ({
    codeData: selectCodeData(state),
    settings: selectSettings(state),
});
export default connect(
    mapStateToProps,
    {updateCode},
)(Editor);