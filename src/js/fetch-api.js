import axios from "axios";
import Notiflix from "notiflix";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40268074-5c3ececf222fa6778734cace7';

async function fetchPhoto(searchQuery, page) {
    try {
        const resp = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
        console.log(resp.data);
        return resp.data;

    } catch (error) {
        throw error
        Notiflix.Notify.failure('Щось пішло не так в "fetchData"');
    }
}
export { fetchPhoto };

