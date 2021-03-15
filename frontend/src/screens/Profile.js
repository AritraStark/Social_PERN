import React from 'react'
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
        padding: '4rem 0'
    },
    tabs:{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '2rem'
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
}));
  

export const Profile = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <div>
            <Header/>
                <Container maxWidth="md">
                    <div className={classes.head}>
                        <Avatar className={classes.large} />
                        <div >
                        <h3>Name XYZ</h3>
                        <p>Description</p>
                        </div>
                    </div>
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
                        Item One
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                        Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                        Item Three
                        </TabPanel>
                    </SwipeableViews>
                    <div>
                        
                    </div>
                </Container>
            <Footer/>
        </div>
    )
}
