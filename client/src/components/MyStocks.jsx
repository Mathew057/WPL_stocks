import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
import {Line} from 'react-chartjs-2';

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

    getConfigData(stockData){
        const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: stockData
            }
          ]
        };
        return data;
    }

    render(){
        const {classes} = this.props;
        const {expanded, stocks, stock_data} = this.state;
        return(

            <div className={classes.contentContainer}>
          {/*                    {stocks.map((stock, index)=>{
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
                              } */}
                   <MaterialTable
                     title="My Stocks"
                     columns={[
                       { title: 'Stock Indicator', field: 'stock_indicator' },
                       { title: 'Company Name', field: 'company_name' },
                       { title: 'Trend', field: 'trend' },
                       { title: 'Price', field: 'price' },
                       { title: 'Quantity', field: 'quantity', type: 'numeric' }
                     ]}
                     data= {stocks}
                     options={{
                       sorting: true
                     }}
                     detailPanel={rowData => {
                          return (
                            <div>
                                <Line data={this.getConfigData(rowData.data)} />
                            </div>
                          )
                        }}
                   />
             </div>
        );
    }
}

export default withStyles(styles) (MyStocks);