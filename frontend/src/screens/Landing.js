import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    alignItems:'space-around',
    justifyContent: 'space-around'
  },
}));

export default function Landing() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
        <Container maxWidth="xl">
            <CardMedia
            className={classes.media}
            image="./public/logo192.png"
            title="Paella dish"
            />
            <Typography variant="h1" component="h2">
                Social Networking App
            </Typography>
            <Button variant="outlined" color="primary" onClick={()=>{history.push('/login')}}>
                Login
            </Button>
            <Button variant="outlined" color="primary" onClick={()=>{history.push('/signup')}}>
                Signup
            </Button>
        </Container>
    </div>
)};