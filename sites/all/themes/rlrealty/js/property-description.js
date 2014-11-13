(function($) {
    $(function(){
        setup();
    });
    
    function setup()
    {
        description().addClass("active");
        
        $("<a href='#' class='btn-switch-description'>View Amenities</a>")
        .click(viewAmenities)
        .appendTo(description());
        
        $("<a href='#' class='btn-switch-description'>View Description</a>")
        .click(viewDescription)
        .appendTo(amenities());
        
        description().add(amenities()).append("<a href='/contact' class='btn-visit'>Visit or rent this property</a>");
        
        amenities().hide();
    }
    function container()
    {
        return $(".view-property, .view-special-rental");
    }
    function description()
    {
        return container().find(".views-field-field-description");
    }
    function amenities()
    {
        return container().find(".views-field-field-amenities");
    }
    
    function viewAmenities()
    {
        description().removeClass("active").fadeOut();
        amenities().addClass("active").fadeIn();
        return false;
    }
    function viewDescription()
    {
        amenities().removeClass("active").fadeOut();
        description().addClass("active").fadeIn();
        return false;
    }
}(jQuery));
