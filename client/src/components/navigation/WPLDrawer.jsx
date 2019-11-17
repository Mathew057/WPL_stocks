import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import DrawerMenuItems from './DrawerMenuItems';
import drawerMenuItemsData from './drawerMenuItemsData';
import {withStyles} from '@material-ui/core/styles/index';


const styles = theme => ({
    drawerPaper: {
        zIndex: 1,
        width: 240,
        [theme.breakpoints.up('md')]: {
            position: 'fixed'
        }
    },
    toolbar: theme.mixins.toolbar
});

const WPLDrawer = ({classes, handleDrawerToggle, mobileOpen}) => {
    return(
        <div>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true}}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    >
                    <DrawerMenuItems handleDrawerToggle={handleDrawerToggle} menuItems={drawerMenuItemsData}/>
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper
                     }}
                     >
                    <DrawerMenuItems menuItems={drawerMenuItemsData}/>
                </Drawer>
            </Hidden>
        </div>
    );
};


export default withStyles(styles,{withTheme:true}) (WPLDrawer);