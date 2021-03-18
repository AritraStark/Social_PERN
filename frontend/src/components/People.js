import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import './Font.css'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 245,
    margin: '1rem 0'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  center:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center'
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function People({user,handleFollow}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.center}>
        <Avatar className={classes.large} src={user.url}/>
        <Typography variant="h5" className="niceFont">{user.name}</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className="niceFont">
          {user.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.center}>
        <Button color="primary" onClick={()=>history.push(`/user/${user.id}`)}>View</Button>
        <Button color="primary" onClick={()=>handleFollow(user.id)}>Follow</Button>
      </CardActions>
    </Card>
  );
}
