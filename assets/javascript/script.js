$(document).ready(function() {

    $('.modal').modal();

    let list = JSON.parse(localStorage.getItem("ingredientlist"));

    const gliderSearch = { 
        type: 'carousel',
        perView: 1,
        fucusAt: 'center',
        gap: '80px',
        
    };

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

        let apiKey = 'd34f094ff89a48a5935a35df751099ae'

        list = [];
        localStorage.setItem("ingredientlist", JSON.stringify(list));
        $('.list-ingredients').empty();
        $('.list-input').css('display', 'block')

        let foodURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${search}&ranking=1&limitLicense=true&number=6`
        
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
                    cal: '',
                    carbs: '',
                    fat: '',
                    protein: '',

                }

                recipeId = foodObject.recipeId

                let recipeURL = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`

                $.ajax({
                    url: recipeURL,
                    method: "GET"
                }).then(function(response) {
                    foodObject.recipe = response[0].steps

                    let summaryURL = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`

                    $.ajax({
                        url: summaryURL,
                        method: "GET"
                    }).then(function(response) {
                        foodObject.cal = response.calories
                        foodObject.carbs = response.carbs
                        foodObject.fat = response.fat
                        foodObject.protein = response.protein

                        let item = $('<li class="glide__slide display-recipe-list">');
                        let title = $('<h4>');
                        title.text(foodObject.title);

                        let image = $(`<img alt='picture of ${foodObject.title}' />`)
                        image.attr('src', foodObject.image)
                        image.addClass('recipe-image u-float-right')

                        let formatText1 = $('<h5>')
                        formatText1.text('Ingredients:')


                        let ingList = $('<ul>')
                        ingList.addClass('ingredient-list')
                        for(let i = 0; i < foodObject.ingredients.length; i++) {
                            let newIng = $('<li>')
                            newIng.text(foodObject.ingredients[i])
                            ingList.append(newIng)
                        }

                        let formatText2 = $('<h5>')
                        formatText2.text('Recipe:')

                        let recipeList = $('<ol>')
                        recipeList.addClass('recipe-list')
                        for(let j = 0; j < foodObject.recipe.length; j++) {
                            let newRec = $('<li>')
                            newRec.text(foodObject.recipe[j].step)
                            recipeList.append(newRec)
                        }

                        let footer = $('<p>')
                        footer.addClass('food-stats')
                        footer.text(`Cal: ${foodObject.cal}       Carbs: ${foodObject.carbs}       Fat: ${foodObject.fat}       Protein: ${foodObject.protein}`)

                        item.append(title, image, formatText1, ingList, formatText2, recipeList, footer)
                        $('.recipe-results').append(item)

                        new Glide('.glide', gliderSearch).mount();

                    })

                })

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

    $('.contact-links').hover(function () {
        $('.creator-text').css('display', 'block')
    }, function () {
        $('.creator-text').css('display', 'none')
    })

    $('.scroll').on('click', function () {
        setTimeout($([document.documentElement, document.body]).animate({
            scrollTop: $("#display").offset().top
        }, 1500), 500)
    })
   
});