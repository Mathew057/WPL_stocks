import React from 'react';
import HodlAppBar from './HodlAppBar';
import HodlDrawer from './HodlDrawer';
import {withStyles} from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        zIndex: 1,
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative'
        }
    }
});

class HodlNavigation extends React.Component{
    constructor(){
        super();
        this.state={
            mobileOpen: false
        };
    }
    
    handleDrawerToggle = () => {
        this.setStart(prevState => ({mobileOpen: !prevState.mobileOpen}));
    }
    
    render(){
        const {title, classes} = this.props;
        return(
            <div className={classes.content}>
                <div className={classes.toolbar}>
                    <HodlAppBar title={title}/>
                    <HodlDrawer handleDrawerToggle={this.handleDrawerToggle} mobileOpen={this.state.mobileOpen}/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme:true}) (HodlNavigation)