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
        const newRecipeTitel = document.createElement("h2");
        newRecipeTitel.textContent = recipe.acf.titel;

        const newRecipeImage = document.createElement("img");
        newRecipeImage.src = recipe.acf.picture.sizes.large;

        const recipeIngredientList = document.createElement("ul");
        const recipeProcedure = document.createElement("ol");

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


        singleRecipeEl.append(newRecipeTitel, newRecipeImage, recipeIngredientList, recipeProcedure)
    })
}