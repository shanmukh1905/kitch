import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { atomsFractCoords, atomColors } from './js/aaa.js'; // Assuming "koo.js" is in the same directory as your current script

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x000);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const atomGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const bondMaterial = new THREE.LineBasicMaterial({ color: 0xff0f0 });

const atomsMeshes = [];
for (const label in atomsFractCoords) {
    const coords = atomsFractCoords[label];
    const color = atomColors[label]; // Get color based on atom name
    const atomMaterial = new THREE.MeshBasicMaterial({ color: color }); // Create material with specified color
    const atomMesh = new THREE.Mesh(atomGeometry, atomMaterial);
    atomMesh.position.set(coords[0], coords[1], coords[2]);
    scene.add(atomMesh);
    atomsMeshes.push(atomMesh);
}

const bondLines = [];
// Create bonds between connected atoms
for (const label in atomsFractCoords) {
    const startCoords = atomsFractCoords[label];
    for (const connectedLabel in atomsFractCoords) {
        if (label !== connectedLabel) {
            const endCoords = atomsFractCoords[connectedLabel];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3().fromArray(startCoords),
                new THREE.Vector3().fromArray(endCoords)
            ]);
            const bondLine = new THREE.Line(lineGeometry, bondMaterial);
            scene.add(bondLine);
            bondLines.push(bondLine);
        }
    }
}

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(6, 8, 14);
orbit.update();

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
