import { fetchPhoto } from "./fetch-api";
import Notiflix from "notiflix";

const form = document.querySelector('.search-form');

form.addEventListener('submit', searchPhoto);

async function searchPhoto(evt) {
    evt.preventDefault();

    const searchQuery = evt.target.element.searchQuery.value;
    console.log(searchQuery);

    try {
        const resp = await fetchPhoto(searchQuery);
        console.log(resp.data.hits);
        return resp.data.hits;
        
    } catch (error) {
        throw error
    Notiflix.Notify.failure('Щось пішло не так в "fetchData"');
}
    
}
