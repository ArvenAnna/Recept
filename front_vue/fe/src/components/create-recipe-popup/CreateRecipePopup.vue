<template>
  <div class="create_recipe_popup">
    Enter the name:
    <input v-model="recipe.name">
    Select department:
    <select
      v-if="departments && departments.length"
      v-model="recipe.department">
      <option
        v-for="department in departments"
        :key="department.id"
        :value="department">{{ department.name }}</option>
    </select>

    <button
      v-show="!isCreated"
      @click="createRecipe">create</button>
    <button
      v-show="isCreated"
      @click="closePopup">close popup</button>
    <button v-show="isCreated"><router-link to="{path: `/recipes/${recipeId}`}">go to new recipe</router-link></button>

  </div>
</template>

<script>
import './createRecipePopup.less'
import { mapState } from 'vuex'

export default {
    name: 'CreateRecipePopup',
    data: function () {
        return {
            recipe: {
                name: null,
                department: null
            },
            isCreated: false
        }
    },
    computed: {
        ...mapState({
            departments: state => state.departments.items,
            recipeId: state => state.recipe.recipe.id
        })
    },
    methods: {
        closePopup () {
            this.isCreated = false
            this.$store.dispatch('menu/closeCreateRecipePopup')
        },
        createRecipe () {
            if (this.recipe.name && this.recipe.department && this.recipe.department.id) {
                this.$store.dispatch('menu/createRecipe', this.recipe).then(() => {
                    this.isCreated = true
                })
            }
        }
    }
}
</script>
