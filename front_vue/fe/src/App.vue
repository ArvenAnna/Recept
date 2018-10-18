<template>
  <div class="full-width center-content">
    <menu-component/>
    <div class="content">
      <side-menu-component v-show="isMenuVisible"/>
    </div>
    <div>
      Cookbook: the best recipes
    </div>
  </div>
</template>

<script>
import './app.less'
import MenuComponent from './components/menu/MenuComponent.vue'
import SideMenuComponent from './components/side-menu/SideMenuComponent.vue'
import { mapState } from 'vuex'

export default {
    components: {
        SideMenuComponent,
        MenuComponent
    },
    computed: {
        ...mapState({
            isMenuVisible: state => state.menu.isMenuVisible
        })
    }
}
</script>
