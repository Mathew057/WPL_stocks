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
        stocks: []
    }

    componentDidMount() {
      if(this.state.stocks.length === 0)
        this.getStockData();
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
        const {stocks} = this.state;

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
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                      },
                      {
                        icon: RemoveShoppingCart,
                        tooltip: 'Sell Stocks',
                        onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                      },
                      {
                        icon: ScheduleIcon,
                        tooltip: 'Schedule Stocks',
                        onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                      },
                       {
                         icon: RefreshIcon,
                         tooltip: 'Refresh Stocks',
                         isFreeAction: true,
                         onClick:()=>{this.getStockData()}
                       }
                    ]}
//                    components={{
//                      Action: props => (
//                        <Button
//                          onClick={(event) => props.action.onClick(event, props.data)}
//                          color="primary"
//                          variant="contained"
//                          style={{textTransform: 'none'}}
//                          size="small"
//                        >
//                          Buy/Sell
//                        </Button>
//                      ),
//                    }}
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