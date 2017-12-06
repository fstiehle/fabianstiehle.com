import Waypoint from "./Waypoint.class.js"

/**
 * Waypoint where to start playing sound
 */
export default class AudioStart extends Waypoint {

  constructor(element) {
    super(element);
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