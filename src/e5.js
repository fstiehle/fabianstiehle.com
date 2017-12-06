import "./helper.js"
import Waypoint from "./story/Waypoint.class.js"
import AudioStart from "./story/AudioStart.class.js"
import AudioEnd from "./story/AudioEnd.class.js"
import Panorama from "./story/Panorama.class.js"
import Video from "./story/Video.class.js"

((window) => { //IIF

if (window.interactive !== undefined && window.interactive === false)
  return;
  
window.debug = true;

/**
 * Delay triggering the scroll waypoint
 */
const scrollOffset = 65;

/**
 * Defines all scroll waypoints
 */
window.waypoints = []

/**
 * Global audio queue
 */
window.nowPlaying = [];

// Add simple waypoints
["p",
"footer",
"blockquote",
".text",
".map",
".full-width",
".icons",
".pause",
".gallery"].forEach((e) => {
  const waypoint = Waypoint.waypointFactory(e);
  if (waypoint)
    waypoints = waypoints.concat(waypoint);
});
  
// Add specialised waypoints
[Panorama.waypointFactory(".pano"),
AudioStart.waypointFactory("audio"),
AudioEnd.waypointFactory(".audio_end"),
Video.waypointFactory("video")].forEach((w) => {
  if (w)
    waypoints = waypoints.concat(w);
});

if (debug)
  console.log("Waypoints");
  waypoints.forEach((e) => console.log(e));

/**
 * Scroll event listener
 */
const scrollListener = function() {
  if (waypoints.length === 0) {
    window.removeEventListener("scroll", scrollListener);
    window.removeEventListener("load", scrollListener);
    return;
  }
  for (let i = 0; i < waypoints.length; ++i) {
    if (isScrolledIntoView(waypoints[i].element, scrollOffset)) {
      waypoints.splice(i, 1)[0].animate(); // ????
      waypoints = waypoints.filter((e) => {
        if (e.element.getBoundingClientRect().top < 0) {
          e.animate();
          return false;
        }
        return true;
      });
      break;
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

})(window);