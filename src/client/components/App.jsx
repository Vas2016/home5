import React, { Component } from 'react';


// import { createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme, getContrastText } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightGreen from '@material-ui/core/colors/lightGreen';
import DeviceList from './DeviceList.jsx';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: orange,
    contrastThreshold: 2,

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
    socket.on('list', (list)=>{
      this.setState({devices:list});
      console.log(list)
    })
    socket.emit('getList', {})
  }
  search() {
    console.log('search')
    socket.emit("action", {action: "search", params:{}});
  }
  render() {
    
    return (
      <MuiThemeProvider theme={theme}>

        <div>
          <DeviceList devices={this.state.devices} /> 
        </div>
        <Button size="medium" zDepth={2} style={{ position: "fixed", right: 20, top: 20 }} color="secondary" aria-label="settings" >
          <SettingsIcon />
        </Button>
        <Button variant="fab" zDepth={2} style={{ position: "fixed", right: 20, bottom: 20 }} color="secondary" aria-label="search" onClick={this.search.bind(this)} >
          <SearchIcon />
        </Button>
      </MuiThemeProvider>
    );
    
  }
}


export default App;