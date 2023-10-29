import axios from "axios";
import { fetchPhoto } from "./fetch-api";
import Notiflix from "notiflix";
import { createMarkup } from "./createMarkup";
import simpleLightbox from "simplelightbox";


const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const btnLoad = document.querySelector('.btn');

// btnLoad.classList.add('hidden');

let page = 1;
let searchQuery = null;



form.addEventListener('submit', searchPhoto);

async function searchPhoto(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    page = 1;

     searchQuery = evt.target.elements.searchQuery.value;
    // console.log(searchQuery);

    try {
        const resp = await fetchPhoto(searchQuery, page);
        // console.log(resp.hits);
        // return resp.data;
        if (resp.hits.length > 0) {
            gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
            Notiflix.Notify.success(`Hooray! We found ${resp.totalHits} images.`);
            const lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();
 
           
            
            
        } else {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        
        }
        
        return
    } catch (error) {
        throw error 
        Notiflix.Notify.failure("Ops! Something went wrong.");
    } 
    }
    

btnLoad.addEventListener('click', onClickLoad);

async function onClickLoad(evt) {
    page += 1;
    // const searchQuery = evt.target.elements.searchQuery.value;
    if (searchQuery * 40 > resp.totalHits) {
        btnLoad.classList.add('visible');
    } else
        try {
            const resp = await fetchPhoto(searchQuery, page);

            gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
        } catch (error) {
            Notiflix.Notify.failure("Ops! Something went wrong.");
            throw error;
        }
    }