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

export default function PostSmall({post}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
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
        <Button size="small" color="primary">
          <EditIcon/>
        </Button>
        <Button size="small" color="primary">
          <DeleteIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}
