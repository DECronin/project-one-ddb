const youtubeKey = 'AIzaSyCyE6uRr4N0thLeeGRFNJvNkVm4o4sSbBo';

let input;

function getVideo() {
    console.log('vid-input = ' + input);
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
          key: youtubeKey,
          q: input,
          part: 'snippet',
          maxResults: 10,
          type: 'video',
          videoEmbeddable: true,
      },
      success: function(data){
          embedVideo(data)
      },
      error: function(response){
          console.log("Request Failed");
      }
    });
  }

  function embedVideo(data) {
    console.log(data);
    let list = $('<div>');
    for (i = 0; i < 10; i++){
        var newDiv = $('<div class="video-results">');
        var iframe = $('<iframe src="">');
        var h3 = $('<h3>');
        var desc = $('<p class="description">');
        iframe.attr('src', 'https://www.youtube.com/embed/' + data.items[i].id.videoId);
        h3.text(data.items[i].snippet.title);
        desc.text(data.items[i].snippet.description);
        newDiv.append(iframe, h3, desc);
        list.append(newDiv)
    }
    $('.video-results').append(list);
}


$('#search-youtube').on('click', function(){
    input = $('#input-videos').val().trim();
    getVideo();
})