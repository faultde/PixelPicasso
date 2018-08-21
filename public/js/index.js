document.body.onload = addElement(399);


let border = true;
//color Variables

let red = "#ff4444";
let blue = "#4285F4";
let green = "#00C851";
let yellow = "#ffbb33";
const html2canvas = require("html2canvas");

function addElement (divNum) { 
  for (i = 0; i < divNum; i++){
  // create a new div element 
  var newDiv = document.createElement("div"); 
  // give it content to allow spacing 
   newContent = document.createTextNode("");
   newDiv.appendChild(newContent);  
  //set class and color
   newDiv.className = "block";
   newDiv.dataset.color = "white";
    
  // add to canvas container
  $(".start").after(newDiv);


 
}}
//color function
function color2Hex(a){
  switch(a) {
    case "red":
       color = red;
       return color;
    case "blue":
       color = blue;
       return color;
    case "green":
       color = green;
       return color;
    case "yellow":
       color = yellow;
       return color;
    case "black":
       color = "black";
       return color;
    case "white":
       color = "white";
       return color;
  }
};

$(".btn").click(function(){
   $(this).toggleClass('active').siblings().removeClass('active');
});

// drawing function
function draw(color) {
  console.log("text")
  $(document).on("click", ".block", function() {
    $(this).removeClass('red green blue yellow white black')
    $(this).addClass(color);
    color2Hex(color);
    $(this).attr('data-color', color2Hex(color));
    if(!border){
      $(this).css("border", "1px solid " + $(this).attr('data-color'));
    }
  });
}
// reset function
function reset(){
  $(".block").removeClass('red green blue yellow white black');
}

// toggle border
function toggleBorder(){
  if(border){
    border = false;

    $('div[class*="block"]').each(function(){
      //console.log($(this).attr('data-color'));
      
      $(this).css("border", "1px solid " + $(this).attr('data-color'));
    });

  }else{
    border = true;
    $(".block").css('border', "1px solid black");
  }
}

function addActive(){
  this.addClass("active");
}

function saveImage(){
  html2canvas(document.querySelector("#capture")).then(function(canvas) {
  document.body.appendChild(canvas);
   });
 }

 $('.draw').click(function(){
   console.log(this.id)
   color = this.id;
   draw(color);
 })

  $('#save').click(function(){
   saveImage();
 })