import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {encodeFormData} from './functions';

const axios = require('axios');

class Profile extends React.Component{
    constructor(){
        super();
        this.state={
            _id:"",
            name:"",
            physAddr: "",
            email: "",
            user: "",
            auth: ""
        }
    }

    componentDidMount(){
        this.getUserProfile();
    }

    getUserProfile(){
      const url =  process.env.REACT_APP_baseAPIURL + '/user/profile'
      var self = this;
      axios.get(url)
        .then(function (response) {
          console.log(response)
            self.setState({
             _id: response.data._id,
             name: response.data.name,
             physAddr: response.data.address,
             email: response.data.email,
             user: response.data.username,
             auth: true
            }
        )
        })
        .catch(function (error) {
          console.log(error);
           self.setState({
            auth:false
           })
        });
     }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleUpdate = e =>{
        const{name, physAddr, email, user} = this.state;
        let profileData = {
            name: name,
            email: email,
            username: user,
            address: physAddr
        }
        const url = process.env.REACT_APP_baseAPIURL + '/user/profile'
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: encodeFormData(profileData)
        })
        .then(response => console.log(response))
        .catch(error => alert(error.message))
        this.getUserProfile();
    }

    handleLogout=()=>{
            const url = process.env.REACT_APP_baseAPIURL + '/logout';
            axios.post(url)
              .then(function (response) {
                sessionStorage.removeItem('token');
                console.log(response)
              })
              .catch(function (error) {
                console.log(error);
              });
        this.props.history.push('/login');
    }

    render(){
        const {classes} = this.props;
        const {auth} = this.props
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
                          label="Name"
                          name= "name"
                          margin="normal"
                          fullWidth
                          onChange = {this.handleChange}
                          value={this.state.name}
                        />
                    </div>
                    <div>
                        <TextField
                          label="Physical Address"
                          name = "address"
                          margin="normal"
                          fullWidth
                          onChange = {this.handleChange}
                          value={this.state.physAddr}
                        />
                    </div>
                    <div>
                        <TextField
                          label="E-mail"
                          name="email"
                          margin="normal"
                          type="email"
                          fullWidth
                          onChange = {this.handleChange}
                          value={this.state.email}
                        />
                    </div>
                    <div>
                        <TextField
                          label="Username"
                          name="user"
                          margin="normal"
                          fullWidth
                          onChange = {this.handleChange}
                          value= {this.state.user}
                        />
                    </div>
                    <Button variant="contained" color="primary" fullWidth onClick={this.handleUpdate}>
                        Update
                    </Button>
                   <Button variant="contained" color="primary" fullWidth onClick={this.handleLogout} className={classes.buttonPadding} >
                        Logout
                    </Button>
                  </form>
                </div>
              </Container>
        );
    }
}

export default withStyles(styles) (Profile);