import * as api from "../api/index";

export const getPosts = () => {
  return async dispatch => {
    const response = await api.fetchPosts();
    const data = response.data;
    dispatch({
      type: "FETCH_ALL",
      data
    });
  }
  // try {
  //   const response = await api.fetchPosts();
  //   const data = response.data
  //   dispatch({
  //     type: "FETCH_ALL",
  //     data
  //   });
  // } catch (error) {
  //   console.log(error.message);
  // }
};


export const createPost = (post) => {
  return async dispatch => {
    const response = await api.createPost(post);
    const data = response.data
    dispatch({
      type: "CREATE",
      data
    });
  }
  // try {
  //   const response = await api.createPost(post);
  //   const data = response.data
  //   dispatch({ 
  //     type: "CREATE",
  //     data 
  //   });
  // } catch (error) {
  //   console.log(error.message);
  // }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const response = await api.updatePost(id, post);
    const updatedData = response.data;
    dispatch({
      type: "UPDATE",
      updatedData
    })
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: "DELETE",
      id
    })
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id,type) => {
  return async dispatch => {
    const response = await api.postlikes(id,type);
    const updatedData = response.data;
    dispatch({
      type: "LIKE",
      updatedData
    });
  }
};
