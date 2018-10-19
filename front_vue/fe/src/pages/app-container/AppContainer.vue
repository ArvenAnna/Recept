<template>
  <div class="application">
    <menu-component/>
    <div class="content">
      <side-menu-component v-show="isMenuVisible"/>
      <div class="content_router">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import './app-container.less'
import MenuComponent from '../../components/menu/MenuComponent.vue'
import SideMenuComponent from '../../components/side-menu/SideMenuComponent.vue'
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

<style scoped>

</style>
