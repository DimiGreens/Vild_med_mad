const domain = "https://mmd2-api.r-dalsgaard.dk/";
const endPoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "?acf_format=standard";
const getRealImageUrlsPlus = "&acf_format=standard";
const collectionTaxonomi = "?taxonomi=opskriftsamling"

fetch(domain + endPoint + collectionTaxonomi + getRealImageUrlsPlus)
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err))