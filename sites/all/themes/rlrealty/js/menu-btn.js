(function($) {
    $(function(){
        setup();
    });
    
    function setup()
    {
        $("#menu-btn").click(menuButtonClick);
    }
    
    function menuButtonClick()
    {
        $("#navigation .region-navigation").slideToggle();
    }
}(jQuery));
