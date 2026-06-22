//? Variables
const input = document.querySelector(".input")
const searchBtn = document.querySelector(".search-btn")
const resultSection = document.querySelector(".result")
//! Functions
async function fetchAnimal(name) {
    const response = await fetch(
        `https://api.api-ninjas.com/v1/animals?name=${name}`,
        {
            headers: {
                "X-Api-Key": "KxK6mksHLOKtAvEAqgDizqx2R9LmSt8TNoGxcuFk"
            }
        }
    )
    const data = await response.json()
    if (!data.length) {
        return null
    }
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
}
async function getAnimalName() {
    let animalName = input.value.trim()
    if (!animalName) {
        resultSection.innerHTML = `
        <div class="d-flex justify-content-center align-items-center h-100">
            <h2>Please enter an animal name</h2>
        </div>
        `
        return
    }
    resultSection.innerHTML = `
    <div class="d-flex justify-content-center align-items-center h-100">
        <div class="loader"></div>
    </div>
    `
    let reception = await fetchAnimal(animalName)
    displayAnimalCard(reception)
}
function displayAnimalCard(animal) {
    if (!animal) {
        resultSection.innerHTML = `
        <div class="d-flex justify-content-center align-items-center h-100"><h2>No animal found </h2></div>
        `
        return;
    }
    resultSection.innerHTML = `
    <div class="animal-card">
        <h3 class="animal-name">
            ${animal.name || "Unknown?"}
        </h3>
        <div class="info-box">
            <i class="fa-solid fa-address-card"></i>
            <div>
                <span>SCIENTIFIC-NAME</span>
                <h5 class="scientific-name">${animal.taxonomy?.scientific_name || "Unknown"}</h5>
            </div>
        </div>

        <div class="info-box">
            <i class="fa-solid fa-earth-africa"></i>
            <div>
                <span>HABITAT</span>
                <h5>${animal.characteristics?.habitat || "Unknown"}</h5>
            </div>
        </div>

        <div class="info-box">
            <i class="fa-solid fa-carrot"></i>
            <div>
                <span>DIET</span>
                <h5>${animal.characteristics?.diet || "Unknown"}</h5>
            </div>
        </div>

        <div class="info-box">
            <i class="fa-solid fa-hourglass-half"></i>
            <div>
                <span>LIFESPAN</span>
                <h5>${animal.characteristics?.lifespan || "Unknown"}</h5>
            </div>
        </div>

        <div class="info-box">
            <i class="fa-solid fa-gauge-high"></i>
            <div>
                <span>TOP SPEED</span>
                <h5>${animal.characteristics?.top_speed || "Unknown"}</h5>
            </div>
        </div>
    </div>
    `
}
//? Events
searchBtn.addEventListener("click", getAnimalName)
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        getAnimalName()
    }
})