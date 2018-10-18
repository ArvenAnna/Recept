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
    getAllDepartments ({ commit }) {
        http.doGet(routes.DEPARTMENTS, (departments) => commit('setDepartment', departments))
    }
}

// mutations
const mutations = {
    setDepartment (state, departments) {
        state.items = departments
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
