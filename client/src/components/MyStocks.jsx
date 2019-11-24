import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class MyStocks extends React.Component{

    state= {
        expanded: null,
        stocks: []
    }

    componentDidMount() {
        const url = process.env.REACT_APP_baseAPIURL + '/user/stocks'
        fetch(url)
            .then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => {
                this.setState({
                    stocks: response
                })
            });
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render(){
        const {classes} = this.props;
        const {expanded, stocks} = this.state;
        return(
            <div className={classes.contentContainer}>
                <h3>My Stocks</h3>
                               {stocks.map((stock, index)=>{
                                    return(
                                                     <ExpansionPanel className= {classes.leftText} expanded={expanded === 'panel'+index} onChange={this.handleChange('panel'+index)} key={index}>
                                                       <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                         <Typography className={classes.heading}>{stock.stock_indicator}</Typography>
                                                         <Typography className={classes.secondaryHeading}>{stock.price}</Typography>
                                                         <Typography className={classes.tertiaryHeading}>{stock.quantity}</Typography>
                                                       </ExpansionPanelSummary>
                                                       <ExpansionPanelDetails>
                                                         <Typography>
                                                                WOW what a pretty graph
                                                         </Typography>
                                                       </ExpansionPanelDetails>
                                                     </ExpansionPanel>

                                    );
                                })
                              }

             </div>
        );
    }
}

export default withStyles(styles) (MyStocks);