import React, { Component } from 'react';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import Toggle from 'material-ui/Toggle';

// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
// import { red500, green500, lightGreen500, white, teal400, orange500, deepOrange500, amber500, orangeA400 } from 'material-ui/styles/colors';
// import { Card, CardActions, CardHeader, CardContent } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui-icons/Add';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';

// import { createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme, getContrastText } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import lightGreen from 'material-ui/colors/lightGreen';
// import io from 'socket.io-client';


// import blue from 'material-ui/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: orange,
    contrastThreshold: 1,
    // primary: {
    //   light: "#bef67a",
    //   main: "#8BC34A",
    //   dark: "#5a9216",
    //   // color: '#ffffff',
    //   // contrastText: "#ffffff",
    //   // contrastText: getContrastText("#8BC34A"),
    // },
    // secondary: {
    //   light: "#ffc246",
    //   main: "#FF9100",
    //   dark: "#c56200",
    //   // color: '#ffffff',
    //   // contrastText: "#ffffff",

    //   // contrastText: getContrastText("#FF9100"),
    // },
    // error: {
    //   light: palette.error[300],
    //   main: palette.errorr[500],
    //   dark: palette.error[700],
    //   contrastText: getContrastText(palette.error[500]),
    // },
  },
});
const socket = io();
class App extends Component {
  onButton(){
    socket.emit("data", "1234");
  }
  render() {
    
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Card >
            <CardContent>

              <Button onClick={this.onButton} color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>

              <Button variant="raised" color="primary">Primary</Button>
              <Button variant="raised" color="secondary">Secondary</Button>
              <Switch
                value="checkedA"
              />
              <Switch
                color="primary"
                value="checkedA"
              />

            </CardContent>

          </Card>

        </div>
        <Button variant="fab" zDepth={2} style={{ position: "fixed", right: 20, bottom: 20 }} color="secondary" aria-label="add" >
          <AddIcon />
        </Button>
      </MuiThemeProvider>
    );
    
  }
}


export default App;