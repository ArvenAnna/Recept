import {ADD_HEADER_BUTTON, REMOVE_HEADER_BUTTON} from "../constants/ActionTypes";

const items = [
    {'name': "Новый рецепт", 'id': 1, 'to': '/newRecept'},
    {'name': 'Ингридиенты', 'id': 2, 'to': '/ingridients'},
    // {'name': 'Записная книжка', 'id': 3},
    // {'name': 'Создать из XML', 'id': 4}
];

const buttonsReducer = (state = items, action) => {
    let existingButton;
    switch (action.type) {
        case ADD_HEADER_BUTTON:
            existingButton = state.find(item => item.name == action.button.name);
            return existingButton ? state : [...state, action.button];
        case REMOVE_HEADER_BUTTON:
            existingButton = state.find(item => item.name == action.button.name);
            if (!existingButton) {
                return state;
            }
            const index = state.indexOf(existingButton);
            const newState = [...state];
            newState.splice(index, 1);
            return newState;
        default:
            return state;
    }
}

const HeaderButtonsReducer = {
    headerButtons: buttonsReducer
}

export default HeaderButtonsReducer;