//HEREHREHRE
//INDEX CODE HERE
document.body.onload = addElement(400);

let border = true;
//color Variables

let red = "#ff4444";
let blue = "#4285F4";
let green = "#00C851";
let yellow = "#ffbb33";
let colorArr = ["red","blue","green","yellow"]

function addElement(divNum) {
  for (i = 0; i < divNum; i++) {
    // create a new div element
    var newDiv = document.createElement("div");
    // give it content to allow spacing
    newContent = document.createTextNode("");
    newDiv.appendChild(newContent);
    //set class and color
    newDiv.className = "block";
    newDiv.dataset.color = "white";

    // add to editor container
    $(newDiv).appendTo("#capture");
  }
}




//color function
function color2Hex(a) {
  switch (a) {
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
}

// drawing function// add paint option
function draw(color) {
  console.log("text");
  $(document).on("click", ".block", function() {
    $(this).removeClass("red green blue yellow white black");
    $(this).addClass(color);
    color2Hex(color);
    $(this).attr("data-color", color2Hex(color));
  });
}
// reset function
function reset() {
  $("#capture").children().removeClass("red green blue yellow white black");
  $("#capture").children().addClass('white');
  $("#capture").children().attr("data-color", "white");
}

// toggle border/grid
function toggleBorder() {
  let editorGrid = $("#capture").children();
  if (border) {
    border = false;
    editorGrid.css("border", "none");
  } else {
    border = true;
    editorGrid.css("border", "1px solid black");
  }
}

//save div clone

function cloneDiv() {
  let clonedDiv = $(".flex-container")
    .children()
    .clone(true, true);
  archiveCard(clonedDiv);
}

//save img card in archive
function archiveCard(clonedDiv) {
  let imageTitle = $("#imageTitle").val();
  if (!imageTitle) {
    imageTitle = "Pretty Picture";
  }

  let newCard = $(
    "<div class='deleteMe col-sm-6'>" +
      "<div class='card mt-2'>" +
      "<div class='card-body'>" +
      "<h5 class='card-title'>" +
      imageTitle +
      "</h5>" +
      "<p class='archive-body'></p>" +
      "<button id='edit' class='m-1 btn btn-success text-white'>Edit</button>" +
      "<button type='button' id='delete' class=' m-1 btn btn-danger text-white'>Delete</button>" +
      "</div>" +
      "</div>"
  );
  $("#archive").append(newCard);
  $(".archive-body")
    .not(':has(".block")')
    .prepend(clonedDiv);
  // $('.archive-body').prepend(clonedDiv);

  $("#saved")
    .toggleClass("activeTab")
    .siblings()
    .removeClass("activeTab");

  $(".flex-container").hide();
  $(".gridSize").hide();
  $(".tabHeader").text("Archive");
  $("#clear-grid-save").hide();
  archive.show();
}

function gridSize(size) {
  if (size == 100) {
    console.log(size);
    $("#capture")
      .children()
      .remove();
    addElement(size);
    $("#capture")
      .children()
      .css("width", "10%");
    $("#capture")
      .children()
      .css("height", "10%");
  } else {
    console.log(size);
    $("#capture")
      .children()
      .remove();
    addElement(size);
    $("#capture")
      .children()
      .css("width", "5%");
    $("#capture")
      .children()
      .css("height", "5%");
  }
}
// BUTTON CONTROLS

$(".draw").click(function() {
  $("#white").removeClass("btn-outline-active");
  color = this.id;
  draw(this.id);

  if (this.id == "white") {
    $("#white").addClass("btn-outline-active");
  }
});

$("#save").click(function() {
  cloneDiv();
});

$("#reset").click(function() {
  reset();
});

$("#grid").click(function() {
  toggleBorder();
});

//TAB CONTROLS
let archive = $("#archive");
archive.hide();

$(".tab").click(function() {
  $(this)
    .toggleClass("activeTab")
    .siblings()
    .removeClass("activeTab");
});

//Archive/Save
$("#saved").click(function() {
  $(".flex-container").hide();
  $(".gridSize").hide();
  $(".tabHeader").text("Archive");
  $("#clear-grid-save").hide();
  archive.show();
});
//Editor
$("#editor").click(function() {
  $(".flex-container").show();
  $(".gridSize").show();
  $(".tabHeader").text("Pixel Editor");
  $("#clear-grid-save").show();
  archive.hide();
});

/////

$(".btn").click(function() {
  $(this)
    .toggleClass("active")
    .siblings()
    .removeClass("active");
});

$(".gridSize").click(function() {
  let size = $(this).attr("data-size");
  gridSize(size);
});

$( document ).on( 'click', "#delete", function(){
  this.closest('.deleteMe').remove();
}); 

function random_bg_color() {
  $('#capture').children().each(function () {
    var bgColor = colorArr[Math.floor(Math.random()*colorArr.length)];
    
    // var x = Math.floor(Math.random() * 256);
    // var y = Math.floor(Math.random() * 256);
    // var z = Math.floor(Math.random() * 256);
    // var bgColor = "rgb(" + x + "," + y + "," + z + ")";

    $(this).removeClass("red green blue yellow white black");
    $(this).addClass(bgColor);
     $(this).attr("data-color", color2Hex(bgColor));
    
});
}

$('#random').click(function(){
  random_bg_color()
});