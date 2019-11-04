const youtubeKey = 'AIzaSyCyE6uRr4N0thLeeGRFNJvNkVm4o4sSbBo';
let input;
const gligerConfig = { //use breakpoints for media respinsiveness and classes can be suded for individual elements
    type: 'carousel',
    perView: 3,
    fucusAt: 'center',
    gap: '50px'
};

function getVideo() {
    console.log('vid-input = ' + input);
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
          key: youtubeKey,
          q: input, // + 'cooking' or category : food;
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
    // console.log(data);
    
    for (i = 0; i < 10; i++){
        let item = $('<li class="glide__slide display-vid-list frames_item">');
        var iframe = $('<iframe>');
        var h3 = $('<h3>');
        var desc = $('<p class="description">');
        iframe.attr('src', 'https://www.youtube.com/embed/' + data.items[i].id.videoId);
        h3.text(data.items[i].snippet.title);
        desc.text(data.items[i].snippet.description);
        item.append(iframe, h3, desc);
        $('.video-results').append(item);
    }
    new Glide('.glide', gligerConfig).mount();
}


$('#search-youtube').on('click', function(){
    input = $('#input-videos').val().trim();
    getVideo();
})