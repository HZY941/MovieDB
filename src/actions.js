const BASE_URL = "https://api.themoviedb.org/3/movie/";
const DEFAULT_SORT = "now_playing";
const API_PREFIX = "?api_key=";
const API_TOKEN = "8a4d083bfae4acf00f4e1c8d3f671add";
const LANG_PRFIX = "&language=en-US";
const PAGE_PREFIX = "&page=";
const DEFAULT_PAGE = 1;

export const LOAD_MOVIES = "LOAD_MOVIES";
export const LOAD_MOVIE_DETAILS = "LOAD_MOVIE_DETAILS";
export const TOGGLE_LOGIN_STATUS = "TOGGLE_LOGIN_STATUS";
export const SET_USER_DATA = "SET_USER_DATA";
export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
export const LOAD_RATED_MOVIES = "LOAD_RATED_MOVIES";
export const LOAD_FAVORITE_MOVIES = "LOAD_FAVORITE_MOVIES";

export const loadSortedMoviesAction = (sortType, pageNumber, movies) => {
  return {
    type: LOAD_MOVIES,
    payload: { sortType, pageNumber, movies },
  };
};

export const loadSingleMovieAction = (movieDetails) => {
  return {
    type: LOAD_MOVIE_DETAILS,
    payload: { movieDetails },
  };
};

export const toggleIsLoggedInAction = () => {
  return {
    type: TOGGLE_LOGIN_STATUS,
  };
};

export const setUserDataAction = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: { userData },
  };
};

export const clearUserDataAction = () => {
  return {
    type: CLEAR_USER_DATA,
  };
};

export const loadRatedMoviesAction = (ratedMovies) => {
  return {
    type: LOAD_RATED_MOVIES,
    payload: { ratedMovies },
  };
};

export const loadFavoriteMoviesAction = (favoriteMovies) => {
  return {
    type: LOAD_FAVORITE_MOVIES,
    payload: { favoriteMovies },
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch(toggleIsLoggedInAction());
    dispatch(clearUserDataAction());
  };
};

export const loadMoveDetailsAction = (movieId) => {
  return (dispatch) => {
    fetch(`${BASE_URL}${movieId}${API_PREFIX}${API_TOKEN}${LANG_PRFIX}`)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadSingleMovieAction(data));
      });
  };
};

// default: sortType = now_playing, pageNumber = 1
export const loadInitialMoviesAction = () => {
  return (dispatch) => {
    fetch(
      `${BASE_URL}${DEFAULT_SORT}${API_PREFIX}${API_TOKEN}${LANG_PRFIX}${PAGE_PREFIX}${DEFAULT_PAGE}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadSortedMoviesAction(DEFAULT_SORT, DEFAULT_PAGE, data));
      });
  };
};

export const loadTargetMoviesAction = (sortType) => {
  return (dispatch) => {
    fetch(
      `${BASE_URL}${sortType}${API_PREFIX}${API_TOKEN}${LANG_PRFIX}${PAGE_PREFIX}${DEFAULT_PAGE}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadSortedMoviesAction(sortType, DEFAULT_PAGE, data));
      });
  };
};

export const increasePageNumberAction = (currentSortType, currentPage) => {
  const newPage = Number(currentPage) + 1;
  return (dispatch) => {
    fetch(
      `${BASE_URL}${currentSortType}${API_PREFIX}${API_TOKEN}${LANG_PRFIX}${PAGE_PREFIX}${newPage}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadSortedMoviesAction(currentSortType, newPage, data));
      });
  };
};

export const decreasePageNumberAction = (currentSortType, currentPage) => {
  const newPage = Number(currentPage) - 1;
  return (dispatch) => {
    fetch(
      `${BASE_URL}${currentSortType}${API_PREFIX}${API_TOKEN}${LANG_PRFIX}${PAGE_PREFIX}${newPage}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadSortedMoviesAction(currentSortType, newPage, data));
      });
  };
};
