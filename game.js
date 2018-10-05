/* global $ */
var monthGuess = "";
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var countries=[["US","US"],["AO","Angola"],["AT","Austria"],["AX","Aland Island"],["BG","Bulgaria"],["CN","China"],["CZ","Czech Republic"],["CR","Costa Rica"],["DE","Germany"],["FI","Finland"],["GB","Great Britan"],["HU","Hungary"],["HR","Croatia"],["GR","Greece"],["ID","Indonesia"],["IN","India"],["KZ","Kazakhstan"],["RO","Romania"],["SC","Seychelles"],["SG","Singapore"],["MZ","Mozambique"],["ZA","South Africa"],["ZW","Zimbabwe"],["UA","Ukraine"]]
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
        ifHard=0;
        Score=0;
        times = 1;
        numbersUsed=[];
        $("#monthField").val("");
        //$("#congrats").style.width="0"
        e.preventDefault();
        console.log("click recieved")
        getNewHoliday();
    });
    $("#hard").click(function(e) {
        ifHard=1;
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
        $("#currentScore").html("Score: "+Score)
        ifscore=0;
        if (times > 10) {
            $("#Holiday").html("Score: "+Score);
            alert("You Finished the game press New Game")
        }
        else {
            var countryNum;
            $("#holiday-counter").html("Holiday " + times + " out of 10");
            if (ifHard == 1) {
                countryNum=getRandomInt(countries.length)
                url = "https://holidayapi.com/v1/holidays?&key=7f1ed9ac-b8bc-4380-adb9-bdf78e5ace25&year=2017&country="+countries[countryNum][0]
            }
            else{
                url="https://holidayapi.com/v1/holidays?&key=7f1ed9ac-b8bc-4380-adb9-bdf78e5ace25&year=2017&country=US";
                countryNum=0
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
                $("#Holiday").html(countries[countryNum][1]+": "+HolidayName);
            })
        }
    }
    $(".monthclick").click(function(e) {
        e.preventDefault();
        var value = $("#monthField").val();
        console.log(value + " " + HolidayMonth)
        if (value == HolidayMonth) {
            if (ifscore==0)Score=Score+5;
            else if(ifscore==1)Score=Score+3;
            else if(ifscore==2)Score=Score+2;
            else if (ifscore==3)Score++;
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
            if(ifscore>5){
                times++;
                getNewHoliday();
            }
        }
    })

});

function changeMonthGuess(x) {
    monthGuess = months[x];
    console.log(monthGuess)
    $("#monthField").val(monthGuess);
}
