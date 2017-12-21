import { setTimeout } from "timers";
import Waypoint from "./Waypoint.class";

/**
 * Animates smiley element
 */
export default class Smiley extends Waypoint {

  constructor(element) {
    super(element);
  }

  animate() {
    if (this.smileys.innerHTML <= 0)
      return false;
    const smileys = this.smileys.innerHTML.split(",");
    this.element.classList.add("animate");
    smileys.forEach((smiley, index) => {
      setTimeout(() => {
        this.smileys.innerHTML = smiley
      }, 800 * index);
    });
  }

  setUp() {
    super.setUp();
    this.smileys = this.element.querySelector(".smiley");
  }

}