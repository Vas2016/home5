import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';


// import io from 'socket.io-client';
// import {  } from "socket.io-client/io";
// const socket = openSocket('http://localhost:8000');

// import { createMuiTheme } from 'material-ui/styles';
// import { MuiThemeProvider, createMuiTheme, getContrastText } from 'material-ui/styles';
// import orange from 'material-ui/colors/orange';
// import lightGreen from 'material-ui/colors/lightGreen';
// socket = 
import openSocket from 'socket.io-client';
const socket = openSocket();

const styles = {
  card: {
    maxWidth: 275,
    
    margin: '20px 20px 20px 20px',
    
  },
  pc: {
    background: "linear-gradient(45deg, rgb(139, 195, 74) 30%, rgb(205, 220, 57) 90%);",
    padding:'15px'
  }
  
};

class Olen extends Component {
  
  constructor(props){
    super(props)
    var d = props.device
    this.state = {
      data:{},
      ui:{
        color:"linear-gradient(45deg, rgb(139, 195, 74) 30%, rgb(205, 220, 57) 90%);"
      }
    }
    this.state.data = {
      temp:0,
      humid:0,
      pochva:0,
      light:0,
      ip:d.ip,
      type:d.type,
    } 
    socket.on(this.state.data.ip, (q) => {console.log("Hello",q);
      this.state.data = q;
      this.setState(this.state); 
      this.updateColor();
    })
    // socket.on
    this.getData()
    // setInterval(()=>{this.getData()}, 2000)
  }
  getData = () =>{
    // function name(params) {
      
    // }
    console.log('hello', this.state.data.ip);
    
    
    socket.emit('data',{mesType:'getValue',ip:this.state.data.ip})
  }
  polive() {
    console.log('polive')
    socket.emit("action", {action: "/web/" + this.state.data.ip + "/polive", params:{}});
  }
  updateColor() {
    if (parseInt(this.state.data.pochva) < 380){
      this.state.ui.color =  'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    }
    else if ( parseInt(this.state.data.pochva) > 750){
      this.state.ui.color = 'linear-gradient(45deg, #2196F3 30%, #00e2ff 90%)'
    }
    else {
      this.state.ui.color = 'linear-gradient(45deg, rgb(139, 195, 74) 30%, rgb(205, 220, 57) 90%)'
    }

    this.setState(this.state); 
  }
  // onSwitch() {

  // }
  render() {

    return (
      // <MuiThemeProvider theme={theme}>
      // <div>
      <Card className={this.props.classes.card} elevation={2}>
        <CardContent>
          <Paper style={{background: this.state.ui.color }} className={this.props.classes.pc} elevation={1}>
            <Typography style={{color:'#fff'}} gutterBottom variant="headline" component="h2">
              Olen
            </Typography>
            <Typography style={{color:'#fff'}} gutterBottom variant="subheading" component="h3">
              {this.state.data.ip}
            </Typography>
          </Paper>
          <List>
            <ListItem>
              <ListItemIcon>
                <img src="icons/temp.png"/>
              </ListItemIcon>
              
              <ListItemText primary={this.state.data.temp + ' °C'} secondary="Температура" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src="icons/humid.png"/>
              </ListItemIcon>
              <ListItemText primary={this.state.data.humid + ' %'} secondary="Влажность" />
            </ListItem>
            <ListItem>
              {/* <img src="icons/press.png"/> */}
              <ListItemText primary={this.state.data.pochva + ' '} secondary="pochva" />
            </ListItem>
            <ListItem>
              {/* <img src="icons/press.png"/> */}
              <ListItemText primary={this.state.data.light + ' '} secondary="light" />
            </ListItem>
            <ListItem>
            <Button variant="contained" color="primary" onClick={this.polive.bind(this)}>
              Polive
            </Button>
            </ListItem>
          </List>
          
        </CardContent>

      </Card>

      // </div>
      // <Button variant="fab" zDepth={2} style={{ position: "fixed", right: 20, bottom: 20 }} color="secondary" aria-label="add" >
      //   <AddIcon />
      // </Button>
      // </MuiThemeProvider>
    );

  }
}

Olen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Olen);
// export default Olen;