import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";

export default class Login extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email: "",
      password: "",
    };
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post("http://localhost:8000/api/login/", loginData).then((res) => {
      if (res.data.success) {
        localStorage.setItem("api-token", res.data.token);
        this.props.history.push("/create-product");
      }
    });

    this.setState({ email: "", password: "" });
  }
  render() {
    return (
      <div className="form-wrapper">
        <br />
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col></Col>
            <Col>
              <Form.Group controlId="Email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Form.Group controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <br />
          <Button variant="primary" size="lg" block="block" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}
