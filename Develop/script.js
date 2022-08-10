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

    // check schedule and time
    auditSchedule(specficInputEl);
};

var loadSchedule = function () {
    newSchedule = JSON.parse(localStorage.getItem("schedule"));

    // if nothing in localStorage, create a new array to keep track
    if (!newSchedule) {
        newSchedule = [];
    }

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

    var currentTime = moment(time, 'HA');
    var presentTime = moment().format("HA");

    // apply new class if schedule is present, past or future
    if (presentTime === time) {
        inputEl.addClass("present");
    } else if (moment().isAfter(currentTime)) {
        inputEl.addClass("past");
    } else if (moment().isBefore(currentTime)) {
        inputEl.addClass("future");
    }
};

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
    if (oldText.length != 0) {
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
setInterval(auditInterval, (1000 * 60));