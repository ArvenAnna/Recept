import Vue from 'vue'
import App from './App.vue'
import RecipeListComponent from './pages/recipe-list/RecipeListComponent.vue'
import AppContainer from './pages/app-container/AppContainer.vue'
import StartPage from './pages/start-page/StartPage.vue'
import store from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const RecipeViewComponent = () => import('./pages/recipe-view/RecipeViewComponent.vue')

const routes = [
    { path: '/',
        component: AppContainer,
        children: [
            { path: '', component: StartPage },
            { path: 'departments/:id/recipes', component: RecipeListComponent },
            { path: 'recipes/:id', component: RecipeViewComponent }
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
