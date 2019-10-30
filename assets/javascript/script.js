$(document).ready(function() {


    var ingredients = [];
    $('.chips').chips(); // making 'chips' appear (line 24 of html input / retrieve data to add to list
    
    const youtubeKey = 'AIzaSyCyE6uRr4N0thLeeGRFNJvNkVm4o4sSbBo';



    $('#recipe-search-btn').on('click', function () {
        event.preventDefault();

        // let search = $('.custom-class').val().trim();
        let search = 'apples';

        let key = '8a8f706f4ed29bc722aca293b277b0dc';
        let keyId = '022a7211';

        //create radio buttons for meal type {lunch, dinner, breakfast, snack}
        let meal = 'dinner'

        let health = `&health=tree-nut-free`

        let start = 0;
        let finish = start + 5;

        //shows the first five results (change code so that we can change it based on page)
        let queryURL = `https://api.edamam.com/search?q=${search}&app_id=${keyId}&app_key=${key}`

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)

        })



    })
    // &from=${start}&to=${finish}&mealType=${meal}${health}


})