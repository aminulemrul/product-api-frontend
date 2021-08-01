import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

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
        Swal.fire("Alert!", "Product Deleted Successfully", "success");
        this.props.history.push("/create-listing");
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
        <td>
          <img
            width="40"
            src={
              "http://localhost:8000/storage/products/" + this.props.obj.image
            }
            alt=""
          />
        </td>
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
