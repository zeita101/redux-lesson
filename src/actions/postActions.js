import postsReducer from "../reducers/postsReducer";
// Create Redux action types
export const GET_POSTS = "GET_POSTS";
//getPosts telling Redux that we are going to fetch posts from an API
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
//getPostsSuccess passing the posts to Redux on a successful API call
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";
//getPostsFailure informing redux that an error was encountered
// during Redux on failed API call
// create action creators, which are functions that return an action
// which consists of the type and an optional payload loading data
export const getPosts = () => ({
  type: GET_POSTS,
});
export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});
export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE,
});
// Finally, make the asynchronous thunk action that combines all three of the above actions.
// When called, it will dispatch the initial getPosts()
// action to inform Redux to prepare for an API call, then in a try/catch, do everything necessary to get the data,
// and dispatch a success or failure action as necessary.
export function fetchPosts() {
  return async (dispatch) => {
    dispatch(getPosts());
    // dispatch is a method available in the store object that
    //accepts an object which is used to update the Redux State.
    // Usually this object is the result of invoking an
    // action creator
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      dispatch(getPostsSuccess(data));
    } catch (error) {
      dispatch(getPostsFailure());
    }
  };
}
