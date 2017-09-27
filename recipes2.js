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
        console.log(window);
        window.onscroll = function(){
            var scrollTop = window.scrollY;
            if (scrollTop > 300) {
                $("recipe").style.height = "600px";
                $("image").style.height = "400px";
            } else {
                $("recipe").style.height = "300px";
                $("image").style.height = "350px";

            }
        }

        function getData(){
            var ajax = new XMLHttpRequest();
            ajax.open("Get", "https://coop-67b9f.firebaseio.com/.json?auth=GHRtS7qTMMwBkh76LZhuSzDh0B4GRafqTZxqViuX");
            ajax.onload = createCards;
            ajax.send();
        }

        function createCards(){
            data = JSON.parse(this.responseText)["Recipes"];
            var mainContainer = document.getElementById("mainContent");
            for (var i = 0; i < data.length; i ++){
                // creates all recipe snipits
                var recipeContainerOuter = document.createElement("div");
                recipeContainerOuter.className = "recipeContianerOuter";
                var recipeContainer = document.createElement("div");
                recipeContainer.className = "recipeContianer";
                recipeContainerOuter.appendChild(recipeContainer);
                var recipeImage = document.createElement("img");
                recipeImage.src = data[i][6]["imgPath"];
                recipeImage.className = "recipeImage";
                recipeContainer.appendChild(recipeImage);
                var recipeTitle = document.createElement("p");
                recipeTitle.className = "recipeTitle";
                recipeTitle.innerHTML = data[i][0]["title"];
                recipeContainer.appendChild(recipeTitle);
                var recipeBean = document.createElement("p");
                recipeBean.className = "recipeBean";
                recipeBean.innerHTML = data[i][1]["bean"] + "!";
                recipeContainerOuter.id = i;
                recipeContainer.appendChild(recipeBean);
                mainContainer.appendChild(recipeContainerOuter);
                recipeContainerOuter.onclick = openRecipe;
                
                // populates the categories
                populateCategories(i);
            }
            createCategories();
        }

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

        function showHideCategories(category){
            var recipes = categories[category];
            for (var i = 0; i < data.length; i ++){
                $(i.toString()).classList.add("hidden");
            }
            for (var i = 0; i < recipes.length; i ++){
                $(recipes[i].toString()).classList.remove("hidden");
            }
        }
                     


        function openRecipe(){
            var recipeData = data[this.id];
            $("title").innerHTML = recipeData[0]["title"];
            $("bean").innerHTML = recipeData[1]["bean"];
            $("time").innerHTML = "Time: " + recipeData[2]["time"];
            $("servings").innerHTML = "Servings: " + recipeData[3]["servings"];
            $("image").src = recipeData[6]["imgPath"];
            $("ingredients").innerHTML = "Ingredients:";
            var ingredients = recipeData[4]["ingredients"].split("^");
            for (var i = 0; i < ingredients.length; i ++){
                var li = document.createElement("li");
                li.innerHTML = ingredients[i];
                $("ingredients").appendChild(li);
            }
            $("instructions").innerHTML = "Instructions:";
            var instructions = recipeData[5]["instructions"].split("^");
            for (var i = 0; i < instructions.length; i ++){
                var li = document.createElement("li");
                li.innerHTML = instructions[i];
                $("instructions").appendChild(li);
            }
            
            $("close").onclick = closeRecipe;
            $("mainContent").style.width = "40%";
            $("recipe").classList.remove("hidden");
            
        }
        
        function closeRecipe(){
            $("mainContent").style.width = "100%";
            $("recipe").classList.add("hidden");
        }
            
    };

    
})();
