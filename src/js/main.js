import axios from "axios";
import { fetchPhoto } from "./fetch-api";
import Notiflix from "notiflix";
import { createMarkup } from "./createMarkup";
import 'simplelightbox/dist/simple-lightbox.min.css';


const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const btnLoad = document.querySelector('.btn');



let page = 1;
let searchQuery = null;



form.addEventListener('submit', searchPhoto);

btnLoad.classList.add('hidden');

async function searchPhoto(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    page = 1;
     searchQuery = evt.target.elements.searchQuery.value;

    try {
        const resp = await fetchPhoto(searchQuery, page);
       
        if (resp.hits.length > 0) {
            btnLoad.classList.remove('hidden');
            gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
            Notiflix.Notify.success(`Hooray! We found ${resp.totalHits} images.`);
            const lightbox = new SimpleLightbox('.gallery a');
           
             evt.target.elements.searchQuery.value = '';
 
        } else {
           
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        return
    } catch (error) {
        Notiflix.Notify.failure("Ops! Something went wrong.");
    //    throw error
    } 
    evt.target.elements.searchQuery.value = '';
    }
    

btnLoad.addEventListener('click', onClickLoad);

async function onClickLoad(evt) {
    page += 1;

        try {
            const resp = await fetchPhoto(searchQuery, page);

            if (searchQuery * 40 >= resp.totalHits) {
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                btnLoad.classList.add('hidden');
            }
            
            gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
        } catch (error) {
            Notiflix.Notify.failure("Ops! Something went wrong.");
            throw error;
        }
    }
