import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

class Profile extends React.Component{
    render(){
        const {classes} = this.props;
        return(
        <Container maxWidth="sm">
              <div className={classes.contentContainer}>
               <Grid container justify="center" alignItems="center">
                <Avatar className={classes.avatar}>
                    <PersonIcon fontSize="large"/>
                    </Avatar>
                </Grid>
                <h2>Profile</h2>
                <form>
                    <div>
                        <TextField
                          label="Full Name"
                          margin="normal"
                          fullWidth
                          defaultValue="Jim Bob"
                        />
                    </div>
                    <div>
                        <TextField
                          label="Physical Address"
                          margin="normal"
                          fullWidth
                          defaultValue="123 Potato Street"
                        />
                    </div>
                    <div>
                        <TextField
                          label="E-mail"
                          margin="normal"
                          type="email"
                          fullWidth
                          defaultValue="jimbob@gmail.com"
                        />
                    </div>
                    <div>
                        <TextField
                          label="Username"
                          margin="normal"
                          fullWidth
                          defaultValue="jimbob124"
                        />
                    </div>
                    <div>
                        <TextField
                          label="Password"
                          margin="normal"
                          type="password"
                          fullWidth
                          defaultValue="secret"
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update
                    </Button>
                  </form>

                </div>
              </Container>
        );
    }
}

export default withStyles(styles) (Profile);