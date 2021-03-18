import axios from 'axios'
import { FOLLOW_FAIL, FOLLOW_INIT, FOLLOW_SUCCESS, GET_FOLLOWER_FAIL, GET_FOLLOWER_INIT, GET_FOLLOWER_SUCCESS, GET_FOLLOWING_FAIL, GET_FOLLOWING_INIT, GET_FOLLOWING_SUCCESS, GET_UNFOLLOWED_USER_FAIL, GET_UNFOLLOWED_USER_INIT, GET_UNFOLLOWED_USER_SUCCESS, UNFOLLOW_FAIL, UNFOLLOW_INIT, UNFOLLOW_SUCCESS } from '../constants/followConstants'

export const followUser = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: FOLLOW_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth':userDetails.token
            }
        }

        const {data} = await axios.post('/api/followers/',{id_primary:id},config)

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

export const unfollowUser = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: UNFOLLOW_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth':userDetails.token
            }
        }

        const {data} = await axios.delete(`/api/followers/${id}`,config)

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

export const getFollowers = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: GET_FOLLOWER_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth':userDetails.token
            }
        }

        const {data} = await axios.get(`/api/followers/${id}`,config)

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

export const getFollowing = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: GET_FOLLOWING_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth':userDetails.token
            }
        }

        const {data} = await axios.get(`/api/followers/following/${id}`,config)

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

export const getUnfollowedUsers = async(dispatch,getState) => {
    try {
        dispatch({
            type: GET_UNFOLLOWED_USER_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth':userDetails.token
            }
        }

        const {data} = await axios.get('/api/followers/',config)

        dispatch({
            type: GET_UNFOLLOWED_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_UNFOLLOWED_USER_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}