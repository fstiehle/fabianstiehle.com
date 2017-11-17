(() => { //IIF

const textBlocks = document.getElementsByTagName("p"),
      h1 = document.getElementsByClassName("text"),
      galleries = document.getElementsByClassName("gallery"),
      panos = document.getElementsByClassName("pano"),
      audiosStart = document.getElementsByTagName("audio");
      audiosEnd = document.getElementsByClassName("audio_end");
  
const debug = true;

/**
 * Delay triggering the scroll waypoint
 */
const scrollOffset = 30;

/**
 * Represents a scroll waypoint
 */
class Waypoint {
  constructor(element, y) {
    if (element === undefined)
      return false;
    this.element = element;
    this.y = y;
    this.setUp();
    if (debug)
      console.log(this.element.className + ": " + this.y);
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

  constructor(element, y) {
    super(element, y);
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

/**
 * Waypoint where to start playing sound
 */
class AudioStart extends Waypoint {

  constructor(element, y) {
    super(element, y);
    this.maxVolume = 0.6;
    this.fadeInDuration = 200;
  }

  animate() {
    this.fadePlay(this.element, this.maxVolume, this.fadeInDuration)
    .then(() => window.nowPlaying.push(this));
  }

  /**
   * Fades volume from current element.volume
   * @param to target volume
   * @param duration duration to fade in sec
   */
  fadePlay(element, to, duration) {    
    return new Promise((resolve, reject) => {
      const start = element.volume,
            change = to - start,
            increment = 0.1;

      var currentTime = 0;
      element.play();
          
      (function fade() {        
        currentTime += increment;
        element.volume = Math.easeInOutQuad(currentTime, start, change, duration);
        if (currentTime < duration) {
          setTimeout(fade, increment);
        }
        else {
          resolve();                    
        }})();
    });
  }

  setUp() {
    this.element.volume = 0;
  }
}

/**
 * Waypoint where to end playing sound
 */
class AudioEnd extends AudioStart {

  constructor(element, y) {
    super(element, y);
    this.fadeOutDuration = this.fadeInDuration * 0.5;
  }
  
  animate() {
    if (window.nowPlaying.length === 0)
      return;
    this.fadePlay(window.nowPlaying.pop().element, 0, this.fadeInDuration);
  }

  setup() {
    return false;
  }
}

/**
 * Global audio queue
 */
window.nowPlaying = [];

/**
 * Defines all scroll waypoints
 */
window.waypoints = Array.prototype.slice.call(textBlocks)
.concat(Array.prototype.slice.call(galleries))
.concat(Array.prototype.slice.call(h1))
.map((e) => { return new Waypoint(e, e.getBoundingClientRect().top); });

// Add panorama waypoints
const panowaypoints = Array.prototype.slice.call(panos)
.map((e) => { return new Panorama(e, e.getBoundingClientRect().top); })
// Add audio start waypoints
const audioStartwaypoints = Array.prototype.slice.call(audiosStart)
.map((e) => { return new AudioStart(e, e.getBoundingClientRect().top); })
// Add audio end waypoints
const audioEndwaypoints = Array.prototype.slice.call(audiosEnd)
.map((e) => { return new AudioEnd(e, e.getBoundingClientRect().top); })

window.waypoints = window.waypoints.concat(panowaypoints)
.concat(audioStartwaypoints)
.concat(audioEndwaypoints);

if (debug)
  console.log("Waypoints: " + window.waypoints.length)

/**
 * Scroll event listener
 */
const scrollListener = function() {
  if (waypoints.length == 0) {
    window.removeEventListener("scroll", scrollListener);
    window.removeEventListener("load", scrollListener);
    return;
  }
  for (i = 0; i < waypoints.length; ++i) {
    if (isScrolledIntoView(waypoints[i].element, scrollOffset)) {
      waypoints.splice(i, 1)[0].animate();
      waypoints = waypoints.filter((e) => { 
        if (e.element.getBoundingClientRect().top < 0) {
          e.animate();
          return false;
        }
        return true;
      });
      return;
    }
  }
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