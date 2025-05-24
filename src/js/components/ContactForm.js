import { gsap } from "gsap"

export class ContactForm {
  constructor(form) {
    this.form = form
    this.submitButton = form.querySelector('button[type="submit"]')
    this.buttonText = this.submitButton.querySelector(".button-text")
    this.buttonLoading = this.submitButton.querySelector(".button-loading")

    this.init()
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this))

    // Add real-time validation
    const inputs = this.form.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input))
      input.addEventListener("input", () => this.clearError(input))
    })
  }

  async handleSubmit(e) {
    e.preventDefault()

    if (!this.validateForm()) {
      return
    }

    this.setLoading(true)

    try {
      // Simulate API call
      await this.submitForm()
      this.showSuccess()
      this.form.reset()
    } catch (error) {
      this.showError("Failed to send message. Please try again.")
    } finally {
      this.setLoading(false)
    }
  }

  async submitForm() {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  validateForm() {
    const requiredFields = this.form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false
      }
    })

    return isValid
  }

  validateField(field) {
    const value = field.value.trim()
    const fieldName = field.name
    let isValid = true
    let errorMessage = ""

    if (field.hasAttribute("required") && !value) {
      errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
      isValid = false
    } else if (field.type === "email" && value && !this.isValidEmail(value)) {
      errorMessage = "Please enter a valid email address"
      isValid = false
    }

    this.showFieldError(field, errorMessage)
    return isValid
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  showFieldError(field, message) {
    const errorElement = document.querySelector(`#${field.name}-error`)
    if (errorElement) {
      errorElement.textContent = message
      errorElement.style.color = "#ef4444"
      errorElement.style.fontSize = "0.875rem"
      errorElement.style.marginTop = "0.25rem"
    }

    if (message) {
      field.style.borderColor = "#ef4444"
    } else {
      field.style.borderColor = ""
    }
  }

  clearError(field) {
    this.showFieldError(field, "")
  }

  setLoading(loading) {
    this.submitButton.disabled = loading

    if (loading) {
      this.buttonText.style.display = "none"
      this.buttonLoading.style.display = "inline"
      this.submitButton.style.opacity = "0.7"
    } else {
      this.buttonText.style.display = "inline"
      this.buttonLoading.style.display = "none"
      this.submitButton.style.opacity = "1"
    }
  }

  showSuccess() {
    // Create success message
    const successMessage = document.createElement("div")
    successMessage.textContent = "Message sent successfully! I'll get back to you soon."
    successMessage.style.cssText = `
      background: #10b981;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: center;
      opacity: 0;
      transform: translateY(10px);
    `

    this.form.appendChild(successMessage)

    // Animate in
    gsap.to(successMessage, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    })

    // Remove after delay
    setTimeout(() => {
      gsap.to(successMessage, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => successMessage.remove(),
      })
    }, 5000)
  }

  showError(message) {
    // Similar to showSuccess but with error styling
    const errorMessage = document.createElement("div")
    errorMessage.textContent = message
    errorMessage.style.cssText = `
      background: #ef4444;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: center;
      opacity: 0;
      transform: translateY(10px);
    `

    this.form.appendChild(errorMessage)

    gsap.to(errorMessage, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    })

    setTimeout(() => {
      gsap.to(errorMessage, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => errorMessage.remove(),
      })
    }, 5000)
  }
}
