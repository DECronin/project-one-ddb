$(document).ready(function() {


    $('.modal').modal();

    let list = JSON.parse(localStorage.getItem("ingredientlist"));

    $('.dropdown-trigger').dropdown();
    $('select').formSelect();
    
    $('#recipe-search-btn').on('click', function () {
        event.preventDefault();

        let search = 'apples';

        let ing1 = $('.ing-0').attr('data-name');
        let ing2 = $('.ing-1').attr('data-name');
        let ing3 = $('.ing-2').attr('data-name');
        let ing4 = $('.ing-3').attr('data-name');
        let ing5 = $('.ing-4').attr('data-name');
        let ing6 = $('.ing-5').attr('data-name');

        if (ing1) {
            ing1 = ing1.toLowerCase();
            ing1 = ing1.split(' ').join('+')
            search = ing1
        } else {
            return
        }

        if (ing2) {
            ing2 = ing2.toLowerCase();
            ing2 = ing2.split(' ').join('+')
            search += `,${ing2}`
        }

        if (ing3) {
            ing3 = ing3.toLowerCase();
            ing3 = ing3.split(' ').join('+')
            search += `,${ing3}`
        }

        if (ing4) {
            ing4 = ing4.toLowerCase();
            ing4 = ing4.split(' ').join('+')
            search += `,${ing4}`
        }

        if (ing5) {
            ing5 = ing5.toLowerCase();
            ing5 = ing5.split(' ').join('+')
            search += `,${ing5}`
        }

        if (ing6) {
            ing6 = ing6.toLowerCase();
            ing6 = ing6.split(' ').join('+')
            search += `,${ing6}`
        }


        list = [];
        localStorage.setItem("ingredientlist", JSON.stringify(list));
        $('.list-ingredients').empty();
        $('.list-input').css('display', 'block')

        let foodURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=6249e69ea0314b028cff85490334f327&ingredients=${search}&ranking=1&limitLicense=true&number=6`
        
        console.log(foodURL)

        $.ajax({
            url: foodURL,
            method: "GET"
        }).then(function(response) {
            
            for(let i = 0; i < response.length; i++) {
                let food = response[i]
                let ingredients = []

                for (let i = 0; i < food.missedIngredients.length; i++) {
                    ingredients.push(food.missedIngredients[i].original)
                }

                for (let i = 0; i < food.usedIngredients.length; i++) {
                    ingredients.push(food.usedIngredients[i].original)
                }

                let foodObject = {
                    title: food.title,
                    image: food.image,
                    ingredients,
                    recipeId: food.id,
                    recipe: [],
                    summary: '',

                }

                recipeId = foodObject.recipeId

                let recipeURL = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=6249e69ea0314b028cff85490334f327`

                $.ajax({
                    url: recipeURL,
                    method: "GET"
                }).then(function(response) {
                    foodObject.recipe = response[0].steps

                    let summaryURL = `https://api.spoonacular.com/recipes/${recipeId}/summary?apiKey=6249e69ea0314b028cff85490334f327`

                    $.ajax({
                        url: summaryURL,
                        method: "GET"
                    }).then(function(response) {
                        foodObject.summary = response
                        console.log(foodObject)

                    })

                })

                

                //put info into a div;

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
