import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Water extends Component {
  state = {
    glassesOfWater: 0
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleIncrement = event => {
    event.preventDefault();
    if (this.state.glassesOfWater === 0) {
      API.saveWaterEntry({
        glassesOfWater: 1,
        userId: localStorage.getItem("userId")
      })
      .then(res => {console.log(res);
        this.setState({ glassesOfWater: this.state.glassesOfWater + 1 });
      })
      .catch(err => console.log(err));
    }
    else {
      
    }
  }

  handleDecrement = event => {
    event.preventDefault();
    if (this.state.glassesOfWater > 0) {
      API.saveWaterEntry({
        glassesOfWater: 0,
        userId: localStorage.getItem("userId")
      })
      .then(res => {console.log(res);
        this.setState({ glassesOfWater: this.state.glassesOfWater - 1});
      })
      .catch(err => console.log(err));
    }
    else {
      
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/users/options" />;
    }
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Glasses of Water Counter Page</h1>
              <h2>{this.state.glassesOfWater}</h2>
            </Jumbotron>
            <form>
            <FormBtn
                  onClick={this.handleIncrement}
                >
                  Add a Glass to Today's Water Intake
                </FormBtn>
                <FormBtn
                  onClick={this.handleDecrement}
                >
                  Subtract a Glass from Today's Water Intake
                </FormBtn>
                <br />
                <br />
              <Link to={"/users/water/history"}>
                <FormBtn
                >
                View Water Intake History
              </FormBtn>
              </Link>
              <br />
              <br />
              <Link to={"/users/options"}>
                <FormBtn
                >
                Go Back to User Options
              </FormBtn>
              </Link>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Water;