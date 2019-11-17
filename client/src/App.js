import React, {Component} from 'react';
import './App.css'
import WPLNavigation from './components/navigation/WPLNavigation';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Accounts from './components/Accounts.jsx';
import Signup from './components/Signup.jsx';
import MyStocks from './components/MyStocks.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Error from './components/Error.jsx';
import {Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import styles from './components/routeStyles';

class App extends Component{
    
    render() {
        const {classes} = this.props;
        return(
            <div className="App">
                <WPLNavigation title="WPL Stocks App"/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/mystocks" component={MyStocks}/>
                    <Route path="/forgotpassword" component={ForgotPassword}/>
                    <Route path="/error" component={Error}/>
                </main>
            </div>
        );
    }
}

export default withStyles(styles) (App);