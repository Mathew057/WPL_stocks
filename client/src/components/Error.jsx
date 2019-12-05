import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import {Link} from 'react-router-dom';

class Home extends React.Component{
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.contentContainer}>
                <h1>404 Error</h1>
                <h4>Sorry the page you are looking for is unavailable at this time.</h4>
                <img src="https://stockhead.com.au/wp-content/uploads/2017/08/sad.jpg" alt="error"/>
                <Link to="/home" >
                      <h4>Return to homepage</h4>
                 </Link>
            </div>
        );
    }
}

export default withStyles(styles) (Home);