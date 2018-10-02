/* global $ */
$(document).ready(function() {
    var url = "https://holidayapi.com/v1/holidays?&key=7f1ed9ac-b8bc-4380-adb9-bdf78e5ace25&year=2017&country=US";
    $.getJSON(url,function(data) {
        var everything;
        everything = "<h4>These are all the holidays:</h4>";
        everything += "<ul>";
        for(x in data["holidays"]) {
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
});