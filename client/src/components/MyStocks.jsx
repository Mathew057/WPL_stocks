import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import MaterialTable from 'material-table';
import {Line} from 'react-chartjs-2';
import {tableIcons} from './materialTableConstants';
import {encodeFormData} from './functions';

class MyStocks extends React.Component{

    state= {
        stocks: [],
        schedules: []
    }

    componentDidMount() {
        const stocks_url = process.env.REACT_APP_baseAPIURL + '/user/stocks'
        fetch(stocks_url)
            .then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => {
                this.setState({
                    stocks: response
                })
            });

        const schedule_url = process.env.REACT_APP_baseAPIURL + '/user/schedules'
        fetch(schedule_url)
            .then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => {
                this.setState({
                    schedules: response
                })
            });
    }

    handleDeleteSchedule(oldData){
        console.log(oldData)
        const url = process.env.REACT_APP_baseAPIURL + '/user/schedules/' + oldData._id
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(response => console.log(response))
        .catch(error => alert(error.message))
    }

    handleUpdateSchedule(rowData){
       console.log(rowData)
       let scheduleData =   {name: rowData.name,
                            type: rowData.type,
                            frequency: rowData.frequency,
                            interval: rowData.interval,
                            stock_indicator: rowData.stock_indicator,
                            quantity: rowData.quantity,
                            start_datetime: rowData.start_datetime,
                            end_datetime: rowData.end_datetime
                            };
        const url = process.env.REACT_APP_baseAPIURL + '/user/schedules/' + rowData._id
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: encodeFormData(scheduleData)
        })
        .then(res => res.json())
        .then(response => {
            response.message ? alert(response.message) : console.log(response.message)
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
        const {stocks, schedules} = this.state;
        return(

            <div className={classes.contentContainer}>
                <div>
                   <MaterialTable
                     title="My Stocks"
                     icons={tableIcons}
                     columns={[
                       { title: 'Stock Indicator', field: 'stock_indicator' },
                       { title: 'Company Name', field: 'company_name' },
                       { title: 'Trend', field: 'trend' },
                       { title: 'Price', field: 'price', type: 'currency'},
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
                <div>
                   <br/>
                   <MaterialTable
                     title="My Schedules"
                     icons={tableIcons}
                     columns={[
                       { title: 'Schedule Name', field: 'name' },
                       { title: 'Stock Indicator', field: 'stock_indicator', editable: 'never' },
                       { title: 'Type', field: 'type', lookup: { buy: 'Buy', sell: 'Sell' }},
                       { title: 'Quantity', field: 'quantity', type: 'numeric' },
                       { title: 'Start Date', field: "start_datetime", type: 'date'},
                       { title: 'End Date', field: "end_datetime", type: 'date'},
                       { title: 'Interval', field: 'interval', type: 'numeric' },
                       { title: 'Frequency', field: 'frequency',lookup: { day: 'Day', week: 'Week', month: 'Month', year: 'Year' } },
                    ]}
                     data= {schedules}
                     options={{
                       sorting: true
                     }}
                     editable={{
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              {
                                const data = this.state.schedules;
                                const index = data.indexOf(oldData);
                                data[index] = newData;
                                this.handleUpdateSchedule(newData);
                                this.setState({ data }, () => resolve());
                              }
                              resolve()
                            }, 1000)
                          }),
                        onRowDelete: oldData =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              {
                                let data = this.state.schedules;
                                const index = data.indexOf(oldData);
                                data.splice(index, 1);
                                this.handleDeleteSchedule(oldData);
                                this.setState({ data }, () => resolve());
                              }
                              resolve()
                            }, 1000)
                          }),
                      }}
                   />
                </div>
             </div>
        );
    }
}

export default withStyles(styles) (MyStocks);