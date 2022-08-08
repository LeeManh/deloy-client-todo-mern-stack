import React, { useState, useContext } from "react";
//compoents
import { Button, Modal, Form } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

const AddPostForm = ({ modalShow, setShowModalAddPost }) => {
  //context
  const { addPost, setShowToast } = useContext(PostContext);

  //state
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "",
  });

  const canSubmit = newPost.title && newPost.description;

  //handle event
  const onChangeNewPost = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const onHide = () => {
    setShowModalAddPost(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const { success, message } = await addPost(newPost);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <>
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={onHide}
        centered
        onSubmit={onSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add to do 🎉🎉🎉
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                required
                name="title"
                value={newPost.title}
                onChange={onChangeNewPost}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                style={{ height: "100px" }}
                name="description"
                value={newPost.description}
                onChange={onChangeNewPost}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrl">
              <Form.Label>Link video to learn</Form.Label>
              <Form.Control
                type="text"
                placeholder="url"
                name="url"
                value={newPost.url}
                onChange={onChangeNewPost}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrl">
              <Form.Label>Select status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                value={newPost.status}
                onChange={onChangeNewPost}
              >
                <option>Open this select menu</option>
                <option value="To learn">To learn</option>
                <option value="Learning">Learning</option>
                <option value="Learned">Learned</option>
              </Form.Select>
            </Form.Group>

            <Button
              type="submit"
              disabled={!canSubmit}
              variant={canSubmit ? "primary" : "secondary"}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPostForm;
