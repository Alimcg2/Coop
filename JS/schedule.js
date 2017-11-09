

(function() {
    window.onload = function(){
        
        var ajax = new XMLHttpRequest();
        ajax.open("Get", "https://coop-67b9f.firebaseio.com/.json?auth=GHRtS7qTMMwBkh76LZhuSzDh0B4GRafqTZxqViuX");
        ajax.onload = handleData;
        ajax.send();

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyB0f1E9nd1YAINNM76KosV1zx0Ih-pFXI0",
            authDomain: "coop-67b9f.firebaseapp.com",
            databaseURL: "https://coop-67b9f.firebaseio.com",
            projectId: "coop-67b9f",
            storageBucket: "coop-67b9f.appspot.com",
            messagingSenderId: "487739461095"
        };
        firebase.initializeApp(config);
        
        var currentDate = new Date();
        var realDate = new Date();
        var dateTest = new Date();
        
        var data;
        var allTimes = [];
        var firstDay;
        var lastDay;

        function addTime(){
            allTimes.push(this);
            this.classList.add("clicked");
            this.onclick = removeTime;
        }
        function removeTime(){
            var index = allTimes.indexOf(this);
            allTimes.splice(index, 1);
            this.classList.remove("clicked");
            this.onclick = addTime;
        }
        
        function handleData(){
            data = JSON.parse(this.responseText);
            console.log(data);
            createOpenHours();
            addBookedHours()
            $("#prevWeek")[0].onclick = function() {
                $("#" + currentDate.getDay())[0].classList.remove("highlighted");
                $("#scheduler")[0].innerHTML = "";
                currentDate.setDate(currentDate.getDate() - 7);
                dateTest.setDate(dateTest.getDate() - 7);
                createOpenHours();
                addBookedHours();
            }
            $("#nextWeek")[0].onclick = function() {
                $("#" + currentDate.getDay())[0].classList.remove("highlighted");
                $("#scheduler")[0].innerHTML = "";
                currentDate.setDate(currentDate.getDate() + 7);
                dateTest.setDate(dateTest.getDate() + 7);
                createOpenHours();
                addBookedHours();
            }
            $("#submit")[0].onclick = function(){
                for (var i = 0; i < allTimes.length; i ++){
                    console.log(allTimes[i]);
                    var allElements = allTimes[i].parentElement.childNodes;
                    var dateNum = allElements[allElements.length - 1].id;
                    var dayNum = (allTimes[i].id).split(":")[1];
                    var timeNum = (allTimes[i].id).split(":")[0];
                    var db = firebase.database().ref("ScheduleQueue");
                    var date = dateNum.split("/");
                    var d = {
                        "Name": $("#name")[0].value,
                        "Month": date[0],
                        "Day": date[1], 
                        "Year": date[2],
                        "TimeStartHours": parseFloat(timeNum),
                        "TimeEndHours":  (parseFloat(timeNum) + .5),
                        "DayofWeek": dayNum,
                    }
                    db.push(d);
                }
                alert("You have submitted your time, please allow 2 minutes for changes to take affect.");
            };
        }
        
        function createOpenHours(){
            var week = $("#week");
            lastDay = currentDate.getDate();
            for (var i = currentDate.getDay(); i < 6; i ++) {
                lastDay ++;
            }
            firstDay = currentDate.getDate();
            for (var i = currentDate.getDay(); i > 0; i --) {
                firstDay --;
            }
            week[0].innerHTML =
                (currentDate.getMonth() + 1 +"/" + firstDay + "/" + currentDate.getFullYear()) + " - " +
                (currentDate.getMonth() + 1 +"/" + lastDay + "/" + currentDate.getFullYear());
            var parent = document.getElementById("scheduler");
            for (var i = 0; i < data["ScheduleOpen"].length; i ++){
                var d = data["ScheduleOpen"][i];
                if (d[0]["TimeStartHours"] != "N/A"){
                    var day = document.createElement("div");
                    day.classList.add("day");
                    day.id = d[4]["DayofWeek"];
                    parent.appendChild(day);
                    var title = document.createElement("h2");
                    title.classList.add("title");
                    title.innerHTML = d[5]["DayofWeekName"];
                    day.appendChild(title);
                    for (var t = parseInt(d[0]["TimeStartHours"]); t < parseInt(d[2]["TimeEndHours"]); t += .5){
                        var timeSlot = document.createElement("p");
                        var timeStart = t.toString();
                        if (timeStart.includes(".5")) {
                            timeStart = timeStart.replace(".5", ":30");
                        }
                        var timeEnd = (t + .5).toString();
                        if (timeEnd.includes(".5")) {
                            timeEnd = timeEnd.replace(".5", ":30");
                        }
                        timeSlot.innerHTML = timeStart + " - " +  timeEnd;
                        timeSlot.id = t + ":"+  d[5]["DayofWeekName"];
                        timeSlot.classList.add("timeSlot");
                        timeSlot.onclick = addTime;
                        day.appendChild(timeSlot);
                    }
                }
            }
            if (realDate.getDate() == currentDate.getDate() && realDate.getMonth() == currentDate.getMonth() && realDate.getFullYear() == currentDate.getFullYear()){
                var id = currentDate.getDay();
                if( $("#" + id)[0]){
                    $("#" + id)[0].classList.add("highlighted");
                }
            }
            addDates(firstDay, lastDay);
            
        }

        function addDates(firstDate, lastDate) {
            var num = 0;
            for (var i = firstDate; i < lastDate; i ++){
                var el = document.getElementById(num);
                if (el != null){
                    var span = document.createElement("span");
                    span.classList.add("hidden");
                    span.id = (currentDate.getMonth() + 1 +"/" + i + "/" + currentDate.getFullYear());
                    el.appendChild(span);
                }
                num ++;
            }
        }
        function cantAdd(){
            var slot = this;
            $("#addShift")[0].onclick =  function() {
                addShift(slot)
            }
            $("#removeShift")[0].onclick = function() {
                console.log("remove");
                $("#removeSure")[0].classList.remove("hidden");
                $("#yesRemove")[0].onclick = function(){
                    removeShift(slot);
                }
                $("#noRemove")[0].onclick = function(){
                    console.log("no");
                    $("#removeSure")[0].classList.add("hidden");
                    $("#change")[0].classList.add("hidden");
                }
                
            }
            $("#change")[0].classList.remove("hidden");
        }
        function addShift(slot){

            var db = firebase.database().ref("ScheduleQueue");
            var d = {
                "Name": $("#name")[0].value,
                "Month": "",
                "Day": "",
                "Year": "",
                "TimeStartHours": "",
                "TimeEndHours":"",
                "DayofWeek": "",
            }
            db.push(d);
        }
        function removeShift(slot){
            console.log(slot);
            var i = slot.childNodes[slot.childNodes.length -1 ].id;
            var db = firebase.database().ref("Schedule");
            db.child(i).remove();
        }
        
        function addBookedHours(){
            for (var i = 0; i < data["Schedule"].length; i ++) {
                var d =  data["Schedule"][i];
                if (d != null) {
                    if ((d[1]["Month"] == (currentDate.getMonth() + 1)) && (d[3]["Year"] == currentDate.getFullYear())){
                        if ( data["Schedule"][i][2]["Day"] >= firstDay &&  data["Schedule"][i][2]["Day"] <= lastDay){
                            
                            var timeEnd = ((d[5]["TimeEndHours"]) - .5);
                            var timeStart  = ((d[4]["TimeStartHours"]));
                            for (var t = timeStart; t <= timeEnd; t += .5){
                                var timeSlot = document.getElementById(t +":"+ d[6]["DayofWeek"]);
                                timeSlot.onclick = cantAdd;
                                timeSlot.classList.add("booked");
                                timeSlot.innerHTML += ": " + d[0]["Name"];
                                var span = document.createElement("span");
                                span.id = i;
                                timeSlot.appendChild(span);
                            }
                            
                        }
                    }
                }
                
            }
        }
        
    };

    
})();
