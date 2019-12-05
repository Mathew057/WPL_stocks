import React, {Component} from 'react';
import './App.css'
import HodlNavigation from './components/navigation/HodlNavigation';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Profile from './components/Profile.jsx';
import Accounts from './components/Accounts.jsx';
import Signup from './components/Signup.jsx';
import MyStocks from './components/MyStocks.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Error from './components/Error.jsx';
import Cart from './components/Cart.jsx';
import {Route, Redirect, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import styles from './components/routeStyles';

class App extends Component{
    
    render() {
        const {classes} = this.props;
        return(
            <div className="App">
                <Route render={(props)=><HodlNavigation {...props} title="HODL Me"/>}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/accounts" component={Accounts}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/mystocks" component={MyStocks}/>
                        <Route path="/forgotpassword" component={ForgotPassword}/>
                        <Route path="/cart" component={Cart}/>
                        <Route component={Error} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withStyles(styles) (App);