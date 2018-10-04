/* global $ */
$(document).ready(function() {
    var dateArray=[];
    var months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    var url = "https://holidayapi.com/v1/holidays?&key=7f1ed9ac-b8bc-4380-adb9-bdf78e5ace25&year=2017&country=US";
    var HolidayName;
    var HolidayMonth;
    $.getJSON(url,function(data) {
         for(x in data["holidays"]) {
             dateArray.push(x);
         }
         });
    function getRandomInt(max){
        return Math.floor(Math.random()*Math.floor(max));
    }
    $("#newGameButton").click(function(e){
        e.preventDefault();
        console.log("click recieved")
        $.getJSON(url,function(data){
            var randomNum=getRandomInt(dateArray.length);
            console.log(randomNum)
            console.log(dateArray.length)
            console.log(dateArray[randomNum])
            console.log(data["holidays"][dateArray[randomNum]][0]["name"])
            HolidayName=data["holidays"][dateArray[randomNum]][0]["name"];
            HolidayMonth=months[dateArray[randomNum].substr(5,2)-1];
            console.log(HolidayMonth)
            $("#Holiday").html(HolidayName);
        })
    });
    $("#submitButton").click(function(e){
        e.preventDefault();
        var value =$("#monthField").val();
        console.log(value+" "+HolidayMonth)
        if (value==HolidayMonth){
            console.log("same")
            $("#responseToGame").html("Congratulations")
        }
        else{
            $("#responseToGame").html("Incorrect")
            console.log(" -"+value+"- -"+HolidayMonth+"- ")
        }
    })
});