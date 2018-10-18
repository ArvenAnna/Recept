<template>
  <section class="menu">
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
    </div>
  </section>
</template>

<script>

import './menu.less'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            isMenuVisible: state => state.menu.isMenuVisible
        })
    },
    methods: {
        openMenu () {
            this.$store.dispatch('menu/openMenu')
        },
        closeMenu () {
            this.$store.dispatch('menu/closeMenu')
        }
    }
}
</script>
