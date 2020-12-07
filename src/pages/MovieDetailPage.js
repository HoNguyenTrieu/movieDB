import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

const movieAPI = `3a1109b8a35a6e63dd7648e5ed7fe773`;
// const MOVIETRAILER = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${movieAPI}&language=en-US`;
const MovieDetailPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${movieAPI}`
      );
      const data = await res.json();

      setMovie(data);
      console.log(data);
    };
    fetchData();
  }, []);
  if (!movie) return <div>Loading...</div>;
  return (
    <Container className="d-flex justify-content-between mt-4">
      <Row md={3}>
        <Col>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
        </Col>
      </Row>
      <Row md={9}>
        <Col className="ml-5">
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <Badge variant="info">
              <strong>Release date: </strong>
              {movie.release_date}
            </Badge>{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
