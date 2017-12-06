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