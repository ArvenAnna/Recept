import {combineReducers} from 'redux';
import MainPageReducer from './MainPageReducer';
import SidebarReducer from './SidebarReducer';
import IngridientReducer from './IngridientReducer';
import CreateReceptReducer from './CreateReceptReducer';
import HeaderButtonsReducer from "./HeaderButtonsReducer";

const RootReducer = combineReducers(Object.assign({},
    SidebarReducer,
    MainPageReducer,
    IngridientReducer,
    CreateReceptReducer,
    HeaderButtonsReducer
));

export default RootReducer;
