import { gsap } from "gsap"

export class LoadingScreen {
  constructor() {
    this.loadingElement = document.querySelector("#loading")
    this.init()
  }

  init() {
    // Animate spinner
    const spinner = this.loadingElement.querySelector(".spinner")
    if (spinner) {
      gsap.to(spinner, {
        rotation: 360,
        duration: 1,
        ease: "none",
        repeat: -1,
      })
    }
  }

  hide() {
    gsap.to(this.loadingElement, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        this.loadingElement.style.display = "none"
      },
    })
  }
}
