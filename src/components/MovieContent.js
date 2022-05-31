import React from "react";
import MovieList from "./MovieList";

const MovieContent = ({ state }) => {
  return (
    <>
      <main>
        <div className="movie-container">
          <MovieList movies={state.searchedMovies.results} />
        </div>
      </main>
    </>
  );
};

export default MovieContent;
