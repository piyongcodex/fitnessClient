import { Row, Col, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Container className="home py-5">
        <Row className="justify-content-center align-items-center py-5 mx-2">
          <Col xs="12" md="8"></Col>
          <Col xs="12" md="4" className="py-5">
            <div className="home-reach"></div>
            <p>
              Whether you’re training for a marathon or your biggest season yet,
              we’re here to help you make serious progress.
            </p>
            {user.id === null ? (
              <>
                <Link to="/register" className="btn btn-primary me-3">
                  Sign Up
                </Link>
                <label>Already a member?</label> <Link to="/login">Log in</Link>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Container className="featured mt-5 py-5">
        <Row className="justify-content-center align-items-center">
          <Col xs="4" className="feature-img"></Col>
          <Col xs="4 ms-5">
            <h1>Set Goals. Log Workouts. Stay On Track</h1>
            <p>
              Easily track your Workouts, set Training Plans, and discover new
              Workout Routines to crush your goals.
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="about mt-5 py-5">
        <Row className="justify-content-center align-items-center">
          <Col xs="4 me-5">
            <h1 className="text-center">Goal</h1>
            <p>
              To empower individuals to achieve their health and fitness goals
              by providing innovative and personalized tracking solutions,
              fostering a community of support, and promoting a healthier
              lifestyle for everyone. And to deliver an intuitive and engaging
              fitness tracking experience that motivates users to set and reach
              their fitness goals. We aim to provide accurate data, actionable
              insights, and a supportive community, helping users to live
              healthier, more active lives.
            </p>
          </Col>
          <Col xs="4" className="about-img"></Col>
        </Row>
      </Container>
      <footer className="text-center border">
        <p>@All Rights Reserved 2024</p>
      </footer>
    </>
  );
}
