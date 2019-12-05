import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Cookies from 'js-cookie';

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
                    <span>
                    <Link style={{textDecoration: 'none'}} to='/login'>
                               <Button variant="contained" color="primary">
                                   {Cookies.get('app-jt')!==null ? 'Logout': 'Login'}
                                </Button>
                            </Link>
                    </span>
                    <span>
                    <Link style={{textDecoration: 'none'}} to="/cart">
                               <IconButton color="secondary" >
                                   <ShoppingCartIcon/>
                                </IconButton>
                            </Link>
                    </span>

                  </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default (HodlAppBar);