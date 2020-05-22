
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

document.addEventListener("DOMContentLoaded", function() {


   
});
