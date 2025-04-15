const domain = "https://mmd2-api.r-dalsgaard.dk/";
const endPoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "?acf_format=standard";
const getRealImageUrlsPlus = "&acf_format=standard";
let allRecipes;

const recipesEl = document.querySelector(".allRecipes");

const dietSelectorEl = document.querySelector("#Diets");
const timeSelectorEl = document.querySelector("#Time");
const typeSelectorEl = document.querySelector("#Type");

const buttonEl = document.querySelector("#filterButton");
const anvendKnapEl = document.querySelector("#anvendKnap");

fetch(domain + endPoint + "?per_page=40" + getRealImageUrlsPlus)
.then(res => res.json())
.then(data => {
    console.log('data:', data);
    renderRecipe(data);
    allRecipes = data;
})
.catch(err => console.log(err))


let userDiet;
let userTime;
let userType;

dietSelectorEl.addEventListener("change", () => {
    userDiet = "&diet=" + dietSelectorEl.value;
    console.log('userDiet:', userDiet);
})

timeSelectorEl.addEventListener("change", () => {
    userTime = "&tilberedningstid=" + timeSelectorEl.value;
    console.log('userTime:', userTime)
})

typeSelectorEl.addEventListener("change", () => {
    userType = "&maltidstype=" + typeSelectorEl.value;
    console.log('userType:', userType)
})

anvendKnapEl.addEventListener("click", () => {
    let filteredUrl = domain + endPoint + "?per_page=40" + getRealImageUrlsPlus;
    if(userDiet){
        filteredUrl += userDiet;
    }
    if(userTime){
        filteredUrl += userTime;
    }
    if(userType){
        filteredUrl += userType;
    }
    fetch(filteredUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        renderFilteredRecipe(data);
    })
    .catch(err => console.log(err))
})

buttonEl.addEventListener("click", () => {
    recipesEl.innerHTML = "";
    renderRecipe(allRecipes);
})


function renderRecipe(data){
    data.forEach(recipe => {
        recipesEl.innerHTML += `
        <article>
        <a href="/opskrift.html?slug=${recipe.slug}">
        <img src="${recipe.acf.picture.sizes.large}" alt="">
        <h2>${recipe.acf.titel}</h2>
        </a>
        </article>
        `
    })
}

function renderFilteredRecipe(data){
    recipesEl.innerHTML = "";
    data.forEach(recipe => {
        recipesEl.innerHTML += `
        <article>
        <a href="/opskrift.html?slug=${recipe.slug}">
        <img src="${recipe.acf.picture.sizes.large}" alt="">
        <h2>${recipe.acf.titel}</h2>
        </a>
        </article>
        `
    })
}


