import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

//components
import { Button, Modal, Form } from "react-bootstrap";

const EditPostForm = () => {
  //context
  const {
    showModalEditPost,
    setShowModalEditPost,
    postState: { post },
    setShowToast,
    updatePost,
  } = useContext(PostContext);

  //state
  const [updatePostForm, setUpdatePostForm] = useState(post);

  const canSubmit = Boolean(updatePostForm?.title);

  useEffect(() => {
    setUpdatePostForm(post);
  }, [post]);

  //handle close
  const onHide = () => {
    setShowModalEditPost(false);
    setUpdatePostForm(post);
  };

  //handle change form
  const onChangeForm = (e) => {
    setUpdatePostForm({ ...updatePostForm, [e.target.name]: e.target.value });
  };

  //handle subit update
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const { success, message } = await updatePost({
      post: updatePostForm,
    });

    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <>
      <Modal
        show={showModalEditPost}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={onHide}
        centered
        onSubmit={onSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update to do 🎉🎉🎉
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
                value={updatePostForm?.title || ""}
                onChange={onChangeForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                style={{ height: "100px" }}
                name="description"
                value={updatePostForm?.description || ""}
                onChange={onChangeForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrl">
              <Form.Label>Link To Learn</Form.Label>
              <Form.Control
                type="text"
                placeholder="url"
                name="url"
                value={updatePostForm?.url || ""}
                onChange={onChangeForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrl">
              <Form.Label>Select status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                value={updatePostForm?.status || ""}
                onChange={onChangeForm}
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

export default EditPostForm;
