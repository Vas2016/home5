import React, { Component } from 'react';
// import Metio from './Metio';
// import Monitor from './Monitor.jsx'
import Device from './Device.jsx';
export default function DeviceList({devices}) {
    var devicelist = devices.map(function (el) {
        return (
            <div key={el.ip}>
                    <Device device={el}/>
            </div>
        )
    })
    return (
        <div>
            {devicelist}
        </div>
    )
};