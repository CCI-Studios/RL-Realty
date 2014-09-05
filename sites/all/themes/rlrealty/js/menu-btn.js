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
        $("#block-system-main-menu").slideToggle();
        if ($("#search-block-form").css("display") == "none")
        {
            setTimeout(fadeInButtons, 300);
        }
        else
        {
            $("#search-block-form, #navigation a.fb").fadeOut(100);
        }
        
        return false;
    }
    
    function fadeInButtons()
    {
        $("#search-block-form, #navigation a.fb").fadeIn(100);
    }
}(jQuery));
