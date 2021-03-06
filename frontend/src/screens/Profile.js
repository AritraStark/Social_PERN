import React,{useEffect, useState} from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Avatar } from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux'
import { getUserPosts } from '../actions/postActions';
import {Loader} from '../components/Loader';
import PostSmall from '../components/PostSmall'
import { deleteUser, getUserDetails, logout } from '../actions/userActions';
import { getFollowers, getFollowing } from '../actions/followerActions';
import { ProfileSmall } from '../components/ProfileSmall';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import './Font.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {projectStorage} from '../firebase/config'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  

const useStyles = makeStyles((theme) => ({
    head:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        padding: '4rem 0 1rem 0'
    },
    tabs:{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '2rem'
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    center:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-around',
      alignItems:'center'
    },
    fbut:{
      margin:'2rem 0'
    },
    button:{
      margin:'1rem 3rem 2rem 3rem '
    }
}));
  

export const Profile = ({match}) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useHistory();

    const [value, setValue] = useState(0);
    const [render, setRender] = useState(0);
    const [delOpen, setDelOpen] = React.useState(false);
    
    const id = match.params.id

    const userLogin = useSelector(state=>state.login)

    const userPostget = useSelector(state=>state.userPostGet)
    const {posts} = userPostget
    const postLoading = userPostget.loading

    const userDetailsget = useSelector(state=>state.userDetailsGet)
    const {userDetails} = userDetailsget
    const userLoading = userDetailsget.loading

    const followersGet = useSelector(state=>state.followersGet)
    const {followers} = followersGet
    const followerLoading = followersGet.loading

    const followingGet = useSelector(state=>state.followingGet)
    const {following} = followingGet
    const followingLoading = followingGet.loading

    const {success} = useSelector(state=>state.userDelete)

    useEffect(() => {
      dispatch(getUserDetails(id))
      dispatch(getUserPosts(id))
      dispatch(getFollowers(id))
      dispatch(getFollowing(id))
      if(success)
      history.push('/')
    }, [id,dispatch,render,success,history])

    function incrementRender(){
      setRender(prevState=>prevState+1)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleDelOpen = () => {
      setDelOpen(true);
    };
  
    const handleDelClose = () => {
      const storageRef = projectStorage.ref().child(userDetails.file_name); 
      // Delete the file
      storageRef.delete().then(() => {
        dispatch(deleteUser)
        setTimeout(()=>dispatch(logout),1500)
        setDelOpen(false)
      }).catch((error) => {
        console.log(error);
      });
    };
    return (
        <div>
            <Header/>
              {userLoading
              ?
              <Loader/>
              :
                <Container maxWidth="md">
                    <div className={classes.head}>
                        <Avatar className={classes.large} src={userDetails.url}/>
                        <div >
                        <h1 className="niceFont">{userDetails.name}</h1>
                        <p className="niceFont">{userDetails.description}</p>
                        </div>
                    </div>
                    { userLogin.userDetails.user.id == match.params.id ?
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<EditIcon />}
                        onClick={()=>history.push(`/editprofile/${userLogin.userDetails.user.id}`)}
                      >
                        Edit Profile
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={handleDelOpen}
                      >
                        Delete Profile
                      </Button>
                    </div>
                    :<div></div>
                    }
                    <AppBar position="static" color="default">
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        centered
                        >
                        <Tab label="Posts" {...a11yProps(0)} />
                        <Tab label="Followers" {...a11yProps(1)} />
                        <Tab label="Following" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <div className={classes.center}>
                            {postLoading?<Loader/>:posts.map((post)=><PostSmall post={post} incrementRender={incrementRender}/>)} 
                            <Fab color="primary" aria-label="add" className={classes.fbut} onClick={()=>history.push('/newpost')}>
                              <AddIcon />
                            </Fab>
                          </div>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <div className={classes.center}>
                            {followerLoading?<Loader/>:followers.map((follower)=><ProfileSmall profile={follower} unfollow={false} incrementRender={incrementRender}/>)} 
                            <Button color="primary" onClick={()=>history.push('/explore')}>Explore People</Button>
                          </div>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                          <div className={classes.center}>
                            {followingLoading?<Loader/>:following.map((follow)=><ProfileSmall profile={follow} unfollow={true} incrementRender={incrementRender}/>)} 
                            <Button color="primary" onClick={()=>history.push('/explore')}>Explore People</Button>
                          </div>
                        </TabPanel>
                    </SwipeableViews>
                    <div>
                    <Dialog
                      open={delOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleDelClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle id="alert-dialog-slide-title">{"DELETE ACCOUNT"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Are you sure you want to delete your account?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDelClose} color="primary">
                          Disagree
                        </Button>
                        <Button onClick={handleDelClose} color="primary">
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                    </div>
                </Container>
                  
                }
            <Footer/>
        </div>
    )
}
