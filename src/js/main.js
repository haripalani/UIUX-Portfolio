import '../styles/styles.css';
import Lenis from '@studio-freight/lenis';
import { HeroScene } from './components/HeroScene';
import { Navigation } from './components/Navigation';
import { ProjectPreview } from './components/ProjectPreview';

// Initialize smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize Three.js scene
document.addEventListener('DOMContentLoaded', () => {
  // Hero scene initialization
  const heroContainer = document.querySelector('#hero-canvas');
  if (heroContainer) {
    const heroScene = new HeroScene(heroContainer);
  } else {
    console.error('Hero container not found');
  }

  // Initialize navigation
  const navElement = document.querySelector('nav');
  if (navElement && typeof Navigation === 'function') {
    const navigation = new Navigation(navElement);
  }

  // Initialize project previews
  const projectElements = document.querySelectorAll('.project');
  if (projectElements.length > 0 && typeof ProjectPreview === 'function') {
    projectElements.forEach(element => {
      const projectPreview = new ProjectPreview(element);
    });
  }
});