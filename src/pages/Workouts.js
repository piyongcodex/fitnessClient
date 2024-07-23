import React, { useEffect, useState, useContext } from "react";
import { Container, Table, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import RemoveWorkoutButton from "../components/RemoveWorkoutButton";
import WorkOutStatusButton from "../components/WorkOutStatusButton";
import WorkoutModal from "../components/WorkoutModal";
import UserContext from "../UserContext";

const Workouts = () => {
  const { user } = useContext(UserContext);
  // console.log(user.id);
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    fetch(`https://fitnessapi-uiw7.onrender.com/workouts/getMyWorkouts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "No items found.") {
          setWorkouts(data.workouts);
        }
      });
  }, []);

  const reload = () => {
    fetch(`https://fitnessapi-uiw7.onrender.com/workouts/getMyWorkouts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No items found.") {
          setWorkouts([]);
        } else {
          setWorkouts(data.workouts);
        }
      });
  };

  const handleRowDoubleClick = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWorkout(null);
  };

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <Container>
      <Row className="justify-content-center">
        <Col xs md="10" className="mt-5">
          <h1>Fitness Tracker</h1>
          <hr></hr>
          <ul>
            <li>Updating - Double Click the workout you want to update.</li>
            <li>Deleting - Click the 'Remove' Button.</li>
            <li>Completing - Click the 'pending' Button of the working out.</li>
            <li>
              Revert 'completed' Workout - Double Click the workout you want to
              update.
            </li>
          </ul>
        </Col>
        <Col xs md="10">
          <Table striped bordered hover className="shadow-lg">
            <thead>
              <tr>
                <th className="text-center">Workouts</th>
                <th className="text-center">Duration</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {workouts && workouts.length > 0 ? (
                workouts.map((workout, index) => (
                  <tr
                    key={index}
                    onDoubleClick={() => handleRowDoubleClick(workout)}
                  >
                    <td className="text-center pt-3">{workout.name}</td>
                    <td className="text-center pt-3">{workout.duration}</td>
                    <td className="text-center pt-3">
                      <WorkOutStatusButton
                        workout={workout._id}
                        reload={reload}
                        status={workout.status}
                      />
                    </td>
                    <td className="text-center pt-3">
                      <RemoveWorkoutButton
                        workout={workout._id}
                        reload={reload}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No workouts found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {selectedWorkout && (
            <WorkoutModal
              show={showModal}
              handleClose={handleCloseModal}
              workout={selectedWorkout}
              reload={reload}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Workouts;
