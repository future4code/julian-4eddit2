import React from 'react';
import {Switch, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"

const baseUrl= 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage baseUrl={baseUrl} />
        </Route>
        <Route exact path="/home">
          <HomePage baseUrl={baseUrl} />
        </Route>
        <Route exact path="/registro">
          <RegisterPage baseUrl={baseUrl} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};


export default App;

