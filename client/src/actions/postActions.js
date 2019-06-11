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
