import React, { useEffect } from 'react';
import Header from './header';
import SplitPane from 'react-split-pane';
import Editor from './editor';
import { Provider, connect } from 'react-redux';
import { store, persistor } from '../store';
import Viewer from './viewer';
import { PersistGate } from 'redux-persist/integration/react';
import { selectSettings } from '../store/selectors';
import { utils } from '../services/utils';
import { updateLoadLibraryFlag } from '../store/actions/settings-actions';

const AppRoot = ({
    updateLoadLibraryFlag,
    settings: {
        librariesLoaded,
        libraries,
    },
}) => {
    useEffect(() => {
        initLibraries(); 
    }, [libraries]);

    // useEffect(() => {
    //     initLibraries()
    // }, []);

    const initLibraries = async () => {
        if(libraries && libraries.length > 0) {
            console.log('loading');
            updateLoadLibraryFlag(false);
            const res = await utils.loadLibraries(libraries);
            console.log('loaded');
            updateLoadLibraryFlag(true);
        } else {
            updateLoadLibraryFlag(true);
        } 
    }
    // const [loaded, setLoaded] = useState(false);

    return (
        <div className="app-root">
            <Header />
            <div className="app-content">
                <SplitPane 
                    split="vertical" 
                    minSize={300} 
                    defaultSize={window.innerWidth / 2}>
                    <div>
                        <Editor />
                    </div>
                    <div>
                        {librariesLoaded && (
                            <Viewer />
                        )}
                    </div>
                </SplitPane>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    settings: selectSettings(state),
});

const AppRootComponent = connect(
    mapStateToProps,
    {updateLoadLibraryFlag},
)(AppRoot);



const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRootComponent />
        </PersistGate>
    </Provider>
)

export default App;