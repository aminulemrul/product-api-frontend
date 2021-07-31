import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import ProductList from "./ProductList";
import Swal from "sweetalert2";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeProductDescription =
      this.onChangeProductDescription.bind(this);
    this.onChangeProductImage = this.onChangeProductImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      title: "",
      description: "",
      price: "",
      image: "",
    };
  }

  onChangeName(e) {
    this.setState({ title: e.target.value });
  }

  onChangeAmount(e) {
    this.setState({ price: e.target.value });
  }

  onChangeProductDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeProductImage(e) {
    this.setState({ image: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const product = {
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      image: this.state.image,
    };

    axios
      .post("http://localhost:8000/api/products/", product, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("api-token"),
        },
      })
      .then((res) => console.log(res.data));
    // console.log(`product successfully created!`);
    // console.log(`Description: ${this.state.description}`);
    Swal.fire("Good job!", "Product Added Successfully", "success");

    this.setState({ title: "", price: "", description: "", image: "" });
  }

  render() {
    return (
      <div className="form-wrapper">
        <br />
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="Title">
                <Form.Label>Name / Title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.title}
                  onChange={this.onChangeName}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="Price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={this.state.price}
                  onChange={this.onChangeAmount}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="textarea"
                  value={this.state.description}
                  onChange={this.onChangeProductDescription}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <br />
                <Form.Control
                  as="input"
                  type="file"
                  required
                  value={this.state.image}
                  onChange={this.onChangeProductImage}
                />
              </Form.Group>
            </Col>
          </Row>

          <br />
          <Button variant="primary" size="lg" block="block" type="submit">
            Add Product
          </Button>
        </Form>
        <br></br>
        <br></br>

        <ProductList> </ProductList>
      </div>
    );
  }
}
