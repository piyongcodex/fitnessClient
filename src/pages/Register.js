import { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

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
        if (data.message === "Registered Successfully") {
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
    <Container className="my-5">
      <Row className="justify-content-center align-items-center">
        <Col xs="12" md="6" className="border shadow-lg">
          <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
            {isActive ? (
              <Button variant="primary" type="submit" className="my-3">
                Submit
              </Button>
            ) : (
              <Button variant="primary" disabled className="my-3">
                Submit
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
