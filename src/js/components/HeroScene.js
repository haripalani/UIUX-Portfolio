import * as THREE from 'three';
import { gsap } from 'gsap';

export class HeroScene {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    
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
    // Create a simple geometry for the hero section
    this.geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    this.material = new THREE.MeshStandardMaterial({ 
      color: 0x6366f1,
      wireframe: false,
      roughness: 0.3,
      metalness: 0.7
    });
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    
    // Add some particles in the background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xffffff
    });
    
    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  setupAnimation() {
    // Animate the mesh
    gsap.to(this.mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 20,
      ease: "none",
      repeat: -1
    });
    
    // Add interactive movement
    document.addEventListener('mousemove', (event) => {
      const x = (event.clientX / window.innerWidth) - 0.5;
      const y = (event.clientY / window.innerHeight) - 0.5;
      
      gsap.to(this.mesh.rotation, {
        x: this.mesh.rotation.x + y * 0.1,
        y: this.mesh.rotation.y + x * 0.1,
        duration: 0.5
      });
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
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles gently
      this.particles.rotation.x += 0.0003;
      this.particles.rotation.y += 0.0005;
      
      this.renderer.render(this.scene, this.camera);
    };
    
    animate();
  }
}