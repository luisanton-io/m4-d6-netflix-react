import React, { Component } from "react";
import {
  Col,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import CommentList from "./CommentList";

class Movie extends Component {
  state = {
    imdbID: "",
    selected: false,
    comments: [],
    newComment: {
      comment: "",
      rate: 0,
      elementId: this.props.data.imdbID,
    },
  };

  fetchComments = async (movieID) => {
    console.log("fetching comments for " + this.state.imdbID)
    const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
    const comments = await fetch(commentsUrl + movieID, {
      headers: {
        "Authorization": "Basic " + btoa("user17:6DJn4e5qbqb2a4D8")
      },
    }).then((response) => response.json());
    this.setState({ comments });
  };

  submitComment = async (e) => {
    e.preventDefault();
    const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
    const response = await fetch(commentsUrl, {
      method: "POST",
      body: JSON.stringify(this.state.newComment),
      headers: {
        "Authorization": "Basic " + btoa("user17:6DJn4e5qbqb2a4D8"),
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      alert("Comment added");
      this.setState({
        newComment: {
          comment: "",
          rate: 0,
          elementId: this.props.data.imdbID,
        },
      });
    } else {
      alert("An error has occurred");
    }
  };

  handleRadioChange = (e) => {
    let newComment = this.state.newComment;
    newComment.rate = e.currentTarget.id;
    this.setState({ newComment });
  };

  handleCommentText = (e) => {
    let newComment = this.state.newComment;
    newComment.comment = e.currentTarget.value;
    this.setState({ newComment });
  };

  render() {
    return (
      <Col className="mb-2" key={this.props.data.imdbID}>
        <img
          className="img-fluid"
          src={this.props.data.Poster}
          alt="movie"
          onClick={() => {
            this.setState({ 
              selected: !this.state.selected,
              imdbID: this.props.data.imdbID
            }, () => {this.fetchComments(this.state.imdbID)});
          }}
        />
        <Modal
          show={this.state.selected}
          onHide={() => this.setState({ selected: !this.state.selected })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Movie comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-3">
              {this.state.comments.length > 0 &&
                this.state.comments[0].elementId === this.state.imdbID && (
                  <CommentList key={this.state.imdbID + Math.random()* Math.random()} comments={this.state.comments} />
                )}
              <div className="text-center">
                <h5 className="my-3">Add a comment</h5>
                <Form onSubmit={this.submitComment}>
                  <div className="my-3 text-center">
                    {
                      [1,2,3,4,5].map(value => {
                        return <Form.Check
                          inline
                          label={value}
                          type="radio"
                          id={value}
                          name="rating"
                          key={this.state.imdbID + "-rate-" + value}
                          onClick={this.handleRadioChange}
                        />
                      })
                    }
                  </div>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Write your comment"
                      aria-label="comment"
                      aria-describedby="basic-addon1"
                      onChange={this.handleCommentText}
                      value={this.state.newComment.comment}
                    />
                  </InputGroup>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

export default Movie;
