import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import Zoom from "react-reveal/Zoom";
// import SearchForm from "../components/SearchForm";
import { useHistory } from "react-router-dom";
import api from "../apiService";
import PaginationBar from "../components/PaginationBar";
import PublicNavbar from "../components/PublicNavbar";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // const limit = 10;
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  const history = useHistory();
  const handleClick = (id) => {
    //go to url/id
    history.push(`/movie/${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `discover/movie?sort_by=popularity.desc&page=${pageNum}`;
        if (query) url = `search/movie?query=${query}`;

        const res = await api.get(url);
        const data = res.data;
        console.log(data);
        setMovies(data.results);
        setTotalPage(data.total_pages);
        console.log(data.results);
        setLoading(false);
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
      <h1 className="d-flex justify-content-center">Universal Movie</h1>
      <div className="container-fluid">
        <div className="Row">
          <Row className="justify-content-center">
            <Col md={9}>
              <PaginationBar
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPage}
              />
            </Col>
          </Row>
          <div className="col-md-12 d-flex flex-wrap justify-content-center">
            {movies &&
              movies.map((movie) => {
                return (
                  <Zoom>
                    <div>
                      <Card
                        id="card"
                        className="bg-dark text-white"
                        key={movie.id}
                        onClick={() => handleClick(movie.id)}
                      >
                        <Card.Img
                          id="card-image"
                          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                          alt="Card image"
                        />
                        <Card.ImgOverlay>
                          <div id="card-content">
                            <Card.Title className="mb-3">
                              <a
                                id="movie-title"
                                href={`https://www.themoviedb.org/movie/${movie.id}?language=en-US`}
                              >
                                {movie.title}
                              </a>
                            </Card.Title>
                            <Card.Text className="mb-2">
                              <Badge pill className="mr-2" variant="danger">
                                <strong>Release date: </strong>
                                {movie.release_date}
                              </Badge>
                            </Card.Text>
                            <Card.Text>Ratings: {movie.vote_average}</Card.Text>
                            <Card.Text>
                              Release Date:{" "}
                              <Moment format="D MMM YYYY" withTitle>
                                {movie.release_date}
                              </Moment>
                            </Card.Text>
                            <Card.Text>
                              {/* <Button
                                variant="outline-danger"
                                onClick={() => props.addFavorite(movie)}
                              >
                                Add to Favorite
                              </Button> */}
                              {/* <Button
                                variant="outline-success"
                                onClick={() => props.searchYoutube(movie.id)}
                              >
                                View Trailer
                              </Button> */}
                            </Card.Text>
                            <Card.Text>
                              <div id="overview-text">{movie.overview}</div>
                            </Card.Text>
                          </div>
                        </Card.ImgOverlay>
                      </Card>
                    </div>
                  </Zoom>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
