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
        let ing4 = $('.ing-3').attr('data-name')
        let ing5 = $('.ing-4').attr('data-name')

        // apples,+flour,+sugar

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

        if (ing4) {
            search += `&foodId=${ing4}`
        }

        if (ing5) {
            search += `&foodId=${ing5}`
        }

        // let ignoreList;



        list = [];
        localStorage.setItem("ingredientlist", JSON.stringify(list));
        $('.list-ingredients').empty();
        $('.list-input').css('display', 'block')



        let foodURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=6249e69ea0314b028cff85490334f327&ingredients=${search}&ranking=1&limitLicense=true`

        console.log(foodURL)

        $.ajax({
            url: foodURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)

        })

        // example endpoint https://api.spoonacular.com/recipes/findByIngredients?apiKey=6249e69ea0314b028cff85490334f327&ingredients=apples,+flour,+sugar&ranking=1&limitLicense=true
        // api key ?apiKey=6249e69ea0314b028cff85490334f327&
        // link for ingredients `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=6249e69ea0314b028cff85490334f327`
        // link to get the recipe instructions `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=6249e69ea0314b028cff85490334f327`


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