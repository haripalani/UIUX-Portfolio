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

    this.init();
    this.createObjects();
    this.setupAnimation();
    this.handleResize();
    this.render();
  }

  init() {
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    this.scene.add(directionalLight);
  }

  createObjects() {
    this.geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: false,
      roughness: 0.3,
      metalness: 0.7,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 0.7;
    this.scene.add(this.mesh);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);

    // Twinkle stars
    gsap.to(this.particles.material, {
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  setupAnimation() {
    // Auto-rotation only, NO mouse control
    gsap.to(this.mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 30, // a bit slower, smoother
      ease: "none",
      repeat: -1,
    });
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  render() {
    const animate = () => {
      requestAnimationFrame(animate);

      // Remove mouse-following logic completely

      this.particles.rotation.y += 0.0005; // slight star drift
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.particles.geometry.dispose();
    this.particles.material.dispose();
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}
