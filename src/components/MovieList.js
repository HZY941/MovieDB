import React from "react";
import Card from "./Card";

export default function MovieList({ movies, isLoggedIn }) {
  return (
    <>
      <div className="movies">
        {movies !== undefined && (
          <>
            {movies.map((movie) => {
              return <Card movie={movie} key={movie.id} />;
            })}
          </>
        )}
      </div>
    </>
  );
}
