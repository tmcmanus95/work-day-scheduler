//Wraps the code in a funcion that will load after the page is finished loading.
$(document).ready(function () {
  $(".saveBtn").on("click", function () {
    //Gets the id of the parent of the block clicked on.
    var hour = $(this).parent().attr("id");

    //Gets the text written in the sibling of the blcok clicked.
    var toDo = $(this).siblings(".description").val();

    //Puts those values in local storage.
    localStorage.setItem(hour, toDo);
  });

  //Function that loops through the
  function updateClasses() {
    //Gets the current time via dayjs
    var now = dayjs().hour();

    //Creates a loop using .each
    $(".time-block").each(function () {
      //Gets the id of the block. and finds the number written in it using .split
      var hourOfBlock = parseInt($(this).attr("id").split("-")[1]);

      //Compares the two numbers and sets / removes a class to the block accordingly.
      if (hourOfBlock < now) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
      } else if (hourOfBlock === now) {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }
  //Calls the function and sets an interval so that it is updated every 15 minutes.
  updateClasses();
  setInterval(updateClasses, 15000);

  //Checks local storage and sets the data to the respective block if applicable.
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));

  //Gets the current day and time using dayjs and sets it in the header.
  $("#currentDay").text(dayjs().format("dddd, MMM D, YYYY"));
});
