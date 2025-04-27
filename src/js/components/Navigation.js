export class Navigation {
    constructor(element) {
      this.navElement = element;
      this.links = this.navElement.querySelectorAll('a');
      
      this.init();
    }
    
    init() {
      // Add active state to navigation
      this.links.forEach(link => {
        link.addEventListener('click', (e) => {
          // Prevent default behavior for smooth scroll handling
          e.preventDefault();
          
          // Remove active class from all links
          this.links.forEach(el => el.classList.remove('active'));
          
          // Add active class to clicked link
          link.classList.add('active');
          
          // Get the target section
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            // Scroll to the section
            window.scrollTo({
              top: targetSection.offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
      
      // Update active link on scroll
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = '#' + section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            this.links.forEach(el => el.classList.remove('active'));
            
            // Add active class to the link that corresponds to the current section
            const activeLink = this.navElement.querySelector(`a[href="${sectionId}"]`);
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        });
      });
    }
  }