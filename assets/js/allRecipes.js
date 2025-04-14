const domain = "https://mmd2-api.r-dalsgaard.dk/";
const endPoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "?acf_format=standard";
const getRealImageUrlsPlus = "&acf_format=standard";

const recipesEl = document.querySelector(".allRecipes");

fetch(domain + endPoint + "?per_page=40" + getRealImageUrlsPlus)
.then(res => res.json())
.then(data => {
    console.log('data:', data);
    renderRecipe(data);
})
.catch(err => console.log(err))

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