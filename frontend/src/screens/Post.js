import React, { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Comments from '../components/Comments';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux'
import { getPost } from '../actions/postActions';
import { Loader } from '../components/Loader';
import { Fragment } from 'react';
import { checkLike, getLikeCount, likePost, unlikePost } from '../actions/likeActions';
import { createComment, getPostComments } from '../actions/commentActions';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 350,
      minWidth: 350,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    header:{
        paddingBottom:0
    },
    center: {
        display: 'flex',
        padding: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
      },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    form:{
        marginTop: 20,
    }
  }));

export const Post = ({match}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [comment,setComment] = useState("");
    const [render,setRender] = useState(0);

    const {id} = match.params
    const {post} = useSelector(state=>state.postGet)
    const {likes} = useSelector(state=>state.likesGet)
    const {comments} = useSelector(state=>state.commentGet)
    const {likeState} = useSelector(state=>state.likeStateGet)

    function handleReRender(){
        setRender(prevRender=>prevRender+1)
    }

    function addComment(){
        dispatch(createComment(post.id,comment))
        setComment("")
        handleReRender()
    }

    function handleLike(){
        dispatch(likePost(post.id))
        handleReRender()
    }

    function handleUnlike(){
        dispatch(unlikePost(post.id))
        handleReRender()
    }

    useEffect(()=>{
        dispatch(getPost(id))
        dispatch(getLikeCount(id))
        dispatch(getPostComments(id))
        dispatch(checkLike(id))
    },[dispatch,id,render])

    return (
        <div>
            <Header/>
                <div className={classes.center}>
                    {!post||!likes||!comments?
                    <Loader/>
                    :
                    <Fragment>
                    <Card variant="outlined" className={classes.root}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                        }
                        
                        title={post.title}
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        className={classes.media}
                        image={post.url}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.body}    
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <Grid container justify="space-around" spacing="2">
                        <Grid item >
                            {
                                likeState===0?
                                <IconButton aria-label="add to favorites" onClick={handleLike}>
                                <FavoriteIcon/>{likes.count}
                                </IconButton>
                                :
                                <IconButton aria-label="add to favorites">
                                <FavoriteIcon color="secondary" onClick={handleUnlike}/>{likes.count}
                                </IconButton>
                            }
                            
                        </Grid>
                        <Grid item >
                            <IconButton aria-label="share">
                            <CommentIcon />{comments.length}
                            </IconButton>
                        </Grid>
                        <Grid item >
                            <IconButton aria-label="share">
                            <ShareIcon />
                            </IconButton>
                        </Grid>
                        </Grid>
                    </CardActions>
                    </Card>
                    <p>Comments</p>
                    {
                        comments.map((comm)=><Comments comment={comm} handleReRender={handleReRender}/>)
                    }
                    <form>
                        <TextField id="standard-basic" label="New Comment" className={classes.form} value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={addComment}
                        >
                            Add Comment
                        </Button>
                    </form>
                    </Fragment>
                    }
                </div>
            <Footer/>
        </div>
    )
}
