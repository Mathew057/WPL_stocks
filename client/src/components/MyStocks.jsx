import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import MaterialTable from 'material-table';
import {Line} from 'react-chartjs-2';
import {tableIcons} from './materialTableConstants';
import {encodeFormData} from './functions';
import Button from '@material-ui/core/Button';

class MyStocks extends React.Component{

    state= {
        stocks: [],
        schedules: [],
        history: 'month',
        start_min: '',
        end_max: '',
        unit: ''
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

    changeHistory=(type)=>{
        this.setState({
            history: type
        })
    }


    getConfigData(stockData){
        const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: stockData.stock_indicator,
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
              data: stockData.graph,
            }
          ]
        };
        return data;
    }

    getTime=()=>{
        this.updateTimeValues();
         var display_f={
              'minute': 'h:mm a',
              'hour': 'hA',
              'day': 'MMM DD',
              'month': 'MMM YYYY'
           }
         var time = {
           unit: this.state.unit,
            displayFormats: display_f,
            min: this.state.start_min,
            max: this.state.end_max
        }
        return time;
    }

    updateTimeValues=()=>{
        var type = this.state.history;
        var start = new Date();
        var end = new Date();
        switch(type) {
          case 'day':{
            this.setState({
                start_min: start.toISOString(),
                end_max: new Date(end.setDate(end.getDate() - 1)).toISOString(),
                unit: 'minute'
            })
            break;}
          case 'week': {
            this.setState({
                start_min: start.toISOString(),
                end_max: new Date(end.setDate(end.getDate() - 7)).toISOString(),
                unit: 'hour'
            })
            break;}
           case 'lastweek': {
            this.setState({
                start_min: end.setDate(end.getDate() - 14).toISOString(),
                end_max: new Date(end.setDate(end.getDate() - 7)).toISOString(),
                unit: 'hour'
            })
            break;}
           case 'month': {
            this.setState({
                start_min: start.toISOString(),
                end_max: new Date(end.setMonth(end.getMonth() -1)).toISOString(),
                unit: 'day'
            })
            break;}
           case 'year': {
            this.setState({
                start_min: start.toISOString(),
                end_max: new Date(end.setFullYear(end.getFullYear()-1)).toISOString(),
                unit: 'month'
            })
            break;}
           case '5year': {
            this.setState({
                start_min: start.toISOString(),
                end_max: new Date(end.setFullYear(end.getFullYear()-5)).toISOString(),
                unit: 'month'
            })
            break;}
          default: {
            this.setState({
                start_min: start.toISOString(),
                end_max: new Date(end.setMonth(end.getMonth() -1)).toISOString(),
                unit: 'day'
            })
            break;
            }
        }
    }

    getOptions(){
        var time = this.getTime();
         var options = {
                title: {text: "This is a test"},
                scales: {
                    xAxes: [{
                        title: "time",
                        type: 'time',
                        gridLines: {
                            lineWidth: 2
                        },
                        time: time,
                        scaleLabel: {
                            display:     true,
                            labelString: 'Date'
                        }
                    }]
                }
            }
            return options;
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
                                <Line data={this.getConfigData(rowData)} options={this.getOptions()} />
                                   <span>
                                    History
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={this.changeHistory('day')}>Day</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={this.changeHistory('week')}>Current Week</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={this.changeHistory('lastweek')}>Last Week</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={this.changeHistory('month')}>Month</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={this.changeHistory('year')}>Year</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={this.changeHistory('5year')}>Past 5 Years</Button>
                                </span>
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
                       { title: 'Start Date', field: "start_datetime", type: 'datetime'},
                       { title: 'End Date', field: "end_datetime", type: 'datetime'},
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