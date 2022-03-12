const API_KEY = "f6fbe9a13820afc7b29d03b000ebe095";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovieData {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  title: string;
}

export interface IGetMovieResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovieData[];
  total_pages: number;
  total_results: number;
}

export interface IGetSearchMovies {
  results: IGetSearchMoviesResults[];
  total_pages: number;
}

export interface IGetSearchMoviesResults {
  id: number;
  name: string;
  title: string;
  overview: string;
  backdrop_path: string;
  genre_ids: number[];
  vote_average: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearchMovies(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`
  ).then((response) => response.json());
}
export function getSearchTvs(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`
  ).then((response) => response.json());
}
