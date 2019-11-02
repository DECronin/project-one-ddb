// To Do:
// fix inputs so that spaces are removed properly

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
        let ing6 = $('.ing-5').attr('data-name')

        // apples,flour,sugar

        if (ing1) {
            search = ing1
        } else {
            return
        }

        if (ing2) {
            search += `,${ing2}`
        }

        if (ing3) {
            search += `,${ing3}`
        }

        if (ing4) {
            search += `,${ing4}`
        }

        if (ing5) {
            search += `,${ing5}`
        }

        if (ing6) {
            search += `,${ing6}`
        }


        list = [];
        localStorage.setItem("ingredientlist", JSON.stringify(list));
        $('.list-ingredients').empty();
        $('.list-input').css('display', 'block')

        let foodURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=6249e69ea0314b028cff85490334f327&ingredients=${search}&ranking=1&limitLicense=true`
        
        

        $.ajax({
            url: foodURL,
            method: "GET"
        }).then(function(response) {
            
            for(let i = 0; i < response.length; i++) {
                let food = response[i]
                let ingredients = []
                let recipeId = food.



                let foodObject = {
                    title: food.title,
                    image: food.image,
                    ingredients,

                }
                



                //display this into a div

            }


        })

        // example endpoint https://api.spoonacular.com/recipes/findByIngredients?apiKey=6249e69ea0314b028cff85490334f327&ingredients=apples,flour,sugar&ranking=1&limitLicense=true
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
        if (list.length >= 6) {
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