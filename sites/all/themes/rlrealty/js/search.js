(function($) {
    $(function(){
        setup();
        $("body.page-search #edit-keys").focus();
    });
    
    function setup()
    {
        $("#search-block-form")
        .click(toggleSearchBox)
        .find("input.form-text")
        .click(preventBubble)
        .on("blur", toggleSearchBox);
    }
    
    function toggleSearchBox()
    {
        var $container = $("#search-block-form > div");
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
