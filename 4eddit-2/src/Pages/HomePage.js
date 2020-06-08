import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  
  const goToLoginPage = () => {
    history.push("/");
  };

  const goToRegistroPage = () => {
    history.push("/registro");
  };

  return (
    <div>
      <h3>Home</h3>
      <button onClick={goToRegistroPage}>Ir para página de Registro</button>
      <button onClick={goToLoginPage}>Ir para página de Login</button>
    </div>
  );
};

export default HomePage;