/* global $ */
$(document).ready(function() {
    var HolidayName;
    function getRandomInt(max){
        return Math.floor(Math.random()*Math.floor(max));
    }
    $("#newGameButton").click(function(e){
        var value =$("#monthField").val();
        e.preventDefault();
        console.log("click recieved")
        $.getJSON(url,function(data){
            var randomNum=getRandomInt(dateArray.length);
            console.log(randomNum)
            console.log(dateArray.length)
            console.log(dateArray[randomNum])
            console.log(data["holidays"][dateArray[randomNum]][0]["name"])
            HolidayName=data["holidays"][dateArray[randomNum]][0]["name"];
            console.log(HolidayName)
            $("#Holiday").html(HolidayName);
        })
    });
});