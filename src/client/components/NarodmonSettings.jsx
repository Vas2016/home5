import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NarodmonDeviceSettings from './NarodmonDeviceSettings.jsx'
import Paper from '@material-ui/core/Paper';
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
        this.state.config[d.ip] = d.checked
    }

    render() {
        const { classes } = this.props;
        var devices_con = this.props.deviceList.map((el) => {
            return (
                <Paper>
                    <NarodmonDeviceSettings device={el} checked={this.state.config[el.ip]} updateData={this.updateDeviceConfig} />
                </Paper>
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