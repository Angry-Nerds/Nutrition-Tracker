import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

const Water = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>Glasses of Water Counter Page</h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default Water;