import { Action } from "history";
import * as Actions from "./actions";

const initialState = {
  searchedMovies: [],
  likedMovies: [],
  ratedMovies: [],
  movieDetails: [],
  userData: [],
  sortType: "now_playing",
  pageNumber: 1,
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOAD_MOVIES: {
      const data = action.payload;
      const sortType = data.sortType;
      const pageNumber = data.pageNumber;
      const movies = data.movies;
      return {
        ...state,
        searchedMovies: movies,
        sortType,
        pageNumber,
      };
    }

    case Actions.LOAD_MOVIE_DETAILS: {
      const movieDetails = action.payload;
      return {
        ...state,
        movieDetails: movieDetails,
      };
    }

    case Actions.TOGGLE_LOGIN_STATUS: {
      const revert = state.isLoggedIn === false ? true : false;
      return {
        ...state,
        isLoggedIn: revert,
      };
    }

    case Actions.SET_USER_DATA: {
      const userData = action.payload;
      return {
        ...state,
        userData: userData,
      };
    }

    case Actions.CLEAR_USER_DATA: {
      return {
        ...state,
        isLoggedIn: false,
        userData: [],
        likedMovies: [],
        ratedMovies: [],
      };
    }

    case Actions.LOAD_FAVORITE_MOVIES: {
      const favoriteMovies = action.payload;
      return {
        ...state,
        likedMovies: favoriteMovies,
      };
    }

    case Actions.LOAD_RATED_MOVIES: {
      const ratedMovies = action.payload;
      return {
        ...state,
        ratedMovies: ratedMovies,
      };
    }

    default:
      return state;
  }
};

export default reducer;
