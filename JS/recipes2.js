(function() {
    
    window.onload = function(){
        var $ = function(id) {return document.getElementById(id);};
        var data;
        var categories = {
            "Breakfast" : [],
            "Lunch" : [],
            "Dinner" : [],
            "Sides" : [],
            "Dessert" : [],
            "Drinks" : [] };
        getData();
        const mq = window.matchMedia( "(max-width: 620px)" );

        // make ajax call to get the card data
        function getData(){
            var ajax = new XMLHttpRequest();
            ajax.open("Get", "https://coop-67b9f.firebaseio.com/.json?auth=GHRtS7qTMMwBkh76LZhuSzDh0B4GRafqTZxqViuX");
            ajax.onload = createCards;
            ajax.send();
        }

        // create the cards based on the firebase
        function createCards(){
            data = JSON.parse(this.responseText)["Recipes"];
            var mainContainer = document.getElementById("mainContent");
            for (var i = 0; i < data.length; i ++){
                // creates all recipe snipits
                var recipeContainerOuter = document.createElement("div");
                recipeContainerOuter.className = "recipeContianerOuter";
                var recipeImg = document.createElement("img");
                recipeImg.src = data[i][6]["imgPath"];
                recipeContainerOuter.appendChild(recipeImg);
                var recipeContainer = document.createElement("div");
                recipeContainer.className = "recipeContianer";
                recipeContainer.id = i;
                var recipeTitle = document.createElement("p");
                recipeTitle.className = "recipeTitle";
                recipeTitle.innerHTML = data[i][0]["title"];
                recipeContainer.appendChild(recipeTitle);
                var recipeBean = document.createElement("p");
                recipeBean.className = "recipeBean";
                recipeBean.innerHTML = data[i][1]["bean"] + "!";
                recipeContainerOuter.id = i + "_";
                recipeContainer.appendChild(recipeBean);

                var recipeIngredients = document.createElement("ul");
                recipeIngredients.innerHTML = "Ingredients:";
                var ingredients = data[i][4]["ingredients"].split("^");
                for (var j = 0; j < ingredients.length; j ++){
                    var li = document.createElement("li");
                    li.innerHTML = ingredients[j];
                    recipeIngredients.appendChild(li);
                }
                recipeContainer.appendChild(recipeIngredients);
                var recipeInstructions = document.createElement("ul");
                recipeInstructions.innerHTML = "Instructions:";
                var instructions = data[i][5]["instructions"].split("^");
                for (var j = 0; j < instructions.length; j ++){
                    var li = document.createElement("li");
                    li.innerHTML = instructions[j];
                    recipeInstructions.appendChild(li);
                }
                recipeContainer.appendChild(recipeInstructions);
                
                recipeContainerOuter.appendChild(recipeContainer);
                mainContainer.appendChild(recipeContainerOuter);
                if (mq.matches) {
                    // window width is at least 500px
                    recipeContainerOuter.innerHTML = data[i][0]["title"];
                } else {
                    recipeContainer.classList.add("hidden");
                    recipeContainerOuter.onmouseover = hoverRecipe;
                    recipeContainerOuter.onmouseout = unhoverRecipe;
                }
                populateCategories(i);
            }
            createCategories();
        }
        function hoverRecipe(){
            this.childNodes[1].classList.remove("hidden");
            this.childNodes[0].classList.add("opacity");
        }

        function unhoverRecipe(){
            this.childNodes[1].classList.add("hidden");
            this.childNodes[0].classList.remove("opacity");

        }
        // populate the different categories with the card index
        function populateCategories(i){
            var tags = data[i][7]["tags"].split("^");
            if (tags.includes("Breakfast")){
                categories["Breakfast"].push(i);
            }
            if (tags.includes("Lunch")){
                categories["Lunch"].push(i);
            }
            if (tags.includes("Dinner")){
                categories["Dinner"].push(i);
            }
            if (tags.includes("Side")){
                categories["Sides"].push(i);
            }
            if (tags.includes("Dessert")){
                categories["Dessert"].push(i);
            }
            if (tags.includes("Drinks")){
                categories["Drinks"].push(i);
            }
        }

        // creates onclick events for each category
        function createCategories(){
            $("catBreakfast").onclick = function(){
                showHideCategories("Breakfast");
            }
            $("catLunch").onclick = function(){
                showHideCategories("Lunch");
            }
            $("catDinner").onclick = function(){
                showHideCategories("Dinner");
            }
            $("catSides").onclick = function(){
                showHideCategories("Sides");
            }
            $("catDessert").onclick = function(){
                showHideCategories("Dessert");
            }
            $("catDrinks").onclick = function(){
                showHideCategories("Drinks");
            }
        }

        // shows or hides the different recipes based on the their category
        function showHideCategories(category){
            var recipes = categories[category];
            for (var i = 0; i < data.length; i ++){
                var id = i + "_";
                $(id).classList.add("hidden");
            }
            for (var i = 0; i < recipes.length; i ++){
                $(recipes[i] + "_").classList.remove("hidden");
            }
        }
           
    };

    
})();
