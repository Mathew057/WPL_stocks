import React from 'react';
import styles from './routeStyles';
import {withStyles} from  '@material-ui/core/styles/index';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import ExpansionPanel from '@material-ui/core/ExpansionPanel';
//import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
//import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
//import Typography from '@material-ui/core/Typography';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Accounts extends React.Component{
state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

      render() {
      const {classes} = this.props;
        return (
         <div className={classes.contentContainer} id="PaymentForm">
           <h3> Link Accounts</h3>

{/**    <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>**/}


            <Grid container justify="center"spacing={10}>
            <Grid item>
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                 onChange={this.handleInputChange}
                 onFocus={this.handleInputFocus}
                 fullWidth
                margin="normal"
                variant="outlined"
               />
               </div>

             <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Credit  Card
                    </Button>

            </form>
           </Grid>
           <Grid item>
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
             <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Bank Account
                    </Button>

           </form>
           </Grid>
          </Grid>
          </div>

        );
      }
}

export default withStyles(styles) (Accounts);



