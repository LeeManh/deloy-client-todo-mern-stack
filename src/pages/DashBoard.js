import React from "react";
import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect } from "react";

//components
import Navbar from "../components/layout/Navbar";
import {
  Container,
  Spinner,
  Button,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";
import SinglePost from "../components/posts/SinglePost";
import AddPostForm from "../components/posts/AddPostForm";
import styled from "styled-components";
import EditPostForm from "../components/posts/EditPostForm";

const ButtonOpen = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: fixed;
  right: 20px;
  bottom: 200px;
  transition: 0.8s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 50%;

  &:hover {
    transform: scale(0.9);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const DashBoard = () => {
  //context
  const {
    postState,
    getPosts,
    showModalAddPost,
    setShowModalAddPost,
    showToast: { show, message },
    setShowToast,
  } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  //
  let body;
  if (postState.postLoading) {
    body = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (postState.posts?.length === 0) {
    body = (
      <div className="text-center mt-5">
        <h2 className="mb-5">Click button below to add your todo</h2>
        <Button variant="primary" onClick={() => setShowModalAddPost(true)}>
          Add Todo
        </Button>
      </div>
    );
  } else {
    body = (
      <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mx-auto mt-3">
        {postState.posts?.map((post) => (
          <Col key={post._id} className="my-2">
            <SinglePost post={post} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="py-3" style={{ position: "relative" }}>
        {body}

        {/* modal add post */}
        <AddPostForm
          modalShow={showModalAddPost}
          setShowModalAddPost={setShowModalAddPost}
        />

        {/* modal edit post */}
        <EditPostForm />

        {/* add btn */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to do</Tooltip>}
        >
          <ButtonOpen onClick={() => setShowModalAddPost(true)}>
            <img src="./assets/icons/add-icon.png" alt="" />
          </ButtonOpen>
        </OverlayTrigger>

        {/* message */}
        <Toast
          show={show}
          style={{ position: "fixed", top: "20%", right: "10px" }}
          className={`bg-success text-white`}
          onClose={() => setShowToast({ show: false, message: "" })}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <strong>{message}</strong>
          </Toast.Body>
        </Toast>
      </Container>
    </>
  );
};

export default DashBoard;
