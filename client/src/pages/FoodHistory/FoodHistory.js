import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Moment from "react-moment";
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

class FoodHistory extends Component {
  state = {
    foodEntries: []
  };

  componentDidMount() {
    this.loadFoodEntries();
  }

  loadFoodEntries = () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    API.getFoodEntries(userId)
      .then(res => {console.log(res);
        this.setState({ foodEntries: res.data.foodEntries });
      })
      .catch(err => console.log(err));
  };

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
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/users/options" />;
    }
    var points = [];
    // s represents sum (accumulator), i represents the current food item
    points.push(["Protein", this.state.foodEntries.reduce(function(s, i) {return s + i.protein}, 0)]);
    points.push(["Fat", this.state.foodEntries.reduce(function(s, i) {return s + i.fat}, 0)]);
    points.push(["Carbs", this.state.foodEntries.reduce(function(s, i) {return s + i.carbs}, 0)]);
    points.push(["Fiber", this.state.foodEntries.reduce(function(s, i) {return s + i.fiber}, 0)]);
    points.push(["Sugar", this.state.foodEntries.reduce(function(s, i) {return s + i.sugar}, 0)]);
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Food History Page</h1>
            </Jumbotron>
            <PieChart data={points} />
            <form>
              
              <Link to={"/users/food/"}>
                <FormBtn
                >
                Go Back to Food Entry Page
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
            {this.state.foodEntries.length ? (
            <List>
                {this.state.foodEntries.map(foodEntry => (
                  <ListItem key={foodEntry._id}>
                    {foodEntry.foodItem} (<Moment format="YYYY/MM/DD">{foodEntry.date}</Moment>) Calories: {foodEntry.energy}
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

export default FoodHistory;