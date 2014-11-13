(function($) {
    var timer;
    var paused = false;

    $(function(){
        setup();
    });

    function setup()
    {
        container().find(".views-row").on("mouseenter mouseleave", toggleSlideBody);
        container().on("mouseenter", pause).on("mouseleave", unpause);
        rows().first().addClass("active").show();
        
        createArrows();

        timer = setInterval(nextInterval, 5000);
    }
    function createArrows()
    {
        $("<a class='btn-previous' href='#'>Previous</a>")
        .click(clickPrevious)
        .prependTo(container());
        
        $("<a class='btn-next' href='#'>Next</a>")
        .click(clickNext)
        .appendTo(container());
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
            
        currentRow()
        .css({
            "z-index": "2",
            "position":"absolute"
        }).removeClass("active").fadeOut(600);

        rows().eq(i).stop(true,true).css({
            "z-index":"1",
            "display":"block",
            "opacity":"1",
            "position":"relative"
        }).addClass("active");

        var $indicators = indicators();
        $indicators.removeClass("active").eq(i).addClass("active");
    }

    function nextSlide()
    {
        gotoSlide(nextIndex());
    }
    function previousSlide()
    {
        gotoSlide(previousIndex());
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
    function previousIndex()
    {
        var i = currentRow().index();
        i--;
        if (i < minIndex())
        {
            i = maxIndex();
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
    
    function nextInterval()
    {
        if (!paused)
        {
            nextSlide();
        }
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
    
    function clickPrevious()
    {
        stop();
        previousSlide();
        return false;
    }
    function clickNext()
    {
        stop();
        nextSlide();
        return false;
    }
}(jQuery));
