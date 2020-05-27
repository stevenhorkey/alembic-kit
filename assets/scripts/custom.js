
console.log('running custom js');




function displayNotification(msg = 'Please wait...', status = 'success', timer = true){
    
    var notificationId = new Date().getUTCMilliseconds();
    var html = `
        <div class='alert alert-${status} temp-notification' id='notification-${notificationId}'>
            ${msg}
        </div>
    `;
    $(".notification-panel").prepend(html);
    var note = $("#notification-"+notificationId);

    note.slideDown();

    if(timer){
        setTimeout(function(){
            note.fadeOut()
            setTimeout(function(){
                note.remove();
            }, 1000);
        }, 3000);
    }

    return note;

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

function submitForm($form, url, data){
    var note = displayNotification('Please wait...', 'success', false);
    $.ajax({
        url: url,
        method: $form.attr('method'),
        data: data,
        success: function(res){
            console.log(res);
            var resContainer = $form.find(".form-res");
            resContainer.empty();
            if(res.status === 'subscribed'){
                resContainer.append(`
                    <div class='alert alert-success'>
                        You were signed up successfully!
                    </div>
                `);
                $form.trigger('reset');
            } else {
                resContainer.append(`
                    <div class='alert alert-danger'>
                        There was an error or you are already signed up.
                    </div>
                `);
            }
            note.fadeOut();
        },
        error: function(err){
            console.log(err);
            note.fadeOut();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {

    $("#newsletter-form").submit(function(e){
        e.preventDefault();
        data = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email-input").val()
        };
        submitForm($(this), "https://sessionsbysteven.herokuapp.com/api/mcSignup", data);
    })

});
