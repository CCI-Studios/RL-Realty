(function($) {
    $(function(){
        if ($("body").hasClass("front"))
            setup();
    });
    
    function setup()
    {
        region().addClass("active-news");
        headings().click(headingClick);
    }
    function region()
    {
        return $(".region-content");
    }
    function containers()
    {
        return $("body.front .region-content .block-views");
    }
    function contents()
    {
        return containers().find(".content");
    }
    function headings()
    {
        return containers().find("> div > div > h2");
    }
    
    function headingClick()
    {
        var id = $(this).parents(".block-views").attr("id");
        var $region = region().removeClass("active-news active-events active-properties active-eat-play");
        if (id.indexOf("news") > -1)
        {
            $region.addClass("active-news");
        }
        else if (id.indexOf("events") > -1)
        {
            $region.addClass("active-events");
        }
        else if (id.indexOf("properties") > -1)
        {
            $region.addClass("active-properties");
        }
        else if (id.indexOf("eat-play") > -1)
        {
            $region.addClass("active-eat-play");
        }

        return false;
    }
}(jQuery));
