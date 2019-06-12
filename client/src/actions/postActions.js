import axios from "axios";

export const getPosts = () => dispatch => {
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: "GET_POSTS",
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addPost = newPost => dispatch => {
  axios
    .post("/api/posts/create", {
      ...newPost
    })
    .then(res => {
      dispatch({
        type: "ADD_POST",
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deletePost = id => dispatch => {
  console.log("ID from delete action: ", id);
  axios
    .delete("/api/posts/delete", { data: { id } })
    .then(res => {
      dispatch({
        type: "DELETE_POST",
        payload: id
      });
    })
    .catch(err => console.log(err));
};
