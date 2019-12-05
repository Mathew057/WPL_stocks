import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import MaterialTable from 'material-table';
import {tableIcons} from './materialTableConstants';
import {encodeFormData} from './functions';
import Button from '@material-ui/core/Button';
import moment from 'moment';
moment.tz.setDefault('UTC');
import {Line} from 'react-chartjs-2';

const axios = require('axios');

class MyStocks extends React.Component{


    state= {
        stocks: {},
        schedules: [],
        history: 'month',
        start_min: '',
        end_max: '',
        unit: 'day',
        interval: 'daily'
    }

    componentDidMount() {
        var stocks = {}
        var self = this;
        const stocks_url = process.env.REACT_APP_baseAPIURL + '/user/stocks'
        axios.get(stocks_url)
        .then(function(response){
           response.data.forEach(element=> stocks[element.stock_indicator] = element)
           self.setState({
            stocks: stocks
           })
           console.log(stocks)
        })
        .catch(function (error){
            console.log(error)
        })

        const schedule_url = process.env.REACT_APP_baseAPIURL + '/user/schedules'
        fetch(schedule_url)
            .then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => {
                this.setState({
                    schedules: response
                })
            });

         var default_start = new Date();
         var default_end =  new Date();
         this.setState({
            end_max: default_start.toISOString(),
            start_min:  new Date(default_end.setMonth(default_end.getMonth() -1)).toISOString()
         })
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

    changeHistory=(type, stockID)=>{
        var start = new Date();
        var end = new Date();

        var end_max;
        var start_min;
        var unit;
        var interval;
        var stepSize=1;

        switch(type) {
          case 'day':
                end_max = start;
                start_min= new Date(end.setDate(end.getDate() - 1));
                stepSize=5;
                unit='minute';
                interval= '5min';
                break;

          case 'week':
                end_max= start;
                start_min= new Date(end.setDate(end.getDate() - 7));
                unit= 'hour';
                interval= 'hourly';
            break;
           case 'lastweek':
                end_max= new Date(end.setDate(end.getDate() - 14));
                start_min= new Date(end.setDate(end.getDate() - 7));
                unit= 'hour';
                interval='hourly';
            break;
           case 'month':
                end_max= start;
                start_min= new Date(end.setMonth(end.getMonth() -1));
                unit= 'day';
                interval= 'daily';
            break;
           case 'year':
                end_max= start;
                start_min= new Date(end.setFullYear(end.getFullYear()-1));
                unit= 'day';
                interval= 'daily';
            break;
           case '5year':
                end_max= start;
                start_min= new Date(end.setFullYear(end.getFullYear()-5));
                unit= 'week';
                interval= 'weekly';
            break;
          default:
                end_max= start;
                start_min= new Date(end.setMonth(end.getMonth() -1));
                unit= 'day';
                interval= 'daily';
            break;
        }

        start_min.setHours(32);
        end_max.setHours(17);
        this.setState({
            end_max: end_max.toISOString(),
            start_min: start_min.toISOString(),
            unit: unit,
            interval: interval,
            stepSize: stepSize
        })
        this.updateStockGraph(stockID, start_min, end_max, interval, stepSize);
    }

    updateStockGraph(stockID, start_min, end_max, interval){
        const url = process.env.REACT_APP_baseAPIURL + '/stocks/' + stockID;
        var self = this;
        const {stocks} = this.state;
        axios.post(url,{
             start_datetime: start_min,
             end_datetime: end_max,
             interval: interval
            }
          )
          .then(function (response) {
            console.log(response)
            self.setState({
                stocks: {...stocks, [response.data.stock_indicator]: {...stocks[response.data.stock_indicator], ...response.data}}
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    getConfigData(stockData){
        console.log(stockData.graph)
        const data = {
//          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
         var display_f={
              'minute': 'h:mm a',
              'hour': 'hA',
              'day': 'MMM DD',
              'month': 'MMM YYYY'
           }
         var time = {
            unit: this.state.unit,
            displayFormats: display_f,
            stepSize: this.state.stepSize,
            min: this.state.start_min,
            max: this.state.end_max,
            parser: (date) => {console.log(typeof date); return moment.utc(date);}
        }
        return time;
    }



    getOptions(){
        var time = this.getTime();
         var options = {
                scales: {
                    xAxes: [{
                        title: "time",
                        type: 'time',
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
                     data= {Object.values(stocks)}
                     options={{
                       sorting: true
                     }}
                     detailPanel={rowData => {
                     console.log(rowData)
                          return (
                            <div>
                                  <Line data={this.getConfigData(rowData)} options={this.getOptions()} />
                                   <span>
                                    History
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={()=>this.changeHistory('day', rowData.stock_indicator)}>Day</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={()=>this.changeHistory('week', rowData.stock_indicator)}>Current Week</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={()=>this.changeHistory('lastweek', rowData.stock_indicator)}>Last Week</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={()=>this.changeHistory('month', rowData.stock_indicator)}>Month</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={()=>this.changeHistory('year', rowData.stock_indicator)}>Year</Button>
                                    <Button  color="primary" variant="contained" className={classes.buttonPadding} onClick={()=>this.changeHistory('5year', rowData.stock_indicator)}>Past 5 Years</Button>
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