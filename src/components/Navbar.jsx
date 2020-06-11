import React, { Component } from "react";
import { Navbar, Nav, InputGroup, FormControl } from "react-bootstrap";
import {Link} from 'react-router-dom'

class NetflixNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
    };
  }

  searchStringHandler = (e) => {
    console.log(e.keyCode)
    switch (e.keyCode) {
      case 13: 
        this.props.showSearchResult(this.state.searchString);
        break
      case 8:
      case 46:
        if (e.currentTarget.value.length === 0) {
          this.props.defaultView()
        }
        break
      default:
        this.setState({ searchString: e.currentTarget.value });
    }
  };

  render() {
    return (
      <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#221f1f" }}>
        <Navbar.Brand as={Link} to="/">
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ width: "100px", height: "55px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="font-weight-bold" href="/">
              Home
            </Nav.Link>
            <Nav.Link active className="font-weight-bold" href="/">
              TV Shows
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              Movies
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              Recently Added
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              My List
            </Nav.Link>
          </Nav>
          <span className="d-none d-md-flex align-items-center">
            <InputGroup className="icons">
              <FormControl
                placeholder="Search and press enter"
                aria-label="search"
                aria-describedby="basic-addon1"
                onKeyUp={this.searchStringHandler}
                onChange={this.searchStringHandler}
                value={this.state.searchString}
              />
            </InputGroup>
            <div id="kids">KIDS</div>
            <i className="fa fa-bell icons"></i>
            <Link to='/register'><i className="fa fa-user icons"></i></Link>
          </span>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NetflixNavbar;
