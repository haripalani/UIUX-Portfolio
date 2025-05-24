export class ThemeToggle {
  constructor(button) {
    this.button = button
    this.isDark = localStorage.getItem("theme") === "dark"

    this.init()
  }

  init() {
    // Set initial theme
    this.updateTheme()

    // Add click listener
    this.button.addEventListener("click", () => {
      this.toggle()
    })

    // Update icon based on theme
    this.updateIcon()
  }

  toggle() {
    this.isDark = !this.isDark
    this.updateTheme()
    this.updateIcon()

    // Save preference
    localStorage.setItem("theme", this.isDark ? "dark" : "light")
  }

  updateTheme() {
    if (this.isDark) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
  }

  updateIcon() {
    const icon = this.isDark ? this.getMoonIcon() : this.getSunIcon()
    this.button.innerHTML = icon
  }

  getSunIcon() {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  }

  getMoonIcon() {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  }
}
