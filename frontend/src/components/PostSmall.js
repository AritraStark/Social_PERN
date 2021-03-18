import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {projectStorage} from '../firebase/config'
import { deletePost } from '../actions/postActions';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 245,
    margin:'1rem 0'
  },
  media: {
    height: 140,
  },
  text:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column'
  },
  buttons:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around',
    flexDirection:'row'
  }
});

export default function PostSmall({post,incrementRender}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  function handlePostDelete(){
    const storageRef = projectStorage.ref().child(post.file_name); 
    // Delete the file
    storageRef.delete().then(() => {
      dispatch(deletePost(post.id))
      incrementRender()
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={()=>history.push(`/post/${post.id}`)}>
        <CardMedia
          className={classes.media}
          image={post.url}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.text}>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttons}>
        <Button size="small" color="primary" onClick={()=>history.push(`/editpost/${post.id}`)}>
          <EditIcon/>
        </Button>
        <Button size="small" color="primary" onClick={handlePostDelete}>
          <DeleteIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}
