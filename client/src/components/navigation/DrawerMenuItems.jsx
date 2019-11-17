import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import DrawerMenuItem from './DrawerMenuItem';
import {withStyles} from '@material-ui/core/styles/index';

const styles = theme => ({
    toolbar: {
        paddingTop: 64
    }
});

const DrawerMenuItems = ({classes, handleDrawerToggle, menuItems}) => {
    return(
        <div className={classes.toolbar}>
            <Divider/>
            <List component="nav">
                {menuItems.map((menuItem, index)=> {
                    return(
                        <DrawerMenuItem
                            handleDrawerToggle={handleDrawerToggle}
                            key={index}
                            route={menuItem.route}
                            text={menuItem.text} />
                    );
                })}
            </List> 
        </div>
    );
};

DrawerMenuItems.defaultProps ={
    handleDrawerToggle: () => {}
};

export default withStyles(styles, {withTheme:true}) (DrawerMenuItems)