import Waypoint from "./Waypoint.class.js"

/**
 * Panorama waypoint
 */
export default class Panorama extends Waypoint {
  
    constructor(element) {
      super(element);
      this.firstScrollDuration = 3000;
      this.scrollDurationMod = 0.6;
      this.firstScrollWidth = this.firstScrollDuration * 0.35;
      this.scrolling = false;
    }
  
    animate() {
      // scroll to pano and scroll it right
      // then, show controlles on destop
      // hide them with media queries on desktop
      // scroll through controlles
      this.scroll().then(() => this.showControlles());
    }
  
    showControlles() {
      this.controlles.classList.add("animate");
      this.container.classList.remove("no-scroll");
    }
  
    scroll() {
      // Can't I just return this.scrollLeft()?
      return new Promise((resolve, reject) => {
        this.scrollLeft(this.container, this.firstScrollWidth, this.firstScrollDuration)
          .then(() => resolve())
      });
    }
  
    controllesListener(element) {
      if (this.scrolling === true)
        return;
      this.scrolling = true;
      if (element.target.classList.contains("left")) {
        this.scrollLeft(this.container, this.container.scrollLeft - this.scrollWidth,
          this.scrollWidth * this.scrollDurationMod)
          .then(() => this.scrolling = false)
      } else if (element.target.classList.contains("right")) {
        this.scrollLeft(this.container,  this.container.scrollLeft + this.scrollWidth,
          this.scrollWidth * this.scrollDurationMod)
          .then(() => this.scrolling = false)
      }
    }
  
    setUp() {
      this.scrollWidth = document.documentElement.clientWidth * 0.75;
      this.container = this.element.querySelector(".container");
      this.controlles = this.element.querySelector(".controlles");
      this.container.classList.add("no-scroll");
      this.controlles.classList.add("hidden");
      this.controlles.addEventListener("click", this.controllesListener.bind(this));
    }
  
    /**
     * Handles the animated left scroll
     */
    scrollLeft(element, to, duration) {
      return new Promise((resolve, reject) => {
        const start = element.scrollLeft,
              change = to - start,
              increment = 20;
  
        var currentTime = 0;
            
        (function scroll() {
          currentTime += increment;
          element.scrollLeft = Math.easeInOutQuad(currentTime, start, change, duration);
          if (currentTime < duration) {
            setTimeout(scroll, increment);
          }
          else {
            resolve();                    
          }})();
      });
    }
  }