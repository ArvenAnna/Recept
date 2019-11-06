const httpPrefix = '/api';

const routes = {
    GET_DEPARTMENTS: `${httpPrefix}/departs`,
    SEARCH_RECIPES: (searchUrl) => `${httpPrefix}/recipes${searchUrl}`,
    SEARCH_RECIPES_PAGEABLE: (searchUrl) => `${httpPrefix}/recipes/page${searchUrl}`,
    GET_RECIPE: (recipe) => `${httpPrefix}/recipes/${recipe}`,
    INGREDIENTS: `${httpPrefix}/ingredients`,
    GET_INGREDIENT: (ingredient) => `${httpPrefix}/ingredients/${ingredient}`,
    GET_TAGS: httpPrefix + '/tags',

    GET_RECIPES_BY_KEYWORD: `${httpPrefix}/recipes/keyword`,
    GET_RECIPES_BY_IDS: `${httpPrefix}/recipes/ids`,
    GET_INGREDIENTS_BY_KEYWORD: `${httpPrefix}/ingredients/keyword`,
    GET_INGREDIENTS_BY_IDS: `${httpPrefix}/ingredients/ids`,

    POST_CREATE_RECIPE: httpPrefix + '/recipes',

    UPLOAD_FILE: httpPrefix + '/file',

    GET_TRANSLATION: (context, bundle) => `/translations/${context}/${bundle}.json`,

    IMAGE_CATALOG: `/${process.env.FOTO_CATALOG}/`,
    TEMP_CATALOG: `/${process.env.TEMP_CATALOG}/`,
    PREVIEW_IMAGE_PREFIX: process.env.PREVIEW_IMAGE_PREFIX
};

export const getImageSmallCopy = (imgPath) => {
    if (!imgPath) return null;
    const imgPathParts = imgPath.split('.');
    const extension = `.${imgPathParts[imgPathParts.length - 1]}`;
    imgPathParts.splice(imgPathParts.length - 1, 1, `${routes.PREVIEW_IMAGE_PREFIX}${extension}`);
    return imgPathParts.join('');
}

export default routes;
