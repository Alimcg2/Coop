
(function() {
    window.onload = function(){

        var ajax = new XMLHttpRequest();
        ajax.open("Get", "https://coop-67b9f.firebaseio.com/.json?auth=GHRtS7qTMMwBkh76LZhuSzDh0B4GRafqTZxqViuX");
        ajax.onload = handleData;
        ajax.send();

        function handleData(){
            var data = JSON.parse(this.responseText);
            var about = data["About"];
            for (var i = 0; i < about.length; i ++) {
            }
        }
        
        // initialize Packery
        var $grid = $('.grid').packery({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            gutter: 10,
            // columnWidth helps with drop positioning
            columnWidth: 0
        });

        // make all grid-items draggable
        $grid.find('.grid-item').each( function( i, gridItem ) {
            var draggie = new Draggabilly( gridItem );
            // bind drag events to Packery
            $grid.packery( 'bindDraggabillyEvents', draggie );
        });
        console.log($grid);
    };

    
})();
