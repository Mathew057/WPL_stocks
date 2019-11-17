import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';

class Home extends React.Component{
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.contentContainer}>
                <h3>Super Cool Looking Homepage</h3>
                <img src="https://m.economictimes.com/thumb/msid-64230310,width-1200,height-900,resizemode-4,imgsize-61517/stock-market-getty-images.jpg" alt="Stocks wow" height="450" width="600"/>
            </div>
        );
    }
}

export default withStyles(styles) (Home);