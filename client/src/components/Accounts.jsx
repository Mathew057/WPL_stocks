import React from 'react';
import styles from './routeStyles';
import {withStyles} from '@material-ui/core/styles/index';
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
import {encodeFormData} from './functions';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';

class Accounts extends React.Component {

    state = {
        accountName:'',
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        expanded: null,
        accountData: [],
        open: false,

        type: 'bank_account',
        fromAccount: '',
        from_id:'',
        toAccount: '',
        to_id:"",
        amount: '',

        hodlBalance:''
    };

    componentDidMount() {
        if(this.state.accountData.length ===0)
            this.getAccounts()
        if(this.state.hodlBalance==='')
            this.getBalance()
    };

    getAccounts = () =>{
        const url = process.env.REACT_APP_baseAPIURL + '/user/accounts'
        fetch(url)
        .then(res => res.json())
        .catch(error => console.log('Error:', error))
        .then(response => {
            this.setState({
                accountData: response
            })
        });
    };

    getBalance= () =>{
        const balance_url = process.env.REACT_APP_baseAPIURL + '/user/balance'
        fetch(balance_url)
        .then(res => res.json())
        .catch(error => console.log('Error:', error))
        .then(response => {
            this.setState({
                hodlBalance: response.amount
            })
        });
    };

    handleInputFocus = (e) => {
        this.setState({
            focus: e.target.name
        });
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

    handleInputChange = (e, child, fieldName) =>{
        this.setState({
            [e.target.name]: e.target.value,
            [fieldName]: child.key
        });
    }

    handleClickOpen = () => {
    this.setState({ open: true });
    };

    handleClose = () => {
    this.setState({ open: false });
    };

    handleTransfer = () =>{
        const {from_id, to_id, amount} = this.state;
        let transferInfo = {
            from_id: from_id,
            to_id: to_id,
            amount: amount
        };
        const url = process.env.REACT_APP_baseAPIURL + '/user/transfer'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: encodeFormData(transferInfo)
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
        this.getBalance();
    }

    getFormData = () =>{
        const {type, name, account_number, routing_number, number, cvc, expiry, name_on_card} = this.state;
        let bankFormData = {type: type,
                            name: name,
                            account_number: account_number,
                            routing_number: routing_number};
        let creditData =    {type: type,
                            name: name,
                            card_number: number,
                            security_code: cvc,
                            expiration: expiry,
                            name_on_card: name_on_card
                            };
        let formData = type==='bank_account'? bankFormData : creditData
        return formData;
    };

    addNewAccount = () =>{
        let formData = this.getFormData();
        const url = process.env.REACT_APP_baseAPIURL + '/user/accounts'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: encodeFormData(formData)
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
        this.setState({ open: false });
        this.getAccounts();
    };

    deleteAccount = (event, id) =>{
        event.stopPropagation();
        const url = process.env.REACT_APP_baseAPIURL + '/user/accounts/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        this.getAccounts();

    };

    render() {
        const {classes} = this.props;
        const {expanded, accountData, type, toAccount, fromAccount, hodlBalance, amount, from_id, to_id} = this.state;
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
           <h2 className= {classes.leftText}> Hodl Balance: ${hodlBalance} </h2>
           <h3 className= {classes.leftText}>Linked Accounts </h3>
               {accountData.map((account, index)=>{
                    return(
                         <ExpansionPanel className= {classes.leftText} expanded={expanded === 'panel'+index} onChange={this.handlePanelChange('panel'+index)} key={index}>
                           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                           <IconButton onClick={(event)=>{this.deleteAccount(event, account._id)}} color="primary">
                               <DeleteIcon />
                             </IconButton>
                           <Typography className={classes.heading}>{account.name}</Typography>
                           </ExpansionPanelSummary>
                           <ExpansionPanelDetails>
                           <div>
                             <Typography variant="body1">Account Name: {account.name} </Typography>
                             {account.type==="bank_account" &&
                                <div>
                                    <Typography variant="body1">Account Number: {account.account_number} </Typography>
                                    <Typography variant="body1">Routing Number: {account.routing_number}</Typography>
                                </div>
                             }
                             {account.type==="credit_card" &&
                                <div>
                                    <Typography variant="body1">Name on Card: {account.name_on_card} </Typography>
                                    <Typography variant="body1">Card Number: {account.card_number} </Typography>
                                    <Typography variant="body1">Account Expiration: {account.expiration} </Typography>
                                </div>
                             }
                           </div>
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
                                name="type"
                                value={type}
                                onChange={this.handleChange}
                              >
                                <MenuItem  value={'bank_account'}>Bank Account</MenuItem>
                                <MenuItem value={'credit_card'}>Credit Card</MenuItem>
                              </Select>
                             </Grid>

                             {type==='credit_card' &&    <Grid item>
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
                                      label="Account Name"
                                      name="accountName"
                                      required
                                      onChange={this.handleChange}
                                      onFocus={this.handleInputFocus}
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                    />
                                  	<TextField
                                      type="tel"
                                      label="Card Number"
                                      name="number"
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
                                      label="Name on Card"
                                      name="name"
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
                                       label="Expiration"
                                       name="expiry"
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
                                       name="cvc"
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
                                {type==='bank_account' && <Grid item>
                                  <h4> Bank Account</h4>
                                 <form>
                                    <div>
                                     <TextField
                                       type="text"
                                       label="Account Name"
                                       name="name"
                                       fullWidth
                                       margin="normal"
                                       variant="outlined"
                                       required
                                       onChange={this.handleChange}
                                     />
                                     </div>
                                    <div>
                                     <TextField
                                       type="text"
                                       label="Routing Number"
                                       name="routing_number"
                                       inputProps={{ pattern: "[0-9]{9}" }}
                                       fullWidth
                                       margin="normal"
                                       variant="outlined"
                                       required
                                       onChange={this.handleChange}
                                     />
                                     </div>
                                    <div>
                                     <TextField
                                       type="text"
                                       label="Account Number"
                                       name="account_number"
                                       inputProps={{ pattern: "[0-9]{8,12}" }}
                                       fullWidth
                                       margin="normal"
                                       variant="outlined"
                                       required
                                       onChange={this.handleChange}
                                     />
                                     </div>
                                 </form>
                                 </Grid>}
                                </Grid>
                     </DialogContent>
                     <DialogActions>
                       <Button onClick={this.addNewAccount} color="primary">
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
                      onChange={(event, child) => this.handleInputChange(event, child, 'from_id')}
                      error={(toAccount === fromAccount && fromAccount !== '')}
                      helperText={toAccount === fromAccount && fromAccount !== '' ? "Must pick different to/from accounts": "Account to transfer money from"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    >
                      {this.state.accountData.map(accountOption => (
                        <MenuItem key={accountOption._id} value={accountOption.name}>
                            <Typography className={classes.heading}>{accountOption.name}</Typography>
                        </MenuItem>
                      ))}
                       <MenuItem key={'balance'} value={'Hodl Balance'}>Hodl Balance</MenuItem>
                    </TextField>
                   <TextField
                      select
                      label="To Account"
                      name= "toAccount"
                      error={toAccount === fromAccount && toAccount !== ''}
                      className={classes.textField}
                      value={toAccount}
                      onChange={(event, child) => this.handleInputChange(event, child, 'to_id')}
                      helperText={toAccount === fromAccount && toAccount !== '' ? "Must pick different to/from accounts": "Account to transfer money to"}
                      margin="normal"
                      variant="outlined"
                    >
                      {this.state.accountData.map(accountOption => (
                        <MenuItem key={accountOption._id} value={accountOption.name}>
                            <Typography className={classes.heading}>{accountOption.name}</Typography>
                        </MenuItem>
                      ))}
                      <MenuItem key={'balance'} value={'Hodl Balance'}>Hodl Balance</MenuItem>
                    </TextField>
                        <TextField
                          type= "number"
                          label="Amount"
                          name= "amount"
                          margin="normal"
                          variant="outlined"
                          helperText= {fromAccount==='Hodl Balance' && amount > parseFloat(hodlBalance)? "Unable to transfer more than Hodl Balance" : "Amount to transfer ($)"}
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