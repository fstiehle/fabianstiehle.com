import Waypoint from "./Waypoint.class.js"

/**
 * Video waypoint
 */
export default class Video extends Waypoint {
  
    constructor(element) {
      super(element);
    }
    
    animate() {
      this.element.classList.add("animate");
      setTimeout(() => this.element.play(), 1200);
    }
  
    setUp() {
      super.setUp();
      this.element.volume = 0;
    }
  }