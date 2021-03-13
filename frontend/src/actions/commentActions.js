import axios from 'axios'
import { CREATE_COMMENT_FAIL, CREATE_COMMENT_INIT, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL, DELETE_COMMENT_INIT, DELETE_COMMENT_SUCCESS, GET_POST_COMMENTS_FAIL, GET_POST_COMMENTS_INIT, GET_POST_COMMENTS_SUCCESS, UPDATE_COMMENT_FAIL, UPDATE_COMMENT_INIT, UPDATE_COMMENT_SUCCESS, DELETE_POST_COMMENTS_INIT, DELETE_POST_COMMENTS_SUCCESS, DELETE_POST_COMMENTS_FAIL } from '../constants/commentConstants'

export const createComment = (post_id,body) => async(dispatch) => {
    try {
        dispatch({
            type: CREATE_COMMENT_INIT
        })

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.post('/api/comments',{post_id,body},config)

        dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_COMMENT_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const updateComment = (id,body) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_COMMENT_INIT
        })

        const {data} = await axios.post(`/api/comments/${id}`,{body})

        dispatch({
            type: UPDATE_COMMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_COMMENT_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const deleteComment = (id) => async(dispatch) => {
    try {
        dispatch({
            type: DELETE_COMMENT_INIT
        })

        const {data} = await axios.delete(`/api/comments/${id}`)

        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_COMMENT_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getPostComments = (id) => async(dispatch) => {
    try {
        dispatch({
            type: GET_POST_COMMENTS_INIT
        })

        const {data} = await axios.get(`/api/comments/${id}`)

        dispatch({
            type: GET_POST_COMMENTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_POST_COMMENTS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const deletePostComment = (id) => async(dispatch) => {
    try {
        dispatch({
            type: DELETE_POST_COMMENTS_INIT
        })

        const {data} = await axios.delete(`/api/comments/${id}`)

        dispatch({
            type: DELETE_POST_COMMENTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_POST_COMMENTS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}