const textInput = document.querySelector(".text-input");
const paginationContainer = document.querySelector(".pagination-container");
const resultsContainer = document.querySelector(".results-container");
const form = document.getElementById("form")

let index = 1;

function paginate(event) {
    index++;
    handleForm(event, true);
}

function handleDoc(results) {
    if (results && results.length >= 10) {
        const form = document.createElement("form");
        form.id = "form"
        form.addEventListener("submit", paginate)
        const btn = document.createElement("input")
        btn.type = "submit"
        btn.value = "Next page"
        btn.className = "btn"


        form.appendChild(btn)
        paginationContainer.appendChild(form)
    }

    if (results && results.length > 0) {
        const ul = document.createElement("ul")
        results.forEach((beer) => {
            const a = document.createElement("a")
            const li = document.createElement("li")
            li.innerHTML = beer.name
            a.href = `/Slutprojekt%20öl/Pages/details.html?id=${beer.id}`

            a.appendChild(li)
            ul.appendChild(a)
        })
        resultsContainer.appendChild(ul)

    } else {
        const p = document.createElement("p")
        p.innerHTML = "No results found..."
        resultsContainer.appendChild(p)
    }
}

function handleForm(event, skipIndex) {
    event && event.preventDefault()
    const value = textInput.value;

    if (!skipIndex) {
        index = 1;
    }

    console.log({value})

    resultsContainer.innerHTML = "";
    paginationContainer.innerHTML = "";

    const url = `https://api.punkapi.com/v2/beers?page=${index}&per_page=10&beer_name=${value}`

    fetch(url)
    .then(res => res.text())
    .then(text => JSON.parse(text))
    .then(handleDoc)
    .catch(err => console.warn(err))
}
form.addEventListener("submit", handleForm)
