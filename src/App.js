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
  const [token, setToken] = useState(localStorage.getItem("authToken"))
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
        try {
            async function getUser() {
                const userData = await ShareBnbApi.getUser();
                console.log("userData in useEffect", userData)
                setCurrUser(userData);
                setIsLoading(false);
            }
            getUser();
        }
        catch (error) {
            console.error(error);
        }
    } else {
        setIsLoading(false);
    }

}, [token]);

  /** logs a user in */
  async function login(formData) {
    const user = await ShareBnbApi.login(formData);
    const jwt = user.user.jwt;

    localStorage.setItem("authToken", jwt);
    ShareBnbApi.token = localStorage.getItem("authToken");
    console.log(user)
    setToken(jwt);
  }

  /** registers a user */
  async function signup(formData) {
    const user = await ShareBnbApi.signup(formData);
    console.log(user);
    localStorage.setItem("authToken", user);
    setCurrUser(user);
  }

  function logout() {
    setToken(null);
    ShareBnbApi.token = null;
    setCurrUser(null);
    localStorage.removeItem("authToken");
  }


  if (isLoading) {
    return (
        <p>LOADING..</p>
    );
}

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
