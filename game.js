/* global $ */
var monthGuess = "";
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var ifHard = 0;
var times;
var numbersUsed = [];
var Score=0;
$(document).ready(function() {
    var dateArray = [];
    var url = "https://holidayapi.com/v1/holidays?&key=7f1ed9ac-b8bc-4380-adb9-bdf78e5ace25&year=2017&country=US";
    var HolidayName;
    var HolidayMonth;
    var ifscore=0;

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    $("#newGameButton").click(function(e) {
        Score=0;
        times = 1;
        numbersUsed=[];
        $("#monthField").val("");
        //$("#congrats").style.width="0"
        e.preventDefault();
        console.log("click recieved")
        getNewHoliday();
    });

    function getNewHoliday() {
        ifscore=0;
        if (times > 10) {
            $("#Holiday").html("Score: "+Score);
            alert("You Finished the game press New Game")
        }
        else {
            $("#holiday-counter").html("Holiday " + times + " out of 10");
            if (ifHard == 1) {
                url = "https://holidayapi.com/v1/holidays?&key=7f1ed9ac-b8bc-4380-adb9-bdf78e5ace25&year=2017&country="
            }
            $.getJSON(url, function(data) {
                dateArray=[];
                for (x in data["holidays"]) {
                    dateArray.push(x);
                }
                let randomNum;
                do {
                    randomNum = getRandomInt(dateArray.length);
                } while ($.inArray(randomNum, numbersUsed) !== -1)
                numbersUsed.push(randomNum);
                console.log(data["holidays"][dateArray[randomNum]][0]["name"])
                HolidayName = data["holidays"][dateArray[randomNum]][0]["name"];
                HolidayMonth = months[dateArray[randomNum].substr(5, 2) - 1];
                console.log(HolidayMonth)
                $("#Holiday").html(HolidayName);
            })
        }
    }
    $("#submitButton").click(function(e) {
        e.preventDefault();
        var value = $("#monthField").val();
        console.log(value + " " + HolidayMonth)
        if (value == HolidayMonth) {
            if (ifscore==0)Score++;
            console.log("same")
            $("#responseToGame").html("Congratulations")
           // $("#congrats").style.width = "100%"
            times++;
            console.log(times)
            getNewHoliday();
        }
        else {
            ifscore++;
            $("#responseToGame").html("Incorrect")
            console.log(" -" + value + "- -" + HolidayMonth + "- ")
        }
    })

});

function changeMonthGuess(x) {
    monthGuess = months[x];
    console.log(monthGuess)
    $("#monthField").val(monthGuess);
}
