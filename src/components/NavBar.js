import React from "react";
import { Link } from "react-router-dom";
import MovieDBLogo from "./MovieDBLogo";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const NavBar = () => {
  const state = useSelector((state) => {
    return state.state;
  });

  const userData = state.userData;
  const isLoggedIn = state.isLoggedIn;
  const loginText = isLoggedIn ? userData.userData.username : "Login";

  return (
    <header>
      <Paper elevation={3} square style={{ backgroundColor: "#335CFF" }}>
        <header className="menu-bar">
          <div className="tab-control">
            <MovieDBLogo />
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="text" id="home">
                HOME
              </Button>
            </Link>

            <Link to="/favorite" style={{ textDecoration: "none" }}>
              <Button variant="text" id="favorite">
                FAVORITE
              </Button>
            </Link>

            <Link to="/rated" style={{ textDecoration: "none" }}>
              <Button variant="text" id="rated">
                RATED
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="text" id="login">
                {loginText}
              </Button>
            </Link>
          </div>
        </header>
      </Paper>
    </header>
  );
};

export default NavBar;
