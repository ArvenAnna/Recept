import {
    ADD_RECEPT_PROPORTION,
    ADD_TAG,
    COPY_RECEPT,
    REMOVE_RECEPT_PROPORTION,
    SET_RECEPT_DEPARTMENT,
    SET_RECEPT_NAME,
    SET_RECEPT_TEXT,
    SET_TAGS,
    REMOVE_TAG,
    ADD_REF,
    REMOVE_REF,
    SET_CREATED_RECEPT,
    SET_FILE_PATH, ADD_DETAIL, REMOVE_DETAIL, REMOVE_FOTO
} from "../constants/ActionTypes";

const receptReducer = (state = {}, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case COPY_RECEPT:
            newState = Object.assign({}, action.recept);
            break;
        case SET_RECEPT_NAME:
            newState.name = action.name;
            break;
        case SET_RECEPT_DEPARTMENT:
            newState.department = {id: action.id};
            break;
        case SET_RECEPT_TEXT:
            newState.text = action.text;
            break;
        case ADD_RECEPT_PROPORTION:
            const newProportion = {
                norma: action.norma,
                ingridient: action.ingridient
            };
            if (!state.proportions) {
                newState.proportions = [newProportion];
            } else {
                newState.proportions = [...state.proportions, newProportion];
            }
            break;
        case REMOVE_RECEPT_PROPORTION:
            newState.proportions = state.proportions.filter(item =>
            item.norma != action.proportion.norma || item.ingridient.id != action.proportion.ingridient.id);
            break;
        case ADD_TAG:
            if (!state.tags) {
                newState.tags = [action.tag];
            } else {
                newState.tags = [...state.tags, action.tag];
            }
            break;
        case REMOVE_TAG:
            newState.tags = state.tags.filter(item => item.id != action.tag.id);
            break;
        case ADD_REF:
            if (!state.refs) {
                newState.refs = [action.ref];
            } else {
                newState.refs = [...state.refs, action.ref];
            }
            break;
        case REMOVE_REF:
            newState.refs = state.refs.filter(item => item.id != action.ref.id);
            break;
        case ADD_DETAIL:
            const newDetail = {
                description: action.text,
                filePath: action.path
            };
            if (!state.details) {
                newState.details = [newDetail];
            } else {
                newState.details = [...state.details, newDetail];
            }
            break;
        case REMOVE_DETAIL:
            newState.details = state.details.filter(item =>
            item.filePath != action.filePath);
            break;
        case SET_FILE_PATH:
            newState.imgPath = action.filePath;
            break;
        case REMOVE_FOTO:
            newState.imgPath = null;
            break;
        default:
            return state;
    }
    return newState;
}

const tagsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_TAGS:
            return action.tags;
        default:
            return state;
    }
}

const createdReceptReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_CREATED_RECEPT:
            return action.id;
        default:
            return state;
    }
}

const CreateReceptReducer = {
    newRecept: receptReducer,
    tags: tagsReducer,
    successfullyCreatedRecept: createdReceptReducer
}

export default CreateReceptReducer;


