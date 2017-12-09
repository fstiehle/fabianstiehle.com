/**
 * Helper: Array peek
 */
Array.prototype.peek = function() {
  return this[this.length-1];
}

/**
 * Delete and return element from index
 * @param {*int} index 
 */
Array.prototype.remove = function(index) {
  return waypoints.splice(index, 1)[0]
}

/**
 * From: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/math.random
 * @param min
 * @param max
 */
Math.getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * From: https://gist.github.com/kerimdzhanov/7529623
 * @param min
 * @param max
 */
Math.getRandomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Converts from degrees to radians.+
 * From: http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/
 * @param degrees 
 */
Math.toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};

/**
 * Helper from: https://gist.github.com/andjosh/6764939
 * @param t current time
 * @param b start value
 * @param c change in value
 * @param d duration
 */
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

/**
 * Get DOM elements from String
 * @param tag ".class" | "#id" | "tag" 
 */
export const getDomElements = function(tag) {
  let domElements = [];
  switch(tag[0]) {
    case ".":
      domElements = document.getElementsByClassName(tag.slice(1));
      break;
    case "#":
      domElements = document.getElementById(tag.slice(1));
      break;
    default:
      domElements = document.getElementsByTagName(tag);
  }
  return Array.prototype.slice.call(domElements);    
}