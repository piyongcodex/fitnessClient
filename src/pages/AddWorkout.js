import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./AddWorkout.css";

const AddWorkout = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const create = (e) => {
    e.preventDefault();

    // Show loading feedback
    Swal.fire({
      title: "Adding new workout...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(`https://fitnessapi-uiw7.onrender.com/workouts/addWorkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: user.id,
        name: name,
        duration: duration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "New workout added",
            icon: "success",
            showConfirmButton: true,
          });
          // Reset form fields (if needed)
          setName("");
          setDuration("");
          navigate("/workouts");
        } else {
          Swal.fire({
            title: "Try again",
            icon: "error",
            showConfirmButton: true,
          });
        }
      });
  };

  return (
    <>
      <Container className="add-workout my-5">
        <Row className="justify-content-center align-items-center">
          <Col xs="12" md="5" className="mt-5 py-5">
            <h2 className="text-center mb-3">Add new workout</h2>
            <Form onSubmit={(e) => create(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter workout name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="custom-input"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                  className="custom-input"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="mb-3 custom-input"
              >
                Create
              </Button>
            </Form>
          </Col>
          <Col xs="12" md="4"></Col>
        </Row>
      </Container>
      =
    </>
  );
};

export default AddWorkout;
