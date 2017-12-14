/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Space.css';
import * as THREE from 'three';
import { Shaders } from './Shaders';
import worldImg from './world.jpg';

import FontAwesome from 'react-fontawesome';
import loadingAnimation from './cutter.gif';
import Link from '../Link';

class Space extends React.Component {
    constructor() {
        super();
        this.state = {
            loadingTheVoid : true,
            voidWidth: null,
            voidHeight: null,
            igPostData : [
                  {lat: 38.548165, lng: -76.289062, title: "ONE" },
                  {lat: 3.513421, lng: -58.007812, title: "TWO" },
                  {lat: 46.55886, lng: 3.515625, title: "THREE" },
                  {lat: 52.908902, lng: -1.40625, title: "FOUR" },
                  {lat: 24.20689, lng: 80.507813, title: "FIVE" },
                  {lat: 25.482951, lng: 51.679688, title: "SIX" },
                  {lat: 39.095963, lng: 139.570313, title: "SEVEN" },
              ],
        };
        this.onVoidLoaded = this.onVoidLoaded.bind(this);
    };

    componentDidMount() {
        const ww = window.innerWidth;
        const wh = window.innerHeight;
        this.setState({
            voidWidth: ww,
            voidHeight: (wh * 0.666)
        });
        const container = document.getElementById('theVoid');
        this.enterTheVoid( ww, (wh * 0.666));
        this.onVoidLoaded();
    };

    enterTheVoid(voidWidth, voidHeight){
        let igPostData = this.state.igPostData;

        let earthMesh,
            atmosphere,
            camera,
            scene,
            renderer,
            raycaster,
            loadingManager

        let points = [];

        let mouse = new THREE.Vector2(), INTERSECTED;
        var rotation = { x: 0, y: 0 };
        let radius = 200,
            theta = 0;

        var distance = 1000,
            distanceTarget = 500;

        init();
        animate();

        function deg2ra(d){
            return d * (Math.PI/180);
        }

        function addPoint(p, height = 0) {
            if (p.lat == 0 && p.lng == 0) return;
            let phi = (90 - p.lat) * Math.PI/180;
            let theta = (p.lng + 180) * Math.PI/180;

            let x = -(radius + height) * Math.sin(phi) * Math.cos(theta);
            let y = (radius + height) * Math.cos(phi);
            let z = (radius + height) * Math.sin(phi) * Math.sin(theta);

            let pointGeometry = new THREE.SphereGeometry(10, 16, 16);
            let pointMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    "c":   { type: "f", value: 1 },
                    "p":   { type: "f", value: 0.5 },
                    glowColor: { type: "c", value: new THREE.Color(0xb1e5f2) },
                    viewVector: { type: "v3", value: camera.position }
                },
                vertexShader: Shaders['point'].vertexShader,
                fragmentShader: Shaders['point'].fragmentShader,
                side: THREE.FrontSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });
            let point = new THREE.Mesh(pointGeometry, pointMaterial);
            point.position.set(x,y,z);
            point.info = {
                title : p.title
            }
            return point;
        }

        function createAtmosphere(){
            const geometry = new THREE.SphereGeometry(radius, 40, 30);
            const shader = Shaders['atmosphere'];
            const material = new THREE.ShaderMaterial({
                uniforms: shader.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            });
            let mesh = new THREE.Mesh( geometry, material );
                mesh.scale.set(1.1, 1.1, 1.1)
                mesh.updateMatrix();
            return mesh;
        }

        function createEarth(){
            const geometry = new THREE.SphereGeometry(radius, 40, 30);
            const shader = Shaders['earth'];
            let uniforms = THREE.UniformsUtils.clone(shader.uniforms);
                uniforms['texture'].value = new THREE.TextureLoader().load('../../images/world.jpg');
            const material = new THREE.ShaderMaterial({
                uniforms : uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader : shader.fragmentShader
            })
            const mesh = new THREE.Mesh(geometry, material);
                  mesh.rotation.x = deg2ra(23.5);
                  mesh.rotation.y = deg2ra(-25);
            return mesh;
        }

        function init(){
            //camera
            camera = new THREE.PerspectiveCamera( 35, voidWidth / voidHeight , .01, 10000 );
            camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
            camera.position.y = distance * Math.sin(rotation.y);
            camera.position.z = (distance) * Math.cos(rotation.x) * Math.cos(rotation.y);

            // scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);

            // scene objects
            earthMesh = createEarth();
            scene.add(earthMesh);

            // atmosphere
            scene.add(createAtmosphere());

            igPostData.forEach((p,i) =>{
                let point = addPoint(p)
                earthMesh.add(point);
                points.push(point);
            })

            raycaster = new THREE.Raycaster();
            renderer = new THREE.WebGLRenderer();

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(voidWidth, voidHeight);
            let container = document.getElementById('theVoid');
            container.innerHTML = '';
            container.appendChild(renderer.domElement);

            container.addEventListener('touchstart', onDocumentTouchStart, false);
            container.addEventListener('mousedown', onDocumentMouseDown, false);

            window.addEventListener('resize', onWindowResize, false);
        }

        function onDocumentTouchStart(event) {
            event.preventDefault();
            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
            onDocumentMouseDown(event);
        }

        function onDocumentMouseDown(event){
            event.preventDefault();
            mouse.x = ( ( event.clientX ) / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( ( event.clientY ) / renderer.domElement.clientHeight ) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            let intersects = raycaster.intersectObjects(points);
            if (intersects.length > 0){
                // intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
                console.log(intersects[0])
            }
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function animate(){
            requestAnimationFrame(animate);
            render();
        }

        function render(){
            earthMesh.rotation.y += 1 / 300;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }
    }

    onVoidLoaded(){
        this.setState({ loadingTheVoid : false});
    }

    render(){
        const loading = <div
                            id="loadingScreen"
                            className={s.loadingStyle}
                            style={{"width" : "100%", height : this.state.voidHeight}}
                        >
                            <h1>LOADING...</h1>
                            <img src={loadingAnimation} alt="Loading"/>
                        </div>
        return (
                <div className={s.space}>
                    {this.state.loadingTheVoid ? loading : ''}
                    <div id="theVoid" />
                </div>
        )
    }
};

export default withStyles(s)(Space);
