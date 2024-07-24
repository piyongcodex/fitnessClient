import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import "./WorkoutModal.css";

const WorkoutModal = ({ show, handleClose, workout, reload }) => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    status: "",
  });

  useEffect(() => {
    if (workout) {
      setFormData({
        name: workout.name,
        duration: workout.duration,
        status: workout.status,
      });
    }
  }, [workout]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (status) => {
    setFormData({ ...formData, status });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading feedback
    Swal.fire({
      title: "Completing workout...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        `https://fitnessapi-uiw7.onrender.com/workouts/updateWorkout/${workout._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.message === "Workout updated successfully") {
        Swal.fire({
          title: "Workout updated!",
          icon: "success",
        });
        reload();
      } else {
        Swal.fire({
          title: "Something Went Wrong",
          icon: "error",
          text: "Please try again",
        });
      }

      handleClose(); // Close modal regardless of success or failure
    } catch (error) {
      console.error("Error updating workout:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "An error occurred while updating the workout. Please try again later.",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Edit Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formWorkoutName" className="mb-3">
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="modal-name"
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutDuration" className="mb-3">
            <Form.Control
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="modal-duration"
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutStatus" className="mb-3">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="dropdown-toggle-custom"
              >
                {formData.status || "Select Status"}
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-custom">
                <Dropdown.Item
                  className="dropdown-item-custom"
                  onClick={() => handleStatusChange("pending")}
                >
                  Pending
                </Dropdown.Item>
                <Dropdown.Item
                  className="dropdown-item-custom"
                  onClick={() => handleStatusChange("completed")}
                >
                  Completed
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="dropdown-item-custom"
          >
            Save changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WorkoutModal;
