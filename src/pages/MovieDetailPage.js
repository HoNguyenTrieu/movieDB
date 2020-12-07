import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../apiService";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

// const MOVIETRAILER = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${movieAPI}&language=en-US`;
const MovieDetailPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/movie/${params.id}?`);
        const data = res.data;
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [params]);

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {movie && (
            <Container className="d-flex justify-content-between mt-4">
              <Row md={3}>
                <Col>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
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
          )}
        </>
      )}
    </>
  );
};

export default MovieDetailPage;
