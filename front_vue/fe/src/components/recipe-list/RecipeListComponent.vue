<template>
  <div>
    <div
      v-for="recipe in recipes"
      :key="recipe.id">{{ recipe.name }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'RecipeList',
    computed: {
        ...mapState({
            recipes: state => state.recipes.items
        })
    },
    mounted: function () {
        this.getRecipesByDepartment(this.$route.params.id)
    },
    methods: {
        getRecipesByDepartment (id) {
            this.$store.dispatch('recipes/getRecipesByDepartment', id)
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.getRecipesByDepartment(to.params.id)
        next()
        // react to route changes...
        // don't forget to call next()
    }
}
</script>
