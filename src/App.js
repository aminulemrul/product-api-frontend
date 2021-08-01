import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import Login from "./components/Login";

function App() {
  const [IslogedIn, setIslogedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("api-token")) {
      setIslogedIn(true);
    }
  }, []);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("api-token");
    setIslogedIn(false);
    history.push("/");
  };
  // console.log(IslogedIn);
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="success" variant="success">
            <Container>
              <Navbar.Brand>
                <Link
                  to={"/create-product"}
                  className="nav-link"
                  style={{ color: "#fff" }}
                >
                  Product manager
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                {IslogedIn ? (
                  <Nav>
                    <Link
                      to={"/create-product"}
                      className="nav-link"
                      style={{ color: "#fff" }}
                    >
                      Create Product
                    </Link>
                    <Link
                      to={"/product-listing"}
                      className="nav-link"
                      style={{ color: "#fff" }}
                    >
                      Product List
                    </Link>
                    <Link
                      onClick={logout}
                      className="nav-link"
                      style={{ color: "#fff" }}
                    >
                      Logout
                    </Link>
                  </Nav>
                ) : (
                  <Link to={"/"} className="nav-link" style={{ color: "#fff" }}>
                    Login
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/create-product" component={CreateProduct} />
                  <Route path="/edit-product/:id" component={EditProduct} />
                  <Route path="/product-listing" component={ProductList} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
