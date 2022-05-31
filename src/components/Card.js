import React from "react";
import CardTemplate from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../actions";
import axios from "axios";

// MUI favorite icon (heart) / rating start icon
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
const REQUEST_BASE_URL = "https://api.themoviedb.org/3/account/";
const FAVORITE_PREFIX = "/favorite?api_key=";
const LOAD_FAVORITE_PREFIX = "/favorite/movies?api_key=";
const API_TOKEN = "8a4d083bfae4acf00f4e1c8d3f671add";
const SESSION_PREFIX = "&session_id=";

const Card = ({ movie }) => {
  const state = useSelector((state) => {
    return state.state;
  });

  const dispatch = useDispatch();

  const moviePosterURL = `${BASE_IMG_URL}${movie.poster_path}`;
  const isLoggedIn = state.isLoggedIn;
  let ratingText = movie.vote_average;
  let isLiked = false;

  // 1 - update user rating on rated movies
  // 2 - check if current card is liked or not
  // pre-req: must be logged into account
  if (isLoggedIn) {
    const currentRating = state.ratedMovies.ratedMovies.filter((movieInfo) => {
      return movieInfo.id === movie.id;
    })[0];
    if (currentRating === undefined) {
      ratingText = movie.vote_average;
    } else {
      ratingText = `${movie.vote_average} / ${currentRating.rating}`;
    }

    const likedMovies = state.likedMovies.favoriteMovies;
    isLiked =
      likedMovies.filter((m) => Number(m.id) === movie.id).length === 0
        ? false
        : true;
  }

  // set a tiny wait time for MovieDB backend to process (a time gap between post and get from movieDB)
  function waitLoad() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 250);
    });
  }

  // handle the local rendering of fav icon and send out requests to MovieDB API
  const handleLikedClick = async (e) => {
    if (isLoggedIn) {
      const accountId = state.userData.userData.accountId;
      const sessionId = state.userData.userData.sessionId;
      const favValue = !isLiked;
      const movieId = e.target.closest("div").id; // locate the movie id

      // post data to MovieDB API
      try {
        axios.post(
          `${REQUEST_BASE_URL}${accountId}${FAVORITE_PREFIX}${API_TOKEN}${SESSION_PREFIX}${sessionId}`,
          {
            media_type: "movie",
            media_id: movieId,
            favorite: favValue,
          }
        );

        // wait some time for MovieDB backend to update data
        await waitLoad();

        // fetch new data from MovieDB API
        const favoriteData = await axios.get(
          `${REQUEST_BASE_URL}${accountId}${LOAD_FAVORITE_PREFIX}${API_TOKEN}${SESSION_PREFIX}${sessionId}`
        );
        dispatch(Actions.loadFavoriteMoviesAction(favoriteData.data.results));
      } catch (e) {
        throw e;
      }
    }
  };

  return (
    <CardTemplate className="movie-card" elevation={3}>
      <img className="movie-poster" src={moviePosterURL} alt="movie poster" />
      <div className="movie-info">
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button variant="text" id="movieTitle">
            {movie.title}
          </Button>
        </Link>
        <div className="rating-favorite">
          <div className="movie-rating">
            <span>
              <StarOutlinedIcon style={{ color: "#edd326" }} />
            </span>
            <span>{ratingText}</span>
          </div>
          <div className="movie-liked" id={movie.id}>
            <span>
              <FavoriteBorderOutlinedIcon
                style={{
                  color: "black",
                  display: isLiked ? "none" : "block",
                }}
                onClick={handleLikedClick}
              />
            </span>

            <span>
              <FavoriteOutlinedIcon
                style={{
                  color: "red",
                  display: isLiked ? "block" : "none",
                }}
                onClick={handleLikedClick}
              />
            </span>
          </div>
        </div>
      </div>
    </CardTemplate>
  );
};

export default Card;
