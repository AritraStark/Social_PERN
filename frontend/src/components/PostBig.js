import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 550,
    minWidth: 350,
    minHeight:380,
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
  avatar: {
    backgroundColor: red[500],
  },
}));

export const PostBig = () => {
  const classes = useStyles();
  const history = useHistory();

  function handlePostRoute(id){
    history.push(`/post/${id}`)
  }

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          
          
        </Typography>
      </CardContent>
      <CardActions >
        <Grid container justify="space-around" spacing="2">
          <Grid item >
            <IconButton aria-label="add to favorites" onClick={handlePostRoute}>
              <FavoriteIcon />
            </IconButton>
          </Grid>
          <Grid item >
            <IconButton aria-label="share" onClick={handlePostRoute}>
              <CommentIcon />
            </IconButton>
          </Grid>
          <Grid item >
            <IconButton aria-label="share" onClick={handlePostRoute}>
              <ShareIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
