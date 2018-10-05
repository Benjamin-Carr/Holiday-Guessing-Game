/* global $ */
$(document).ready(function() {
    //will hold the dates for all the holidays
    var dateArray = [];

    //ten random numbers corresponding to locations in dateArray--representing 10 random holidays
    var holidayArray;

    //current location in holidayArray, i.e., the current holiday
    var holidayIndex;

    //array of months to be used as reference
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //url for api interface--fetches all US holidays in 2017
    const url = "https://holidayapi.com/v1/holidays?&key=7f1ed9ac-b8bc-4380-adb9-bdf78e5ace25&year=2017&country=US";
    var currentName;
    var currentMonth;

    //push all the dates returned by the api onto dateArray
    $.getJSON(url, function(data) {
        for (x in data["holidays"]) {
            dateArray.push(x);
        }
    });

    //returns a random integer between 0 and max-1
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    $("#newGameButton").click(function(e) {
        e.preventDefault();
        console.log("click recieved")

        //fill holidayArray with 10 random integers between 0 and dateArray.length
        holidayArray = [];
        for (let i = 0; i < 10; i++) {
            let temp;
            do {
                temp = getRandomInt(dateArray.length);
            }
            while ($.inArray(temp, holidayArray) !== -1);
            holidayArray.push(temp);
            console.log("Added to holidayArray: " + temp);
        }
        console.log("holidayArray length: " + holidayArray.length);

        //set holidayIndex to zero and load the first holiday
        holidayIndex = 0;
        loadCurrentHoliday();
    });

    function loadCurrentHoliday() {
        if (holidayIndex >= 10) {
            alert("You finished all your holidays");
        }
        else {
            $("#holiday-counter").html("Holiday " + String(holidayIndex + 1) + " out of 10");
            $.getJSON(url, function(data) {
                //get name and month for current holiday
                let selector = holidayArray[holidayIndex];
                currentName = data["holidays"][dateArray[selector]][0]["name"];
                currentMonth = monthsArray[dateArray[selector].substr(5, 2) - 1];

                //display current holiday
                $("#holiday-display").html(currentName);

                //log all the information in the console
                console.log("Holiday #" + holidayIndex + " index: " + selector);
                console.log("Holiday #" + holidayIndex + " date: " + dateArray[selector]);
                console.log("Holiday #" + holidayIndex + " name: " + data["holidays"][dateArray[selector]][0]["name"]);
                console.log("Holiday #" + holidayIndex + " month: " + currentMonth);

                //increase index
                holidayIndex++;
                console.log("holidayIndex increased to " + holidayIndex);
            });

        }
    }

    $("#submitButton").click(function(e) {
        e.preventDefault();
        if ($("#monthField").val() != "Select month") {
            var value = $("#monthField").val();
            console.log(value + " " + currentMonth);
            if (value == currentMonth) {
                console.log("same");
                $("#responseToGame").html("Congratulations! " + currentName + " is in " + currentMonth);
                loadCurrentHoliday();
            }
            else {
                $("#responseToGame").html("Incorrect. " + currentName + " is not in " + $("#monthField").val());
                console.log(" -" + value + "- -" + currentMonth + "- ");
            }
            $("#monthField").val("Select month");
        }
        else {
            alert("Select month");
        }
    })
});
