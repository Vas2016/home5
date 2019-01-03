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
            checked: newChecked
        });
        // console.log('nch', 'hello')
        // this.setState({
        //     checked: newChecked,
        // });
        this.props.updateData({ip:this.props.device.ip, checked:newChecked})
        // console.log('pc', this.props.checked)
        // this.setState({
        //     checked: newChecked,
        // });
        // this.props.updateData(this.state.checked)
    };

    render() {
        const { classes } = this.props;
        
        var device_switches = this.props.device.sig.map( (el) => {
            
            return (
                <ListItem>
                    
                    <ListItemText primary={el} />
                    <ListItemSecondaryAction>
                        <Switch
                            onChange={this.handleToggle(el)}
                            checked={this.state.checked.indexOf(el) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })
        return (
            <List subheader={<ListSubheader>this.props.device.ip</ListSubheader>} className={classes.root}>
                {device_switches}
            </List>
        );
    }
}

export default withStyles(styles)(SwitchListSecondary);