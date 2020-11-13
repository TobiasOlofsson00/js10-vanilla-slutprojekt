const id = new URLSearchParams(document.location.search).get("id")
console.log(id)
const url = `https://api.punkapi.com/v2/beers/${id}`

const detailsContainer = document.querySelector(".details-container")
const description = document.querySelector(".description")
const img = document.querySelector(".img")
const alc = document.querySelector(".alc")
const volume = document.querySelector(".volume")
const brewersTips = document.querySelector(".brewers-tips")
const yeast = document.querySelector(".yeast")
const name = document.querySelector(".name")
const listContainer = document.querySelector(".list-container")

function createList(array, key){
    const ul = document.createElement("ul")
    for(let i = 0; i<array.length; i++){
        const item = array[i]
        if(key){
            const li = document.createElement("li")
            li.innerText = item[key]
            ul.appendChild(li)
        }
        if(typeof item === "string"){
            const li = document.createElement("li")
            li.innerText = item
            ul.appendChild(li)
        }
    }
    listContainer.appendChild(ul)
}

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
        if(beer){
            detailsContainer.classList.add("visible")
            description.innerHTML = beer.description
            
            if(beer.image_url){
                img.src = beer.image_url
            }
            alc.innerHTML = "Alkoholhalt: " + beer.abv + " %"
            volume.innerHTML = "Volym: " + beer.volume.value + beer.volume.unit
            brewersTips.innerHTML = beer.brewers_tips

            createList(beer.food_pairing)
            createList(beer.ingredients.hops, "name")
            createList(beer.ingredients.malt, "name")

            yeast.innerHTML = beer.ingredients.yeast
            name.innerHTML = beer.name


        }

    })
    .catch(function(error){

    })
    
