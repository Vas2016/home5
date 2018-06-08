import React, { Component } from 'react';


// import { createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme, getContrastText } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightGreen from '@material-ui/core/colors/lightGreen';
import DeviceList from './DeviceList.jsx'

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: orange,
    contrastThreshold: 1,

  },
});
// const socket = io();
import openSocket from 'socket.io-client';
const socket = openSocket();
class App extends Component {
  constructor(params) {
    super(params)
    this.state = {
      devices:[]
    }
    socket.on('list', ({list})=>{this.setState({devices:list})})
    socket.emit('getList', {})
  }
  render() {
    
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <DeviceList devices={this.state.devices} /> 
        </div>
        {/* <Button variant="fab" zDepth={2} style={{ position: "fixed", right: 20, bottom: 20 }} color="secondary" aria-label="add" >
          <AddIcon />
        </Button> */}
      </MuiThemeProvider>
    );
    
  }
}


export default App;