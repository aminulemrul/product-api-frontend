import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeProducttitle = this.onChangeProducttitle.bind(this);
    this.onChangeProductAmount = this.onChangeProductAmount.bind(this);
    this.onChangeProductDescription =
      this.onChangeProductDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeProductImage = this.onChangeProductImage.bind(this);

    // State
    this.state = {
      title: "",
      amount: "",
      description: "",
      image: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/products/" + this.props.match.params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("api-token"),
        },
      })
      .then((res) => {
        this.setState({
          title: res.data.title,
          amount: res.data.price,
          description: res.data.description,
          image: res.data.image,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeProducttitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeProductAmount(e) {
    this.setState({ amount: e.target.value });
  }

  onChangeProductDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeProductImage(e) {
    this.setState({ image: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const productObject = {
      title: this.state.title,
      price: this.state.amount,
      description: this.state.description,
      image: this.state.image,
    };

    axios
      .put(
        "http://localhost:8000/api/products/" + this.props.match.params.id,
        productObject,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("api-token"),
          },
        }
      )
      .then((res) => {
        console.log("product successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    // Redirect to List
    this.props.history.push("/create-product");
  }

  render() {
    return (
      <div className="form-wrapper">
        <h4>Update Product</h4>
        <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={this.onChangeProducttitle}
            />
          </Form.Group>

          <Form.Group controlId="Amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={this.state.amount}
              onChange={this.onChangeProductAmount}
            />
          </Form.Group>

          <Form.Group controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={this.state.description}
              onChange={this.onChangeProductDescription}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <br />
            <Form.Control
              as="input"
              type="file"
              // value={this.state.image}
              onChange={this.onChangeProductImage}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="imageShow">
            <img height="150px" src={this.state.image} />
          </Form.Group>
          <br />
          <Button variant="danger" size="lg" block="block" type="submit">
            Update Product
          </Button>
        </Form>
      </div>
    );
  }
}
