const routes = {
    GET_DEPARTMENTS: '/departs.req',
    GET_RECEPTS: (departId) => `/recept_list.req?departId=${departId}`,
    GET_RECEPT: (receptId) => `/recept.req?receptId=${receptId}`,
    GET_INGRIDIENTS: '/ing_list.req',
    GET_TAGS: '/tags.req',

    POST_INGRIDIENTS: '/ingridient.req',
    POST_CREATE_RECEPT: '/recept.req',

    UPLOAD_FILE: '/file.req',

    IMAGE_CATALOG: '/foto/'
};

export default routes;