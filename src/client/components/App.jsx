import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
// import { createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme, getContrastText } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightGreen from '@material-ui/core/colors/lightGreen';
import DeviceList from './DeviceList.jsx';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppSettings from './AppSettings.jsx'
import NarodmonSettings from './NarodmonSettings.jsx'

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: orange,
    contrastThreshold: 2,

  },
});

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  rr: {
    width: '100%',
  },
};





// const socket = io();
import openSocket from 'socket.io-client';
const socket = openSocket();

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class SettingsDialog extends React.Component {
  constructor(params) {
    super(params)
    this.state = {
      devices: [],
      checked:[]
    }
    socket.on('sigList', (list) => {
      //this.setState({devices:list, open:false});
      this.state.devices = list
      this.setState(this.state);
      console.log(list)
    })
    socket.emit('getSigList', {})
    socket.on('config_narodmon', (data) => {
      //this.setState({devices:list, open:false});
      // this.state.devices 
       
      this.setState({narodmonConfig:data.config});
      console.log(list)
    })
    socket.on('config_appSettings', (data) => {
      //this.setState({devices:list, open:false});
      // this.state.devices 
       
      this.setState({checked:data.config.modules});
      console.log(list)
    })
    socket.emit('getConfig', {name:'narodmon'})
    socket.emit('getConfig', {name:'appSettings'})
  }
  handleClose = () => {
    this.props.onClose();
  };
  updateData = (ch) => {
    // console.log(ch)
    this.setState({ checked: ch })
    // console.log(ch)
    //setTimeout(() => {console.log('ch', ch)}, 100)
  }
  updateNarodmonSettings = (con) => {
    this.setState({ narodmonConfig: con })
  }
  onSave = () => {
    socket.emit('setConfig', {name:'narodmon', config:this.state.narodmonConfig})
    socket.emit('setConfig', {name:'appsettings', config:{modules:this.state.checked}})
    this.handleClose()
  }

  render() {
    const { classes, onClose, ...other } = this.props;
    
    return (
      // <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
      //   <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      //   <div>
      //     <List>

      //       <ListItem button onClick={() => this.handleListItemClick('addAccount')}>

      //         <ListItemText primary="add account" />
      //       </ListItem>
      //     </List>
      //   </div>
      // </Dialog>
      <Dialog
        fullScreen
        onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography color="inherit" variant="subheading" component="h6" className={classes.flex}>
              Settings
              </Typography>
            <Button color="inherit" onClick={this.onSave}>
              save
              </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.rr}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>App Settings</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AppSettings updateData={this.updateData} checked={this.state.checked} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <NarodmonSettings 
                updateNarodmonConfig={this.updateNarodmonConfig} 
                config={this.state.narodmonConfig} 
                deviceList={this.state.devices}
                /> 
          
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                
              </Typography>
            </ExpansionPanelDetails>

          </ExpansionPanel>
        </div>
      </Dialog>
    );
  }
}

// SettingsDialog.propTypes = {
//   classes: PropTypes.object.isRequired,
//   onClose: PropTypes.func,
// };

const SettingsDialogWrapped = withStyles(styles)(SettingsDialog);

class App extends Component {
  constructor(params) {
    super(params)
    this.state = {
      devices: [],
      open: false,
    }
    socket.on('list', (list) => {
      //this.setState({devices:list, open:false});
      this.state.devices = list
      this.setState(this.state);
      console.log(list)
    })
    socket.emit('getList', {})
  }
  search = () => {
    console.log('search')
    socket.emit("action", { action: "search", params: {} });
    setTimeout(() => {
      socket.on('list', (list) => {
        //this.setState({devices:list, open:false});
        this.state.devices = list
        this.setState(this.state);
        console.log(list)
      })
      socket.emit('getList', {})
    }, 500)
  }


  handleClickOpen = () => {
    // this.state.open = true
    this.setState({ open: true });
    console.log("hello", this.state)
  }

  handleClose = () => {
    console.log(this.state)
    this.setState({ open: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>

        <div>
          <DeviceList devices={this.state.devices} />
        </div>
        {/* <Button size="medium" zDepth={2} style={{ position: "fixed", right: 20, top: 20 }} color="secondary" aria-label="settings" >
          <SettingsIcon />
        </Button> */}
        <IconButton zDepth={2} style={{ position: "fixed", right: 20, top: 20 }} color="secondary" aria-label="settings" onClick={this.handleClickOpen}>
          <SettingsIcon />
        </IconButton>
        <Button variant="fab" zDepth={2} style={{ position: "fixed", right: 20, bottom: 20 }} color="secondary" aria-label="search" onClick={this.search} >
          <SearchIcon />
        </Button>
        <SettingsDialogWrapped
          open={this.state.open}
          onClose={this.handleClose}
        />
        {/* <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
          <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
          <div>
            <List>

              <ListItem>

                <ListItemText primary="add account" />
              </ListItem>
            </List>
          </div>
        </Dialog> */}
      </MuiThemeProvider>
    );

  }
}


// export default App;
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);