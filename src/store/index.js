import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);
export {store, persistor};