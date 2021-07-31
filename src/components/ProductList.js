import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ProductTableRow from "./ProductTableRow";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/products/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("api-token"),
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          products: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.products.map((res, i) => {
      return <ProductTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name / Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}
