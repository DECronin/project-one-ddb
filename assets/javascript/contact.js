function validate(user, email, comment) {
      
    if( user == "" ) {
       alert( "Please provide your name!" );
       $('#name-box').css('background-color', 'red');
    }
    if( email == "" ) {
       alert( "Please provide your Email!" );
       $('#email-box').css('background-color', 'red');
    }
    if( comment == "" ) {
       alert( "Please provide your comment!" );
       $('#comment-box').css('background-color', 'red');
    }
 }

$('#send-comment').on('click', function(){
    event.preventDefault();
    
    var user = $('#username-input').val();
    var email = $('#email-input').val();
    var comment = $('#comment-input').val();

    if (user === '' || email === '' || comment === ''){
        alert('Please fill in all fields before sending comment');
        validate(user, email, comment);
    } else {
        console.log('sending comment: ' + user + '//' + email + '//' + comment);
        // sendComment();
    }
});

