import * as THREE from 'three';
import { gsap } from 'gsap';

export class HeroScene {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.targetRotation = { x: 0, y: 0 }; // for smooth mouse control

    this.init();
    this.createObjects();
    this.setupAnimation();
    this.handleResize();
    this.render();
  }

  init() {
    // Set up renderer
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Position camera
    this.camera.position.z = 5;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    this.scene.add(directionalLight);
  }

  createObjects() {
    // Create the main hero object
    this.geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: false,
      roughness: 0.3,
      metalness: 0.7,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 0.7; // Shift object slightly to the right
    this.scene.add(this.mesh);

    // Create star particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20; // Wider spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01, // smaller for stars
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);

    // Twinkle animation
    gsap.to(this.particles.material, {
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  setupAnimation() {
    // Animate the mesh (auto-rotation)
    gsap.to(this.mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Capture mouse movement
    document.addEventListener('mousemove', (event) => {
      this.targetRotation.x = (event.clientY / window.innerHeight - 0.5) * Math.PI;
      this.targetRotation.y = (event.clientX / window.innerWidth - 0.5) * Math.PI;
    });
  }

  handleResize() {
    window.addEventListener('resize', () => {
      // Update camera
      this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  render() {
    const animate = () => {
      requestAnimationFrame(animate);

      // Smoothly follow the mouse
      this.mesh.rotation.x += (this.targetRotation.x - this.mesh.rotation.x) * 0.05;
      this.mesh.rotation.y += (this.targetRotation.y - this.mesh.rotation.y) * 0.05;

      // Rotate stars very slightly
      this.particles.rotation.y += 0.0005;

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  dispose() {
    // Clean up
    this.geometry.dispose();
    this.material.dispose();
    this.particles.geometry.dispose();
    this.particles.material.dispose();
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}
