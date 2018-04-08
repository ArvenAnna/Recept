import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import RootReducer from './reducers/RootReducer';

const loggerMiddleware = createLogger();

function configureStore(initialState) {
    return createStore(
        RootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}
let store = configureStore();
export default store;