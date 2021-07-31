import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";

export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("api-token");
    // axios
    //   .get(
    //     "http://localhost:8000/api/logout/",
    //     localStorage.getItem("api-token"),
    //     {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("api-token"),
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     localStorage.removeItem("api-token");
    //     console.log(res);
    //     this.props.history.push("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.props.history.push("/");
  }
  render() {
    return <div></div>;
  }
}
