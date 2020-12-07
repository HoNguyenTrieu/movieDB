import React, { useState, useEffect } from "react";
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";
import { useHistory } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import api from "../apiService";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const limit = 10;

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleClick = (id) => {
    //go to url/id
    history.push(`/movie/${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `discover/movie?sort_by=popularity.desc&page=${pageNum}`;
        if (query) url = `search/movie?query=${query}`;

        const res = await api.get(url);
        const data = res.data;
        console.log(data);
        setMovies(data.results);
        setTotalPage(data.total_pages);
        console.log(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [query, pageNum]);

  return (
    <>
      <PublicNavbar
        loading={loading}
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmitSearch}
      />

      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <PaginationBar
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPageNum={totalPage}
            />
          </Col>
        </Row>
        <Row>
          {loading ? (
            <div>Loading..</div>
          ) : (
            <div className="d-flex justify-content-around flex-wrap movie">
              {movies.map((movie) => (
                <Card
                  key={movie.id}
                  style={{ width: "18rem" }}
                  onClick={() => handleClick(movie.id)}
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text className="textbox movie-over">
                      {movie.overview}
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
