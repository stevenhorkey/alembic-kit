var values = [];
$(".article--exercise").find(':input:not(button)').each(function(el){
    var input = $(this);
    var value = input.val();
    values.push(value);
});
localStorage.setItem(location.pathname, JSON.stringify(values));


values = JSON.parse(localStorage.getItem(location.pathname));
$(".article--exercise").find(':input:not(button)').each(function(i){
    console.log(i);
    var input = $(this);
    input.val(values[i]);
});