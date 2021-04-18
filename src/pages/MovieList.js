import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import api from "../apiService";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const MovieList = () => {
  const [readingList, setReadingList] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getReadingList = async () => {
      try {
        let res = await api.get("favorites");
        // console.log("readinglist", res);
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReadingList();
  }, []);

  const handleClickBook = (bookId) => {
    history.push(`/books/${bookId}`);
    // history.push(`/reading`);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">Reading List</h1>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <hr />
        </Col>
      </Row>
      <Row>
        {loading ? (
          <div>Loading..</div>
        ) : (
          <ul className="list-unstyled d-flex flex-wrap justify-content-between">
            {books.map((book) => (
              <li key={book.id} onClick={() => handleClickBook(book.id)}>
                <Card
                  style={{
                    width: "12rem",
                    height: "27rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`${BACKEND_API}/${book.imageLink}`}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>@{book.author}</Card.Text>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Row>
    </Container>
  );
};

export default MovieList;
