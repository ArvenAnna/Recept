// initial state
const state = {
    isMenuVisible: false
}

// getters
const getters = {
}

// actions
const actions = {
    openMenu ({ commit, state }) {
        commit('triggerMenu', true)
    },
    closeMenu ({ commit }) {
        commit('triggerMenu', false)
    }
}

// mutations
const mutations = {
    triggerMenu (state, open) {
        state.isMenuVisible = open
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
