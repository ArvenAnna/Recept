<template>
  <section class="side-menu">
    <ul
      v-show="departments.length"
      class="side-menu__list">
      <li
        v-for="department in departments"
        :key="department.id"
        class="side-menu__list-item">
        <router-link :to="{path: `/departments/${department.id}/recipes`}">
          {{ department.name }}
        </router-link>
      </li>
    </ul>
    <div v-show="!departments.length">loading ...</div>
  </section>
</template>

<script>

import './sideMenu.less'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            departments: state => state.departments.items
        })
    },
    created: function () {
        this.getAllDepartments()
    },
    methods: {
        getAllDepartments () {
            this.$store.dispatch('departments/getAllDepartments')
        }
    }
}

</script>
