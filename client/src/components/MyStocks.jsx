import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';

class MyStocks extends React.Component{
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.contentContainer}>
                <h3>Insert Expandable Table here</h3>
             </div>
        );
    }
}

export default withStyles(styles) (MyStocks);