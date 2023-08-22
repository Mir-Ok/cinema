const SORT_TYPES = {
   popular: {
      id: 0,
      name: "Популярные",
      option: "popular",
   },
   top_rated: {
      id: 1,
      name: "Топ рейтинга IMDB",
      option: "top_rated",
   },
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MOVIE_URL = "https://api.themoviedb.org/3";

const IMDB_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIxMDk1MDlhNjNjZTAyZTljMjBlZTFjZWU5Zjg1NCIsInN1YiI6IjY0OTMwMzU5ZjlhYTQ3MDEwNjBlY2M2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-R3o_IMHQbewBtAGd96G8Tff78djfxdSMXTEdKvQYpQ'

const RESET_CASES = {
   resetSidebar: "resetSidebar",
   updateContent: "updateContent",
};

export {
   SORT_TYPES,
   IMAGE_BASE_URL,
   RESET_CASES,
   MOVIE_URL,
   IMDB_token
};
