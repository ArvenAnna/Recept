<template>
  <div>
    <div
      v-show="!editState.name"
      @dblclick="changeEdit('name')">{{ recipe.name }}</div>
    <input
      v-show="editState.name"
      v-model="recipe.name"
      @dblclick="updateRecipe('name')">

    <div
      v-show="!editState.text"
      @dblclick="changeEdit('text')">{{ recipe.text }}</div>
    <textarea
      v-show="editState.text"
      v-model="recipe.text"
      @dblclick="updateRecipe('text')"/>
    <button
      v-show="!editState.text && !recipe.text"
      @click="changeEdit('text')">add recipe description</button>

    <img
      :src="recipe.imgPath"
      @dblclick="changeEdit('imgPath')">
    <input
      type="file"
      @change="onFileChange">

    <div
      v-for="proportion in recipe.proportions"
      :key="proportion.ingredientId + proportion.ingredientName"
      @dblclick="changeEdit('text')">{{ proportion.ingredientName }} - {{ proportion.norma }}</div>

    <input
      v-model="proportion.ingredientName"
      v-bind="proportion">
    <input
      v-model="proportion.norma"
      v-bind="proportion">
    <button @click="addProportion">add new proportion</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'RecipeViewComponent',
    data: function () {
        return {
            editState: {
                name: false,
                text: false
            },
            proportion: {
                id: 4,
                ingredientId: 3,
                ingredientName: 'ggg',
                norma: 'gggg'
            }
        }
    },
    computed: {
        ...mapState({
            recipe: state => state.recipe.recipe
        })
    },
    created: function () {
        this.getRecipe(this.$route.params.id)
    },
    methods: {
        getRecipe (id) {
            this.$store.dispatch('recipe/getRecipe', id)
        },
        updateRecipe (field) {
            this.$store.dispatch('recipe/updateRecipe', this.recipe)
            this.changeEdit(field)
        },
        changeEdit (field) {
            if (field && this.editState.hasOwnProperty(field)) {
                this.editState[field] = !this.editState[field]
            }
        },
        onFileChange (e) {
            const files = e.target.files || e.dataTransfer.files
            if (!files.length) {
                return
            }
            const updateRecipeRequest = {
                recipe: this.recipe,
                file: files[0]
            }
            this.$store.dispatch('recipe/updateRecipePhoto', updateRecipeRequest)
        },
        addProportion () {
            console.dir(this.proportion)
            // TODO
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.getRecipe(to.params.id)
        next()
    }
}
</script>
