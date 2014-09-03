(function($) {
    $(function(){
        setup();
    });
    
    function setup()
    {
        description().addClass("active");
        
        var $btnDescription = $("<a href='#' class='btn-switch-description'>View Amenities</a>");
        $btnDescription.click(viewAmenities);
        description().append($btnDescription);
        
        var $btnAmenities = $("<a href='#' class='btn-switch-description'>View Description</a>");
        $btnAmenities.click(viewDescription);
        amenities().append($btnAmenities);
        
        var minHeight = description().outerHeight();
        if (amenities().outerHeight() > minHeight) minHeight = amenities().outerHeight();
        description().add(amenities()).css("min-height", minHeight+"px");
        
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
