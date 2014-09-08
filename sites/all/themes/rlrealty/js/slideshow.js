(function($) {
    var timer;
    var paused = false;

    $(function(){
        setup();
    });

    function setup()
    {
        container().find(".views-field-nothing").on("mouseenter mouseleave", toggleSlideBody);
        container().on("mouseenter", pause).on("mouseleave", unpause);
        rows().first().addClass("active").show();

        createIndicators();

        timer = setInterval(nextSlide, 5000);
    }
    function createIndicators()
    {
        var $ul = $("<ul id='indicators' />");
        rows().each(function(i){
            var $li = $("<li><a href='#'>Go to slide "+i+"</a></li>");
            $li.click(function(){
                indicatorClick(i);
            });
            if (i == 0) $li.addClass("active");
            $ul.append($li);
        });
        container().append($ul);
    }

    function toggleSlideBody()
    {
        $(this).find(".views-field-body").stop(true, false).slideToggle();
    }

    function container()
    {
        return $(".view-header-slideshow");
    }
    function rows()
    {
        return container().find(".views-row");
    }
    function currentRow()
    {
        return rows().filter(".active");
    }
    function indicators()
    {
        return container().find("#indicators li");
    }

    function indicatorClick(i)
    {
        stop();
        gotoSlide(i);
    }
    function gotoSlide(i)
    {
        if (i == currentRow().index()) return;
            
        currentRow().css("z-index", "2").removeClass("active").fadeOut(600);

        rows().eq(i).css({
            "z-index":"1",
            "display":"block",
            "opacity":"1"
        }).addClass("active");

        var $indicators = indicators();
        $indicators.removeClass("active").eq(i).addClass("active");
    }

    function nextSlide()
    {
        if (!paused)
        {
            gotoSlide(nextIndex());
        }
    }
    function nextIndex()
    {
        var i = currentRow().index();
        i++;
        if (i > maxIndex())
        {
            i = minIndex();
        }
        return i;
    }
    function maxIndex()
    {
        return rows().length -1;
    }
    function minIndex()
    {
        return 0;
    }

    function stop()
    {
        clearInterval(timer);
    }
    function pause()
    {
        paused = true;
    }
    function unpause()
    {
        paused = false;
    }
}(jQuery));
