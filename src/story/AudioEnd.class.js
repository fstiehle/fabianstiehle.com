import AudioStart from "./AudioStart.class.js"

/**
 * Waypoint where to end playing sound
 */
export default class AudioEnd extends AudioStart {
  
    constructor(element) {
      super(element);
      this.fadeOutDuration = this.fadeInDuration * 0.5;
    }
  
    animate() {
      if (window.nowPlaying.length === 0)
        return;
      audio = window.nowPlaying.pop().element
      this.fadePlay(audio, 0, this.fadeInDuration).then(() => audio.pause());
    }
  
    setUp() {
      return false;
    }
  }
  