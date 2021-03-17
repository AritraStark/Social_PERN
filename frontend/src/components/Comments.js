import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../actions/commentActions';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    minWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: '26.25%', // 16:9
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
  avatar: {
    backgroundColor: blue[100],
  },
  title:{
    fontSize:150,
  }
}));

export default function Comments({comment,handleReRender}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  function handleCommentDelete(){
    dispatch(deleteComment(comment.id))
    handleReRender()
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {comment.user_name[0]}
          </Avatar>
        }
        action={
          <div>
          <IconButton aria-label="settings" >
            <EditIcon />
          </IconButton>
           <IconButton aria-label="settings" onClick={handleCommentDelete}>
           <DeleteIcon />
         </IconButton>
         </div>
        }
        title={comment.user_name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment.body}
        </Typography>
      </CardContent>

    </Card>
  );
}
