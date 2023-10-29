import axios from "axios";
import { fetchPhoto } from "./fetch-api";
import { Notiflix } from "notiflix";
import { createMarkup } from "./createMarkup";
// import simpleLightbox from "simplelightbox";


const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const btnLoad = document.querySelector('.load-more');

btnLoad.classList.add('is-hidden');

let page = 1;
let perPage = 40;

form.addEventListener('submit', searchPhoto);

async function searchPhoto(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';

    const searchQuery = evt.target.elements.searchQuery.value;
    // console.log(searchQuery);

    try {
        const resp = await fetchPhoto(searchQuery);
        // console.log(resp.hits);
        // return resp.data;
        if (resp.hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }else  {
            gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
          
        }
        
    } catch (error) {
        throw error
    Notiflix.Notify.failure('Щось пішло не так в "fetchData"');
}
    
}




btnLoad.addEventListener('click', onClickLoad);

async function onClickLoad(evt) {
    page += 1;
    const searchQuery = evt.target.elements.searchQuery.value;

    try {
        const resp = await fetchPhoto(searchQuery);

            gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
    } catch (error) {
        throw error 
        Notiflix.Notify.failure("Ops! Something went wrong.");
        } 
    }

