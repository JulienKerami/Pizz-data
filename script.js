const code_pizza = [4001724819905,3270160717668,3270160371983,4606272023295,3270160890842,4001724819400,4001724819509,3270160890170,3270190216063,3270160717323,4001724039143,3564700595039,3560070123971,3270160838110];

// console.log(code_pizza.length);

// fonction qui va prendre aléatoirement un nombre d'ids dans l'array des pizzas

function randomIds(array, nb) {
    let result = [];
    
    for (let i = 0 ; i < nb ; i ++) {
        let tirage = Math.floor(Math.random() * array.length);
        result.push(array[tirage]);
        array.splice(tirage, 1);
    }
    return result;

}

let idTires = randomIds(code_pizza, 4);
console.log(idTires);

// requête des données issues de l'API

const debutURLAPI = "https://world.openfoodfacts.org/api/v2/product/" ;
const finURLAPI = ".json";

async function getDatasFromAPI(array) {
    const result = [];

    for (let id of array) {

        const httpResponse = await fetch(debutURLAPI + id + finURLAPI);
        const body = await httpResponse.json();
      //  console.log(body);
        result.push(body);
    } 
     console.log(result);
    return result;

   
}


// Impression des résultats

async function renderPage(array) {
    const platsDatas = await getDatasFromAPI(array);
    const divContainer = document.querySelector("#container");
    

    for (let plat of platsDatas) {
        //création d'une div
        const divElement = document.createElement("div");
        divElement.classList.add("platContainer");
        divContainer.appendChild(divElement);

        // On met son titre et son image

        const platTitleElement = document.createElement("h2");
        platTitleElement.textContent = plat.product.product_name_fr;
        divElement.appendChild(platTitleElement);

        const platSubTitleElement = document.createElement("h3");
        platSubTitleElement.textContent = plat.product.brands;
        divElement.appendChild(platSubTitleElement);

        const platImgElement = document.createElement("img");
        platImgElement.src = plat.product.image_front_url;
        platImgElement.alt = "Image de" + plat.product.product_name_fr;
        divElement.appendChild(platImgElement);

        //récupération du nutriscore sans l'afficher

        const NutriscoreElement = document.createElement("p");
        NutriscoreElement.classList.add("nutriscore");
        NutriscoreElement.textContent = "Nutriscore : " + plat.product.nutriscore_2023_tags;
        NutriscoreElement.style.display = "none";
        divElement.appendChild(NutriscoreElement);

    }

    // on ajoute un listener à divcontainer pour passer les NutriscoreElement.style.display de "none" à "block"

    divContainer.addEventListener("click", () => {
        console.log("click");
        const nutriscoreElements = divContainer.querySelectorAll(".nutriscore");
        nutriscoreElements.forEach((element) => {
            element.style.display = "block";
        });
    });

};

renderPage(idTires);