import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  logo:{
    display:'flex',
    padding:'6rem 0',
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center'
  },
  image:{
    maxHeight:250,
    maxWidth:250
  },
  buttons:{
    display:'flex',
    justifyContent:'space-around',
    padding: '0 6rem'
  }
}));

export default function Landing() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
        <Container maxWidth="sm">
          <div className={classes.logo}>
            <img src="/logo192.png" className={classes.image}/>
            <Typography variant="h2" component="h3">
                Social Networking App
            </Typography>
          </div>
          <div className={classes.buttons}>
            <Button variant="outlined" color="primary" onClick={()=>{history.push('/login')}}>
                Login
            </Button>
            <Button variant="outlined" color="primary" onClick={()=>{history.push('/signup')}}>
                Signup
            </Button>
          </div>
        </Container>
    </div>
)};