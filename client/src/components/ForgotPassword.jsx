import React from 'react';
import TextField from '@material-ui/core/TextField';
import HelpIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import styles from './routeStyles';
import {withStyles} from '@material-ui/core/styles/index';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

class ForgotPassword extends React.Component{
    render(){
        const {classes} = this.props;
        return(
        <Container maxWidth="sm">
              <div className={classes.contentContainer}>
               <Grid container justify="center" alignItems="center">
                <Avatar className={classes.avatar}>
                    <HelpIcon fontSize="large"/>
                    </Avatar>
                </Grid>
                <h2>Forgot Password?</h2>
                <p>Please provide the email address that you used when you signed up for your WPL account.
                   We will send you an email that will allow you to reset your password.
                </p>
                <form>
                    <div>
                        <TextField
                          label="E-mail"
                          margin="normal"
                          variant="outlined"
                          type="email"
                          fullWidth
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Send verification
                    </Button>
                  </form>
                </div>
              </Container>
        );
    }
}

export default withStyles(styles) (ForgotPassword);