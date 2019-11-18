import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const HodlAppBar = ({title}) => {
    const classes = useStyles();

    return(
        <AppBar>
            <Toolbar>
                <Grid container  justify="space-between" >
                  <Grid item>
                  <Link style={{ textDecoration: 'none', color: 'white' }}  to="/home">
                     <Typography variant="h5">
                             {title}
                      </Typography>
                   </Link>
                  </Grid>
                  <Grid item>
             <div className={classes.search}>
                         <div className={classes.searchIcon}>
                           <SearchIcon />
                         </div>
                         <InputBase
                           placeholder="Search…"
                           classes={{
                             root: classes.inputRoot,
                             input: classes.inputInput,
                           }}
                           inputProps={{ 'aria-label': 'search' }}
                         />
                       </div>
                 </Grid>

                  <Grid item>
                    <div>
                    <Link style={{textDecoration: 'none'}} to="/login">
                               <Button variant="contained" color="primary" >
                                   Login
                                </Button>
                            </Link>
                    </div>
                  </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default (HodlAppBar);