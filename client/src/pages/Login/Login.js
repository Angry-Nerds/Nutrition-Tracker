import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: ""
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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.logUserIn({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if (res.data.user) {
            localStorage.setItem("userId", res.data.user._id);
            console.log(localStorage.getItem("userId"));
            this.setState({redirect: true});
          }
          
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/users/options" />;
    }
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Log In To Already Existing Account:</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
              <h5>We will never share your email with anyone.</h5>
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password (required)"
              />
              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Log In
              </FormBtn>
              <br />
              <br />
              <Link to={"/users/signup"}>
                <FormBtn
                >
                Go to Sign-Up Page
              </FormBtn>
              </Link>
              
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;