import React, {  Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { red500, green500, green300, white, teal400, orange500, deepOrange500, amber500 } from 'material-ui/styles/colors';



class App extends Component {
  render() {

    return (
      <div>
        <MuiThemeProvider>
          
         
          <div className="App" style={{
            padding: 20
          }}>
            <RaisedButton label="Tester" backgroundColor={amber500} labelColor={white} style={{ margin: 5 }} />
            <RaisedButton label="Tester" backgroundColor={orange500} labelColor={white} style={{ margin: 5 }} />
            <RaisedButton label="Tester" backgroundColor={deepOrange500} labelColor={white} style={{ margin: 5 }} />
            <RaisedButton label="Tester" backgroundColor={red500} labelColor={white} style={{ margin: 5 }} />
            <RaisedButton label="Tean" backgroundColor={teal400} labelColor={white} style={{ margin: 5 }} />
            <RaisedButton label="Green" backgroundColor={green500} labelColor={white} style={{ margin: 5 }} />
            <Toggle label="Simple" />
            <Toggle label="Simple" />
            <DatePicker hintText="Landscape Dialog" mode="landscape" />
            <FloatingActionButton zDepth={2} style={{ position: "fixed", right: 20, bottom: 20 }} backgroundColor={deepOrange500}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}


export default App;