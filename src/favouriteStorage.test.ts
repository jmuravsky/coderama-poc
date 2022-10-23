import {isInFavouriteStorage, getFavourites, addToFavouriteStorage, removeFromFavouriteStorage} from './favouriteStorage';

const movie1 = {
  Poster:"https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",
  Title: "Star Wars: Episode IV - A New Hope",
  Type: "movie",
  Year: "1977",
  imdbID:"tt0076759",
};

const movie2 = {
  Poster: "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg",
  Title: "Rogue One: A Star Wars Story",
  Type: "movie",
  Year: "2016",
  imdbID: "tt3748528",
};

const movie3 = {
  Poster: "https://m.media-amazon.com/images/M/MV5BODA2Mjk0N2MtNGY0Mi00ZWFjLTkxODEtZDFjNDg4ZDliMGVmXkEyXkFqcGdeQXVyMzAzNTY3MDM@._V1_SX300.jpg",
  Title: "Grey's Anatomy",
  Type: "series",
  Year: "2005–",
  imdbID: "tt0413573",
};

test('can retrieve array of favourites from localStorage', () => {
  const favs = [{...movie1}, {...movie2}, {...movie3}];
  localStorage.setItem('favourites', JSON.stringify(favs));
  expect(getFavourites()).toStrictEqual(favs);
  localStorage.clear();
});

test('returns undefined with empty localstorage', ()=> {
  expect(getFavourites()).toBe(undefined);
});

test('returns true for a movie saved as favourite', () => {
  const favs = [{...movie1}, {...movie2}];
  localStorage.setItem('favourites', JSON.stringify(favs));
  expect(isInFavouriteStorage(movie1.imdbID)).toBe(true);
  localStorage.clear();
});

test('returns false for a movie not saved as favourite', () => {
  const favs = [{...movie1}, {...movie2}];
  localStorage.setItem('favourites', JSON.stringify(favs));
  expect(isInFavouriteStorage(movie3.imdbID)).toBe(false);
  localStorage.clear();
});

test('adds movie to favourites', () => {
  const init = [{...movie1}, {...movie2}];
  localStorage.setItem('favourites', JSON.stringify(init));
  addToFavouriteStorage(movie3);
  const favs = JSON.stringify([{...movie1}, {...movie2}, {...movie3}]);
  expect(localStorage.getItem('favourites')).toBe(favs);
});

test('doesnt add duplicate movie', () => {
  const init = [{...movie1}, {...movie2}];
  localStorage.setItem('favourites', JSON.stringify(init));
  addToFavouriteStorage(movie2);
  const favs = JSON.stringify(init);
  expect(localStorage.getItem('favourites')).toBe(favs);
});

test('removes movie from favourites', () => {
  const init = [{...movie1}, {...movie2}, {...movie3}];
  localStorage.setItem('favourites', JSON.stringify(init));
  removeFromFavouriteStorage(movie3.imdbID);
  const favs = JSON.stringify([{...movie1}, {...movie2}]);
  expect(localStorage.getItem('favourites')).toBe(favs);
});

test('doesnt remove movie not in favourites', () => {
  const init = [{...movie1}, {...movie2}];
  localStorage.setItem('favourites', JSON.stringify(init));
  removeFromFavouriteStorage(movie3.imdbID);
  const favs = JSON.stringify(init);
  expect(localStorage.getItem('favourites')).toBe(favs);
});