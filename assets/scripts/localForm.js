

function saveUserInput(){
    // Get values from user input fields and save to local storage.
    console.log('saving');
    var values = [];
    $(".article--exercise").find(':input:not(button)').not('.dont-save').each(function(el){
        var input = $(this);
        var value = input.val();
        values.push(value);
    });
    allowLocalStorageClear();
    var json = JSON.stringify(values);
    localStorage.setItem(location.pathname, json);
    displayNotification("Saved to your browser.", "success", true);
    return json;
}

function clearLocalStorage(){
    var clear = confirm("Delete your answers for this exercise from your web browser? This can't be undone.");
    if(clear) localStorage.removeItem(location.pathname);
}

function allowLocalStorageClear(){
    if($(".allow-localstorage-clear").length < 1) $("#exercise-container").before("<button class='allow-localstorage-clear w-100 d-block mb-4' onclick='clearLocalStorage();'>Clear Exercise Answers</button>");
}

function populateInputFields(){
    // Get values from local storage and place in fields
    var values = JSON.parse(localStorage.getItem(location.pathname));
    console.log(values);
    // remove empty strings
    if(values){
        allowLocalStorageClear();
        values.forEach(function(value){
            if(value !== ""){
                $(".article--exercise").find(':input:not(button)').not('.dont-save').each(function(i){
                    var input = $(this);
                    input.val(values[i]);
                });
                return true;
            } else return false;
        });
    } else {
        $(".article--exercise").find(':input:not(button)').not('.dont-save').each(function(i){
            var input = $(this);
            input.val("");
        });
        $(".allow-localstorage-clear").remove();
    }
    return false;
}

var autoExpand = function (field) {

	// Reset field height
	field.style.height = 'inherit';

	// Get the computed styles for the element
	var computed = window.getComputedStyle(field);

	// Calculate the height
	var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

	field.style.height = height + 'px';

};

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

    var typingTimer;                //timer identifier
    var doneTypingInterval = 2 * 1000;

    document.onkeypress=function(e){
        clearTimeout(typingTimer);
        // saveUserInput();
        typingTimer = setTimeout(saveUserInput, doneTypingInterval);
    };

    $("textarea").each(function(i){
        autoExpand($(this)[0]);
    });

    document.addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
    }, false);

    window.onbeforeunload = function(){
        saveUserInput();
    };

    $("button").click(function(e){
        e.preventDefault();
        populateInputFields();
    });

    // $(".footer").click(function(e){
    //     e.preventDefault();
    //     alert('tada');
    //     var jsonData = saveUserInput();
    //     saveUserInputToDB(jsonData);
    // });
   
});