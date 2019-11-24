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


class Signup extends React.Component{

    constructor(){
        super();
        this.state={
            firstName: "",
            lastName: "",
            physAddr: "",
            email: "",
            user: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e =>{
        console.log("firstName: " + this.state.firstName)
        console.log("lastName: " + this.state.lastName)
        console.log("physAddr: " + this.state.physAddr)
        console.log("email: " + this.state.email)
        console.log("user: " + this.state.user)
        console.log("password: " + this.state.password)

        const url =  process.env.REACT_APP_baseAPIURL + '/login/signup'
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            physAddr: this.state.physAddr,
            email: this.state.email,
            user: this.state.user,
            password: this.state.password
        }
        fetch( url,
            {method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.log('Error:',error))
        .then(response => console.log ('Success:', response));
        }



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
                <h2>Sign Up</h2>
                <form onSubmit= {this.handleSubmit}>
                    <div>
                        <TextField
                          label="First Name"
                          name="firstName"
                          margin="normal"
                          variant="outlined"
                          onChange = {this.handleChange}
                          fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                          label="Last Name"
                          name="lastName"
                          margin="normal"
                          variant="outlined"
                          onChange = {this.handleChange}
                          fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                          label="Physical Address"
                          name="physAddr"
                          margin="normal"
                          variant="outlined"
                          onChange = {this.handleChange}
                          fullWidth
                        />
                    </div>
                     <div>
                         <TextField
                           label="E-mail Address"
                           name="email"
                           margin="normal"
                           variant="outlined"
                           type="email"
                           onChange = {this.handleChange}
                           fullWidth
                         />
                     </div>
                    <div>
                        <TextField
                          label="Username"
                          name="user"
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
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                  </form>
                <div>
                <Link to="/login" >
                     Already have an account? Sign in
                 </Link>
                 </div>
              </div>
              </Container>
        );
    }
}

export default withStyles(styles) (Signup);