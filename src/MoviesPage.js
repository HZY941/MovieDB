import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./actions";
import PageControl from "./components/PageControl";
import MovieContent from "./components/MovieContent";

const MoviesPage = () => {
  const state = useSelector((state) => {
    return state.state;
  });

  const dispatch = useDispatch();

  // load default => now_playing, page 1
  useEffect(() => {
    dispatch(Actions.loadInitialMoviesAction());
  }, []);

  const totalPage = state.searchedMovies.total_pages;
  const currentPage = state.pageNumber;
  const currentSortType = state.sortType;

  const handleSortChange = (e) => {
    dispatch(Actions.loadTargetMoviesAction(e.target.value));
  };

  const handlePageChange = (e) => {
    const target = e.target.id;

    if (currentPage < totalPage) {
      if (target === "nextBtn") {
        dispatch(
          Actions.increasePageNumberAction(currentSortType, currentPage)
        );
      }
    }

    if (currentPage > 1) {
      if (target === "prevBtn") {
        dispatch(
          Actions.decreasePageNumberAction(currentSortType, currentPage)
        );
      }
    }
  };

  return (
    <div className="movies-page">
      <header className="movies-page-control-bar">
        <PageControl
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={handleSortChange}
          onClick={handlePageChange}
        />
      </header>
      <main>
        <MovieContent state={state} />
      </main>
    </div>
  );
};

export default MoviesPage;
