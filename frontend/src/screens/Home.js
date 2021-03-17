import React,{useEffect} from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { PostBig } from '../components/PostBig'
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import { getFollowerPosts } from '../actions/postActions';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      padding: '2rem',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'column'
    },
  }));

export const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {posts} = useSelector(state=>state.followerPostGet)

    useEffect(() => {
        dispatch(getFollowerPosts)
    }, [dispatch])

    return (
        <div>
            <Header/>
            <div className={classes.root}>
                {posts.map((post)=><PostBig post={post}/>)}
            </div>
            <Footer/>
        </div>
    )
}
