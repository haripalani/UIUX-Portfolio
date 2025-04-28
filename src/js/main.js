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
  const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('.main-content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

});

document.addEventListener('DOMContentLoaded', function() {
  const cursorContainer = document.createElement('div');
  cursorContainer.classList.add('cursor-container');

  // Insert the uploaded SVG inside the container
  cursorContainer.innerHTML = `
<svg width="32" height="39" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2131_920)">
<path d="M3.01121 27.2206L3.85333 2.06245C3.86652 1.66813 4.34873 1.48523 4.62012 1.7716L21.8113 19.912C21.927 20.0341 21.9644 20.2111 21.9046 20.3683C20.9521 22.8699 19.8149 23.9124 17.165 24.9998C16.9984 25.0681 16.8072 25.0266 16.6821 24.8971L11.2685 19.2935C10.9981 19.0137 10.5241 19.1917 10.5049 19.5804L10.1261 27.2511C10.1171 27.4345 9.99577 27.5941 9.82058 27.6494C7.32816 28.4366 5.80524 28.4221 3.32032 27.6566C3.13072 27.5982 3.00458 27.4189 3.01121 27.2206Z" fill="url(#paint0_linear_2131_920)"/>
<path d="M3.01121 27.2206L3.85333 2.06245C3.86652 1.66813 4.34873 1.48523 4.62012 1.7716L21.8113 19.912C21.927 20.0341 21.9644 20.2111 21.9046 20.3683C20.9521 22.8699 19.8149 23.9124 17.165 24.9998C16.9984 25.0681 16.8072 25.0266 16.6821 24.8971L11.2685 19.2935C10.9981 19.0137 10.5241 19.1917 10.5049 19.5804L10.1261 27.2511C10.1171 27.4345 9.99577 27.5941 9.82058 27.6494C7.32816 28.4366 5.80524 28.4221 3.32032 27.6566C3.13072 27.5982 3.00458 27.4189 3.01121 27.2206Z" stroke="black" stroke-width="3.11"/>
</g>
<defs>
<filter id="filter0_d_2131_920" x="0.567166" y="0.0742188" width="23.8095" height="31.4936" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="0.888889"/>
<feGaussianBlur stdDeviation="0.444444"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2131_920"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2131_920" result="shape"/>
</filter>
<linearGradient id="paint0_linear_2131_920" x1="17.6667" y1="4.33333" x2="3.77778" y2="22.3333" gradientUnits="userSpaceOnUse">
<stop stop-color="#D9D9D9"/>
<stop offset="1" stop-color="#737373"/>
</linearGradient>
</defs>
</svg>


  `;

  document.body.appendChild(cursorContainer);

  document.addEventListener('mousemove', function(e) {
    cursorContainer.style.left = (e.clientX + 10) + 'px'; // little right shift
    cursorContainer.style.top = (e.clientY + 5) + 'px';    // little downward shift
  });
});


