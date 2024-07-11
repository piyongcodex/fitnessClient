import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const WorkOutStatusButton = ({ workout, status, reload }) => {
  const complete = (workoutId) => {
    // Show loading feedback
    Swal.fire({
      title: "Completing workout...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(
      `https://fitnessapi-uiw7.onrender.com/workouts/completeWorkout/${workoutId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Workout status updated successfully") {
          Swal.fire({
            title: "Workout completed!",
            icon: "success",
          });
          //reload the workout list
          reload();
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please try again",
          });
        }
      });
  };

  return status === "pending" ? (
    <Button variant="success" size="sm" onClick={() => complete(workout)}>
      Pending
    </Button>
  ) : (
    <p>Completed</p>
  );
};

export default WorkOutStatusButton;
