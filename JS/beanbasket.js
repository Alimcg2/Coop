
(function() {
    window.onload = function(){

        var ajax = new XMLHttpRequest();
        ajax.open("Get", "https://coop-67b9f.firebaseio.com/.json?auth=GHRtS7qTMMwBkh76LZhuSzDh0B4GRafqTZxqViuX");
        ajax.onload = handleData;
        ajax.send();

        function handleData(){
            var data = JSON.parse(this.responseText)["Products"];
            var container = $("#mainContent");
            var keys = Object.keys(data);
            for (var i = 0; i < keys.length; i ++){
                var categories = document.createElement("div");
                categories.classList.add("category");
                var title = document.createElement("h2");
                title.innerHTML = keys[i];
                title.classList.add("categoryTitle");
                categories.appendChild(title);
                var hr = document.createElement("hr");
                hr.classList.add("hrMenu");
                categories.appendChild(hr);
                for (var j = 0; j < data[keys[i]].length; j ++){
                    var item = document.createElement("div");
                    item.classList.add("item");
                    item.innerHTML = data[keys[i]][j][0];
                    categories.appendChild(item);
                    var price = document.createElement("div");
                    price.classList.add("price");
                    price.innerHTML = data[keys[i]][j][1];
                    categories.appendChild(price);
                }
                container[0].appendChild(categories);
            }
        }
        
    };

    
})();
