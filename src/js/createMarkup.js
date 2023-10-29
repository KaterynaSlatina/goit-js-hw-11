function createMarkup(arr) {
     return arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="card"><a href="${largeImageURL}"><img class="card__img lazyload" src="${webformatURL}" alt="${tags}" loading="lazy" width="350" height="300" /></a>
       <div class="card__info">
          <p class="card__info-item"><b>Likes:</b> ${likes}</p>
         <p class="card__info-item"><b>Views:</b> ${views}</p>
         <p class="card__info-item"><b>Comments:</b> ${comments}</p>
         <p class="card__info-item"><b>Downloads:</b> ${downloads}</p>
        </div></li>`
    )
    .join('');
}



export { createMarkup };