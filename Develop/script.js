var currentDay = document.querySelector("#currentDay");
var currentDate = moment().format('dddd, MMMM Do');
currentDay.textContent = currentDate;

var schedule = [];

var createSchedule = function (time, text) {
    var specficInputEl;

    //find the right input box to put in the text
    $(".input-group").each(function (index, el) {
        var elTime = $(el)
            .find("span")
            .text()
            .trim();
        if (elTime === time) {
            specficInputEl = el;
        }
    });

    specficInputEl.querySelector('input').value = text;

    // check due date
    auditSchedule(specficInputEl);
};

var loadSchedule = function () {
    newSchedule = JSON.parse(localStorage.getItem("schedule"));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!newSchedule) {
        newSchedule = [];
    }
    console.log(newSchedule);

    for (var i = 0; i < newSchedule.length; i++) {
        schedule.push(newSchedule[i]);
        createSchedule(newSchedule[i].time, newSchedule[i].work);
    }
};

var saveSchedule = function () {
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

var auditSchedule = function (scheduleEl) {
    var inputEl = $(scheduleEl).find("input");

    // get date from Schedule element
    var time = $(scheduleEl)
        .find("span")
        .text()
        .trim();

    // convert to moment object at 5:00pm
    //moment().subtract(13, "hours");
    var currentTime = moment(time, 'Ha');
    // var currentTime = moment().subtract(13, "hours");
    // console.log(currentTime);
    // remove any old classes from element
    // $(scheduleEl).removeClass("list-group-item-warning list-group-item-danger");

    // apply new class if task is near/over due date
    if (moment().isAfter(currentTime)) {
        inputEl.addClass("past");
        console.log("after");
    } else if (moment().isSame(currentTime)) {
        inputEl.addClass("present");
    } else if (moment().isBefore(currentTime)) {
        //Math.abs(moment().diff(time, "days")) <= 2
        inputEl.addClass("future");
    }
};

// input was clicked
// $(".input-group").on("click", "input", function () {
//     // get current text
//     var newText = $(this).text().trim();

//     // create new input element
//     var textInput = $("<input>").attr("type", "text").addClass("form-control").val(newText);

//     $(this).replaceWith(textInput);

//     // automatically bring up the calendar
//     textInput.trigger("focus");
//   });

// value of due date was changed
// $(".input-group").on("blur", "input[type='text']", function () {
// get current value of input
// var text = $(this).val();

// get time
// var time = $(this)
//     .closest(".input-group").find("span")
//     .text()
//     .trim();
// console.log(time);
//   var index = $(this)
//     .closest(".list-group-item")
//     .index();

// update task in array and re-save to localstorage
//   tasks[status][index].text = text;
//   saveTasks();

//change value of input

// });

// save button was clicked
$(".saveBtn").click(function () {
    
    // get new Text
    var workText = $(this)
        .closest(".input-group").find('input').val();
    var workTime = $(this)
        .closest(".input-group").find("span")
        .text()
        .trim();
    
    //avoid saving the same obj multiple times
    var oldText = schedule.filter(el => el.time === workTime);
    if (oldText.length != 0){
        oldText = oldText[0].work;
    }

    if (oldText != workText) {
        createSchedule(workTime, workText); 
        // save in schedule array
        schedule.push({
            time: workTime,
            work: workText
        });

        saveSchedule();
    }
});

//Check every minute, so can check if the hour has passed
var auditInterval = function () {
    $(".input-group").each(function (index, el) {
        auditSchedule(el);
    });
}

loadSchedule();
auditInterval();
// setInterval(auditInterval, 10000);//(1000 * 60)