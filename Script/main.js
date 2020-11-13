const url = "https://api.punkapi.com/v2/beers/random"

const cardContainer = document.querySelector(".card-container")
const cardImage = document.querySelector(".card-image")
const cardTitle = document.querySelector(".card-title")
const cardLink = document.querySelector(".card-link")



function randomizeBeer(){

    fetch(url)
    .then(function(res){
        return res.text()
    })
    .then(function(text){
        return JSON.parse(text)
    })
    .then(function(json){
        console.log(json)
        const beer = json[0]
        console.log(beer)
        if(beer){
            if(beer.image_url){
                cardImage.src = beer.image_url
            }
            cardTitle.innerHTML = beer.name
            cardLink.href = `/Slutprojekt%20öl/Pages/details.html?id=${beer.id}`
            cardContainer.classList.add("visible")
        }
        
    })
    .catch(function(error){

    })
}