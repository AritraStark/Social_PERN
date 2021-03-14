import React from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
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
import { makeStyles } from '@material-ui/core/styles';
import Comments from '../components/Comments';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 350,
      minWidth: 350,
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
    header:{
        paddingBottom:0
    },
    center: {
        display: 'flex',
        padding: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
      },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    form:{
        marginTop: 20,
    }
  }));

export const Post = () => {
    const classes = useStyles();

    return (
        <div>
            <Header/>
                <div className={classes.center}>
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
                            <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item >
                            <IconButton aria-label="share">
                            <CommentIcon />151
                            </IconButton>
                        </Grid>
                        <Grid item >
                            <IconButton aria-label="share">
                            <ShareIcon />
                            </IconButton>
                        </Grid>
                        </Grid>
                    </CardActions>
                    </Card>
                    <p>Comments</p>
                    <Comments/>
                    <Comments/>
                    <form>
                        <TextField id="standard-basic" label="New Comment" className={classes.form}/>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add Comment
                        </Button>
                    </form>
                </div>
            <Footer/>
        </div>
    )
}
