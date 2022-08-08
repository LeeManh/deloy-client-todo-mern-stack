export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case "FETCH_POSTS_FAIL":
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case "DELETE_POST": {
      const newPosts = [...state.posts].filter((post) => post._id !== payload);
      return {
        ...state,
        posts: newPosts,
      };
    }
    case "UPDATE_POST": {
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );

      return {
        ...state,
        posts: newPosts,
      };
    }
    case "FIND_POST":
      return {
        ...state,
        post: payload,
      };

    default:
      return state;
  }
};
