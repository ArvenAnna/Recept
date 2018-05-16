const httpPrefix = '/api';

let FOTO_CATALOG;
let TEMP_CATALOG;

const routes = {
    GET_DEPARTMENTS: httpPrefix + '/departs.req',
    GET_RECEPTS: (departId) => `${httpPrefix}/recept_list.req?departId=${departId}`,
    GET_RECEPT: (receptId) => `${httpPrefix}/recept.req?receptId=${receptId}`,
    GET_INGRIDIENTS: httpPrefix + '/ing_list.req',
    GET_TAGS: httpPrefix + '/tags.req',

    POST_INGRIDIENTS: httpPrefix + '/ingridient.req',
    POST_CREATE_RECEPT: httpPrefix + '/recept.req',

    UPLOAD_FILE: httpPrefix + '/file.req',
    DELETE_TEMP_FILE: (fileUrl) => `${httpPrefix}/${fileUrl}/file.req`,

    // IMAGE_CATALOG: '/foto/',
    // TEMP_CATALOG: '/tempfiles/',

    IMAGE_CATALOG: `/${FOTO_CATALOG}/`,
    TEMP_CATALOG: `/${TEMP_CATALOG}/`

};

export default routes;