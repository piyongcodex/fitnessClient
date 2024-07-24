import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Workouts from "./pages/Workouts";
import Logout from "./pages/Logout";
import AddWorkout from "./pages/AddWorkout";
import Error from "./pages/Error";

import { UserProvider } from "./UserContext";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });
  //unsetter
  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`https://fitnessapi-uiw7.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log({ data });
        if (data.message === "jwt malformed") {
          setUser({
            id: null,
            isAdmin: null,
          });
        } else {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        }
      });
  });

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/add" element={<AddWorkout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
