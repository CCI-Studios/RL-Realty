(function($) {
    $(function(){
        $(".view-header-slideshow .views-field-nothing").on("mouseenter mouseleave", toggleSlideBody);
    });

    function toggleSlideBody()
    {
        $(this).find(".views-field-body").slideToggle();
    }
}(jQuery));
