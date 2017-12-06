import { getDomElements } from "../helper.js"

/**
 * Represents a scroll waypoint
 */
export default class Waypoint {
  constructor(element) {  
    if (element === undefined)
      return false;
    this.element = element;
    this.setUp();
  }

  animate() {
    this.element.classList.add("animate");
  }

  setUp() {
    this.element.classList.add("hidden");
  }

  /**
   * Return multiple waypoints from String
   * @param {*String} tag ".class" | "#id" | "tag" 
   */
  static waypointFactory(tag) {
    const elements = getDomElements(tag);
    if (elements === undefined || elements.length === 0)
      return false;
    return elements.map((e) => { return new this(e); })
  }
}