(function($) {
    $(function(){
        setup();
        $("body.page-search #edit-keys").focus();
    });
    
    function setup()
    {
        $("#search-block-form").click(searchButtonClick).find("input.form-text").click(preventBubble);
    }
    
    function searchButtonClick()
    {
        var $container = $(this).find("> div");
        if ($container.css("display") == "none")
        {
            $container.slideDown().find("input.form-text").focus();
        }
        else
        {
            $container.slideUp();
        }
    }
    function preventBubble(e)
    {
        e.preventDefault();
        return false;
    }
}(jQuery));
