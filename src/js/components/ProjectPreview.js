import { gsap } from 'gsap';

export class ProjectPreview {
  constructor(element) {
    this.element = element;
    this.image = this.element.querySelector('.project-image img');
    this.title = this.element.querySelector('.project-title');
    this.description = this.element.querySelector('.project-description');
    
    this.init();
  }
  
  init() {
    // Add hover animations
    this.element.addEventListener('mouseenter', () => {
      gsap.to(this.image, {
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to(this.title, {
        y: -5,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
    
    this.element.addEventListener('mouseleave', () => {
      gsap.to(this.image, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to(this.title, {
        y: 0,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
    
    // Add reveal animation on scroll
    this.setupScrollReveal();
  }
  
  setupScrollReveal() {
    // Simple check if element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };
    
    // Initial check
    if (isInViewport(this.element)) {
      this.element.classList.add('in-view');
    }
    
    // Check on scroll
    window.addEventListener('scroll', () => {
      if (isInViewport(this.element) && !this.element.classList.contains('in-view')) {
        this.element.classList.add('in-view');
        
        gsap.fromTo(this.element, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
        );
      }
    });
  }
}