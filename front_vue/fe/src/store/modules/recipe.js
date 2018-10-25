import http from '../../HttpService'
import routes from '../../constants/routes'
// initial state
// shape: [{ id, quantity }]
const state = {
    recipe: {}
}

// getters
const getters = {
}

// actions
const actions = {
    getRecipe ({ commit }, id) {
        http.doGet(routes.RECIPE(id), (recipe) => commit('setRecipe', recipe))
    },
    updateRecipe ({ commit }, recipe) {
        http.doPut(routes.RECIPE_MODIFY, recipe, (recipe) => commit('setRecipe', recipe))
    },
    updateRecipePhoto ({ commit }, updateRecipeRequest) {
        http.sendFile(routes.FILE, updateRecipeRequest.file).then(f => {
            updateRecipeRequest.recipe.imgPath = f.path
            http.doPut(routes.RECIPE_MODIFY, updateRecipeRequest.recipe, (recipe) => commit('setRecipe', recipe))
        })
    },
    createRecipe ({ commit }, recipe) {
        http.doPost(routes.RECIPE_MODIFY, recipe, (recipe) => commit('setRecipe', recipe))
    }
}

// mutations
const mutations = {
    setRecipe (state, recipe) {
        state.recipe = recipe
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
