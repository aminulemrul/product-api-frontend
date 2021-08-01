import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import Login from "./Login";

function Logout({}) {
  localStorage.removeItem("api-token");
  this.props.history.push("/");
  return <Login></Login>;
}

export default Logout;
