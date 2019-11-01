//Youtube Data Api Trigger
    //========================
    const youtubeKey = 'AIzaSyCyE6uRr4N0thLeeGRFNJvNkVm4o4sSbBo';
    //var ytURL = 'https://www.googleapis.com/youtube/v3';
    //=========================

   // https://developers.google.com/explorer-help/guides/code_samples#javascript

//   function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey(youtubeKey);
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.youtube.channels.list({
//       "part": "snippet",
//       "id": "video",
//       "maxResults": 5
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//<button onclick="authenticate().then(loadClient)">authorize and load</button>
//<button onclick="execute()">execute</button>

console.log('videos.js connected');
function init(){
    console.log('init');
    gapi.client.setApiKey(youtubeKey);
    return gapi.client.load('youtube.com', 'v3', function(){ // this is where my current issue lies
        console.log("YOUTUBE CONNECTED");
        document.querySelector('#youtube-category').addEventListener('click', function(event) {//these have been tested and sort of work // need line 41 to work before results querey?
            event.preventDefault(); 
            console.log('click');
            var request = gapi.client.youtube.search.list({
                part: 'snippet',
                type: "video",
                q: encodeURIComponent('apples').replace(/%20/g, '+'), //INPUT???
                maxResults: 5
                });
            request.exicute(function(response){
                console.log('response = ' + response);
            });

        });
    })
}
