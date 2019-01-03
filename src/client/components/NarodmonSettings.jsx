import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NarodmonDeviceSettings from './NarodmonDeviceSettings.jsx'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class SwitchListSecondary extends React.Component {
    constructor(props) {
        super(props)
        // var d = props.device
        this.state = {
            config: this.props.config,
        }

    }

    // handleToggle = value => () => {
    //     const { checked } = this.state;
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     // this.setState({
    //     //   checked: newChecked,
    //     // });
    //     // this.setState({
    //     //     checked: checked,
    //     // });
    //     this.setState({
    //         checked : newChecked
    //     });
    //     // console.log('nch', 'hello')
    //     // this.setState({
    //     //     checked: newChecked,
    //     // });
    //     this.props.updateData(newChecked)
    //     // console.log('pc', this.props.checked)
    //     // this.setState({
    //     //     checked: newChecked,
    //     // });
    //     // this.props.updateData(this.state.checked)
    // };
    updateDeviceConfig = (d) => {
        // this.state.config[d.ip].values = d.checked
        this.state.config.devices.find((element, index, array)=>{
            if (element.ip == d.ip){
                return true;
            }
        }).value = d.checked
        console.log(this.state.config.devices)
        this.props.updateNarodmonConfig(this.state.config)
        this.setState({config:this.state.config})
        
    }

    render() {
        const { classes } = this.props;
        /*this.state.config[el.ip]*/
        console.log(this.state)
        var devices_con = this.props.deviceList.map((el) => {
            // console.log('dev', el)
            return (
                
                <Card>
                    <NarodmonDeviceSettings device={el} checked={this.state.config.devices.find((element, index, array)=>{
                        if (element.ip == el.ip){
                            return true;
                        }
                    }).value} updateData={this.updateDeviceConfig} />
                </Card>
            )
        })
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Narodmon Settings</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {devices_con}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

SwitchListSecondary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwitchListSecondary);