(function() {
    window.onload = function() {
        var $ = function(id){return document.getElementById(id);};
        $("submit").onclick = getTextReady;
        
            
    }
    function getTextReady() {
        var all = document.querySelectorAll(".toChange");
        for(var i = 0; i < all.length; i ++) {
            // not sure if this is supposed to be null or ""
            if (all[i].value != null) {
                // send what to update, and the updated text to the php script
                submitText(all[i].id, all[i].innerHTML);
            }
        }
    }
    
    function submitText(type, text) {
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "setVariables.php");
        ajax.onload = function(){
            alert("Your changes have been made");
        }
        var data = new FormData();
        data.append("type", type);
        data.append("text", text);
        ajax.send(data);
    }
})();
