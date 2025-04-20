const domain = "https://mmd2-api.r-dalsgaard.dk/";
const endPoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "?acf_format=standard";
const getRealImageUrlsPlus = "&acf_format=standard";

const recipeCollectionEl = document.querySelector(".recipeCollections");
let choosenCollection;

const springButton = document.querySelector("#springCollection");
springButton.addEventListener("click", () => {
    fetch(domain + endPoint + "?opskriftsamling=38&per_page=40")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

const easyButton = document.querySelector("#easyCollection");
easyButton.addEventListener("click", () => {
    fetch(domain + endPoint + "?opskriftsamling=39&per_page=40")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

const kidButton = document.querySelector("#childfriendlyCollection");
kidButton.addEventListener("click", () => {
    fetch(domain + endPoint + "?opskriftsamling=40&per_page=40")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})
