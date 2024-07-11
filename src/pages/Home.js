import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="justigy-content-center">
        <Col className="text-center border shadow-lg py-5">
          <h1>Welcome To Fitnesss Tracker Application</h1>
          <p>Add, Modify, Remove and View Workouts</p>
          <Link className="btn btn-primary" to={"/workouts"}>
            View Workouts
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
