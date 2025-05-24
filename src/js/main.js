import "../styles/styles.css"
import Lenis from "@studio-freight/lenis"
import { HeroScene } from "./components/HeroScene"
import { Navigation } from "./components/Navigation"
import { ProjectPreview } from "./components/ProjectPreview"
import { LoadingScreen } from "./components/LoadingScreen"

// Initialize loading screen
const loadingScreen = new LoadingScreen()

// Initialize smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Initialize components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - initializing components")

  // Hide loading screen after a delay
  const loadingElement = document.querySelector("#loading")
  if (loadingElement) {
    setTimeout(() => {
      console.log("Hiding loading screen")
      loadingElement.style.opacity = "0"
      setTimeout(() => {
        loadingElement.style.display = "none"
      }, 500)
    }, 1500)
  }

  // Hero Scene
  const heroContainer = document.querySelector("#hero-canvas")
  if (heroContainer) {
    try {
      new HeroScene(heroContainer)
      console.log("Hero scene initialized")
    } catch (error) {
      console.error("Hero scene error:", error)
    }
  }

  // Navigation
  const navElement = document.querySelector("nav")
  if (navElement) {
    try {
      new Navigation(navElement)
      console.log("Navigation initialized")
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  // Theme Toggle - Make this optional for now
  const themeToggle = document.querySelector("#theme-toggle")
  if (themeToggle) {
    try {
      // Simple theme toggle without the class for now
      themeToggle.addEventListener("click", () => {
        document.documentElement.toggleAttribute("data-theme", "dark")
      })
      console.log("Theme toggle initialized")
    } catch (error) {
      console.error("Theme toggle error:", error)
    }
  }

  // Project Previews
  const projectElements = document.querySelectorAll(".project")
  if (projectElements.length > 0) {
    try {
      projectElements.forEach((element) => new ProjectPreview(element))
      console.log("Project previews initialized")
    } catch (error) {
      console.error("Project previews error:", error)
    }
  }

  // Contact Form - Make this optional for now
  const contactForm = document.querySelector("#contact-form")
  if (contactForm) {
    try {
      // Simple form handling for now
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("Form submitted! (This is a demo)")
      })
      console.log("Contact form initialized")
    } catch (error) {
      console.error("Contact form error:", error)
    }
  }

  // Scroll Indicator
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const nextSection = document.querySelector(".main-content")
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }
})

// Handle resize events
window.addEventListener("resize", () => {
  // Update any size-dependent calculations here
})

// Handle visibility change (for performance optimization)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
  } else {
    // Resume animations when tab becomes visible
  }
})
