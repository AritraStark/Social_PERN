import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { PostBig } from '../components/PostBig'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      padding: '2rem',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  }));

export const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <Header/>
            <div className={classes.root}>
                <PostBig/>
            </div>
            <Footer/>
        </div>
    )
}
