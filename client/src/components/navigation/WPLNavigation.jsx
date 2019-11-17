import React from 'react';
import WPLAppBar from './WPLAppBar';
import WPLDrawer from './WPLDrawer';
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

class WPLNavigation extends React.Component{
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
                    <WPLAppBar title={title}/>
                    <WPLDrawer handleDrawerToggle={this.handleDrawerToggle} mobileOpen={this.state.mobileOpen}/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme:true}) (WPLNavigation)