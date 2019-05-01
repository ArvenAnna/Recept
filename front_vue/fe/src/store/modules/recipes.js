import http from '../../HttpService'
import routes from '../../constants/routes'
// initial state
// shape: [{ id, quantity }]
const state = {
    items: []
}

// getters
const getters = {
}

// actions
const actions = {
    getRecipesByDepartment ({ commit }, id) {
        http.doGet(routes.RECIPES_BY_DEPARTMENT(id)).then((recipes) => commit('setRecipes', recipes))
    }
}

// mutations
const mutations = {
    setRecipes (state, recipes) {
        state.items = recipes
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
