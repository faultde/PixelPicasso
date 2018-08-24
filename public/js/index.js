//INDEX CODE HERE
document.body.onload = addElement(400);

// color variables
let red = "#ff4444";
let blue = "#4285F4";
let green = "#00C851";
let yellow = "#ffbb33";
let colorArr = ["red","blue","green","yellow"]

// Editor, Archive, and Grid Variables
const editorGrid = $("#editorGrid");
let editorBlocks = editorGrid.children();
const archive = $("#archive");
archive.hide();

  // Create div grid for Editor
function addElement(divNum) {
  for (i = 0; i < divNum; i++) {
    // create a new div element
    var newDiv = document.createElement("div");
    //set class and color
    newDiv.className = "block";
    newDiv.dataset.color = "white";
    $(newDiv).addClass("border");
    // add to editor container
    $(newDiv).appendTo("#editorGrid");
  }
}


//color function remove if possible?
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

  // Random Color Funtion
function random_bg_color() {
  editorGrid.children().each(function () {
    var bgColor = colorArr[Math.floor(Math.random()*colorArr.length)];
  
    $(this).removeClass("red green blue yellow white black");
    $(this).addClass(bgColor);
     $(this).attr("data-color", color2Hex(bgColor));
    
});
}

// drawing function// add paint option
function draw(color) {
  $(document).on("click", ".block", function() {
    $(this).removeClass("red green blue yellow white black");
    $(this).addClass(color);
    color2Hex(color);
    $(this).attr("data-color", color2Hex(color));
  });
}

// reset function
function reset() {
  editorBlocks = editorGrid.children();
  editorBlocks.removeClass("red green blue yellow white black");
  editorBlocks.addClass('white');
  editorBlocks.attr("data-color", "white");
}

// toggle border/grid
function toggleBorder() {
 editorBlocks = editorGrid.children();
 editorBlocks.toggleClass('border');
}

//save div clone
function cloneDiv() {
  let clonedDiv =  editorGrid.children().clone(true, true);
  archiveCard(clonedDiv);
}

//Create card in archive
function archiveCard(clonedDiv) {
  let imageTitle = $("#imageTitle").val();
  if (!imageTitle) {
    imageTitle = "Pretty Picture";
  }

  let newCard = $(
    "<div class='currentArchive col-sm-6'>" +
      "<div class='card mt-2'>" +
      "<div class='card-body'>" +
      "<h5 class='card-title'>" +
      imageTitle +
      "</h5>" +
      "<div class='archive-body'></div>" +
      "<button id='edit' class='m-1 btn btn-success text-white'>Edit</button>" +
      "<button type='button' id='delete' class=' m-1 btn btn-danger text-white'>Delete</button>" +
      "</div>" +
      "</div>"
  );
  $("#archive").append(newCard);
  $(".archive-body")
    .not(':has(".block")')
    .prepend(clonedDiv);

  $("#saved")
    .toggleClass("activeTab")
    .siblings()
    .removeClass("activeTab");

  archiveClick();
}

  // Create Grid Size
function gridSize(size) {
  if (size == 100) {
    editorGrid
      .children()
      .remove();
    addElement(size);
    editorGrid
      .children()
      .css("width", "10%");
    editorGrid
      .children()
      .css("height", "10%");
  } else {
    editorGrid
      .children()
      .remove();
    addElement(size);
    editorGrid
      .children()
      .css("width", "5%");
    editorGrid
      .children()
      .css("height", "5%");
  }
}

function editorClick(){
  editorGrid.show();
  $(".gridSize").show();
  $(".tabHeader").text("Pixel Editor");
  $("#clear-grid-save").show();
  archive.hide();
    $("#editor")
    .addClass("activeTab")
    .siblings()
    .removeClass("activeTab");
}

function archiveClick(){
  editorGrid.hide();
  $(".gridSize").hide();
  $(".tabHeader").text("Archive");
  $("#clear-grid-save").hide();
  archive.show();
    $("#saved")
    .addClass("activeTab")
    .siblings()
    .removeClass("activeTab");

}

// ALL BUTTON CONTROLS //
  //COLOR NAV ACTIVE
$(".btn").click(function() {
  $(this)
    .addClass("active")
    .siblings()
    .removeClass("active");
});

  // Color Selection
$(".draw").click(function() {
  $("#white").removeClass("btn-outline-active");
  color = this.id;

  draw(this.id);

  if (this.id == "white") {
    $("#white").addClass("btn-outline-active");
  }
});
  // Grid Size
$(".gridSize").click(function() {
  let size = $(this).attr("data-size");
  gridSize(size);
});
  // Archive
$("#save").click(function() {
  cloneDiv();
});
  // Clear 
$("#reset").click(function() {
  reset();
});
  // Grid
$("#grid").click(function() {
  toggleBorder();
});
  // Random
$('#random').click(function(){
  random_bg_color()
});
  // Delete
$( document ).on( 'click', "#delete", function(){
  this.closest('.currentArchive').remove();
}); 
  // Edit
$( document ).on( 'click', "#edit", function(){
 let archiveClone = $(this).closest(".currentArchive").find(".archive-body").children().clone();
 editorGrid.children().remove();
 archiveClone.appendTo(editorGrid);
 editorClick();
}); 


// Archive TAB
$("#saved").click(function() {
  archiveClick();

});
// Editor TAB
$("#editor").click(function() {
  editorClick();

});
