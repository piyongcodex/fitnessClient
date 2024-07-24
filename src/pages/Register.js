import { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import "./Register.css";

export default function Register() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch("https://fitnessapi-uiw7.onrender.com/users/register", {
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
        //determine the returned data. Especially useful when the given API is online.
        console.log(data);

        //data will only contain an email property if we can properly save our user.
        if (data.message === "Registered SUccessfully") {
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Registration Successful",
            icon: "success",
            text: "Thank you for registering!",
          });
        }
      });
  }

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password, confirmPassword]);

  return user.id !== null ? (
    <Navigate to="/workouts" />
  ) : (
    <Container className="register my-5">
      <Row className="justify-content-center align-items-center">
        <Col xs="12" md="6"></Col>
        <Col xs="12" md="4" className="mt-5 py-5">
          <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="custom-item my-2"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="custom-item my-2"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="custom-item my-2"
              />
            </Form.Group>
            {isActive ? (
              <Button
                variant="primary"
                type="submit"
                className="custom-item my-3"
              >
                Submit
              </Button>
            ) : (
              <Button variant="primary" disabled className="custom-item my-3">
                Submit
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
