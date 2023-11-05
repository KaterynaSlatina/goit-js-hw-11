import axios from "axios";
import { fetchPhoto } from "./fetch-api";
import Notiflix from "notiflix";
import { createMarkup } from "./createMarkup";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');


let page = 1;
let searchQuery = null;

form.addEventListener('submit', searchPhoto);


async function searchPhoto(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    page = 1;
     searchQuery = evt.target.elements.searchQuery.value;

    try {
        const resp = await fetchPhoto(searchQuery, page);

        if (resp.hits.length > 0) {
           
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
    

const guard = document.querySelector('.guard');

const options = {
    root: null,
    rootMargin: "300px",
};

const observer = new IntersectionObserver(handleLoadMore, options);

function handleLoadMore(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onSearchQuery();
    }
  });
}
observer.observe(guard);
async function onSearchQuery() {

    searchQuery ++;

    try {
        const resp = await fetchPhoto(searchQuery, page);
        
        if (resp.hits.length > 0) {
             gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
        }else {
           
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        return
    } catch (error) {
            Notiflix.Notify.failure("Ops! Something went wrong.");
            throw error;
        }
}
