import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";
const PublicNavbar = ({
  loading,
  searchInput,
  handleSearchChange,
  handleSubmit,
}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img src={logo} alt="CoderSchool" width="200px" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/favorites">
          Favorite Movie
        </Nav.Link>
      </Nav>
      <SearchForm
        loading={loading}
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
      />
    </Navbar>
  );
};

export default PublicNavbar;
