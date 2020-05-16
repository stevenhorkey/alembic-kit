
console.log('running custom js');

function addItem(item){
    console.log(item);
}

function deleteItem(itemId){

}

function startTimer(){
    
}

function pauseTimer(){

}

document.addEventListener("DOMContentLoaded", function() {

    var btn = $(this);
    var input = $('#brain-bump-input');
    var list = $('#brain-bump-list');
    var timer = $('#brain-bump-timer span');
    var timerBtn = $('#brain-bump-timer button');
    
    $('body').on('click','#brain-dump-btn', function(e){
        e.preventDefault();
        console.log('asdf');

        addItem(input.val());

    });

});