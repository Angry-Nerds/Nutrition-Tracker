import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

const WeightHistory = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>Weight History Page (eventually with Line Chart)</h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default WeightHistory;