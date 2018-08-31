// create objects that holds all the data for all the shapes i have created

//parent object with all the common attributes and functions
function Shape(xpos, ypos, color) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.color = color;

  this.setColor = (color) => {
    this.color = color;
  }

}

//All the attributes of the circles and how it will be drawn into the canvas
function Circle(xpos, ypos, radius, color = null){
  Shape.call(this, xpos, ypos, color);
  this.radius = radius;

  this.draw = () => {
    var canvas = document.getElementById("myPicture");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(this.xpos, this.ypos, this.radius, 0, 2*Math.PI);
    if(this.color) {
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    ctx.stroke();
  }
}

function Square(xpos, ypos, width, height, color = null) {
  Shape.call(this, xpos, ypos, color)
  this.width = width;
  this.height = height;

  this.draw = () => {
    var canvas = document.getElementById("myPicture");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(xpos, ypos, width, height);
    if(this.color) {
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    ctx.stroke();
  }
}
