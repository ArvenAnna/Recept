// initial state
const state = {
    isMenuVisible: false,
    createRecipePopupOpened: false
}

// getters
const getters = {
}

// actions
const actions = {
    openMenu ({ commit }) {
        commit('triggerMenu', true)
    },
    closeMenu ({ commit }) {
        commit('triggerMenu', false)
    },
    openCreateRecipePopup ({ commit }) {
        commit('triggerCreateRecipePopup', true)
    },
    closeCreateRecipePopup ({ commit }) {
        commit('triggerCreateRecipePopup', false)
    }
}

// mutations
const mutations = {
    triggerMenu (state, open) {
        state.isMenuVisible = open
    },
    triggerCreateRecipePopup (state, open) {
        state.createRecipePopupOpened = open
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
