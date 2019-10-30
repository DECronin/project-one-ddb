$(document).ready(function() {


    var ingredients = [];
    var list = JSON.parse(localStorage.getItem("ingredientlist"));
    
    const youtubeKey = 'AIzaSyCyE6uRr4N0thLeeGRFNJvNkVm4o4sSbBo';


    $('.dropdown-trigger').dropdown();
    
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
        }).then(function({hits}) {
            let list = hits[0].recipe
            let foodObject = {
                title: list.label,
                ingredientsArray: list.ingredients,
                time: list.totalTime + " mins",
                recipeLink: list.shareAs,
                dietary: list.healthLabels,
                calories: Math.floor(list.calories),

            }

            console.log(foodObject)


        })



    })
    // &from=${start}&to=${finish}&mealType=${meal}${health}

    function renderList(){
        $('.list-ingredients').empty();
        for (var i = 0; i < list.length; i++) {
            var newItem = $("<p>");
            newItem.text(list[i]);
            var erase = $("<button>");
            erase.attr("data-index", i);
            erase.addClass("checkbox");
            erase.text("X");
            newItem = newItem.prepend(erase);
            $(".list-ingredients").append(newItem);
          }
    };
    $("#add-item").on("click", function(event) {
        event.preventDefault();
        var newItem = $("#input-list-item").val().trim();
        list.push(newItem);
        renderList(list);
        localStorage.setItem("ingredientlist", JSON.stringify(list));
        $("#input-list-item").val("");
    });
    $(document).on("click", ".checkbox", function() {
        var ingredientNumber = $(this).attr("data-index");
        list.splice(ingredientNumber, 1);
        renderList(list);
        localStorage.setItem("ingredientlist", JSON.stringify(list));
    });
    if (!Array.isArray(list)) {
        list = [];
    }

    renderList();
})