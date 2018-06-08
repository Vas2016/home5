import React, { Component } from 'react';
import Monitor from './Monitor.jsx';
export default function DeviceList({device}) {
    var de = {'Monitor':Monitor}
    var D  = de[device.type]
    return (
        <D device={device}/>
    )
};