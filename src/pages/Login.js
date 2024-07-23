import { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  // console.log(user.id);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    // Prevents page redirection via form submission
    e.preventDefault();
    fetch("https://fitnessapi-uiw7.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        localStorage.setItem("token", data.access);
        retrieveUserDetails(data.access);

        Swal.fire({
          title: "Login Successful",
          icon: "success",
          text: "Welcome to Fitness Tracker Application!",
        });
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch("https://fitnessapi-uiw7.onrender.com/users/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <>
      <Navigate to="/workouts" />
    </>
  ) : (
    <Container className="my-5 p-3">
      <Row className="justify-content-center">
        <Col xs="10" md="4" className="border shadow-sm">
          <Form onSubmit={(e) => authenticate(e)}>
            <h1 className="my-5 text-center">Login</h1>
            <Form.Group controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {isActive ? (
              <Button
                variant="primary"
                type="submit"
                id="submitBtn"
                className="my-3"
              >
                Enter
              </Button>
            ) : (
              <Button
                variant="danger"
                type="submit"
                id="submitBtn"
                disabled
                className="my-3"
              >
                Enter
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
