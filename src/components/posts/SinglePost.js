import React from "react";

import { Card, Badge } from "react-bootstrap";
import ActionsButton from "./ActionsButton";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <>
      <Card className="shadow">
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Badge
            bg={
              status === "To learn"
                ? "danger"
                : status === "Leaning"
                ? "warning"
                : "success"
            }
            className="mb-2"
          >
            {status}
          </Badge>

          <Card.Text>{description}</Card.Text>
          <ActionsButton url={url} id={_id} />
        </Card.Body>
      </Card>
    </>
  );
};

export default SinglePost;
