import React, { useContext } from "react";
import styled from "styled-components";

import { PostContext } from "../../contexts/PostContext";

const Wrapper = styled.div`
  display: flex;
  column-gap: 8px;
  margin: 10px 0;
`;

const ButtonIcon = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transition: 0.5s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ActionsButton = ({ url, id }) => {
  //context
  const { deletePost, setShowToast, findPost, setShowModalEditPost } =
    useContext(PostContext);

  // handle delete
  const handleDelete = async (id) => {
    const { success, message } = await deletePost({ id });

    setShowToast({ success, message });
  };

  //handle Edit / Update
  const handleUpdate = async () => {
    findPost(id);
    setShowModalEditPost(true);
  };

  return (
    <Wrapper>
      <ButtonIcon>
        <a href={url} target="_blank" rel="noreferrer">
          <img src="./assets/icons/play-icon.png" alt="" />
        </a>
      </ButtonIcon>

      <ButtonIcon onClick={() => handleUpdate()}>
        <img src="./assets/icons/edit-icon.png" alt="" />
      </ButtonIcon>

      <ButtonIcon onClick={() => handleDelete(id)}>
        <img src="./assets/icons/delete-icon.png" alt="" />
      </ButtonIcon>
    </Wrapper>
  );
};

export default ActionsButton;
