import "../styles/styles.css"
import Lenis from "@studio-freight/lenis"
import { HeroScene } from "./components/HeroScene"
import { Navigation } from "./components/Navigation"
import { ProjectPreview } from "./components/ProjectPreview"
import { LoadingScreen } from "./components/LoadingScreen"
import { ContactForm } from "./components/ContactForm"
import { ThemeToggle } from "./components/ThemeToggle"

// Initialize loading screen
const loadingScreen = new LoadingScreen()

// Initialize smooth scroll with better settings
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
})

// Smooth scroll animation loop
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Header scroll effects
let lastScrollY = window.scrollY
const header = document.querySelector('header')

function updateHeader() {
  const scrollY = window.scrollY
  
  // Add backdrop blur and shadow on scroll
  if (scrollY > 50) {
    header.classList.add('scrolled')
  } else {
    header.classList.remove('scrolled')
  }
  
  // Hide/show header based on scroll direction
  if (scrollY > lastScrollY && scrollY > 100) {
    header.style.transform = 'translateY(-100%)'
  } else {
    header.style.transform = 'translateY(0)'
  }
  
  lastScrollY = scrollY
}

// Throttled scroll handler for performance
let ticking = false
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateHeader()
      ticking = false
    })
    ticking = true
  }
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
      observer.unobserve(entry.target) // Only animate once
    }
  })
}, observerOptions)

// Initialize components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - initializing components")

  // Hide loading screen
  setTimeout(() => {
    loadingScreen.hide()
  }, 1500)

  // Hero Scene with error handling
  const heroContainer = document.querySelector("#hero-canvas")
  if (heroContainer) {
    try {
      new HeroScene(heroContainer)
      console.log("✅ Hero scene initialized")
    } catch (error) {
      console.error("❌ Hero scene error:", error)
      heroContainer.innerHTML = '<div class="hero-fallback">🌟</div>'
    }
  }

  // Navigation with Lenis integration
  const navElement = document.querySelector("nav")
  if (navElement) {
    try {
      const navigation = new Navigation(navElement)
      
      // Override navigation scrolling to use Lenis
      const navLinks = navElement.querySelectorAll('a[href^="#"]')
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const targetId = link.getAttribute('href')
          const targetElement = document.querySelector(targetId)
          
          if (targetElement) {
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'))
            link.classList.add('active')
            
            // Smooth scroll with Lenis
            lenis.scrollTo(targetElement, {
              offset: -80, // Account for fixed header
              duration: 1.2,
              easing: (t) => 1 - Math.pow(1 - t, 3)
            })
          }
        })
      })
      
      console.log("✅ Navigation initialized")
    } catch (error) {
      console.error("❌ Navigation error:", error)
    }
  }

  // Theme Toggle
  const themeToggle = document.querySelector("#theme-toggle")
  if (themeToggle) {
    try {
      new ThemeToggle(themeToggle)
      console.log("✅ Theme toggle initialized")
    } catch (error) {
      console.error("❌ Theme toggle error:", error)
      // Fallback simple toggle
      themeToggle.addEventListener("click", () => {
        document.documentElement.toggleAttribute("data-theme")
      })
    }
  }

  // Project Previews with intersection observer
  const projectElements = document.querySelectorAll(".project")
  if (projectElements.length > 0) {
    try {
      projectElements.forEach((element) => {
        new ProjectPreview(element)
        observer.observe(element)
      })
      console.log("✅ Project previews initialized")
    } catch (error) {
      console.error("❌ Project previews error:", error)
    }
  }

  // Contact Form
  const contactForm = document.querySelector("#contact-form")
  if (contactForm) {
    try {
      new ContactForm(contactForm)
      console.log("✅ Contact form initialized")
    } catch (error) {
      console.error("❌ Contact form error:", error)
      // Fallback simple form
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("Thank you for your message! I'll get back to you soon.")
      })
    }
  }

  // Scroll Indicator with Lenis
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const nextSection = document.querySelector("#projects")
      if (nextSection) {
        lenis.scrollTo(nextSection, {
          offset: -80,
          duration: 1.5
        })
      }
    })
    
    // Hide scroll indicator after user scrolls
    let hasScrolled = false
    const checkScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        hasScrolled = true
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)'
        window.removeEventListener('scroll', checkScroll)
      }
    }
    window.addEventListener('scroll', checkScroll)
  }

  // Observe other sections for animations
  const sectionsToAnimate = document.querySelectorAll('#about, #contact, .about-content > *, .skills li')
  sectionsToAnimate.forEach(section => {
    observer.observe(section)
  })

  // Add scroll listener for header effects
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Parallax effect for hero section
  const heroSection = document.querySelector('#hero')
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroSection.style.transform = `translateY(${rate}px)`
    }, { passive: true })
  }
  
  // Add typing animation for hero text
  const heroTitle = document.querySelector('.hero-content h1')
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ''
    heroTitle.style.opacity = '1'
    
    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }
    
    setTimeout(typeWriter, 1000)
  }
})

// Enhanced resize handler
let resizeTimeout
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    // Update Lenis on resize
    lenis.resize()
    
    // Recalculate any size-dependent elements
    const heroCanvas = document.querySelector('#hero-canvas canvas')
    if (heroCanvas) {
      // Hero scene will handle its own resize
    }
  }, 250)
})

// Performance optimization for visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause Lenis when tab is hidden
    lenis.stop()
  } else {
    // Resume Lenis when tab is visible
    lenis.start()
  }
})

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  const sections = ['#hero', '#projects', '#about', '#contact']
  const currentHash = window.location.hash || '#hero'
  const currentIndex = sections.indexOf(currentHash)
  
  if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
    e.preventDefault()
    const nextSection = document.querySelector(sections[currentIndex + 1])
    if (nextSection) {
      lenis.scrollTo(nextSection, { offset: -80 })
    }
  } else if (e.key === 'ArrowUp' && currentIndex > 0) {
    e.preventDefault()
    const prevSection = document.querySelector(sections[currentIndex - 1])
    if (prevSection) {
      lenis.scrollTo(prevSection, { offset: -80 })
    }
  }
})

// Preload critical resources
const preloadImages = () => {
  const images = document.querySelectorAll('img[src]')
  images.forEach(img => {
    if (img.loading !== 'lazy') {
      const imageLoader = new Image()
      imageLoader.src = img.src
    }
  })
}

// Initialize preloading after initial load
setTimeout(preloadImages, 2000)

// Add smooth page transitions
window.addEventListener('beforeunload', () => {
  document.body.style.transform = 'translateY(20px)'
})