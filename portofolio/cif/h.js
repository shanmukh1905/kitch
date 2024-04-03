// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('atom-plot') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add OrbitControls for camera movement
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create atoms and bonds
const atomGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const atomMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const bondMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

// Fractional coordinates of atoms (example data)
const atomsFractCoords = {
  "O5": [0.456822, -0.058695, 0.316797],
  "N1": [0.946565, 0.498009, 0.221943],
  "O3": [0.742783, -0.230001, 0.261322],
  // Add other atom coordinates here
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
camera.position.set(0, 0, 5); // Adjusted camera position

// Set camera controls target
controls.target.set(0, 0, 0);

// Render function
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls in each frame

  renderer.render(scene, camera);
}

animate();
