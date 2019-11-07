var user;
var email;
var comment;
function validate() {
    $('#empty-contact').empty();
    if (user == "" ) {
        $('#empty-contact').append('* Please provide a valid Name.');
        $('#username-input').addClass('invalid');
    } 
    if (email == "" || !email.includes('@') || !email.includes('.')) {
        $('#empty-contact').append('<br>* Please provide a valid Email Address.');
        $('#email-input').addClass('invalid');
    } 
    if (comment == "" ) {
        $('#empty-contact').append('<br>* Please provide a Comment.');
        $('#comment-input').addClass('invalid');
    }
 }
 function sendComment(){
    database.ref().push({
        name: user,
        email: email,
        comment: comment
    });
    $('#username-input').val('');
    $('#email-input').val('');
    $('#comment-input').val('');
 }
$('#send-comment').on('click', function(){
    event.preventDefault();
    $('#empty-contact').empty();
    $('#username-input #email-input #comment-input').removeClass('invalid');  
    $('#username-input #email-input #comment-input').addClass('valid');     
    user = $('#username-input').val();
    email = $('#email-input').val();
    comment = $('#comment-input').val();

    if (user === '' || email === '' || comment === '' || !email.includes('@') || !email.includes('.')){
        validate();
    } else {
        sendComment();
    }
});
//database.ref().on('child_added', function (snapshot) {
    //console.log('snapshot' + JSON.stringify(snapshot));
    //send emails
//});