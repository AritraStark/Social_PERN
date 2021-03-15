import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export const ProfileSmall = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper variant="outlined" square >
                <div>
                    <Avatar/>
                    <div>
                      <h3>Name XYZ</h3>
                      <p> Description </p>
                    </div>
                </div>
                <Button variant="outlined">View</Button>
            </Paper>
        </div>
    )
}
