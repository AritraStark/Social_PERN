import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    createCommentReducer,
    getCommentsReducer,
    updateCommentReducer,
    deleteCommentReducer
} from './reducers/commentReducer'

import {
    followReducer,
    getFollowersReducer,
    getFollowingReducer,
    unfollowReducer
} from './reducers/followerReducer'

import {
    likeReducer,
    getLikesCountReducer,
    unlikeReducer,
    getLikeStateReducer
} from './reducers/likesReducer'

import {
    createPostReducer,
    getPostReducer,
    getFollowerPostsReducer,
    updatePostReducer,
    deletePostReducer,
    getUserPostsReducer
} from './reducers/postReducers'

import {
    loginReducer,
    signupReducer,
    getUserDetailsReducer
} from './reducers/userReducers'

const reducers = combineReducers({
    login: loginReducer,
    signup: signupReducer,
    userDetailsGet: getUserDetailsReducer,
    postCreate: createPostReducer,
    postGet: getPostReducer,
    followerPostGet: getFollowerPostsReducer,
    postUpdate: updatePostReducer,
    postDelete: deletePostReducer,
    userPostGet: getUserPostsReducer,
    commentCreate: createCommentReducer,
    commentGet: getCommentsReducer,
    commentUpdate: updateCommentReducer,
    commentDelete: deleteCommentReducer,
    follow: followReducer,
    followersGet: getFollowersReducer,
    followingGet: getFollowingReducer,
    unfollow: unfollowReducer,
    like: likeReducer,
    likesGet: getLikesCountReducer,
    unlike: unlikeReducer,
    likeStateGet: getLikeStateReducer
})

const middleware = [thunk]

const userDetailsFromStorage = localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):""
const authStateFromStorage = userDetailsFromStorage.token&&true

const initialState = {
    login:{
        success: authStateFromStorage,
        userDetails: userDetailsFromStorage
    },
}

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
)

export default store