import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

fetchBreeds()
    .then(breeds => {
    breedSelect.classList.add("hidden");
      loader.classList.remove("hidden");
      
    let options = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`);
        breedSelect.innerHTML = options.join("");
         loader.classList.add("hidden");
    breedSelect.classList.remove("hidden");
      new SlimSelect({
    select: breedSelect,
      })
        })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Try reloading the page!`
    );
    loader.classList.add("hidden");
  })

 breedSelect.addEventListener("change", () => {
    const selectedBreed = breedSelect.value;
    catInfoDiv.innerHTML = "";
    catInfoDiv.classList.add("hidden");
    loader.classList.remove("hidden");

    fetchCatByBreed(selectedBreed).then(cat => {
      const { url } = cat;
      const { name, description, temperament } = cat.breeds[0];

      catInfoDiv.innerHTML = `
        <img src="${url}" alt="${name}">
        <div>
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${temperament}</p>
        </div>
      `;
        loader.classList.add("hidden");
        catInfoDiv.classList.remove("hidden");
    })
   .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Try reloading the page!`
    );
  loader.classList.add("hidden");
   })
 });
