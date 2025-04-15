const domain = "https://mmd2-api.r-dalsgaard.dk/";
const endPoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "?acf_format=standard";
const getRealImageUrlsPlus = "&acf_format=standard";

const paramsString = window.location.search;
const searchParam = new URLSearchParams(paramsString);
const slug = searchParam.get("slug");

const singleRecipeEl = document.querySelector(".singleRecipe");

fetch(domain + endPoint + "?slug=" + slug + getRealImageUrlsPlus)
.then(res => res.json())
.then(data => {
    console.log('data:', data);
    renderSingleRecipe(data);
})
.catch(err => console.log(err))

function renderSingleRecipe(data){
    data.forEach(recipe => {
        const newRecipeTitel = document.createElement("h1");
        newRecipeTitel.textContent = recipe.acf.titel;

        const newRecipeImage = document.createElement("img");
        newRecipeImage.src = recipe.acf.picture.sizes.large;
        
        const recipeIngredientList = document.createElement("ul");
        const recipeProcedure = document.createElement("ol");
        
        recipeIngredientList.classList.add("primaryIngredienseList");
        Object.entries(recipe.acf.primary_ingredients).forEach(([key, value]) => {
            if(value !== ""){
                const ingredientItem = document.createElement("li");
                ingredientItem.textContent = value;
                
                ingredientItem.addEventListener("click", () => {
                    ingredientItem.classList.toggle("checker");
                })
                
                recipeIngredientList.append(ingredientItem);
            }
        })
        
        const secondaryIngrediense = Object.values(recipe.acf.secondary_ingredients).some(val => val.trim() !== "");
        console.log('secondaryIngrediense:', secondaryIngrediense);
        let secondaryList;
        if(secondaryIngrediense){
            const secondaryIngredienseList = document.createElement("ul");
            secondaryList = secondaryIngredienseList;
            secondaryIngredienseList.classList.add("secondaryIngredienseList");
            Object.entries(recipe.acf.secondary_ingredients).forEach(([key, value]) => {
                if(value !== ""){
                    const secondaryIngredienses = document.createElement("li");
                    secondaryIngredienses.textContent = value;
                    
                    secondaryIngredienses.addEventListener("click", () => {
                        secondaryIngredienses.classList.toggle("checker");
                    })
                    secondaryIngredienseList.append(secondaryIngredienses);
                }
            })
        }
        
        const tertiaryIngrediense = Object.values(recipe.acf.tertiary_ingredients).some(val => val.trim() !== "");
        console.log('tertiaryIngrediense:', tertiaryIngrediense);
        let tertiaryList;
        if(tertiaryIngrediense){
            const tertiaryIngredienseList = document.createElement("ul");
            tertiaryList = tertiaryIngredienseList;
            tertiaryIngredienseList.classList.add("tertiaryIngredienseList");
            Object.entries(recipe.acf.tertiary_ingredients).forEach(([key, value]) => {
                if(value !== ""){
                    const tertiaryIngredienses = document.createElement("li");
                    tertiaryIngredienses.textContent = value;
                    
                    tertiaryIngredienses.addEventListener("click", () => {
                        tertiaryIngredienses.classList.toggle("checker");
                    })
                    tertiaryIngredienseList.append(tertiaryIngredienses);
                }
            })
        }
        
        
        Object.entries(recipe.acf.primary_procedure).forEach(([key, value]) => {
            if(value !== ""){
                const ingredientSteps = document.createElement("li");
                ingredientSteps.textContent = value;
                
                ingredientSteps.addEventListener("click", () => {
                    ingredientSteps.classList.toggle("checker");
                })
                
                recipeProcedure.append(ingredientSteps);
            }
        })

        const recipeList = document.createElement("div");
        
        if(recipeIngredientList){
            recipeList.append(recipeIngredientList)
        }

        if(secondaryList){
            recipeList.appendChild(secondaryList)
        }
        
        if(tertiaryList){
            recipeList.appendChild(tertiaryList)
        }

            singleRecipeEl.append(newRecipeTitel, newRecipeImage, recipeList, recipeProcedure)

    })
}