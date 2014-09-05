(function($) {
    $(function(){
        setup();
        $("body.page-search #edit-keys").focus();
    });
    
    function setup()
    {
        $("#search-block-form").click(searchButtonClick);
    }
    
    function searchButtonClick()
    {
        $(this).find("> div").slideDown().find("input.form-text").focus();
    }
}(jQuery));
