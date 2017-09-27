
(function() {
    window.onload = function(){
        var $ = function(id) {return document.getElementById(id);};
        
        var ajax = new XMLHttpRequest();
        ajax.open("Get", "https://coop-67b9f.firebaseio.com/.json?auth=GHRtS7qTMMwBkh76LZhuSzDh0B4GRafqTZxqViuX");
        ajax.onload = handleData;
        ajax.send();

        function handleData(){
            var data = JSON.parse(this.responseText);
            console.log(data);
        }
    };

    
})();
