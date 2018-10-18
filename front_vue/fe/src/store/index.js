import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import departments from './modules/departments'
import menu from './modules/menu'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        departments,
        menu
    },
    // strict: debug,
    plugins: [createLogger()]
})
