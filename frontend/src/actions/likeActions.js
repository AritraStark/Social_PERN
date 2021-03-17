import axios from 'axios'
import { CREATE_LIKE_FAIL, CREATE_LIKE_INIT, CREATE_LIKE_SUCCESS, DELETE_LIKE_FAIL, DELETE_LIKE_INIT, DELETE_LIKE_SUCCESS, GET_LIKES_COUNT_FAIL, GET_LIKES_COUNT_INIT, GET_LIKES_COUNT_SUCCESS, GET_LIKE_STATE_FAIL, GET_LIKE_STATE_INIT, GET_LIKE_STATE_SUCCESS } from '../constants/likeConstants'

export const likePost = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: CREATE_LIKE_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth': userDetails.token
            }
        }

        const {data} = await axios.post('/api/likes/',{post_id:id},config)

        dispatch({
            type: CREATE_LIKE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_LIKE_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const unlikePost = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: DELETE_LIKE_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'x-auth': userDetails.token
            }
        }

        const {data} = await axios.delete(`/api/likes/${id}`,config)

        dispatch({
            type: DELETE_LIKE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_LIKE_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getLikeCount = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: GET_LIKES_COUNT_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth': userDetails.token
            }
        }

        const {data} = await axios.get(`/api/likes/${id}`,config)

        dispatch({
            type: GET_LIKES_COUNT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_LIKES_COUNT_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const checkLike = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: GET_LIKE_STATE_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth': userDetails.token
            }
        }

        const {data} = await axios.get(`/api/likes/post/${id}`,config)

        dispatch({
            type: GET_LIKE_STATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_LIKE_STATE_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}