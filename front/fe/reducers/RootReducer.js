import {combineReducers} from 'redux';
import MainPageReducer from './MainPageReducer';
import SidebarReducer from './SidebarReducer';
import IngridientReducer from './IngridientReducer';
import ErrorReducer from './ErrorReducer';
import CreateReceptReducer from './CreateReceptReducer';
import HeaderButtonsReducer from "./HeaderButtonsReducer";

const RootReducer = combineReducers(Object.assign({},
    SidebarReducer,
    MainPageReducer,
    IngridientReducer,
    ErrorReducer,
    CreateReceptReducer,
    HeaderButtonsReducer
));

export default RootReducer;
