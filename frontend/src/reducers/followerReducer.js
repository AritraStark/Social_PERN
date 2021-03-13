import { FOLLOW_FAIL, FOLLOW_INIT, FOLLOW_SUCCESS, GET_FOLLOWER_FAIL, GET_FOLLOWER_INIT, GET_FOLLOWER_SUCCESS, GET_FOLLOWING_FAIL, GET_FOLLOWING_INIT, GET_FOLLOWING_SUCCESS, UNFOLLOW_FAIL, UNFOLLOW_INIT, UNFOLLOW_SUCCESS } from '../constants/followConstants'

export const followReducer = (state = {}, action) => {
    switch (action.type) {
        case FOLLOW_INIT:
            return {
                loading: true,
                success:false
            }
        case FOLLOW_SUCCESS:
            return {
                loading: false,
                post: action.payload,
                success:true
            }
        case FOLLOW_FAIL:
            return {
                loading: false,
                error: action.payload,
                success:false
            }
        default:
            return state
    }
}

export const getFollowersReducer = (state = { }, action) => {
    switch (action.type) {
        case GET_FOLLOWER_INIT:
            return {
                loading: true,
                success:false
            }
        case GET_FOLLOWER_SUCCESS:
            return {
                loading: false,
                followers: action.payload
            }
        case GET_FOLLOWER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getFollowingReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_FOLLOWING_INIT:
            return {
                loading: true,
                success:false
            }
        case GET_FOLLOWING_SUCCESS:
            return {
                loading: false,
                following: action.payload,
                success: true
            }
        case GET_FOLLOWING_FAIL:
            return {
                loading: false,
                error: action.payload,
                success:false
            }
        default:
            return state
    }
}

export const unfollowReducer = (state = {}, action) => {
    switch (action.type) {
        case UNFOLLOW_INIT:
            return {
                loading: true,
                success:false
            }
        case UNFOLLOW_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case UNFOLLOW_FAIL:
            return {
                loading: false,
                error: action.payload,
                success:false
            }
        default:
            return state
            
    }
}