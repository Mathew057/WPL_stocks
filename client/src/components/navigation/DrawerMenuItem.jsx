import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';

const DrawerMenuItem = ({classes, handleDrawerToggle, route, text})=> {
    return(
        <Link style={{textDecoration: 'none'}} to={route}>
            <ListItem onClick={handleDrawerToggle} button>
                <ListItemText primary={text}/>
            </ListItem>
        </Link>
    );
};

DrawerMenuItem.defaultProps = {
    handleDrawerToggle: () => {}
};

export default DrawerMenuItem;