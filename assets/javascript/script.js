$(document).ready(function() {

    let list = JSON.parse(localStorage.getItem("ingredientlist"));

    $('.dropdown-trigger').dropdown();
    $('select').formSelect();
    
    $('#recipe-search-btn').on('click', function () {
        event.preventDefault();

        // let search = $('.custom-class').val().trim();
        let search = 'apples';

        let ing1 = $('.ing-0').attr('data-name')
        let ing2 = $('.ing-1').attr('data-name')
        let ing3 = $('.ing-2').attr('data-name')

        if (ing1) {
            search = ing1
        } else {
            return
        }

        if (ing2) {
            search += `&foodId=${ing2}`
        }

        if (ing3) {
            search += `&foodId=${ing3}`
        }

        list = [];
        localStorage.setItem("ingredientlist", JSON.stringify(list));
        $('.list-ingredients').empty();
        $('.list-input').css('display', 'block')

        let key = '8a8f706f4ed29bc722aca293b277b0dc';
        let keyId = '022a7211';

        //create radio buttons for meal type {lunch, dinner, breakfast, snack}
        //let meal = 'breakfast' //- can't get it to work

        let healthArray = $('.selectors').val()
        let health = ''
        $('.selectors').val('')

        for (let i = 0; i < healthArray.length; i++) {
            health += `&Health=${healthArray[i]}`
        }

        console.log(health)

        let start = 0;
        let finish = start + 10;

        // pull in data from health stuff... also reset that field  they are set as values

        // shows the first five results (change code so that we can change it based on page)
        let foodURL = `https://api.edamam.com/search?q=${search}&app_id=${keyId}&app_key=${key}&from=${start}&to=${finish}${health}`
        // &mealType=${meal}

        console.log(foodURL)

        $.ajax({
            url: foodURL,
            method: "GET"
        }).then(function({hits}) {
            
            // for loop to make this take each go through the hit array [0-9] create a card (or whatever)
            for (let i = 0; i < hits.length; i++) {

                let list = hits[i].recipe
                
                let foodObject = {
                    title: list.label,
                    ingredientsArray: list.ingredients,
                    time: list.totalTime + " mins",
                    recipeLink: list.shareAs,
                    dietary: list.healthLabels,
                    calories: Math.floor(list.calories),

                }

                // create div for each object
                console.log(foodObject)
            }

        })



    })
    

    function renderList(){
        $('.list-ingredients').empty();
        for (let i = 0; i < list.length; i++) {
            let newItem = $("<p>");
            newItem.attr('data-name', list[i])
            newItem.addClass(`ing-${i}`)
            newItem.text(list[i]);
            let erase = $("<button>");
            erase.attr("data-index", i);
            erase.addClass("checkbox");
            erase.text("X");
            newItem = newItem.prepend(erase);
            $(".list-ingredients").append(newItem);
        }
        if (list.length >= 3) {
            $('.list-input').css('display', 'none')
        } else {
            $('.list-input').css('display', 'block')
        }
    };

    $("#add-item").on("click", function(event) {
        event.preventDefault();
        let newItem = $("#input-list-item").val().trim();

        if (newItem !== '') {
            list.push(newItem);
            renderList(list);
            localStorage.setItem("ingredientlist", JSON.stringify(list));
            $("#input-list-item").val("");
        } 

    });

    $(document).on("click", ".checkbox", function() {
        let ingredientNumber = $(this).attr("data-index");
        list.splice(ingredientNumber, 1);
        renderList(list);
        localStorage.setItem("ingredientlist", JSON.stringify(list));
    });

    if (!Array.isArray(list)) {
        list = [];
    }

    renderList();
    
})