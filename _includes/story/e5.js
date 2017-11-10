(() => { //IIF

const textBlocks = document.getElementsByTagName("p"),
      h1 = document.getElementsByClassName("text"),
      galleries = document.getElementsByClassName("gallery"),
      panos = document.getElementsByClassName("pano");
  
/**
 * Delay triggering the scroll waypoint
 */
const scrollOffset = 30;

/**
 * Represents a scroll waypoint
 */
class Waypoint {
  constructor(element) {
    this.element = element;
    this.y = element.getBoundingClientRect().top;
    this.setUp();
  }

  animate() {
    this.element.classList.add("animate");
  }

  setUp() {
    this.element.classList.add("hidden");
  }
}

/**
 * Panorama waypoint
 */
class Panorama extends Waypoint {

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
    this.container.classList.add("scroll");
  }

  scroll() {
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

/**
 * Defines all scroll waypoints
 */
window.waypoints = Array.prototype.slice.call(textBlocks)
.concat(Array.prototype.slice.call(galleries))
.concat(Array.prototype.slice.call(h1))
.map((e) => { return new Waypoint(e); });

// Add panorama waypoints
const panowaypoints = Array.prototype.slice.call(panos)
.map((e) => { return new Panorama(e); })

window.waypoints = window.waypoints.concat(panowaypoints)
.filter((e) => { return e.y > 0 })
.sort((a, b) => b.y - a.y);

/**
 * Scroll event listener
 */
const scrollListener = function() {
  if (waypoints.length == 0) {
    window.removeEventListener("scroll", scrollListener);
    window.removeEventListener("load", scrollListener);
    return;
  }
  waypoints.forEach((element) => {
    if (!isScrolledIntoView(waypoints.peek().element, scrollOffset))
      return;
    waypoints.pop().animate();
  });  
}
window.addEventListener("scroll", scrollListener);
window.addEventListener("load", scrollListener);

/**
 * Checks if el in viewport
 * Modified from https://stackoverflow.com/a/22480938
 */
const isScrolledIntoView = function(el, offset) {
  const elemTop = el.getBoundingClientRect().top;
  const elemBottom = el.getBoundingClientRect().bottom;
  return elemTop + offset < window.innerHeight && elemBottom >= 0;
};

/**
 * Helper: array peek
 */
Array.prototype.peek = function() {
  return this[this.length-1];
}

/**
 * Helper from: https://gist.github.com/andjosh/6764939
 * t = current time
 * b = start value
 * c = change in value
 * d = duration
 */
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

})(window);