import React, { Component } from 'react';
// import Metio from './Metio';
// import Monitor from './Monitor.jsx'
import Device from './Device.jsx';

const styles = {
    con: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
    
  };

export default function DeviceList({devices}) {
    var devicelist = devices.map(function (el) {
        return (
                    <Device device={el}/>
        )
    })
    return (
        <div style= {styles.con}>
            {devicelist}
        </div>
    )
};