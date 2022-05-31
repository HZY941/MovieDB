import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import * as Actions from "./actions";

const API_TOKEN = "8a4d083bfae4acf00f4e1c8d3f671add";
const BASE_URL = "https://api.themoviedb.org/3/account/";
const RATED_API_PREFIX = "/rated/movies?api_key=";
const FAVORITE_API_PREFIX = "/favorite/movies?api_key=";
const SESSION_PREFIX = "&session_id=";

const LoginPage = () => {
  // local state to store the input text
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => {
    return state.state.userData;
  });

  const isLoggedIn = useSelector((state) => {
    return state.state.isLoggedIn;
  });

  const login = async (username, password) => {
    try {
      const {
        data: { request_token },
      } = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_TOKEN}`
      );

      await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_TOKEN}`,
        { username, password, request_token }
      );

      const {
        data: { session_id },
      } = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_TOKEN}`,
        { request_token }
      );

      axios.defaults.params = { ...axios.defaults.params, session_id };

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=${API_TOKEN}`
      );

      const fetchedData = {
        username,
        accountId: data.id,
        sessionId: session_id,
        requestToken: request_token,
      };

      // update userData in data store
      dispatch(Actions.setUserDataAction(fetchedData));

      // if data is loaded then, toggle login status and getback to home page
      if (Object.keys(fetchedData).length !== 0) {
        // set isLoggedIn
        dispatch(Actions.toggleIsLoggedInAction());

        // load rated movies
        const ratedData = await axios.get(
          `${BASE_URL}${fetchedData.username}${RATED_API_PREFIX}${API_TOKEN}${SESSION_PREFIX}${fetchedData.sessionId}`
        );
        dispatch(Actions.loadRatedMoviesAction(ratedData.data.results));

        // load favorite movies
        const favoriteData = await axios.get(
          `${BASE_URL}${fetchedData.username}${FAVORITE_API_PREFIX}${API_TOKEN}${SESSION_PREFIX}${fetchedData.sessionId}`
        );
        dispatch(Actions.loadFavoriteMoviesAction(favoriteData.data.results));

        navigate("/"); // auto back to homepage
      }
    } catch (e) {
      alert("Invalid username / password!"); // invalid inputs or errors
      throw e;
    }
  };

  const handleSubmit = () => {
    // input validation, check for empty inputs
    if (username === "" || password === "") {
      alert("Invalid input(s)!");
    } else {
      login(username, password);
    }

    // clearout input fields
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    dispatch(Actions.clearUserDataAction());
    navigate("/"); // auto back to homepage
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <div>
          <h1 id="loginTitle">
            Logged in As:
            <span id="loggedName">{userData.userData.username}</span>
          </h1>
        </div>
        <Button id="logoutBtn" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  } else {
    return (
      <div className="login-container">
        <h1 id="loginTitle">Login</h1>
        <TextField
          id="usernameInput"
          label="Username"
          style={{ color: "red" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText=""
        />
        <TextField
          id="passwordInput"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText=""
        />
        <Button id="loginSubmitBtn" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }
};

export default LoginPage;
