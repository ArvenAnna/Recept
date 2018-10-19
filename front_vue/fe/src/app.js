import Vue from 'vue'
import App from './App.vue'
import RecipeListComponent from './components/recipe-list/RecipeListComponent.vue'
import AppContainer from './pages/app-container/AppContainer.vue'
import StartPage from './pages/start-page/StartPage.vue'
import store from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/',
        component: AppContainer,
        children: [
            { path: '', component: StartPage },
            { path: 'departments/:id/recipes', component: RecipeListComponent },
            { path: 'recipe/:id', component: RecipeListComponent }
        ] }
]

const router = new VueRouter({
    routes
})

/* eslint-disable-next-line no-new */
new Vue({
    el: '#mount',
    store,
    router,
    render: h => h(App)
})
