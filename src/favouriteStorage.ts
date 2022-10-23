import { MovieData } from "./MovieList";

export function isInFavouriteStorage(id?: string) {
  if (!id){
    return false;
  }
  const favs = getFavourites();
  let found = false;
  if (!favs) {
    return false;
  }
  favs.forEach((fav) => {
    if (fav.imdbID === id){
      found = true;
    }
  })
  return found;
}

export function addToFavouriteStorage(movie: MovieData) {
  const favs = getFavourites();
  if (!isInFavouriteStorage(movie.imdbID)){
    localStorage.setItem('favourites', JSON.stringify(favs ? favs.concat([{...movie}]) : [{...movie}]));
  }
}

export function removeFromFavouriteStorage(id: string) {
  const favs = getFavourites();
  if (isInFavouriteStorage(id) && favs) {
    const removedFavs = favs.filter((fav) => {
      return fav.imdbID !== id
    });
    if (removedFavs.length === 0) {
      localStorage.clear()
    } else {
      localStorage.setItem('favourites', JSON.stringify(removedFavs));
    }
  }
}

export function getFavourites():[MovieData] | undefined {
  const favs = localStorage.getItem('favourites');
  return favs ? JSON.parse(favs) : undefined;
}