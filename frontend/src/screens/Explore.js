import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { followUser, getUnfollowedUsers } from '../actions/followerActions';
import { Loader } from '../components/Loader';
import People from '../components/People';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      padding: '2rem',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'column'
    },
  }));


export const Explore = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [render, setRender] = useState(0);

    const {unfollowedUsers,loading} = useSelector(state=>state.unfollowedUsersGet)

    useEffect(()=>{
        dispatch(getUnfollowedUsers)
    },[dispatch,render])

    function handleFollow(id){
        dispatch(followUser(id))
        setRender(prevState=>prevState+1)
    }

    return (
        <div>
            <Header/>
                <div className={classes.root}>
                    {loading?<Loader/>:unfollowedUsers.map((unfollowedUser)=><People user={unfollowedUser} handleFollow={handleFollow}/>)}
                </div>
            <Footer/>
        </div>
    )
}
