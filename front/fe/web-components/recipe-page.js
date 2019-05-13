const template = document.createElement('template');
template.innerHTML = `
  <style>
    #recipe_page {
        display: grid;
        grid-template-columns: 1fr auto auto;
    }
    
    .recipe_page_caption {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
        text-align: center;
        font-size: 1.6rem;
        width: 100%;
        background-color: var(--content-color, black);
        margin: 0 0 20px 0;
        box-shadow: var(--shadow);
        color: var(--text-color, white);
    }
    
    .recipe_page_proportions {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
        padding: 0 1rem;
    }
    
    .recipe_page_main_photo {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;

        width: 100%;
    }
    
    .recipe_page_description {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 3;
        grid-row-end: 4;

        padding: 0.5rem 0;
        font-size: 1.1rem;
        text-align: justify;
        color: var(--text-color, white);
        font-weight: 600;
    }
    
    .recipe_page_refs {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;

        display: flex;
        flex-direction: column;
        cursor: pointer;
    }
    
    .recipe_page_refs_name {
      text-align: center;
      padding: 5px;
      color: var(--text-color, white);
      font-size: medium;
      font-weight: 600;
    }
    
    .recipe_ref_photo {
        width: 5rem;
    }
    
  </style>
  
  <template id='recipe_ref_template'>
    <recipe-link>
        <img src='svg/dish-fork-and-knife.svg' class='recipe_ref_photo'/>
        <div class='recipe_page_refs_name'/>
    </recipe-link>
  </template>
  
  <template id='recipe_template'>
       <div class='recipe_page_caption'></div>
       <div class='recipe_page_proportions'>
          <recipe-list-items/>
       </div>      
       <img src='svg/dish-fork-and-knife.svg' class='recipe_page_main_photo'/>
       <div class='recipe_page_description'></div>  
       <div class='recipe_page_refs'></div>
  </template>
  
  <div id='recipe_page'></div>
`;

const supportedAttributes = {
    ID: 'recipe-id'
}

class RecipePage extends HTMLElement {
    $(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector)
    }

    set recipe(newRecipe) {
        // readonly
        this.$recipe = newRecipe;
        this.setAttribute(supportedAttributes.ID, newRecipe.id);
        this.renderPage();
    }

    constructor() {
        super();

        this.renderPage = this.renderPage.bind(this);
        const root = this.attachShadow({mode: 'open'});
        root.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.renderPage();
    }

    renderPage() {
        this.$('#recipe_page').innerHTML = ""; // clear all content
        // TODO: check if recipe changed to rerender only
        if (this.$recipe) {

            const template = this.$('#recipe_template').content.cloneNode(true);

            template.querySelector('.recipe_page_caption').innerHTML = this.$recipe.name;

            const proportionListEl = template.querySelector('recipe-list-items');
            proportionListEl.items = this.$recipe.proportions;

            proportionListEl.renderItem = (item) => `
                <div key='name'>${item.ingredientName}</div>
                <div key='separator'>&nbsp;-&nbsp;</div>
                <div key='norma'>${item.norma || ''}</div>
            `;

            if (this.$recipe.imgPath) {
                template.querySelector('.recipe_page_main_photo').src =  this.$recipe.imgPath;
            }

            if (this.$recipe.text) {
                template.querySelector('.recipe_page_description').innerHTML = this.$recipe.text;
            }

            if (this.$recipe.refs) {
                this.$recipe.refs.forEach(ref => {
                    const refTemplate = this.$('#recipe_ref_template').content.cloneNode(true);
                    refTemplate.querySelector('recipe-link').setAttribute('path', `/recipe/${ref.id}`);
                    if (ref.imgPath) {
                        refTemplate.querySelector('.recipe_ref_photo').src = ref.imgPath;
                    }
                    refTemplate.querySelector('.recipe_page_refs_name').src = ref.name;
                    template.querySelector('.recipe_page_refs').appendChild(refTemplate);
                })
            }


            this.$('#recipe_page').appendChild(template);
        }
    }

}

customElements.define('recipe-page', RecipePage);