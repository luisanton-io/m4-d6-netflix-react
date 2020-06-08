import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

class CommentList extends React.Component {

componentWillUnmount() {
  console.log("byebye")
}

render() {
  let comments = this.props.comments
  return (
    <>
    {
      comments.map((comment) => (
        <ListGroup key={comment._id}>
          <ListGroup.Item>
            <Badge pill variant="info" className="mr-3">
              {comment.rate}
            </Badge>
            {comment.comment}
          </ListGroup.Item>
        </ListGroup>
      ))
    }
    </>
  )
}
}

export default CommentList;
