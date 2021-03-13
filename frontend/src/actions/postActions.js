import axios from 'axios'
import{
    CREATE_POST_FAIL,
    CREATE_POST_INIT, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_INIT, DELETE_POST_SUCCESS, GET_ALL_POSTS_FAIL, GET_ALL_POSTS_INIT, GET_ALL_POSTS_SUCCESS, GET_USER_POSTS_INIT, GET_USER_POSTS_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_INIT, UPDATE_POST_SUCCESS
}
from '../constants/postConstants'

export const createPost = (title,body,url) => async(dispatch) =>{
    try{
        dispatch({
            type: CREATE_POST_INIT
        })

        const {data} = await axios.post('/api/posts',{title,body,url})

        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: data
        })
    }
    catch(error){
        //Accessing the error and initiating the login error action and assigning the error as a payload
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const updatePost= (id,title,body) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_POST_INIT
        })

        const {data} = await axios.post(`/api/posts/${id}`,{title,body})

        dispatch({
            type: UPDATE_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        //Accessing the error and initiating the login error action and assigning the error as a payload
        dispatch({
            type: UPDATE_POST_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getUserPosts = (id) => async(dispatch) => {
    try {
        dispatch({
            type: GET_USER_POSTS_INIT
        })

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.get(`/api/posts/${id}`,config)

        dispatch({
            type: GET_USER_POSTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        //Accessing the error and initiating the login error action and assigning the error as a payload
        dispatch({
            type: UPDATE_POST_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        dispatch({
            type: DELETE_POST_INIT
        })

        const {data} = axios.delete(`/api/posts/${id}`)

        dispatch({
            type: DELETE_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        //Accessing the error and initiating the login error action and assigning the error as a payload
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getFollowerPosts = () => async(dispatch) => {
    try {
        dispatch({
            type: GET_ALL_POSTS_INIT
        })

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.get(`/api/posts/follow`,config)

        dispatch({
            type: GET_ALL_POSTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        //Accessing the error and initiating the login error action and assigning the error as a payload
        dispatch({
            type: GET_ALL_POSTS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}
