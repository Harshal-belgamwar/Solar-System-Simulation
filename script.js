
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Lighting
const sunlight = new THREE.PointLight(0xffffff, 2, 200);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

// Planet data
const planetData = [
  { name: "Mercury", color: 0xdddddd, distance: 5, size: 0.3, speed: 0.012 },
  { name: "Venus",   color: 0xffe0b3, distance: 8, size: 0.4, speed: 0.02 },
  { name: "Earth",   color: 0x99ccff, distance: 11, size: 0.5, speed: 0.01 },
  { name: "Mars",    color: 0xff9966, distance: 14, size: 0.4, speed: 0.008 },
  { name: "Jupiter", color: 0xffcc99, distance: 18, size: 0.9, speed: 0.004 },
  { name: "Saturn",  color: 0xffffcc, distance: 23, size: 0.8, speed: 0.003 },
  { name: "Uranus",  color: 0xccffff, distance: 26, size: 0.7, speed: 0.002 },
  { name: "Neptune", color: 0x9999ff, distance: 31, size: 0.7, speed: 0.0015 }
];



const planets = [];
const slidersContainer = document.getElementById("sliders");

// Create planets and sliders
planetData.forEach((data, index) => {
 
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({
  color: data.color,
  emissive: data.color,
  emissiveIntensity: 0.4,
  metalness: 0.1,
  roughness: 0.7
});
  const planet = new THREE.Mesh(geometry, material);

  // Create orbit group
  const orbit = new THREE.Object3D();
  orbit.add(planet);
  sun.add(orbit);
  planet.position.set(data.distance, 0, 0);

  // Create slider
  const sliderWrapper = document.createElement("div");
  sliderWrapper.innerHTML = `
    <label>
      ${data.name}:
      <input type="range" id="slider-${index}" min="0" max="5" step="0.0005" value="${data.speed}">
      <span id="label-${index}">${data.speed.toFixed(3)}</span>
    </label>
  `;
  slidersContainer.appendChild(sliderWrapper);

  planets.push({
    name: data.name,
    mesh: planet,
    orbit: orbit,
    baseSpeed: data.speed,
    slider: document.getElementById(`slider-${index}`),
    label: document.getElementById(`label-${index}`)
  });
});

// Camera position
camera.position.set(0, 10, 40);
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  planets.forEach(p => {
    const speed = parseFloat(p.slider.value);
    p.orbit.rotation.y += speed;
    p.mesh.rotation.y += 0.01;
    p.label.textContent = speed.toFixed(3);
  });

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
