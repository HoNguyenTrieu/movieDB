import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PublicNavbar from "./components/PublicNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetailPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieList from "./pages/MovieList";
function App() {
  return (
    <Router>
      <h1 className="d-flex justify-content-center">Universal Movie</h1>
      <Switch>
        <Route exact path="/movie/:id" component={MovieDetailPage} />
        <Route exact path="/movies" component={MovieList} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
