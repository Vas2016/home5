import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class SwitchListSecondary extends React.Component {
    state = {
        checked: this.props.checked,
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        // this.setState({
        //   checked: newChecked,
        // });
        // this.setState({
        //     checked: checked,
        // });
        this.setState({
            checked : newChecked
        });
        // console.log('nch', 'hello')
        // this.setState({
        //     checked: newChecked,
        // });
        this.props.updateData(newChecked)
        // console.log('pc', this.props.checked)
        // this.setState({
        //     checked: newChecked,
        // });
        // this.props.updateData(this.state.checked)
    };

    render() {
        const { classes } = this.props;

        return (
            <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
                <ListItem>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Narodmon" />
                    <ListItemSecondaryAction>
                        <Switch
                            onChange={this.handleToggle('narodmon')}
                            checked={this.state.checked.indexOf('narodmon') !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <BluetoothIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bluetooth" />
                    <ListItemSecondaryAction>
                        <Switch
                            onChange={this.handleToggle('bluetooth')}
                            checked={this.state.checked.indexOf('bluetooth') !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        );
    }
}

SwitchListSecondary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwitchListSecondary);