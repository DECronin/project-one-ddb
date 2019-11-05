

var user;
var email;
var comment;

function validate() { // modify for more apealing css
    $('#empty-contact').empty();
    if (user == "" ) {
       $('#empty-contact').append('Please provide a valid Name.');
    }
    if (email == "" && !email.includes('@') && !email.includes('.')) {
        $('#empty-contact').append('<br>Please provide a valid Email Address.');
    }
    if (comment == "" ) {
        $('#empty-contact').append('<br>Please provide a Comment.');
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
        validate();
    } else {
        //console.log('sending comment: ' + user + '//' + email + '//' + comment);
        sendComment();
    }
});

//database.ref().on('child_added', function (snapshot) {
    //console.log('snapshot' + JSON.stringify(snapshot));
    //send emails
//});