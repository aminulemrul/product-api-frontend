import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class ProductTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct() {
    axios
      .delete("http://localhost:8000/api/product/" + this.props.obj.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("api-token"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log("Product removed deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.price}</td>
        <td>{this.props.obj.description}</td>
        <td>{this.props.obj.image}</td>
        <td>
          <Link className="edit-link" to={"/edit-product/" + this.props.obj.id}>
            <Button size="sm" variant="info">
              Edit
            </Button>
          </Link>
          <Button onClick={this.deleteProduct} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
