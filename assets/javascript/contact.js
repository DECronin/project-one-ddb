

var user;
var email;
var comment;

function validate() { // modify for more apealing css
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

 function sendComment(){
    database.ref().push({
        name: user,
        email: email,
        comment: comment
    });
 }

$('#send-comment').on('click', function(){
    event.preventDefault();
    
    user = $('#username-input').val();
    email = $('#email-input').val();
    comment = $('#comment-input').val();

    if (user === '' || email === '' || comment === ''){
        alert('Please fill in all fields before sending comment');
        validate();
    } else {
        console.log('sending comment: ' + user + '//' + email + '//' + comment);
        sendComment();
    }
});

database.ref().on('child_added', function (snapshot) {
    console.log('snapshot' + JSON.stringify(snapshot));
    //send emails
});