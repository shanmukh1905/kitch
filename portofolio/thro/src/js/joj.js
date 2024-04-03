import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x000);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const atomGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const atomMaterial = new THREE.MeshBasicMaterial({ color: 0xf00000});
const bondMaterial = new THREE.LineBasicMaterial({ color: 0xff0f0 });

const atomsFractCoords = {
    "O1": [0.456822, -0.058695, 0.316797],
    "N1": [0.946565, 0.498009, 0.221943],
    "O2": [0.742783, -0.230001, 0.261322],
    "C1": [0.2, 0.3, 0.4], // Example new atom: Carbon
    "H1": [0.6, 0.1, 0.7], // Example new atom: Hydrogen
    // Add more atom coordinates here
};

const atomsMeshes = [];
for (const label in atomsFractCoords) {
    const coords = atomsFractCoords[label];
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
