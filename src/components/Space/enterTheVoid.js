/**
 * dat.globe Javascript WebGL Globe Toolkit
 * https://github.com/dataarts/webgl-globe
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

import * as THREE from 'three';
import { Shaders } from './Shaders';
import worldImg from './world.jpg';

export function enterTheVoid(container, width, height){

    var camera, scene, sceneAtmosphere, renderer, controls;
    var vector, mesh, atmosphere, point, points, pointsGeometry;
    var overRenderer;
    var mouse = { x: 0, y: 0 },
        mouseOnDown = { x: 0, y: 0 };
    var rotation = { x: 0, y: 0 },
        target = { x: 0, y: 0 },
        targetOnDown = { x: 0, y: 0 };
    var distance = 2000, distanceTarget = 900;

    var PI_HALF = Math.PI / 2;

    const coords = [
      {lat: 38.548165, lng: -76.289062},
      {lat: 3.513421, lng: -58.007812},
      {lat: 46.55886, lng: 3.515625},
      {lat: 52.908902, lng: -1.40625},
      {lat: 24.20689, lng: 80.507813},
      {lat: 25.482951, lng: 51.679688},
      {lat: 39.095963, lng: 139.570313},
    ];

    function deg2ra(d){
        return d * (Math.PI/180);
    }

    function init() {

        //camera
        camera = new THREE.PerspectiveCamera( 30, width / height , .01, 10000 );
        camera.lookAt(new THREE.Vector3(0, 0 ,0))
        // camera.position.z = distance;

        vector = new THREE.Vector3();
        scene = new THREE.Scene();
        sceneAtmosphere = new THREE.Scene();

        // earth

        var geometry = new THREE.SphereGeometry(200, 40, 30);
        var shader = Shaders['earth'];
        let uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        uniforms['texture'].value = THREE.ImageUtils.loadTexture('../../images/world.jpg');
        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: [

                "varying vec3 vNormal;",
                "varying vec2 vUv;",

                "void main() {",

                    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

                    "vNormal = normalize( normalMatrix * normal );",
                    "vUv = uv;",

                "}"

            ].join("\n"),
            fragmentShader: [

                "uniform sampler2D texture;",

                "varying vec3 vNormal;",
                "varying vec2 vUv;",

                "void main() {",

                    "vec3 diffuse = texture2D( texture, vUv ).xyz;",
                    "float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );",
                    "vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );",

                    "gl_FragColor = vec4( diffuse + atmosphere, 1.0 );",

                "}"

            ].join("\n")
        } );

        mesh = new THREE.Mesh( geometry, material );
        // mesh.rotation.set(0,0,0)
        scene.add( mesh );


        // atmosphere
        var shader = Shaders['atmosphere'];
        uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: [
                "varying vec3 vNormal;",
                "void main() {",
                    "vNormal = normalize( normalMatrix * normal );",
                    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                "}"
            ].join("\n"),
            fragmentShader: [
                "varying vec3 vNormal;",
                "void main() {",
                    "float intensity = pow( 0.8 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 12.0 );",
                    "gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;",
                "}"
            ].join("\n"),
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });

        mesh = new THREE.Mesh( geometry, material );
        mesh.scale.set(1.1, 1.1, 1.1)
        mesh.updateMatrix();
        sceneAtmosphere.add( mesh );

        renderer = new THREE.WebGLRenderer( { antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.autoClear = false;
        renderer.setSize(width, height );

        container.appendChild( renderer.domElement );
        container.addEventListener('mousedown', onMouseDown, false);

        // container.addEventListener('mousewheel', onMouseWheel, false);

        window.addEventListener('resize', onWindowResize, false);

        container.addEventListener('mouseover', function() {
            overRenderer = true;
        }, false);

        container.addEventListener('mouseout', function() {
            overRenderer = false;
        }, false);

    }

    function plotData() {
        coords.forEach((p,i) =>{
            addPoint(p.lat,p.lng)
        })
    }

    function addPoint( lat, lng, height = 0 ) {
        if ( lat == 0 && lng == 0 ) return;
        let phi = (lat)*Math.PI/180;
        let theta = (lng-180)*Math.PI/180;

        let x = -(200 + height) * Math.cos(phi) * Math.cos(theta);
        let y = (200 + height) * Math.sin(phi);
        let z = (200 + height) * Math.cos(phi) * Math.sin(theta);

        let pointGeometry = new THREE.SphereGeometry(100, 100, 24);
        let pointMaterial = new THREE.MeshLambertMaterial();

        // let point = new THREE.Mesh(geometry);
        let position = new THREE.Vector3(x,y,z);

        let point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set = position;
        point.lookAt(new THREE.Vector3(0,0,0));

        scene.add(point);

    }

    function onMouseDown(event) {
        event.preventDefault();

        container.addEventListener('mousemove', onMouseMove, false);
        container.addEventListener('mouseup', onMouseUp, false);
        container.addEventListener('mouseout', onMouseOut, false);

        mouseOnDown.x = - event.clientX;
        mouseOnDown.y = event.clientY;

        targetOnDown.x = target.x;
        targetOnDown.y = target.y;

        container.style.cursor = 'move';
    }

    function onMouseMove(event) {
        mouse.x = - event.clientX;
        mouse.y = event.clientY;

        var zoomDamp = distance/1000;

        target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
        target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

        target.y = target.y > PI_HALF ? PI_HALF : target.y;
        target.y = target.y < - PI_HALF ? - PI_HALF : target.y;
    }

    function onMouseUp(event) {
        container.removeEventListener('mousemove', onMouseMove, false);
        container.removeEventListener('mouseup', onMouseUp, false);
        container.removeEventListener('mouseout', onMouseOut, false);
        container.style.cursor = 'auto';
    }

    function onMouseOut(event) {
        container.removeEventListener('mousemove', onMouseMove, false);
        container.removeEventListener('mouseup', onMouseUp, false);
        container.removeEventListener('mouseout', onMouseOut, false);
    }

    // function onMouseWheel(event) {
    //     event.preventDefault();
    //     if (overRenderer) {
    //       zoom(event.wheelDeltaY * 0.3);
    //     }
    //     return false;
    //   }

    function onWindowResize( event ) {
        console.log('resize');
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }

    function zoom(delta) {
        distanceTarget -= delta;
        distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
        distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
      }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        // zoom(curZoomSpeed);

        rotation.x += (target.x - rotation.x) * 0.1;
        rotation.y += (target.y - rotation.y) * 0.1;
        distance += (distanceTarget - distance) * 0.3;

        camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
        camera.position.y = distance * Math.sin(rotation.y);
        camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);

        vector.copy(camera.position);

        renderer.clear();
        renderer.render(scene, camera);
        renderer.render(sceneAtmosphere, camera);

    }

    init();
    plotData();
    animate();
}
