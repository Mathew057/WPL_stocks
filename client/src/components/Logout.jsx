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
const axios = require('axios');

class Logout extends React.Component{

    constructor(){
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        const url = process.env.REACT_APP_baseAPIURL + '/logout'
        axios.post(url)
          .then(function (response) {
            console.log(response)
            if(response.status===200){
                console.log(response)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    handleSubmit = e =>{
        var self = this;
        const url = process.env.REACT_APP_baseAPIURL + '/login'
        axios.post(url,{
            email: this.state.email,
            password: this.state.password
            }
          )
          .then(function (response) {
            console.log(response)
            if(response.status===200){
                sessionStorage.setItem('token', response.data.token);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    };

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
                          label="Email"
                          name="email"
                          margin="normal"
                          variant="outlined"
                          onChange = {this.handleChange}
                          fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                          label="Password"
                          name="password"
                          margin="normal"
                          variant="outlined"
                          type="password"
                          onChange = {this.handleChange}
                          fullWidth
                        />
                    </div>
                    <Button onClick={this.handleSubmit} variant="contained" color="primary" fullWidth>
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

export default withStyles(styles) (Logout);