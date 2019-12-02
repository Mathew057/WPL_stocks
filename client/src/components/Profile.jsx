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
    constructor(){
        super();
        this.state={
            name:"",
            physAddr: "",
            email: "",
            user: "",
            password: ""
        }
    }

    componentDidMount(){
        const url =  process.env.REACT_APP_baseAPIURL + '/user/profile'
        fetch(url)
        .then(res => res.json())
        .catch(error => console.log('Error:',error))
//        .then(response => console.log ('Success:', response))
        .then(response => {this.setState({
             name: response.name,
             physAddr: response.address,
             email: response.email,
             user: response.username,
             password: response.password
            }
        )})
        ;
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleUpdate = e =>{
        console.log("name: " + this.state.name)
        console.log("physAddr: " + this.state.physAddr)
        console.log("email: " + this.state.email)
        console.log("user: " + this.state.user)
        console.log("password: " + this.state.password)
        //TODO: DO THINGS ON UPDATE OF FIELDS
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
                <form onSubmit={this.handleUpdate}>
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
                    <div>
                        <TextField
                          label="Password"
                          name="password"
                          margin="normal"
                          type="password"
                          fullWidth
                          onChange = {this.handleChange}
                          value={this.state.password}
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