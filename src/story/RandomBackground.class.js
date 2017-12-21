import "../helper.js"

/**
 * Draws crazy random line background on canvas
 * appends to element
 */
export default class RandomBackground {

  constructor(element, id) {
    this.canvas = document.createElement("canvas");
    if (!this.canvas.getContext) {
      return;
    }
    this.canvas.id = "canvas" + id;    
    this.layer = element.appendChild(this.canvas);  
    this.canvas.width = this.layer.clientWidth;
    this.canvas.height = this.layer.clientHeight;  
    this.offset = 10; 
    this.draw();
  }

  draw() {
    const ctx = this.canvas.getContext("2d");
    const color = "#E4FFE1";
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.shadowBlur = 6;
    ctx.shadowColor = color;

    if (window.debug) {
      //ctx.fillRect(width/2 - 10, height/2 - 10, 10, 10); // center
      console.log(this.canvas.id + ": " + this.canvas.width + ", " + this.canvas.height);
    }
   
    ctx.beginPath();
    this.drawRecTail(ctx, this.offset, this.canvas.height - this.offset);
    ctx.stroke(); 
    ctx.closePath();
  }

  /**
   * Recursively draw /\/\...
   * Return when drawing reaches max width of canvas
   * @param {CanvasRenderingContext2D} ctx 2D Canvas context
   * @param {number} x x-coordinate
   * @param {number} y y-coordinate
   */
  drawRecTail(ctx, x, y) {
    const angle = Math.getRandomInt(30, 60);
    const offsetHeight = Math.getRandomInt(0, 60);
    const length = this.canvas.height - offsetHeight;

    // points for /
    let newPoint = this.getPointsFromAngle(x, y, angle, length);      
    if (newPoint[0] >= this.canvas.width)
      return;

    ctx.moveTo(x, y);
    ctx.lineTo(newPoint[0], newPoint[1]);

    // points for \
    const offsetPoint = this.getPointsFromAngle(newPoint[0], newPoint[1], -angle, length - offsetHeight);
    newPoint = this.getPointsFromAngle(newPoint[0], newPoint[1], -angle, length);
    if (newPoint[0] >= this.canvas.width)
      return; 

    ctx.lineTo(newPoint[0], newPoint[1]);    
    this.drawRecTail(ctx, offsetPoint[0], offsetPoint[1]);
  }

  /**
   * Get new points from start(x,y) angle + length
   * @param {number} x 
   * @param {number} y 
   * @param {number} angle 
   * @param {number} length
   * @returns {number[]} Array of new points
   */
  getPointsFromAngle(x, y, angle, length) {
    // Math.round -> float's are bad for performance    
    const adjacentCathetus = Math.round(length * Math.cos(Math.toRadians(angle)));
    const oppositeCathetus = Math.round(length * Math.sin(Math.toRadians(angle)));
    return [x + adjacentCathetus, y - oppositeCathetus < this.offset ? this.offset : y - oppositeCathetus];
  }

}