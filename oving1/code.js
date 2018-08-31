

$("document").ready(function(){

  var canvasBackground = "#f3f3f3";
  // Just initiating the canvas
  drawCanvasBackground();
  // Object with all the shapes in the canvas
  let shapes = {circles: [], squares: []};

  $(".colors").hide();
  $(".shapes").hide();
  $(".documentation").hide();
// Empty the canvas.
  function clearCanvas(){
    canvas = document.getElementById("myPicture");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

// A simple helper function to generate a random color in hexadecimal
  function getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// Draw the canvas background. Will be done before every change to the canvas
// as is has to be redrawn every time a change happens
  function drawCanvasBackground(){
    var canvas = document.getElementById("myPicture");
    $("canvas").css('border','1px');
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, 600, 450);
    ctx.fillStyle = canvasBackground;
    ctx.fill();
    ctx.stroke();
  }



// Sliding down the div containing all the shapes you can add. Will go up once you click it again
  $("#addShapes").click(function(){
    if ($(".shapes").is(':visible')){
      $("#addShapes").css('background-color','red')
      $("#addShapes").val("Add shapes");
      $("#addShapes").css('background-color','');
      $(".shapes").slideUp();
    }
    else if ($(".shapes").is(':hidden')) {
      $("#addShapes").css('background-color', '#ededed');
      $(".shapes").slideDown();
    }
  });


// Same as above, but will happen with all the filters you can add.
  $("#changeColors").click(function(){
    if ($(".colors").is(':visible')){
      $("#changeColors").css('background-color','');
      $(".colors").slideUp();
    }
    else if ($(".colors").is(':hidden')) {
      $("#changeColors").css('background-color', '#ededed');
      $(".colors").slideDown();
    }
  });

// Hide the canvas, and show the documentation. If you click again, the opposite will happen
  $("#documentation").click(function(){
    if ($(".documentation").is(':hidden')){
      $(".picture").hide();
      $(".documentation").show();
      $("#documentation").css('background-color','#ededed');
    }
    else{
      $(".picture").show();
      $(".documentation").hide();
      $("#documentation").css('background-color','');
    }
  })



// All the logic concerning the add circles button. I have an object containing all the shapes in my canvas.
// Once i remove circles they will be deleted from the object.
  $("#circles").click(function(){
    if($(this).hasClass("addCircles")){
      for(i = 0; i < 8; i++) {
        ypos = 50 * Math.cos(i * (1/4) * Math.PI) + 300;
        xpos = 50 * Math.sin(i * (1/4) * Math.PI) + 225;
        radius = 50;
        startAngle = 0;
        endAngle = 2 * Math.PI;
        circle = new Circle(ypos, xpos, radius);
        shapes.circles.push(circle);
        circle.draw();
      }
      $("#circles").html("Remove circles");
      $("#circles").attr('class','removeCircles');

    }
    else{
      clearCanvas();
      drawCanvasBackground();
      shapes.circles = [];
      Object.values(shapes).forEach((shape) =>
        shape.forEach(figure => {figure.draw()
      }));

      $("#circles").html("Add circles");
      $("#circles").attr('class', 'addCircles');
    }
  });

// Same as with the circles.
  $("#squares").click(function(){
    if($(this).hasClass("addSquares")){
      for(i = 0; i < 4; i++){
        xpos1 = 0 + 25 * i;
        xpos2 = 575 - 25 * i;
        xpos3 = 200 + 20 * i;
        ypos1 = 125 + 20 * i;
        ypos2 = 425 - 25 * i;
        height = 200 - 40 * i;
        width = 25;

        square1 = new Square(xpos1, ypos1, width, height);
        square1.draw();
        shapes.squares.push(square1);
        square2 = new Square(xpos2, ypos1, width, height);
        square2.draw();
        shapes.squares.push(square2);
        square3 = new Square(xpos3, xpos1, height, width);
        square3.draw();
        shapes.squares.push(square3);
        square4 = new Square(xpos3, ypos2, height, width);
        square4.draw();
        shapes.squares.push(square4);
      }
      $("#squares").html("Remove squares");
      $("#squares").attr('class','removeSquares');
    }
    else{
      clearCanvas();
      drawCanvasBackground();
      shapes.squares = [];
      Object.values(shapes).forEach((shape) =>
        shape.forEach(figure => {figure.draw()
      }));

      $("#squares").html("Add squares");
      $("#squares").attr('class', 'addSquares');
    }
  });

// Get random colors to all the shapes in the canvas
  $("#randomColors").click(function() {
    clearCanvas();
    drawCanvasBackground();
    Object.values(shapes).forEach(shape =>
      shape.forEach(figure => {
        figure.setColor(getRandomColor());
        figure.draw();
      }));
  });
  function changeBackground(){
  }

// change the background color of the canvac
  $("#changeBackground").click(function() {
    clearCanvas();
    canvasBackground = getRandomColor();
    drawCanvasBackground();
    Object.values(shapes).forEach(shape =>
      shape.forEach(figure => figure.draw()));
  })

// change the color of all the elements in the canvas
  $("#chooseColors").change(function(){
    clearCanvas();
    drawCanvasBackground();
    Object.values(shapes).forEach(shape =>
    shape.forEach(figure => {
      figure.setColor($(this).val())
      figure.draw();
    }));
  })


});
