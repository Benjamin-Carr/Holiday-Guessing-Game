/* global $ */
$(document).ready(function() {
    var url = "https://holidayapi.com/v1/holidays?&key=7f1ed9ac-b8bc-4380-adb9-bdf78e5ace25&year=2017&country=US";
    var dateArray=[]   
    $.getJSON(url,function(data) {
        var everything;
        everything = "<h4>These are all the holidays:</h4>";
        everything += "<ul>";
        for(x in data["holidays"]) {
            dateArray.push(x);
            everything += "<li>" + x + "</li>";
            everything += "<ul>";
            for(let i=0; i < data["holidays"][x].length; i++) {
                everything += "<li>" + data["holidays"][x][i]["name"] + "</li>";
            }
            everything += "</ul>";
        }
        everything += "</ul>";
        $("#holiday-list").html(everything);
    })
    .done(function() { console.log('getJSON request succeeded!'); })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        console.log('getJSON request failed! ' + textStatus); 
        console.log("incoming "+jqXHR.responseText);
    })
    .always(function() { 
        console.log('getJSON request ended!'); 
    }); 
    function getRandomInt(max){
        return Math.floor(Math.random()*Math.floor(max));
    }
    var HolidayName;
    $("#newGameButton").click(function(e){
        var value =$("#monthField").val();
        e.preventDefault();
        console.log("click recieved")
        $.getJSON(url,function(data){
            var randomNum=getRandomInt(dateArray.length);
            console.log(randomNum)
            console.log(data["holidays"][dateArray[randomNum]][0]["name"])
            HolidayName=data["holidays"][dateArray[randomNum]][0]["name"];
            console.log(HolidayName)
            $("#Holiday").html(HolidayName);
        })
    });
});