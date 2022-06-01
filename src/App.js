/**
 * Movie Database web application that uses open sourced MovieDB APIs.
 *
 * @date 04/2022
 * @requirements:
 * Single Page Application
 * React Hooks
 * React Redux
 * Work with MovieDB backend API for logins and data fetching
 */

import React from "react";
import "./style.css";
import { Routes, Route } from "react-router-dom";
import FavoritePage from "./FavoritePage";
import RatedPage from "./RatedPage";
import LoginPage from "./LoginPage";
import MoviesPage from "./MoviesPage";
import NavBar from "./components/NavBar";
import MovieDetails from "./MovieDetails";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/rated" element={<RatedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}
