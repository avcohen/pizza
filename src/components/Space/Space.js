/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Space.css';
// import * as THREE from 'three';
// import { Shaders } from './Shaders';
// import worldImg from './world.jpg';
import { enterTheVoid } from './enterTheVoid.js';
import FontAwesome from 'react-fontawesome';
import loadingAnimation from './cutter.gif';
import Link from '../Link';

class Space extends React.Component {
    constructor() {
        super();
        this.state = {
            windowWidth: null,
            windowHeight: null,
            clickX : null,
            clickY : null,
        };
    };

    componentDidMount() {
        const ww = window.innerWidth;
        const wh = window.innerHeight;
        this.setState({
            windowWidth: ww,
            windowHeight: wh
        });
        const container = document.getElementById('theVoid');
        enterTheVoid(container, ww, (wh /2));
        // this.updateClickCoords();
    };

    render(){
        return (
                <div className={s.space}>
                    {/* <div id="loadingScreen"
                        className={s.loadingStyle}
                        style={{height: this.state.windowHeight / 2, width: this.state.windowWidth}}>
                        <h1>LOADING...</h1>
                        <img src={loadingAnimation} alt="Loading"/>
                    </div> */}
                    <div id="theVoid" />
                </div>
        )
    }
};

export default withStyles(s)(Space);
