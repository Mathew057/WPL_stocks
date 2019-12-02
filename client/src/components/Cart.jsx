import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import MaterialTable from 'material-table';
import {tableIcons} from './materialTableConstants';

class Cart extends React.Component{

    state = {
        cart: []
    }

    componentDidMount() {
        var retrievedObject = sessionStorage.getItem('cart');
        var cart = JSON.parse(retrievedObject) || []
        this.setState({
            cart: cart
    })
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
                                 sessionStorage.setItem('cart', JSON.stringify(data));
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
                                 sessionStorage.setItem('cart', JSON.stringify(data));
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