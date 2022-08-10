var currentDay = document.querySelector("#currentDay");
var currentDate = moment().format('dddd, MMMM Do');
currentDay.textContent = currentDate;

var schedule = {};

var loadSchedule = function () {
    schedule = JSON.parse(localStorage.getItem("schedule"));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!schedule) {
        schedule = {
            AM9: null,
            AM10: null,
            AM11: null, PM12: null, PM1: null, PM2: null, PM3: null, PM4: null, PM5: null
        };
    }
    console.log(schedule);

    // loop over object properties
    // $.each(tasks, function (list, arr) {
    //     console.log(list, arr);
    //     // then loop over sub-array
    //     Array.from(arr).forEach(task => {
    //         createSchedule();
    //     });
    // });
};

var saveSchedule = function () {
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

var auditSchedule = function (scheduleEl) {
    var inputEl = $(scheduleEl).find("input");
    console.log(inputEl);
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
    }else if(moment().isSame(currentTime)){
        inputEl.addClass("present");
    } else if (moment().isBefore(currentTime)) {
        //Math.abs(moment().diff(time, "days")) <= 2
        inputEl.addClass("future");
    }
};

// save button was clicked
// $(".btn-save").click(function () {
//     // get form values
//     var workText = $("#modalTaskDescription").val();//need to check event target
//     var workTime = 12;//get id?

//     if (workText) {
//         createSchedule(workTime, workText);//CSS?

//         // save in schedule array
//         schedule.push({
//             time: workTime,
//             work: workText
//         });

//         saveSchedule();
//     }
// });

//Check every minute, so can check if the hour has passed
var auditInterval = function () {
    $(".input-group").each(function(index, el) {
      auditSchedule(el);
    });
}

loadSchedule();
auditInterval();
setInterval(auditInterval, 10000);//(1000 * 60)