import http from '../../HttpService'
import routes from '../../constants/routes'
// initial state
// shape: [{ id, quantity }]
const state = {
    recipe: {},
    error: '',
    loading: false
}

// getters
const getters = {
}

// actions
const actions = {
    getRecipe ({ commit }, id) {
        return http.doGet(routes.RECIPE(id)).then((recipe) => commit('setRecipe', recipe))
    },
    updateRecipe ({ commit }, recipe) {
        commit('setLoadingStart')
        return http.doPut(routes.RECIPE_MODIFY, recipe)
            .then(recipe => commit('setRecipe', recipe))
            .catch(e => commit('setError', e.error))
            .then(() => commit('setLoadingStop'))
    },
    updateRecipePhoto ({ commit }, updateRecipeRequest) {
        commit('setLoadingStart')
        return http.sendFile(routes.FILE, updateRecipeRequest.file).then(f => {
            updateRecipeRequest.recipe.imgPath = f.path
            return http.doPut(routes.RECIPE_MODIFY, updateRecipeRequest.recipe)
                .then((recipe) => commit('setRecipe', recipe))
                // .catch((e) => {
                //     commit('setError', e.error)
                // })
                // .then(() => commit('setLoadingStop'))
        }).catch(e => commit('setError', e.error))
            .then(() => commit('setLoadingStop'))
    },
    createRecipe ({ commit }, recipe) {
        commit('setLoadingStart')
        return http.doPost(routes.RECIPE_MODIFY, recipe)
            .then((recipe) => commit('setRecipe', recipe))
            .catch(e => commit('setError', e.error))
            .then(() => commit('setLoadingStop'))
    }
}

// mutations
const mutations = {
    setRecipe (state, recipe) {
        state.recipe = recipe
    },
    setLoadingStart (state) {
        state.error = ''
        state.loading = true
    },
    setLoadingStop (state) {
        state.loading = false
    },
    setError (state, error) {
        state.error = error.message
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
