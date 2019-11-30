import React from 'react';
import styles from './routeStyles';
import {
    withStyles
} from '@material-ui/core/styles/index';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Accounts extends React.Component {

    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        expanded: null,
        accountData: [],
        open: false,

        addAccount: 'bank',
        fromAccount: '',
        toAccount: '',
        amount: '',

        hodlBalance:''
    };

    componentDidMount() {
        const url = process.env.REACT_APP_baseAPIURL + '/user/accounts'
        fetch(url)
            .then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => {
                this.setState({
                    accountData: response
                })
            });
        const balance_url = process.env.REACT_APP_baseAPIURL + '/user/balance'
        fetch(balance_url)
            .then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => {
                this.setState({
                    hodlBalance: response.amount
                })
            });
    }
    handleInputFocus = (e) => {
        this.setState({
            focus: e.target.name
        });
    }

      handleAccount = (e) => {
         this.setState({addAccount: e.target.value});
         console.log(e.target.value)
         console.log(this.state.addAccount)
      };

    handlePanelChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }


      handleClickOpen = () => {
        this.setState({ open: true });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

    render() {
        const {
            classes
        } = this.props;
        const {
            expanded,
            accountData,
            addAccount,
            toAccount,
            fromAccount,
            hodlBalance,
            amount
        } = this.state;
        return (
        <div>
            <div className={classes.contentContainer} id="AccountForm">
           <h2>Accounts</h2>
           <div >
                <div>
                 <Button variant="contained" color="secondary" className = {classes.rightButton} onClick={this.handleClickOpen}>
                   Add Account
                   <AddIcon className={classes.rightIcon} />
                 </Button>
                 </div>
           <h2 className= {classes.leftText}> Hodl Balance: ${this.state.hodlBalance} </h2>
           <h3 className= {classes.leftText}>Linked Accounts </h3>
               {accountData.map((account, index)=>{
                    return(
                                     <ExpansionPanel className= {classes.leftText} expanded={expanded === 'panel'+index} onChange={this.handlePanelChange('panel'+index)} key={index}>
                                       <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                         <Typography className={classes.heading}>{account.name}</Typography>
                                         <Typography className={classes.secondaryHeading}>{account.account_indicator}</Typography>
                                       </ExpansionPanelSummary>
                                       <ExpansionPanelDetails>
                                         <Typography>
                                            Account Type: {account.card_type ? account.card_type + ' ': ''} {account.type} <br/>
                                            Account Name: {account.name} <br/>
                                            Account Indicator: {account.account_indicator} <br/>
                                            {account.expiration ? 'Account Expiration: ' + account.expiration : ''}
                                            {account.routing_number ? 'Routing Number: ' + account.routing_number : ''}
                                         </Typography>
                                       </ExpansionPanelDetails>
                                     </ExpansionPanel>

                    );
                })
              }

          </div>
           <div>
                 <Dialog
                     open={this.state.open}
                     onClose={this.handleClose}
                     aria-labelledby="form-dialog-title"
                   >
                     <DialogTitle id="form-dialog-title">Add Account</DialogTitle>
                     <DialogContent>
                       <DialogContentText>
                            To add a new account, please fill out the following information.
                       </DialogContentText>
                          <Grid container justify="center"spacing={10}>
                             <Grid item>
                             Account Type:
                              <Select
                                       value={this.state.addAccount}
                                       onChange={this.handleAccount}
                                     >
                                       <MenuItem  value={'bank'}>Bank Account</MenuItem>
                                       <MenuItem value={'credit'}>Credit Card</MenuItem>
                                     </Select>
                             </Grid>

                             {addAccount==='credit' &&    <Grid item>
                                  <h4> Credit Card </h4>
                                  <Cards
                                    cvc={this.state.cvc}
                                    expiry={this.state.expiry}
                                    focus={this.state.focus}
                                    name={this.state.name}
                                    number={this.state.number}
                                  />
                                  <form>
                                  <div>
                                  	<TextField
                                      type="tel"
                                      label="Card Number"
                                      required
                                      onChange={this.handleChange}
                                      onFocus={this.handleInputFocus}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />
                                    </div>
                                    <div>
                                    <TextField
                                      type="text"
                                      label="Name"
                                      required
                                      onChange={this.handleChange}
                                      onFocus={this.handleInputFocus}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />
                                    </div>
                                    <div>
                                     <TextField
                                       type="tel"
                                       label="CVC"
                                       inputProps={{ pattern: "[0-9]{3,4}" }}
                                       required
                                       onChange={this.handleChange}
                                       onFocus={this.handleInputFocus}
                                       fullWidth
                                      margin="normal"
                                      variant="outlined"
                                     />
                                     </div>
                                  </form>
                                 </Grid>}
                                {addAccount==='bank' && <Grid item>
                                  <h4> Bank Account</h4>
                                 <form>
                                    <div>
                                     <TextField
                                       type="text"
                                       label="Bank"
                                       fullWidth
                                      margin="normal"
                                      variant="outlined"
                                     />
                                     </div>
                                    <div>
                                     <TextField
                                       type="text"
                                       label="Routing Number"
                                       inputProps={{ pattern: "[0-9]{9}" }}
                                       fullWidth
                                      margin="normal"
                                      variant="outlined"
                                     />
                                     </div>
                                    <div>
                                     <TextField
                                       type="text"
                                       label="Account Number"
                                       inputProps={{ pattern: "[0-9]{8,12}" }}
                                       fullWidth
                                      margin="normal"
                                      variant="outlined"
                                     />
                                     </div>
                                 </form>
                                 </Grid>}
                                </Grid>
                     </DialogContent>
                     <DialogActions>
                       <Button onClick={this.handleClose} color="primary">
                         Add Account
                       </Button>
                       <Button onClick={this.handleClose} color="primary">
                         Cancel
                       </Button>
                     </DialogActions>
                   </Dialog>
           </div>
          </div>
              <div className={classes.contentContainer}>
                <h3 className= {classes.leftText}>Transfer Money</h3>
                <form onSubmit={this.handleTransfer} className= {classes.leftText}>
                    <div>
                   <TextField
                      select
                      label="From Account"
                      name= "fromAccount"
                      className={classes.textField}
                      value={fromAccount}
                      onChange={this.handleChange}
//                      SelectProps={{
//                        MenuProps: {
//                          className: classes.menu,
//                        },
//                      }}
                      error={(toAccount === fromAccount && fromAccount !== '')}
                      helperText={toAccount === fromAccount && fromAccount !== '' ? "Must pick different to/from accounts": "Account to transfer money from"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    >
                      {this.state.accountData.map(accountOption => (
                        <MenuItem key={accountOption.name} value={accountOption.name}>
                            <Typography className={classes.heading}>{accountOption.name}</Typography>
                             <Typography className={classes.secondaryHeading}>{accountOption.account_indicator}</Typography>
                        </MenuItem>
                      ))}
                       <MenuItem key={'Hodl Balance'} value={'Hodl Balance'}>Hodl Balance</MenuItem>
                    </TextField>
                   <TextField
                      select
                      label="To Account"
                      name= "toAccount"
                      error={toAccount === fromAccount && toAccount !== ''}
                      className={classes.textField}
                      value={toAccount}
                      onChange={this.handleChange}
//                      SelectProps={{
//                        MenuProps: {
//                          className: classes.menu,
//                        },
//                      }}
                      helperText={toAccount === fromAccount && toAccount !== '' ? "Must pick different to/from accounts": "Account to transfer money to"}
                      margin="normal"
                      variant="outlined"
                    >
                      {this.state.accountData.map(accountOption => (
                        <MenuItem key={accountOption.name} value={accountOption.name}>
                            <Typography className={classes.heading}>{accountOption.name}</Typography>
                             <Typography className={classes.secondaryHeading}>{accountOption.account_indicator}</Typography>
                        </MenuItem>
                      ))}
                      <MenuItem key={'Hodl Balance'} value={'Hodl Balance'}>Hodl Balance</MenuItem>
                    </TextField>
                        <TextField
                          type= "number"
                          label="Amount"
                          name= "amount"
                          margin="normal"
                          variant="outlined"
                          helperText= {fromAccount==='Hodl Balance' && amount > parseFloat(hodlBalance)? "Unable to transfer more than Hodl Balance" : "Amount to transfer"}
                          onChange = {this.handleChange}
                          value={amount}
                          className= {classes.textField}
                          error= {fromAccount==='Hodl Balance' && amount > parseFloat(hodlBalance)}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Transfer Money


                    </Button>
                  </form>
                </div>
          </div>

        );
    }
}

export default withStyles(styles)(Accounts);