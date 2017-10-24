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
  }

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
    // let container;
    let earthMesh, starfield, pizzaMoon;
    let camera, scene, raycaster, renderer;
    let mouse = new THREE.Vector2(), INTERSECTED;
    let radius = 100
    let theta = 0;
    const coords = [
      {lat: 38.548165, lng: -76.289062},
      {lat: 3.513421, lng: -58.007812},
      {lat: 46.55886, lng: 3.515625},
      {lat: 52.908902, lng: -1.40625},
      {lat: 24.20689, lng: 80.507813},
      {lat: 25.482951, lng: 51.679688},
      {lat: 39.095963, lng: 139.570313},
    ]

    init();
    animate();

    function createPoint(lat, lng){
      let phi   = (90-lat)*(Math.PI/180)
      let t = (lng+180)*(Math.PI/180)
      let x = -((0.6) * Math.sin(phi)*Math.cos(t))
      let z = ((0.6) * Math.sin(phi)*Math.sin(t))
      let y = ((0.6) * Math.cos(phi))

      const dotGeometry = new THREE.Geometry();
      dotGeometry.vertices.push(new THREE.Vector3(x, y, z));
      const dotMaterial = new THREE.PointsMaterial({
        size : .1,
        color: 0xFF0000
      });
      const dot = new THREE.Points(dotGeometry, dotMaterial);
      return dot;
    }

    function createMoon(){
      const geometry = new THREE.SphereGeometry(.1,32,32);
      const texture = THREE.ImageUtils.loadTexture(`../../images/pizza.jpg`)
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: .02,
      })
      const moonMesh = new THREE.Mesh(geometry, material)
      return moonMesh;
    }

    function createStarfield(){
      let starsGeometry = new THREE.Geometry();
      for ( var i = 0; i < 10000; i ++ ) {
        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread( 1000 );
        star.y = THREE.Math.randFloatSpread( 1000 );
        star.z = THREE.Math.randFloatSpread( 1000 );
        starsGeometry.vertices.push( star );
      }
      let starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );
      let starField = new THREE.Points( starsGeometry, starsMaterial );
      return starField;
    }

    function init(){

      camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.01, 1000);
      camera.aspect = windowWidth / windowHeight
      camera.position.x = windowWidth / windowWidth;
      camera.position.y = 2;
      camera.position.z = 3.25;
      // camera.lookAt(new THREE.Vector3(0, 0 ,0))

      scene = new THREE.Scene();

      // add background
      starfield = createStarfield();
      // scene.add(starfield);

      // add planets
      earthMesh = THREEx.Planets.createEarth();
      scene.add(earthMesh);

      // pizzaMoon = createMoon();
      // pizzaMoon.position.x = 1;
      // pizzaMoon.position.y = .5;
      // pizzaMoon.position.z = .5;
      // scene.add(pizzaMoon);

      // add lat lng points to planet
      coords.forEach((p, i) => {
        const dot = createPoint(p.lat, p.lng)
        earthMesh.add(dot);
      })

      // add lights
      const ambientLight = new THREE.AmbientLight(0x404040, 3.5);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight('white', 0.08);
      dirLight.position.set(20, 20, 30);
      dirLight.target.position.set(0, 0, 0);
      scene.add(dirLight);


      raycaster = new THREE.Raycaster();

      renderer = new THREE.WebGLRenderer();
      // renderer.setClearColor(0x000000, 1.0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(windowWidth, windowHeight);
      // renderer.shadowMapEnabled = true;
      // renderer.shadowMapType = THREE.PCFSoftShadowMap;
      const container = document.getElementById('theVoid')
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      window.addEventListener('mousemove', onDocumentMouseMove, false);
      window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onDocumentMouseMove( event ) {
      event.preventDefault();
      mouse.x = ( ( event.clientX ) / renderer.domElement.clientWidth ) * 2 - 1;
      mouse.y = - ( ( event.clientY ) / renderer.domElement.clientHeight ) * 2 + 1;
    }


    function animate(){
      requestAnimationFrame(animate);
      render();
    }

    function render(){
      theta += 0.1;
      earthMesh.rotation.y += 1 / 200;
      // pizzaMoon.rotation.y += 1 / 400;
      starfield.rotation.x += 1 / 8000;
      starfield.rotation.y += 1 / 10000;

      camera.lookAt(scene.position);
      camera.updateMatrixWorld();

      raycaster.setFromCamera( mouse, camera );
      let intersects = raycaster.intersectObjects( earthMesh.children );

      if (intersects.length > 0) {

         if ( INTERSECTED != intersects[0].object ){
           if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

           INTERSECTED = intersects[ 0 ].object;
            // console.log(INTERSECTED)
           INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
           INTERSECTED.material.color.setHex( 0x000000 );
         }
      } else {
        if ( INTERSECTED ) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
      }
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.render(scene, camera);
    }



  }

  render() {
    return <div id="theVoid" />;
  }
}

export default withStyles(s)(Space);