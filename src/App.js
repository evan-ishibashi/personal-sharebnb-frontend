import './App.css';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RoutesList from './RoutesList';
import NavBar from './NavBar';
// import jwt_decode from "jwt-decode";
import userContext from "./userContext";
import PhotoForm from './PhotoForm';
import ShareBnbApi from './api';

/** App.
 *  Renders Nav and Routes for Sharebnb App. */
function App() {
  const [currUser, setCurrUser] = useState(null);

  /** logs a user in */
  async function login(formData) {
    const user = await ShareBnbApi.login(formData);

    localStorage.setItem("currUser", user.user.id);
    setCurrUser(user);
  }

  /** registers a user */
  async function signup(formData) {
    const user = await ShareBnbApi.signup(formData);
    console.log(user);
    localStorage.setItem("currUser", user);
    setCurrUser(user);
  }

  function logout() {
    setCurrUser(null);
    localStorage.removeItem("currUser");
    //TODO:redirect back to login
  }


  //TODO: incorporate jwts
  //TODO: finish functionality of app

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ currUser }}>
          <NavBar currUser={currUser} logout={logout} />
          <RoutesList login={login} signup={signup} currUser={currUser} />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
