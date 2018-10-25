<template>
  <section class="menu">
    <create-recipe-popup
      :class="{shown: createRecipePopupOpened}"/>
    <div class="menu__center">
      <div
        v-show="!isMenuVisible"
        class="icon icon__menu"
        @click="openMenu()"
        v-html="require('./../../assets/svg/menu.svg')"/>
      <div
        v-show="isMenuVisible"
        class="icon icon__menu"
        @click="closeMenu()"
        v-html="require('./../../assets/svg/close.svg')"/>
      <div class="menu__header">CookingBook</div>
      <div @click="openPopup">create new recipe</div>
    </div>
  </section>
</template>

<script>

import './menu.less'
import { mapState } from 'vuex'
import CreateRecipePopup from '../create-recipe-popup/CreateRecipePopup.vue'

export default {
    components: {
        CreateRecipePopup
    },
    computed: {
        ...mapState({
            isMenuVisible: state => state.menu.isMenuVisible,
            createRecipePopupOpened: state => state.menu.createRecipePopupOpened
        })
    },
    methods: {
        openMenu () {
            this.$store.dispatch('menu/openMenu')
        },
        closeMenu () {
            this.$store.dispatch('menu/closeMenu')
        },
        openPopup () {
            this.$store.dispatch('menu/openCreateRecipePopup')
        }
    }
}
</script>
