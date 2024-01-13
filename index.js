import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

// constants
const GET_POSTS_FULFIL = "GET_POSTS_FULFIL";
const GET_POSTS_PENDING = "GET_POSTS_PENDING";
const GET_POSTS_REJECTED = "GET_POSTS_REJECTED";
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const UPDATE_POST = "UPDATE_POST";

// initialState
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// reducers
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };

    case GET_POSTS_PENDING:
      return { ...state, isLoading: true };

    case GET_POSTS_FULFIL:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, ...action.payload],
      };

    case GET_POSTS_REJECTED:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

// store
const store = createStore(postReducer, applyMiddleware(logger.default, thunk));

// actions creators
const getPosts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_POSTS_PENDING });
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch({ type: GET_POSTS_FULFIL, payload: data.slice(0, 2) });
    } catch (error) {
      dispatch({ type: GET_POSTS_REJECTED, error: error.message });
    }
  };
};

const addPost = (payload) => {
  return { type: ADD_POST, payload: payload };
};

store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch(
//   addPost({ id: 1, title: "Hello World!", body: "This random body text" })
// );
// store.dispatch(
//   addPost({
//     id: 2,
//     title: "Hello World two!",
//     body: "This random body text two",
//   })
// );

store.dispatch(getPosts());
