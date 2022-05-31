import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./actions";
import RatingSelector from "./components/RatingSelector";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const REQUEST_BASE_URL = "https://api.themoviedb.org/3/movie/";
const LOAD_BASE_URL = "https://api.themoviedb.org/3/account/";
const API_TOKEN = "8a4d083bfae4acf00f4e1c8d3f671add";
const RATED_API_PREFIX = "/rated/movies?api_key=";
const SESSION_PREFIX = "&session_id=";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const movieId = Number(params.id);
  const [score, setScore] = useState(1);

  useEffect(() => {
    dispatch(Actions.loadMoveDetailsAction(movieId));
  }, []);

  const state = useSelector((state) => {
    return state.state;
  });

  // handle async time gap between data upload and data
  if (state.movieDetails.length === 0) {
    return <div>loading...</div>;
  }

  const movieInfo = state.movieDetails.movieDetails;
  const posterURL = `${POSTER_BASE_URL}${movieInfo.poster_path}`;
  const title = movieInfo.title;
  const releaseDate = movieInfo.release_date;
  const overview = movieInfo.overview;
  const rating = movieInfo.vote_average;
  const isLoggedIn = state.isLoggedIn;
  let username, sessionId;
  let yourRating = "Not yet";
  if (isLoggedIn) {
    username = state.userData.userData.username;
    sessionId = state.userData.userData.sessionId;
    const ratedMovie = state.ratedMovies.ratedMovies.filter(
      (m) => m.id === movieId
    );
    if (ratedMovie.length !== 0) {
      yourRating = ratedMovie[0].rating;
    }
  }

  const genres = movieInfo.genres.reduce((acc, g, index) => {
    if (index === movieInfo.genres.length - 1) {
      return acc + g.name;
    }
    return acc + g.name + ", ";
  }, "");

  const productions = movieInfo.production_companies.reduce((acc, p, index) => {
    if (index === movieInfo.production_companies.length - 1) {
      return acc + p.name;
    }
    return acc + p.name + ", ";
  }, "");

  // set a tiny wait time for MovieDB backend to process (a time gap between post and get from movieDB)
  function waitLoad() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 500);
    });
  }

  // upload score to movieDB
  const handleRatingSubmit = async () => {
    if (isLoggedIn) {
      try {
        await axios.post(
          `${REQUEST_BASE_URL}${movieId}/rating?api_key=${API_TOKEN}`,
          {
            value: score,
          }
        );
        await waitLoad(); // wait time for the movieDB backend to process
        const ratedData = await axios.get(
          `${LOAD_BASE_URL}${username}${RATED_API_PREFIX}${API_TOKEN}${SESSION_PREFIX}${sessionId}`
        );
        dispatch(Actions.loadRatedMoviesAction(ratedData.data.results));
      } catch (e) {
        throw e;
      }
    }

    alert("Rating uploaded!"); // success message
  };

  const handleRatingSelect = (e) => {
    setScore(e.target.value);
  };

  return (
    <div className="movie-details-container">
      <img
        className="movie-details-poster"
        src={posterURL}
        alt="movie poster"
      />
      <div className="movie-details-text-container">
        <h1 className="movie-details-title">{title}</h1>
        <h2 className="movie-details-release-date">
          Release Date:
          <div className="movie-release-date-data">{releaseDate}</div>
        </h2>
        <h2 className="movie-details-overview">
          Overview:
          <div className="movie-overview-data">{overview}</div>
        </h2>
        <h2 className="movie-details-genres">
          Genres:
          <div className="movie-genres-data">{genres}</div>
        </h2>
        <h2 className="movie-details-rating">
          Average Rating:
          <div className="ratingDetails">
            <span>
              <StarOutlinedIcon style={{ color: "#edd326" }} />
            </span>
            <span className="movie-details-rating-data">{rating}</span>
          </div>
        </h2>
        <h2 className="movie-details-your-rating">
          Your Rating:
          <div className="movie-details-your-rating-container">
            <span className="movie-details-rating-info">
              <div>{yourRating}</div>
              <RatingSelector onChange={handleRatingSelect} />
            </span>
            <span>
              <Button
                id="ratingSubmitBtn"
                variant="contained"
                onClick={handleRatingSubmit}
              >
                Submit
              </Button>
            </span>
          </div>
        </h2>
        <h2 className="movie-details-productions">
          Production Companies:
          <div className="movie-details-productions-data">{productions}</div>
        </h2>
      </div>
    </div>
  );
};

export default MovieDetails;
