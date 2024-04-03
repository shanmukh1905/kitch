// Import OrbitControls if necessary
// import { OrbitControls } from './OrbitControls.js';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('atom-plot') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add OrbitControls if desired for camera movement
// const controls = new OrbitControls(camera, renderer.domElement);

// Create atoms and bonds
const atomGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const atomMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const bondMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

// Fractional coordinates of atoms (example data)
// Fractional coordinates of atoms (example data)
const atomsFractCoords = {
    "O1": [0.456822, -0.058695, 0.316797],
    "N1": [0.946565, 0.498009, 0.221943],
    "O2": [0.742783, -0.230001, 0.261322],
    "C1": [0.2, 0.3, 0.4], // Example new atom: Carbon
    "H1": [0.6, 0.1, 0.7], // Example new atom: Hydrogen
    // Add more atom coordinates here
};

// Create atoms
const atomsMeshes = [];
for (const label in atomsFractCoords) {
    const coords = atomsFractCoords[label];
    const atomMesh = new THREE.Mesh(atomGeometry, atomMaterial);
    atomMesh.position.set(coords[0], coords[1], coords[2]);
    scene.add(atomMesh);
    atomsMeshes.push(atomMesh);
}



// Create bonds
const bondLines = [];
// Calculate bonds and create line segments between bonded atoms
// Example code: connect first 2 atoms
const lineGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3().fromArray(atomsFractCoords[Object.keys(atomsFractCoords)[0]]),
  new THREE.Vector3().fromArray(atomsFractCoords[Object.keys(atomsFractCoords)[1]])
]);
const bondLine = new THREE.Line(lineGeometry, bondMaterial);
scene.add(bondLine);
bondLines.push(bondLine);

// Position camera

camera.position.x= -2;
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    // Define the minimum and maximum zoom levels
    const minZoom = 1; // Minimum zoom level
    const maxZoom = 10; // Maximum zoom level

    // Calculate the zoom level based on the scroll fraction
    const zoom = minZoom + (maxZoom - minZoom) * scrollFraction;

    // Limit the zoom level to the defined bounds
    const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoom));

    // Update the camera position to achieve the zoom effect
    camera.position.z = clampedZoom;

    // Render the scene after updating the camera
    renderer.render(scene, camera);
});

// Render function
function animate() {
  requestAnimationFrame(animate);
  // Update any animations or controls here if necessary

  renderer.render(scene, camera);
}
const canvas = document.getElementById('atom-plot');



animate();