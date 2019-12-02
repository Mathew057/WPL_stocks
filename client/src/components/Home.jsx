import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import MaterialTable from 'material-table';
import {Line} from 'react-chartjs-2';
import {tableIcons} from './materialTableConstants';
import RefreshIcon from '@material-ui/icons/Refresh';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import ScheduleIcon from '@material-ui/icons/Schedule';

class Home extends React.Component{

    state = {
        stocks: [],
        userStockIndicators:[]
    }

    componentDidMount() {
      if(this.state.stocks.length === 0)
        this.getStockData();
      if(this.state.userStockIndicators.length === 0)
        this.getUserStockIndicators();
    }

    getStockData = () =>{
     const url = process.env.REACT_APP_baseAPIURL + '/stocks'
         fetch(url)
         .then(res => res.json())
         .catch(error => console.log('Error:', error))
         .then(response => {
             this.setState({
                 stocks: response
             })
         });
    }

    getUserStockIndicators = () =>{
     const url = process.env.REACT_APP_baseAPIURL + '/user/stocks'
         fetch(url)
         .then(res => res.json())
         .catch(error => console.log('Error:', error))
         .then(response => {
             this.setState({
                userStockIndicators: response.map(userStock => userStock.stock_indicator)
             })
         });
    }


    handleCart = (e, fieldName, rowData) =>{
            var existingEntries = JSON.parse(sessionStorage.getItem('cart')) || [];
            var newEntries = [];
            rowData.map((row,index)=>{
              var addEntry = {
                "stock_indicator": row.stock_indicator,
                "type": fieldName,
                "quantity": row.shares_available,
                "start_date": new Date().toLocaleDateString("en-US"),
                "end_date": new Date().toLocaleDateString("en-US"),
                "interval": "1",
                "frequency": "day"
            };
              newEntries.push(addEntry)
            })
            var allEntries = existingEntries.concat(newEntries)
            sessionStorage.setItem('cart', JSON.stringify(allEntries));
        };

    validateSell = (rowData) =>{
        var selectedToSell = rowData.map(selected => selected.stock_indicator)
        return(this.state.userStockIndicators.some(element=> selectedToSell.includes(element)))
    }

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
        const {stocks, userStocks} = this.state;

        return(
            <div className={classes.contentContainer}>
                  <MaterialTable
                     title="Stock Market"
                     columns={[
                       { title: 'Stock Indicator', field: 'stock_indicator' },
                       { title: 'Company Name', field: 'company_name' },
                       { title: 'Trend', field: 'trend'},
                       { title: 'Price', field: 'price', type: 'currency' },
                       { title: 'Shares Available', field: 'shares_available', type: 'numeric' }
                     ]}
                     data= {stocks}
                     options={{
                       sorting: true,
                       pageSize: 10,
                       pageSizeOptions: [10,20,25],
                       selection: true
                     }}
                    icons={tableIcons}
                    actions={[
                      {
                        icon: AddShoppingCart,
                        tooltip: 'Buy Stocks',
                        onClick: (event, rowData) => {this.handleCart(event, 'buy', rowData)}
                      },
                      rowData=> ({
                        icon: RemoveShoppingCart,
                        tooltip: 'Sell Stocks',
                        onClick: (event, rowData) => {this.handleCart(event, 'sell', rowData)},
                        hidden: this.validateSell(rowData)
                      }),
                      rowData=>({
                        icon: ScheduleIcon,
                        tooltip: 'Schedule Stocks',
                        onClick: (event, rowData) => alert("You want to schedule " + rowData),
                        hidden: rowData.length > 1
                      }),
                       {
                         icon: RefreshIcon,
                         tooltip: 'Refresh Stocks',
                         isFreeAction: true,
                         onClick:()=>{this.getStockData()}
                       }
                    ]}
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

export default withStyles(styles) (Home);