import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import MaterialTable from 'material-table';
import {tableIcons} from './materialTableConstants';
import PublishIcon from '@material-ui/icons/Publish';
const axios = require('axios');

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

    submitCart = () =>{
        var self = this;
        const url = process.env.REACT_APP_baseAPIURL + '/user/stocks'
        axios.post(url,
            this.state.cart
          )
          .then(function (response) {
            console.log(response)
            if(response.status===200){
              self.setState({
                        cart: []
                    });
              sessionStorage.removeItem('cart');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    };

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
                        { title: 'Company Name', field: 'company_name', editable: 'never'},
                        { title: 'Type', field: 'type', lookup: { buy: 'Buy', sell: 'Sell' }},
                        { title: 'Quantity', field: 'quantity', type: 'numeric' }
                      ]}
                      data= {cart}
                      options={{
                        sorting: true,
                        search: false
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
                      actions={[
                         {
                           icon: PublishIcon,
                           tooltip: 'Submit Cart',
                           isFreeAction: true,
                           onClick:()=>{this.submitCart()}
                        }
                      ]}
                    />

            </div>
        );
    }
}

export default withStyles(styles) (Cart);