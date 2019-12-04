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

class Profile extends React.Component{
    constructor(){
        super();
        this.state={
            _id:"",
            name:"",
            physAddr: "",
            email: "",
            user: ""
        }
    }

    componentDidMount(){
        this.getUserProfile();
    }

    getUserProfile(){
        const url =  process.env.REACT_APP_baseAPIURL + '/user/profile'
        fetch(url)
        .then(res => res.json())
        .catch(error => console.log('Error:',error))
        .then(response => {this.setState({
             _id: response._id,
             name: response.name,
             physAddr: response.address,
             email: response.email,
             user: response.username
            }
        )})
        ;
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
                  </form>

                </div>
              </Container>
        );
    }
}

export default withStyles(styles) (Profile);