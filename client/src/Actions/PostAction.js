import * as PostsApi from "../API/PostsRequest";

export const getAllPost = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getAllPost();
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const updatePost = (id, formData) => async (dispatch) => {
  dispatch({type: "UPDATEPOST_START"});
  try {
    await PostsApi.updatePost(id, formData);
    dispatch({type: "UPDATEPOST_SUCCESS", data: formData})
  } catch (error) {
    dispatch({type: "UPDATEPOST_FAIL"})
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({type: "UPLOAD_START"});
  try {
      const newPost = await PostsApi.uploadPost(data);
      dispatch({type: "UPLOAD_SUCCESS", data: newPost.data});
  } catch (error) {
      console.log(error);
      dispatch({type: "UPLOAD_FAIL"});
  }
};

export const deletePost = (id, index) => async (dispatch) => {
  dispatch({type: "DELETEPOST_START"});
  try {
    await PostsApi.deletePost(id);
    const data = {id: id , index: index};
    dispatch({type: "DELETEPOST_SUCCESS", data: data});
  } catch (error) {
    dispatch({type: "DELETEPOST_FAIL"})
  }
};