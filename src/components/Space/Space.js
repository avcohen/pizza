/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Space.css';
import * as THREE from 'THREE';
import THREEx from '../../scripts/threex.planets.js';
import Link from '../Link';

class Space extends React.Component {
  constructor() {
    super();
    this.state = {
      width: null,
      height: null,
    };
    this.resizeTheVoid = this.resizeTheVoid.bind(this);
  }

  resizeTheVoid() {
    console.error('lol')
    const newWidth = window.innerWidth;
    const newWiHeight = window.innerHeight;

    this.setState({
      width: newWidth,
      height: newWiHeight,
    });
  }

  componentWillMount() {}

  componentDidMount() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    this.setState({
      width: ww,
      height: wh
    });
    this.enterTheVoid(ww, wh);
  }

  componentWillUnmount() {
  }

  enterTheVoid(windowWidth, windowHeight) {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setClearColor(0x000000, 1.0);

    renderer.setSize(windowWidth, windowHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;

    const updateFcts = [];
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.01,
      1000,
    );

    camera.aspect = windowWidth / windowHeight
    camera.position.x = 0;
    camera.position.y = 3;
    camera.position.z = 4;
    // let yCameraPosition = 0;
    camera.lookAt(new THREE.Vector3(0, 0 ,0))

    var ambientLight = new THREE.AmbientLight(0x404040, 3.5);
    scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight('white', 0.08);
    dirLight.position.set(20, 20, 30);
    dirLight.target.position.set(0, 0, 0);
    scene.add(dirLight);


    // ////////////////////////////////////////////////////////////////////////////////
    //		add an object and make it move					//
    // ////////////////////////////////////////////////////////////////////////////////

    var starsGeometry = new THREE.Geometry();

    for ( var i = 0; i < 10000; i ++ ) {
    	var star = new THREE.Vector3();
    	star.x = THREE.Math.randFloatSpread( 1000 );
    	star.y = THREE.Math.randFloatSpread( 1000 );
    	star.z = THREE.Math.randFloatSpread( 1000 );
    	starsGeometry.vertices.push( star );
    }
    var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );
    var starField = new THREE.Points( starsGeometry, starsMaterial );

    scene.add( starField );

    // earth
    const earthMesh = THREEx.Planets.createEarth();
    scene.add(earthMesh);

    const coords = [
      {lat: 38.548165, lng: -76.289062},
      {lat: 3.513421, lng: -58.007812},
      {lat: 46.55886, lng: 3.515625},
      {lat: 52.908902, lng: -1.40625},
      {lat: 24.20689, lng: 80.507813},
      {lat: 25.482951, lng: 51.679688},
      {lat: 39.095963, lng: 139.570313},
    ]

    // point
    coords.forEach((p, i) => {
      console.log(p.lat, p.lng)

      let phi   = (90-p.lat)*(Math.PI/180)
      let theta = (p.lng+180)*(Math.PI/180)
      let x = -((0.6) * Math.sin(phi)*Math.cos(theta))
      let z = ((0.6) * Math.sin(phi)*Math.sin(theta))
      let y = ((0.6) * Math.cos(phi))

      const dotGeometry = new THREE.Geometry();
      dotGeometry.vertices.push(new THREE.Vector3(x, y, z));
      const dotMaterial = new THREE.PointsMaterial({

        size : .25,
        color: 0xFF0000
      });
      const dot = new THREE.Points(dotGeometry, dotMaterial);
      earthMesh.add(dot);
    })

    updateFcts.push((delta, now) => {
      earthMesh.rotation.y += 1 / 4 * delta;
      // starField.rotation.x += 1 / 600 * delta;
      // starField.rotation.y += 1 / 400 * delta;
    });


    // ////////////////////////////////////////////////////////////////////////////////
    //		render the scene						//
    // ////////////////////////////////////////////////////////////////////////////////
    updateFcts.push(() => {
      renderer.render(scene, camera);
    });

    // ////////////////////////////////////////////////////////////////////////////////
    //		loop runner							//
    // ////////////////////////////////////////////////////////////////////////////////
    let lastTimeMsec = null;
    requestAnimationFrame(function animate(nowMsec) {
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      // call each update function
      updateFcts.forEach(updateFn => {
        updateFn(deltaMsec / 1000, nowMsec / 1000);
      });
    });

    document.querySelector('#theVoid').innerHTML = '';
    document.querySelector('#theVoid').appendChild(renderer.domElement);
  }

  render() {
    return <div id="theVoid" />;
  }
}

export default withStyles(s)(Space);
