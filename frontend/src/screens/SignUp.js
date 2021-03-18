import React, { Fragment, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Footer } from '../components/Footer';
import { signup } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import ProgressBar from '../components/ProgessBar';
import { projectStorage } from '../firebase/config';

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
    input:{
        display:'none'
    },
    imgin:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem'
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SignUpComponent = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const {success} = useSelector(state=>state.signup)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [description, setDescription] = useState()
    const [password, setPassword] = useState()
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [stateurl, setStateurl] = useState(null);
    const [open, setOpen] = useState(false);
    
    const types = ['image/png', 'image/jpeg'];

    const handleFileChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
        setFile(selected);
        setError('');
        } else {
        setFile(null);
        setError('Please select an image file (png or jpg)');
        }
    };

    function handleSignUpClick(e) {
        const fileName = file.name+email
        const storageRef = projectStorage.ref(fileName);    
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            try {
                const url = await storageRef.getDownloadURL();
                setStateurl(url);
                dispatch(signup(name,email,description,password,url,fileName))
                setName(null)
                setPassword(null)
                setPassword(null)
                setDescription(null)
                setFile(null)
                setTimeout(()=>setOpen(true),1500)
            } catch (error) {
                setError(error)
            }
        });  
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="name"
                                    name="Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    autoFocus
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
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="About Me"
                                    name="Description"
                                    autoComplete="Description"
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handleFileChange}
                                />
                                <label htmlFor="contained-button-file">
                                <div className={classes.imgin}> 
                                    <Typography variant="subtitle2">
                                            Add Profile Picture
                                    </Typography>
                                    <Fab component="span" className={classes.button}>
                                        <AddPhotoAlternateIcon />
                                        
                                    </Fab>
                                    
                                </div>
                                </label>
                                { error && <div className="error">{ error }</div>}
                                { file && <div>{ file.name }</div> }
                                { file && <ProgressBar progress={progress} /> }
                            </Grid>

                        </Grid>
                        {file&&name&&email&&description&&password&&
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignUpClick}
                        >
                            Sign Up
                    </Button>}
                        
                        <Grid container justify="flex-end">
                            <Grid item>
                                <br/>
                                <Link to="/login" className="link">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <Snackbar open={open} autoHideDuration={8000} onClose={handleAlertClose}>
                            {success===true?<Alert onClose={handleAlertClose} severity="success">
                                Signup Successful, Login <Link to='/login'>here</Link>
                            </Alert>:<Alert onClose={handleAlertClose} severity="error">
                                Signup Unsuccessful
                            </Alert>}
                            
                        </Snackbar>
                    </form>
                </div>
                <Box mt={5}>
                    <Footer />
                </Box>
            </Container>
        </Fragment>
    )
}
