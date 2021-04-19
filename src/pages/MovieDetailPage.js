import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import api from "../apiService";

const API_KEY = process.env.REACT_APP_API_KEY;

// const MOVIETRAILER = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${movieAPI}&language=en-US`;
const MovieDetailPage = () => {
  const color = "#d35400";
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [addingMovie, setAddingMovie] = useState(false);
  let [movieID, setMovieID] = useState("");
  const [show, setShow] = useState(false);
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
                    {movie.genres.map((item) => {
                      return (
                        <Badge pill className="mr-2" variant="danger">
                          {item.name}
                        </Badge>
                      );
                    })}
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
