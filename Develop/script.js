var currentDay = document.querySelector("#currentDay");
var currentDate = moment().format('dddd, MMMM Do');
currentDay.textContent = currentDate;
