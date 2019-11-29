import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import {Line} from 'react-chartjs-2';
import {tableIcons} from './materialTableConstants';

class Cart extends React.Component{

    state = {
        cart: []
    }

    componentDidMount() {
    const url = process.env.REACT_APP_baseAPIURL + '/user/schedules'
        fetch(url)
            .then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => {
                this.setState({
                    cart: response
                })
            });
    }

    render(){
        const {classes} = this.props;
        const {cart} = this.state;
        return(
            <div className={classes.contentContainer}>
                    <MaterialTable
                      title="My Cart"
                      icons={tableIcons}
                      columns={[
                        { title: 'Stock Indicator', field: 'stock_indicator', editable: 'never' },
                        { title: 'Type', field: 'type', lookup: { buy: 'Buy', sell: 'Sell' }},
                        { title: 'Quantity', field: 'quantity', type: 'numeric' },
                        { title: 'Start Date', field: "start_date", type: 'date'},
                        { title: 'End Date', field: "end_date", type: 'date'},
                        { title: 'Interval', field: 'interval', type: 'numeric' },
                        { title: 'Frequency', field: 'frequency',lookup: { day: 'Day', week: 'Week', month: 'Month', year: 'Year' } },
                     ]}
                      data= {cart}
                      options={{
                        sorting: true
                      }}
                      editable={{
                         onRowUpdate: (newData, oldData) =>
                           new Promise((resolve, reject) => {
                             setTimeout(() => {
                               {
                                 const data = this.state.cart;
                                 const index = data.indexOf(oldData);
                                 data[index] = newData;
                                 this.setState({ data }, () => resolve());
                               }
                               resolve()
                             }, 1000)
                           }),
                         onRowDelete: oldData =>
                           new Promise((resolve, reject) => {
                             setTimeout(() => {
                               {
                                 let data = this.state.cart;
                                 const index = data.indexOf(oldData);
                                 data.splice(index, 1);
                                 this.setState({ data }, () => resolve());
                               }
                               resolve()
                             }, 1000)
                           }),
                       }}
                    />

            </div>
        );
    }
}

export default withStyles(styles) (Cart);