$('#send-comment').on('click', function(){
    event.preventDefault();
    
    var user = $('#username-input').val();
    var email = $('#email-input').val();
    var comment = $('#comment-input').val();
    console.log("=========");
    console.log(user);
    console.log(email);
    console.log(comment);
});

