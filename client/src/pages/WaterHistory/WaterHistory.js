import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Moment from "react-moment";

class WaterHistory extends Component {
  state = {
    waterEntries: []
  };

  componentDidMount() {
    this.loadWaterEntries();
  }

  loadWaterEntries = () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    API.getWaterEntries(userId)
      .then(res => {console.log(res);
        this.setState({ waterEntries: res.data.waterEntries });
      })
      .catch(err => console.log(err));
  };

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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.signUserUp({
        email: this.state.email,
        password: this.state.password,
        height: parseInt(this.state.height, 10),
        initialWeight: parseFloat(this.state.initialWeight)
      })
        .then(res => {localStorage.setItem("userId", res.data._id);
            console.log(localStorage.getItem("userId"));
            this.setState({redirect: true});
            // API.getUserByEmail({
            //   email: this.state.email
            // })
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
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
              <h1>Water Intake History Page</h1>
            </Jumbotron>
            <form>
              
              <Link to={"/users/water/"}>
                <FormBtn
                >
                Go Back to Water Intake Page
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
            {this.state.waterEntries.length ? (
            <List>
                {this.state.waterEntries.map(waterEntry => (
                  <ListItem key={waterEntry._id}>
                    {waterEntry.glassesOfWater} (<Moment>{waterEntry.date}</Moment>)
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WaterHistory;