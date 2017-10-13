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

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.position.x = 0;
    camera.position.y = 2;
    camera.position.z = 4;
    camera.lookAt(scene.position);

    var ambientLight = new THREE.AmbientLight(0x404040, 3.5);
    scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight('white', 0.08);
    dirLight.position.set(20, 20, 30);
    dirLight.target.position.set(0, 0, 0);
    scene.add(dirLight);


    // ////////////////////////////////////////////////////////////////////////////////
    //		add an object and make it move					//
    // ////////////////////////////////////////////////////////////////////////////////

    const starfieldMesh = THREEx.Planets.createStarfield();
    scene.add(starfieldMesh);

    // earth
    const earthMesh = THREEx.Planets.createEarth();
    scene.add(earthMesh);

    var cubeGeometry = new THREE.BoxGeometry(6, 6, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial();
    cubeMaterial.color = new THREE.Color('red');
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = 'cube';
    scene.add(cube);

    updateFcts.push((delta, now) => {
      earthMesh.rotation.y += 1 / 4 * delta;
      starfieldMesh.rotation.x += 1 / 600 * delta;
      starfieldMesh.rotation.y += 1 / 400 * delta;
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
