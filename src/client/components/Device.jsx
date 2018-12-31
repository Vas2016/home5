import React, { Component } from 'react';
import Monitor from './Monitor.jsx';
import Olen from './Olen.jsx';
import Metio from './Metio.jsx';
export default function DeviceList({device}) {
    var de = {'Monitor':Monitor, 'Olen':Olen, 'Metio':Metio}
    var D  = de[device.type]
    return (
        <D device={device}/>
    )
};