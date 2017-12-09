import "./helper.js"
import Waypoint from "./story/Waypoint.class.js"
import AudioStart from "./story/AudioStart.class.js"
import AudioEnd from "./story/AudioEnd.class.js"
import Panorama from "./story/Panorama.class.js"
import Video from "./story/Video.class.js"
import RandomBackground from "./story/RandomBackground.class.js"
import { getDomElements } from "./helper.js";

((window) => { //IIF

  if (window.interactive !== undefined && window.interactive === false)
    return;
    
  window.debug = true;

  /**
   * Delay triggering the scroll waypoint
   */
  const scrollOffset = 65;

  /**
   * Holds all scroll waypoints
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
        waypoints.remove(i).animate();
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

  // Register event listener
  window.addEventListener("scroll", scrollListener);
  window.addEventListener("load", scrollListener);

  /**
   * Checks if el in viewport
   * Modified from https://stackoverflow.com/a/22480938
   * @param {DOMElement} el Element to be checked
   * @param offset Delay triggering the scroll waypoint
   */
  const isScrolledIntoView = function(el, offset) {
    const elemTop = el.getBoundingClientRect().top;
    const elemBottom = el.getBoundingClientRect().bottom;
    return elemTop + offset < window.innerHeight && elemBottom >= 0;
  };

  // Add random p backgrounds
  getDomElements("blockquote").concat(getDomElements("p")).concat(getDomElements(".pause"))
    .forEach((e, i) => new RandomBackground(e, i));

})(window);