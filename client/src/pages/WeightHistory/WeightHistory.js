import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class WeightHistory extends Component {
  state = {
    weightEntries: []
  };

  componentDidMount() {
    this.loadWeightEntries();
  }

  loadWeightEntries = () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    API.getWeightEntries({
      id: userId
    })
      .then(res => {console.log(res);
        this.setState({ weightEntries: res.data.weightEntries });
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
              <h1>Weight Entry History Page</h1>
            </Jumbotron>
            <form>
              
              <Link to={"/users/weight/"}>
                <FormBtn
                >
                Go Back to Weight Entry Page
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
            {this.state.weightEntries.length ? (
            <List>
                {this.state.weightEntries.map(weightEntry => (
                  <ListItem key={weightEntry._id}>
                    {weightEntry.weight} ({weightEntry.date})
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

export default WeightHistory;