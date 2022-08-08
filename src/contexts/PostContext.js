import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { apiUrl } from "./constant";
import { postReducer } from "../reducers/postReducer";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //state
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });

  const [showModalAddPost, setShowModalAddPost] = useState(false);

  const [showModalEditPost, setShowModalEditPost] = useState(false);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "asdasdsads",
  });

  //get posts of user
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response?.data?.success) {
        dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: "FETCH_POSTS_FAIL", payload: null });

      return error?.response?.data
        ? error.response.data
        : { success: false, message: "Server is not response" };
    }
  };

  // add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response?.data?.success) {
        dispatch({ type: "ADD_POST", payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error?.response?.data
        ? error.response.data
        : { success: false, message: "Server is not response" };
    }
  };

  //delete post
  const deletePost = async ({ id }) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${id}`);
      if (response?.data?.success) {
        dispatch({ type: "DELETE_POST", payload: id });
      }
      return response.data;
    } catch (error) {
      return error?.response?.data
        ? error.response.data
        : { success: false, message: "Server is not response" };
    }
  };

  // find Post when user update
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    if (post) dispatch({ type: "FIND_POST", payload: post });
  };

  //update post
  const updatePost = async ({ post }) => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${post._id}`, post);

      if (response?.data?.success) {
        dispatch({ type: "UPDATE_POST", payload: response.data.post });
      }
      return response.data;
    } catch (error) {
      return error?.response?.data
        ? error.response.data
        : { success: false, message: "Server is not response" };
    }
  };

  const postContextData = {
    postState,
    getPosts,
    addPost,
    showModalAddPost,
    setShowModalAddPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    showModalEditPost,
    setShowModalEditPost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
