import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../apiService";
import { Badge, Col, Container, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PropagateLoader from "react-spinners/PropagateLoader";

// const MOVIETRAILER = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${movieAPI}&language=en-US`;
const MovieDetailPage = () => {
  const color = "#d35400";
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [addingMovie, setAddingMovie] = useState(false);
  const params = useParams();
  console.log(params);

  const addToFavorites = (movie) => {
    // console.log(movie)
    setAddingMovie(movie);
  };

  // This function to get data details books
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/movie/${params.id}?`);
        const data = res.data;
        setMovie(data);
      } catch (error) {}
      setLoading(false);
    };
    fetchData();
  }, [params]);

  return (
    <>
      {loading ? (
        <PropagateLoader color={color} loading={loading} size={15} />
      ) : (
        <>
          {movie && (
            <Container className="d-flex justify-content-between mt-4">
              <Row md={3}>
                <Col>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="movie poster"
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
                    </Badge>
                  </div>
                  <Button
                    className="mt-5"
                    variant="outline-danger"
                    onClick={() => addToFavorites(movie)}
                  >
                    Add favorite
                  </Button>
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
