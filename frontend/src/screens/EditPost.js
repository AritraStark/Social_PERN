import React, { Fragment, useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Footer } from '../components/Footer';
import { updatePost } from '../actions/postActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const EditPost = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const {success} = useSelector(state=>state.postUpdate)

    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    useEffect(() => {
        if(success)
        history.push('/home')
    }, [success,history])

    function handleEditPostClick() {
        dispatch(updatePost(title,body))
    }

    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Post
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Post Title"
                                    name="title"
                                    autoComplete="title"
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="body"
                                    label="Post Body"
                                    id="bodyy"
                                    autoComplete="body"
                                    onChange={(e) => {
                                        setBody(e.target.value)
                                    }}
                                />
                            </Grid>

                        </Grid>
                        {title&&body&&
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleEditPostClick}
                        >
                            Update Post
                        </Button>}
                    </form>
                </div>
                <Box mt={5}>
                    <Footer />
                </Box>
            </Container>
        </Fragment>
    )
}
