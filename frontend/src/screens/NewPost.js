import React, { Fragment, useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Footer } from '../components/Footer';
import { createPost } from '../actions/postActions';
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

export const NewPost = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const {userDetails} = useSelector(state=>state.login)

    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [stateurl, setStateurl] = useState(null);
    const [fileName,setFileName] = useState(null);

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

    const {success} = useSelector(state=>state.postCreate)

    useEffect(() => {
        if(success)
        history.push('/home')
    }, [success,history])

    function handleNewPostClick() {
        setFileName(file.name+userDetails.user.id)
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
                dispatch(createPost(title,body,url,fileName))
                setTitle(null)
                setBody(null)
                setFile(null)
            } catch (error) {
                setError(error)
            }
        });   
    }

    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AddCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        New Post
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
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
                                    label="Body"
                                    id="bodyy"
                                    autoComplete="body"
                                    onChange={(e) => {
                                        setBody(e.target.value)
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
                                            Add Image
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
                        {file&&title&&body&&
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleNewPostClick}
                        >
                            Add Post
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
