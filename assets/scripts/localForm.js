

function saveUserInput(){
    // Get values from user input fields and save to local storage.
    var values = [];
    $(".article--exercise").find(':input:not(button)').each(function(el){
        var input = $(this);
        var value = input.val();
        values.push(value);
    });
    var json = JSON.stringify(values);
    localStorage.setItem(location.pathname, json);
    return json;
}

function populateInputFields(){
    // Get values from local storage and place in fields
    var values = JSON.parse(localStorage.getItem(location.pathname));
    console.log(values);
    // remove empty strings
    if(values){
        values.forEach(function(value){
            if(value !== ""){
                $(".article--exercise").find(':input:not(button)').each(function(i){
                    var input = $(this);
                    input.val(values[i]);
                });
                return true;
            } else return false;
        });
    }
    return false;
}

function saveUserInputToDB(jsonData){
    user = "GYzDZSjdQS";
    data = {"pathname":location.pathname,"user":user,"entries":jsonData};
    if(user){
        $.ajax({
            type:"POST",
            beforeSend: function (request)
            {
                request.setRequestHeader("X-Parse-Application-Id", 'pp-parse-db');
            },
            url: "http://partial-perspectives-parse-db.herokuapp.com/parse/classes/exercises",
            data: data,
            dataType: "json",
            success: function(msg) {
                console.log(JSON.parse(msg));
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}


document.addEventListener("DOMContentLoaded", function() {

    populateInputFields();

    document.onkeypress=function(e){
        saveUserInput();
    };

    window.onbeforeunload = function(){
        saveUserInput();
    };

    // $(".footer").click(function(e){
    //     e.preventDefault();
    //     alert('tada');
    //     var jsonData = saveUserInput();
    //     saveUserInputToDB(jsonData);
    // });
   
});