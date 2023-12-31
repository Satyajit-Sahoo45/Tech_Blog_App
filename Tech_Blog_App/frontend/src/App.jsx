import React from "react";
import AuthUser from "./Components/AuthUser.jsx";
import Guest from "./Guest/Guest";
import Auth from "./Guest/Auth";

const App = () => {
  const { getToken } = AuthUser();

  if (!getToken()) {
    return <Guest />;
  } else {
    return <Auth />;
  }
};

export default App;
