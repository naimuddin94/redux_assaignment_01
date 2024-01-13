import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// constants
const GET_POSTS_FULFIL = "GET_POSTS_FULFIL";
const GET_POSTS_PENDING = "GET_POSTS_PENDING";
const GET_POSTS_REJECTED = "GET_POSTS_REJECTED";
const ADD_POST = "APP_POST";
const REMOVE_POST = "REMOVE_POST";
const UPDATE_POST = "UPDATE_POST";

// store
const store = createStore()

// initialState
const initialState = {
    posts: [],
}

// reducers
const postReducer = (state = initialState, action) => { 
    switch (action.type) {
        case ADD_POST:
            return 
    
        default:
            return state
    }
}

// actions creators
const getPosts = () => {
    return async () => { 
        try {
            
        } catch (error) {
            
        }
    }
}



