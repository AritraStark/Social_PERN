import { CREATE_LIKE_FAIL, CREATE_LIKE_INIT, CREATE_LIKE_SUCCESS, DELETE_LIKE_FAIL, DELETE_LIKE_INIT, DELETE_LIKE_SUCCESS, GET_LIKES_COUNT_FAIL, GET_LIKES_COUNT_INIT, GET_LIKES_COUNT_SUCCESS, GET_LIKE_STATE_FAIL, GET_LIKE_STATE_INIT, GET_LIKE_STATE_SUCCESS } from "../constants/likeConstants"

export const likeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_LIKE_INIT:
            return {
                loading: true,
                success:false
            }
        case CREATE_LIKE_SUCCESS:
            return {
                loading: false,
                likes: action.payload,
                success:true
            }
        case CREATE_LIKE_FAIL:
            return {
                loading: false,
                error: action.payload,
                success:false
            }
        default:
            return state
    }
}

export const getLikesCountReducer = (state = { }, action) => {
    switch (action.type) {
        case GET_LIKES_COUNT_INIT:
            return {
                loading: true,
                success:false
            }
        case GET_LIKES_COUNT_SUCCESS:
            return {
                loading: false,
                likes: action.payload,
                success:true
            }
        case GET_LIKES_COUNT_FAIL:
            return {
                loading: false,
                error: action.payload,
                success:false
            }
        default:
            return state
    }
}

export const unlikeReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_LIKE_INIT:
            return {
                loading: true,
                success:false
            }
        case DELETE_LIKE_SUCCESS:
            return {
                loading: false,
                likes: action.payload,
                success:true
            }
        case DELETE_LIKE_FAIL:
            return {
                loading: false,
                error: action.payload,
                success:false
            }
        default:
            return state
    }
}

export const getLikeStateReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIKE_STATE_INIT:
            return {
                loading: true,
                success:false
            }
        case GET_LIKE_STATE_SUCCESS:
            return {
                loading: false,
                likeState:action.payload,
                success:true
            }
        case GET_LIKE_STATE_FAIL:
            return {
                loading: false,
                error: action.payload,
                success:false
            }
        default:
            return state
    }
}