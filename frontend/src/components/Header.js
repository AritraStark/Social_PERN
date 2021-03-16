import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex:5
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display:'flex',
    alignItems:'flex-start',
    paddingLeft:10
  },
}));

export const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {userDetails} = useSelector(state=>state.login)
  
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Avatar alt="Logo" src="/logo192.png" />
          <Typography variant="h6" className={classes.title}>
            <Link to="/home">Social Network</Link>
          </Typography>

            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={()=>history.push(`/user/${userDetails.user.id}`)}
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <ExitToAppIcon/>
              </IconButton>
              
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
