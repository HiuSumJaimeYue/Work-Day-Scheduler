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

// save button was clicked
// $(".btn-save").click(function () {
//     // get form values
//     var workText = $("#modalTaskDescription").val();//need to check event target
//     var workTime = 12;//get id?

//     if (workText) {
//         createSchedule(workText);//CSS?

//         // save in schedule array
//         schedule.push({
//             time: workTime,
//             work: workText
//         });

//         saveSchedule();
//     }
// });

//Check every minute, so can check if the hour has passed
// setInterval(function () {
//     $(".time-block").each(function(index, el) {
//       auditTask(el);
//     });
//   }, (1000 * 60));

loadSchedule();