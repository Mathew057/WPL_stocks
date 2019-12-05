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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import {encodeFormData} from './functions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
const axios = require('axios');


class Home extends React.Component{

    state = {
        stocks: {},
        userStockIndicators:[],
        open: false,
        schedule_name: '',
        type: '',
        frequency: '',
        sched_interval: '',
        stock_indicator: '',
        quantity: '',
        start_datetime: '',
        end_datetime: '',
        unit: 'day',
        display_f: '',
        stepSize: '1',
        start_min:'',
        end_max: '',
        interval: 'daily'
    }

    checkLoggedIn = () =>{
          const url = process.env.REACT_APP_baseAPIURL + '/init'
          axios.post(url)
            .then(function (response) {
              console.log(response)
              if(response.status===200){
                console.log(response)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
    };


    componentDidMount() {
      this.checkLoggedIn();
//      if(this.state.stocks.length === 0 && Cookies.get('app-jt')!==null){
        this.getStockData();
//      }
//      if(this.state.userStockIndicators.length === 0 && Cookies.get('app-jt')!==null){
         this.getUserStockIndicators();
                  var default_start = new Date();
                  var default_end =  new Date();
                  this.setState({
                     end_max: default_start.toISOString(),
                     start_min:  new Date(default_end.setMonth(default_end.getMonth() -1)).toISOString()
                  })
//      }
    }

    getStockData = () =>{
     const url = process.env.REACT_APP_baseAPIURL + '/stocks'
        var stocks = {}
        var self = this;
        axios.get(url)
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
    }

    getUserStockIndicators = () =>{
    this.checkLoggedIn();
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
                "company_name": row.company_name,
                "type": fieldName,
                "quantity": row.shares_available
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

    validateTime = () =>{
        var start =  8 * 60;
        var end   = 17 * 6 ;
        var now = new Date();
        var time = now.getHours() * 60 + now.getMinutes();
        var day= now.getDay()
        return (time >= start && time <= end && day >=1 && day<=5);
    }

    handleClickOpen = (event, stockIndicator) => {
        this.setState({ open: true, stock_indicator: stockIndicator });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleInputChange = (e, child, fieldName) =>{
        this.setState({
            [e.target.name]: e.target.value,
            [fieldName]: child.key
        });
    }

    addNewSchedule = () =>{
       const {schedule_name, type, frequency, sched_interval, stock_indicator, quantity, start_datetime, end_datetime} = this.state;
       let scheduleData =   {name: schedule_name,
                            type: type,
                            frequency: frequency,
                            interval: sched_interval,
                            stock_indicator: stock_indicator,
                            quantity: quantity,
                            start_datetime: start_datetime,
                            end_datetime: end_datetime
                            };
        const url = process.env.REACT_APP_baseAPIURL + '/user/schedules'
        fetch(url, {
            method: 'POST',
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
        this.handleClose();
        this.clearScheduleData();
    };

    clearScheduleData = () =>{
        this.setState({
            schedule_name: '',
            type: '',
            frequency: '',
            sched_interval: '',
            stock_indicator: '',
            quantity: '',
            start_datetime: '',
            end_datetime: ''
        });
    }

    getConfigData(stockData){
        const data = {
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
              data: stockData.graph
            }
          ]
        };
        return data;
    }

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

    getTime=()=>{
         var display_f={
              'minute': 'h:mm a',
              'hour': 'MMM D hA',
              'day': 'MMM DD',
              'month': 'MMM YYYY'
           }
         var time = {
            unit: this.state.unit,
            displayFormats: display_f,
            stepSize: this.state.stepSize,
            min: this.state.start_min,
            max: this.state.end_max,
//            parser: (date) => {console.log(typeof date); return moment.utc(date);}
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
        const {stocks, schedule_name, type, frequency, sched_interval, stock_indicator,quantity, start_datetime, end_datetime} = this.state;

        return(
            //TODO: Uncomment out time validation check for actions
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
                     data= {Object.values(stocks)}
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
                        onClick: (event, rowData) => {this.handleCart(event, 'buy', rowData)},
//                        hidden: !this.validateTime()
                      },
                      rowData=> ({
                        icon: RemoveShoppingCart,
                        tooltip: 'Sell Stocks',
                        onClick: (event, rowData) => {this.handleCart(event, 'sell', rowData)},
                        hidden: !this.validateSell(rowData)
//                        && !this.validateTime()
                      }),
                      rowData=>({
                        icon: ScheduleIcon,
                        tooltip: 'Schedule Stocks',
                        onClick: (event, rowData)=>{this.handleClickOpen(event, rowData[0].stock_indicator)},
                        hidden: rowData.length > 1
//                        || !this.validateTime()
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
                                <Line data={this.getConfigData(rowData)} options={this.getOptions()}/>
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
  <div>
                 <Dialog
                     open={this.state.open}
                     onClose={this.handleClose}
                     aria-labelledby="form-dialog-title"
                   >
                     <DialogTitle id="form-dialog-title">Add Schedule</DialogTitle>
                     <DialogContent>
                       <DialogContentText>
                            To add a new schedule, please fill out the following information.
                       </DialogContentText>
                          <Grid container justify="center"spacing={10}>
                                <Grid item>
                                  <form>
                                  <div>
                                  	<TextField
                                  	  label="Stock Indicator"
                                      name="stock_indicator"
                                      required
                                      value={stock_indicator}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />
                                  	<TextField
                                      label="Schedule Name"
                                      name="schedule_name"
                                      required
                                      value={schedule_name}
                                      onChange={this.handleChange}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />

                                 <TextField
                                    select
                                    label="Type"
                                    name= "type"
                                    value={type}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                  >
                                <MenuItem value={'buy'}>Buy</MenuItem>
                                <MenuItem value={'sell'}>Sell</MenuItem>
                                  </TextField>

                                 <TextField
                                    select
                                    label="Frequency"
                                    name= "frequency"
                                    value={frequency}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                  >
                                <MenuItem value={'second'}>Second</MenuItem>
                                <MenuItem value={'minute'}>Minute</MenuItem>
                                <MenuItem value={'hour'}>Hour</MenuItem>
                                <MenuItem value={'day'}>Day</MenuItem>
                                <MenuItem value={'week'}>Week</MenuItem>
                                <MenuItem value={'month'}>Month</MenuItem>
                                <MenuItem value={'year'}>Year</MenuItem>

                                  </TextField>
                                  	<TextField
                                  	  type= "number"
                                      label="Interval"
                                      name="sched_interval"
                                      required
                                      value={sched_interval}
                                      onChange={this.handleChange}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />
                                  	<TextField
                                  	  type= "number"
                                      label="Quantity"
                                      name="quantity"
                                      required
                                      value={quantity}
                                      onChange={this.handleChange}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />
                                  	<TextField
                                  	  type= "datetime-local"
                                      label="Start Date"
                                      name="start_datetime"
                                      required
                                      value={start_datetime}
                                      onChange={this.handleChange}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />
                                  	<TextField
                                  	  type= "datetime-local"
                                      label="End Date"
                                      name="end_datetime"
                                      required
                                      value={end_datetime}
                                      onChange={this.handleChange}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />
                                </div>
                                  </form>
                                 </Grid>
                                </Grid>
                     </DialogContent>
                     <DialogActions>
                       <Button onClick={this.addNewSchedule} color="primary">
                         Add Schedule
                       </Button>
                     </DialogActions>
                   </Dialog>
           </div>}
            </div>
        );
    }
}

export default withStyles(styles) (Home);