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
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../actions/userActions';

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

export const EditProfile = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const {success} = useSelector(state=>state.userUpdate)

    const [name, setName] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        if(success)
        history.push('/home')
    }, [success,history])

    function handleEditProfileClick() {
        dispatch(updateUser(name,description))
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
                        Edit Profile
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Profile Name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="description"
                                    label="Profile Description"
                                    id="description"
                                    autoComplete="description"
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                />
                            </Grid>

                        </Grid>
                        {name&&description&&
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleEditProfileClick}
                        >
                            Update Profile
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
