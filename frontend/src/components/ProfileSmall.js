import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { unfollowUser } from '../actions/followerActions';
import './Font.css'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 245,
    margin:'1rem 0'
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

export const ProfileSmall = ({profile,unfollow,incrementRender}) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    function handleUnfollow(){
      dispatch(unfollowUser(profile.id))
      incrementRender();
    }

    return (
      <Card className={classes.root}>
        <CardContent className={classes.center}>
          <Avatar className={classes.large} src={profile.url}/>
          <Typography variant="h5" className="niceFont">{profile.name}</Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" className="niceFont">
            {profile.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.center}>
          <Button color="primary" onClick={()=>history.push(`/user/${profile.id}`)}>View</Button>
          {unfollow&&<Button color="primary" onClick={handleUnfollow}>Unfollow</Button>}
        </CardActions>
      </Card>
    )
}
