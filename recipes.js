(function() {
    window.onload = function(){
        changeImg;
        getFileContents();
        var time = setInterval(changeImg, 500);
    };

    function getFileContents(){
        var data = new XMLHttpRequest();
        data.open("GET", "http://127.0.0.1:8080/");
        data.onload = handleContents;
        data.onerror = function() {
            alert("There was an error getting the recipes");
        }
        data.send();
    }

    
    function handleContents(){
        var allRecipes = JSON.parse(this.responseText);
        for (var i = 0; i < allRecipes.length; i ++) {
            var container = document.createElement("div");
            container.className = "item";
            container.classList.add("recipeBox");
            if (i == 0) {
                container.classList.add("active");
            }
            //container.style.backgroundImage = 'url("Images/RecipeBackgrounds/' + i + '.png")';
            var title = document.createElement("h3");
            title.innerHTML = allRecipes[i]["title"].replace("\n", "");
            container.appendChild(title);
            var bean = document.createElement("p");
            bean.innerHTML = allRecipes[i]["bean"].replace("\n", "");
            bean.className = "bean";
            container.appendChild(bean);
            var servings = document.createElement("p");
            servings.innerHTML = "Servings: " + allRecipes[i]["servings"].replace("\n", "");
            servings.className = "servings";
            container.appendChild(servings);
            var time = document.createElement("p");
            time.innerHTML = "Time: " + allRecipes[i]["time"];
            time.className = "time";
            container.appendChild(time);
            var ingredientLine = allRecipes[i]["ingredients"].split("\n");
            var ingredinetList = document.createElement("div");
            ingredinetList.className = "ingredientList";
            for (var j = 0; j < ingredientLine.length; j ++) {
                if (ingredientLine[j] != "") {
                    var ingredients = document.createElement("p");
                    ingredients.innerHTML = ingredientLine[j];
                    ingredients.className = "ingredients";
                    ingredinetList.appendChild(ingredients);
                }
            }
            container.appendChild(ingredinetList);
            
            var instructionLine = allRecipes[i]["instructions"].split("\n");
            var instructions = document.createElement("div");
            instructions.className = "instructions";
            for (var j = 0; j < instructionLine.length; j ++) {
                if (instructionLine[j] != "") {
                    var instruction = document.createElement("p");
                    instruction.innerHTML = instructionLine[j];
                    instruction.className = "instruction";
                    instructions.appendChild(instruction);
                }
            }
            container.appendChild(instructions);
            
            document.getElementById("caro").appendChild(container);
        }
        var left = document.getElementById("left");
        left.onclick = changeImg;
        var right = document.getElementById("right");
        right.onclick = changeImg;
    }

    function changeImg() {
        
        
        var foodImg = document.getElementById("foodImg");
        var titleFull = document.querySelectorAll(".active")[0].innerHTML;
        var titlePart = titleFull.split("</h3>")[0];
        var title = titlePart.replace("<h3> ", "");
        var url = "Images/RecipeImages/" + title.replace(/ /g, "") + ".png";
        foodImg.src = url;
    }   
})();




/*
            var ingredientLine = allRecipes[i]["ingredients"].split("\n");
            var ingredinetList = document.createElement("ul");
            for (var i = 0; i < ingredientLine.length; i ++) {
                var ingredients = document.createElement("li");
                ingredients.innerHTML = ingredientLine[i];
                ingredients.className = "ingredients";
                ingredinetList.appendChild(ingredients);
            }
            container.appendChild(ingredinetList);
*/
