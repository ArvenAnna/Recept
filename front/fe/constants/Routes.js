const httpPrefix = '/api';

const routes = {
    GET_DEPARTMENTS: httpPrefix + '/departs',
    GET_RECIPES: (departId) => departId ? `${httpPrefix}departs/${departId}/recipes`: `${httpPrefix}recipes`,
    GET_RECIPE: (recipe) => `${httpPrefix}/recipe/${recipe}`,
    GET_INGREDIENTS: httpPrefix + '/ingredients',
    GET_TAGS: httpPrefix + '/tags',

    POST_INGREDIENTS: httpPrefix + '/ingredient',
    POST_CREATE_RECIPE: httpPrefix + '/recipe',

    UPLOAD_FILE: httpPrefix + '/file',

    IMAGE_CATALOG: `/${process.env.FOTO_CATALOG}/`,
    TEMP_CATALOG: `/${process.env.TEMP_CATALOG}/`

};

export default routes;