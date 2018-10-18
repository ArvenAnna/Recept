import Vue from 'vue'
import App from './App.vue'
import store from './store'

/* eslint-disable-next-line no-new */
new Vue({
    el: '#mount',
    store,
    render: h => h(App)
})
