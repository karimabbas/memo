import { React, useState } from "react";
import { Container } from "@mui/material"
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('UserProfile')));

  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem('UserProfile')))

  }, [user])
  
  return (
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar  />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>

  );
}

export default App;
