import axios from 'axios'
import { FOLLOW_FAIL, FOLLOW_INIT, FOLLOW_SUCCESS, GET_FOLLOWER_FAIL, GET_FOLLOWER_INIT, GET_FOLLOWER_SUCCESS, GET_FOLLOWING_FAIL, GET_FOLLOWING_INIT, GET_FOLLOWING_SUCCESS, UNFOLLOW_FAIL, UNFOLLOW_INIT, UNFOLLOW_SUCCESS } from '../constants/followConstants'

export const followUser = (id) => async(dispatch) => {
    try {
        dispatch({
            type: FOLLOW_INIT
        })

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.post('/api/followers/',{id},config)

        dispatch({
            type: FOLLOW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FOLLOW_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const unfollowUser = (id) => async(dispatch) => {
    try {
        dispatch({
            type: UNFOLLOW_INIT
        })

        const {data} = await axios.delete(`/api/followers/${id}`)

        dispatch({
            type: UNFOLLOW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UNFOLLOW_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getFollowersCount = (id) => async(dispatch) => {
    try {
        dispatch({
            type: GET_FOLLOWER_INIT
        })

        const {data} = await axios.get(`/api/followers/count/${id}`)

        dispatch({
            type: GET_FOLLOWER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_FOLLOWER_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getFollowingCount = (id) => async(dispatch) => {
    try {
        dispatch({
            type: GET_FOLLOWING_INIT
        })

        const {data} = await axios.get(`/api/followers/following/${id}`)

        dispatch({
            type: GET_FOLLOWING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_FOLLOWING_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}