import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const RemoveWorkoutButton = ({ workout, reload }) => {
  const remove = (workoutId) => {
    // Show loading feedback
    Swal.fire({
      title: "Removing workout...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(
      `https://fitnessapi-uiw7.onrender.com/workouts/deleteWorkout/${workoutId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Workout deleted successfully") {
          Swal.fire({
            title: "Item removed",
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
  return (
    <Button variant="danger" size="sm" onClick={() => remove(workout)}>
      Remove
    </Button>
  );
};

export default RemoveWorkoutButton;
