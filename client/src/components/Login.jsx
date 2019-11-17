import React from 'react';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './routeStyles';
import {withStyles} from '@material-ui/core/styles/index';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

class Login extends React.Component{
    render(){
        const {classes} = this.props;
        return(
        <Container maxWidth="sm">
              <div className={classes.contentContainer}>
               <Grid container justify="center" alignItems="center">
                <Avatar className={classes.avatar}>
                    <LockIcon fontSize="large"/>
                    </Avatar>
                </Grid>
                <h2>Login</h2>
                <form>
                    <div>
                        <TextField
                          label="Username"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                          label="Password"
                          margin="normal"
                          variant="outlined"
                          type="password"
                          fullWidth
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                  </form>
                <div>
                       <Link to="/forgotpassword">
                         Forgot password?
                     </Link>
                </div>
                <div>
                     <Link to="/signup" >
                           New user? Create an account
                     </Link>
                </div>
                </div>
              </Container>
        );
    }
}

export default withStyles(styles) (Login);