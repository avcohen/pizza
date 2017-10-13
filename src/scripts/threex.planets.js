/* eslint-disable */
import * as THREE from 'three';

var THREEx = THREEx || {};

THREEx.Planets = {};

THREEx.Planets.baseURL = '../';

// from http://planetpixelemporium.com/

THREEx.Planets.createEarth = function() {
  const geometry = new THREE.SphereGeometry(0.6, 32, 32);

  const material = new THREE.MeshToonMaterial({
    map: THREE.ImageUtils.loadTexture(
      `${THREEx.Planets.baseURL}images/toonworld.png`,
    ),
    // bumpMap: THREE.ImageUtils.loadTexture(
    //   `${THREEx.Planets.baseURL}images/toonworld-bump.png`,
    // ),
    // bumpScale: 0.1,
    // specularMap: THREE.ImageUtils.loadTexture(
    //   `${THREEx.Planets.baseURL}images/earthspec1k.jpg`,
    // ),
    specular: new THREE.Color('white'),
    // reflectivity: beta,
    // envMap: alphaIndex % 2 === 0 ? null : reflectionCube
  });

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createEarthCloud = function() {
  // create destination canvas
  const canvasResult = document.createElement('canvas');
  canvasResult.width = 1024;
  canvasResult.height = 512;
  const contextResult = canvasResult.getContext('2d');

  // load earthcloudmap
  const imageMap = new Image();
  imageMap.addEventListener(
    'load',
    () => {
      // create dataMap ImageData for earthcloudmap
      const canvasMap = document.createElement('canvas');
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      const contextMap = canvasMap.getContext('2d');
      contextMap.drawImage(imageMap, 0, 0);
      const dataMap = contextMap.getImageData(
        0,
        0,
        canvasMap.width,
        canvasMap.height,
      );

      // load earthcloudmaptrans
      const imageTrans = new Image();
      imageTrans.addEventListener('load', () => {
        // create dataTrans ImageData for earthcloudmaptrans
        const canvasTrans = document.createElement('canvas');
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext('2d');
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(
          0,
          0,
          canvasTrans.width,
          canvasTrans.height,
        );
        // merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(
          canvasMap.width,
          canvasMap.height,
        );
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0];
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0);
        material.map.needsUpdate = true;
      });
      imageTrans.src = `${THREEx.Planets.baseURL}images/earthcloudmaptrans.jpg`;
    },
    false,
  );
  imageMap.src = `${THREEx.Planets.baseURL}images/earthcloudmap.jpg`;

  const geometry = new THREE.SphereGeometry(0.51, 32, 32);
  var material = new THREE.MeshPhongMaterial({
    map: new THREE.Texture(canvasResult),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createMoon = function() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      `${THREEx.Planets.baseURL}images/moonmap1k.jpg`,
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      `${THREEx.Planets.baseURL}images/moonbump1k.jpg`,
    ),
    bumpScale: 0.002,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createMars = function() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      `${THREEx.Planets.baseURL}images/marsmap1k.jpg`,
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      `${THREEx.Planets.baseURL}images/marsbump1k.jpg`,
    ),
    bumpScale: 0.05,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createJupiter = function() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    `${THREEx.Planets.baseURL}images/jupitermap.jpg`,
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.02,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createSaturn = function() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    `${THREEx.Planets.baseURL}images/saturnmap.jpg`,
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createSaturnRing = function() {
  // create destination canvas
  const canvasResult = document.createElement('canvas');
  canvasResult.width = 915;
  canvasResult.height = 64;
  const contextResult = canvasResult.getContext('2d');

  // load earthcloudmap
  const imageMap = new Image();
  imageMap.addEventListener(
    'load',
    () => {
      // create dataMap ImageData for earthcloudmap
      const canvasMap = document.createElement('canvas');
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      const contextMap = canvasMap.getContext('2d');
      contextMap.drawImage(imageMap, 0, 0);
      const dataMap = contextMap.getImageData(
        0,
        0,
        canvasMap.width,
        canvasMap.height,
      );

      // load earthcloudmaptrans
      const imageTrans = new Image();
      imageTrans.addEventListener('load', () => {
        // create dataTrans ImageData for earthcloudmaptrans
        const canvasTrans = document.createElement('canvas');
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext('2d');
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(
          0,
          0,
          canvasTrans.width,
          canvasTrans.height,
        );
        // merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(
          canvasResult.width,
          canvasResult.height,
        );
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0] / 4;
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0);
        material.map.needsUpdate = true;
      });
      imageTrans.src = `${THREEx.Planets.baseURL}images/saturnringpattern.gif`;
    },
    false,
  );
  imageMap.src = `${THREEx.Planets.baseURL}images/saturnringcolor.jpg`;

  const geometry = new THREEx.Planets._RingGeometry(0.55, 0.75, 64);
  var material = new THREE.MeshPhongMaterial({
    map: new THREE.Texture(canvasResult),
    // map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.lookAt(new THREE.Vector3(0.5, -4, 1));
  return mesh;
};

THREEx.Planets.createUranus = function() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    `${THREEx.Planets.baseURL}images/uranusmap.jpg`,
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createUranusRing = function() {
  // create destination canvas
  const canvasResult = document.createElement('canvas');
  canvasResult.width = 1024;
  canvasResult.height = 72;
  const contextResult = canvasResult.getContext('2d');

  // load earthcloudmap
  const imageMap = new Image();
  imageMap.addEventListener(
    'load',
    () => {
      // create dataMap ImageData for earthcloudmap
      const canvasMap = document.createElement('canvas');
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      const contextMap = canvasMap.getContext('2d');
      contextMap.drawImage(imageMap, 0, 0);
      const dataMap = contextMap.getImageData(
        0,
        0,
        canvasMap.width,
        canvasMap.height,
      );

      // load earthcloudmaptrans
      const imageTrans = new Image();
      imageTrans.addEventListener('load', () => {
        // create dataTrans ImageData for earthcloudmaptrans
        const canvasTrans = document.createElement('canvas');
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext('2d');
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(
          0,
          0,
          canvasTrans.width,
          canvasTrans.height,
        );
        // merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(
          canvasResult.width,
          canvasResult.height,
        );
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0] / 2;
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0);
        material.map.needsUpdate = true;
      });
      imageTrans.src = `${THREEx.Planets.baseURL}images/uranusringtrans.gif`;
    },
    false,
  );
  imageMap.src = `${THREEx.Planets.baseURL}images/uranusringcolour.jpg`;

  const geometry = new THREEx.Planets._RingGeometry(0.55, 0.75, 64);
  var material = new THREE.MeshPhongMaterial({
    map: new THREE.Texture(canvasResult),
    // map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.lookAt(new THREE.Vector3(0.5, -4, 1));
  return mesh;
};

THREEx.Planets.createNeptune = function() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    `${THREEx.Planets.baseURL}images/neptunemap.jpg`,
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createPluto = function() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      `${THREEx.Planets.baseURL}images/plutomap1k.jpg`,
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      `${THREEx.Planets.baseURL}images/plutobump1k.jpg`,
    ),
    bumpScale: 0.005,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREEx.Planets.createStarfield = function() {
  const texture = THREE.ImageUtils.loadTexture(
    `${THREEx.Planets.baseURL}images/galaxy_starfield.jpeg`,
  );
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  const geometry = new THREE.SphereGeometry(90, 12, 12);
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

// ////////////////////////////////////////////////////////////////////////////////
//		comment								//
// ////////////////////////////////////////////////////////////////////////////////

/**
 * change the original from three.js because i needed different UV
 *
 * @author Kaleb Murphy
 * @author jerome etienne
 */
THREEx.Planets._RingGeometry = function(
  innerRadius,
  outerRadius,
  thetaSegments,
) {
  THREE.Geometry.call(this);

  innerRadius = innerRadius || 0;
  outerRadius = outerRadius || 50;
  thetaSegments = thetaSegments || 8;

  const normal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < thetaSegments; i++) {
    const angleLo = i / thetaSegments * Math.PI * 2;
    const angleHi = (i + 1) / thetaSegments * Math.PI * 2;

    const vertex1 = new THREE.Vector3(
      innerRadius * Math.cos(angleLo),
      innerRadius * Math.sin(angleLo),
      0,
    );
    const vertex2 = new THREE.Vector3(
      outerRadius * Math.cos(angleLo),
      outerRadius * Math.sin(angleLo),
      0,
    );
    const vertex3 = new THREE.Vector3(
      innerRadius * Math.cos(angleHi),
      innerRadius * Math.sin(angleHi),
      0,
    );
    const vertex4 = new THREE.Vector3(
      outerRadius * Math.cos(angleHi),
      outerRadius * Math.sin(angleHi),
      0,
    );

    this.vertices.push(vertex1);
    this.vertices.push(vertex2);
    this.vertices.push(vertex3);
    this.vertices.push(vertex4);

    const vertexIdx = i * 4;

    // Create the first triangle
    var face = new THREE.Face3(
      vertexIdx + 0,
      vertexIdx + 1,
      vertexIdx + 2,
      normal,
    );
    var uvs = [];

    var uv = new THREE.Vector2(0, 0);
    uvs.push(uv);
    var uv = new THREE.Vector2(1, 0);
    uvs.push(uv);
    var uv = new THREE.Vector2(0, 1);
    uvs.push(uv);

    this.faces.push(face);
    this.faceVertexUvs[0].push(uvs);

    // Create the second triangle
    var face = new THREE.Face3(
      vertexIdx + 2,
      vertexIdx + 1,
      vertexIdx + 3,
      normal,
    );
    var uvs = [];

    var uv = new THREE.Vector2(0, 1);
    uvs.push(uv);
    var uv = new THREE.Vector2(1, 0);
    uvs.push(uv);
    var uv = new THREE.Vector2(1, 1);
    uvs.push(uv);

    this.faces.push(face);
    this.faceVertexUvs[0].push(uvs);
  }

  this.computeCentroids();
  this.computeFaceNormals();

  this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), outerRadius);
};
THREEx.Planets._RingGeometry.prototype = Object.create(
  THREE.Geometry.prototype,
);

export default THREEx;
