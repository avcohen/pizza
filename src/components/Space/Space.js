/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Space.css';
import * as THREE from 'THREE';
import THREEx from '../../scripts/threex.planets.js';
// import ShaderExtras from '../../scripts/ShaderExtras.js';
import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import FontAwesome from 'react-fontawesome';

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
  }

  componentDidMount() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    this.setState({
      windowWidth: ww,
      windowHeight: wh
    });
    this.enterTheVoid(ww, wh);
    this.updateClickCoords();
  }

  updateClickCoords(){
    const container = document.getElementById('theVoid');
    container.addEventListener('click', (e) =>{
      e.preventDefault;
      this.setState({
        clickX : e.clientX,
        clickY : e.clientY,
      })
    })
  }

  enterTheVoid(windowWidth, windowHeight) {
    // let container;
    let earthMesh, starfield, pizzaMoon;
    let camera, scene, glowScene, raycaster, renderer, loadingManager;
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
    ];

    init();
    animate();

    function createPoint(lat, lng){
      let phi   = (90-lat)*(Math.PI/180)
      let t = (lng+180)*(Math.PI/180)

      let x = -((0.6) * Math.sin(phi)*Math.cos(t))
      let y = ((0.6) * Math.cos(phi))
      let z = ((0.6) * Math.sin(phi)*Math.sin(t))


      let dotGeometry = new THREE.SphereGeometry(.025, 16, 16);
      let dotMaterial = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(`../../images/pizza.jpg`),
        bumpMap : THREE.ImageUtils.loadTexture(`../../images/pizza.jpg`),
      });
      let dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(x,y,z)
      dot.info = "lol"
      return dot;
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
      // glowScene = new THREE.Scene();
      // glowScene.add(new THREE.AmbientLight(0xFFFFFF) );

      // add background
      starfield = createStarfield();
      scene.add(starfield);

      // add planets
      earthMesh = THREEx.Planets.createEarth();
      scene.add(earthMesh);

      coords.forEach((p, i) => {
        const dot = createPoint(p.lat, p.lng)
        earthMesh.add(dot);
      })

      // TODO - GLow Mesh
      //glow mesh
      // const glowgeo = new THREE.SphereGeometry(0.6, 32, 32);
      // const glowmap = THREE.ImageUtils.loadTexture('../images/glow.png');
      // const glowmaterial = new THREE.MeshPhongMaterial( { map: glowmap, ambient: 0xffffff, color: 0x000000 } );;
      //
      // let glowMesh = new THREE.Mesh(glowgeo, glowmaterial)
      // glowMesh.overdraw = true;
      //
      // glowScene.add(glowMesh);

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

      // GLOW MESH RENDER TODO
      // // Prepare the glow composer's render target
      // const renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBufer: false };
      // let renderTargetGlow = new THREE.WebGLRenderTarget( windowWidth, windowHeight, renderTargetParameters );
      //
      // // Prepare the blur shader passes
      // let hblur = new ShaderPass( ShaderExtras[ "horizontalBlur" ] );
      // let vblur = new ShaderPass( ShaderExtras[ "verticalBlur" ] );
      //
      // let bluriness = 3;
      //
      // hblur.uniforms[ "h" ].value = bluriness / windowWidth;
      // vblur.uniforms[ "v" ].value = bluriness / windowHeight;
      //
      // // Prepare the glow scene render pass
      // var renderModelGlow = new RenderPass( glowScene, camera);
      //
      // // Create the glow composer
      // glowcomposer = new EffectComposer( renderer, renderTargetGlow );
      //
      // // Add all the glow passes
      // glowcomposer.addPass( renderModelGlow );
      // glowcomposer.addPass( hblur );
      // glowcomposer.addPass( vblur );


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
    let { spacePizzaMode } = this.props;
    let closeButton = ''
    if (spacePizzaMode === true){
      closeButton =
        <span className={s.exitTheVoid} onClick={(e) => this.props.exitMode(e)}>
          <FontAwesome name='times' size='3x'/>
        </span>
    }
    else {
      closeButton = ''
    }

    return (
      <div className={s.space}>
        <div id="theVoid" />
        <div>
          {closeButton}
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Space);
