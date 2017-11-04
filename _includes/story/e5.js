
/**
 * Represents scroll waypoint
 */
class Waypoint {
  constructor(element) {
    this.element = element;
    this.y = element.getBoundingClientRect().top;
    this.hide();
  }

  animate() {
    this.element.classList.add("animate");
  }

  hide() {
    this.element.classList.add("hidden");
  }
}

/**
 * Contains all scroll waypoints
 */
const waypoints = Array.prototype.slice.call(document.getElementsByTagName("p"))
  .concat(Array.prototype.slice.call(document.getElementsByClassName("gallery")))
  .concat(Array.prototype.slice.call(document.getElementsByClassName("pano")))
  .map((e) => {
    return new Waypoint(e);
  })
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
    if (!isScrolledIntoView(waypoints.peek().element))
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
const isScrolledIntoView = function(el) {
  let elemTop = el.getBoundingClientRect().top;
  let elemBottom = el.getBoundingClientRect().bottom;
  let offset = 30;
  return elemTop + offset < window.innerHeight && elemBottom >= 0;
};

/**
 * Helper: array peek
 */
Array.prototype.peek = function() {
  return this[this.length-1];
}