(function($) {
    var timer;
    var direction = "R";
    var $btnPrevious, $btnNext;
    var paused = false;

    $(function(){
        setup();
        start();
        hideArrows();
    });

    function setup()
    {
        createArrows();
        container().on("mouseenter", pause).on("mouseleave", unpause);
        rows().first().addClass("active");
    }
    function createArrows()
    {
        $btnPrevious = $("<a href='#' class='btn-previous btn-properties'>Previous</a>");
        $btnPrevious.click(previousClick);
        container().before($btnPrevious);

        $btnNext = $("<a href='#' class='btn-next btn-properties'>Next</a>");
        $btnNext.click(nextClick);
        container().after($btnNext);
    }
    function start()
    {
        timer = setInterval(timerNext, 5000);
    }

    function container()
    {
        return $(".view-properties, .view-special-rentals");
    }
    function slider()
    {
        return container().find(".view-content")
    }
    function rows()
    {
        return container().find(".views-row");
    }
    function currentRow()
    {
        return rows().filter(".active");
    }

    function previousClick()
    {
        stop();
        previousSlide();
        return false;
    }
    function nextClick()
    {
        stop();
        nextSlide();
        return false;
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

    function numPerPage()
    {
        return 3;
    }
    function rowWidth()
    {
        return 221;
    }

    function minIndex()
    {
        return 0;
    }
    function maxIndex()
    {
        return rows().length - numPerPage();
    }

    function hasPrevious()
    {
        var i = currentRow().index();
        i--;
        if (i < minIndex())
            return false;
        return true;
    }
    function hasNext()
    {
        var i = currentRow().index();
        i++;
        if (i > maxIndex())
            return false;
        return true;
    }

    function previousSlide()
    {
        if (hasPrevious())
        {
            slider().animate({
                "left":"+="+rowWidth()+"px"
            });
            currentRow().removeClass("active").prev().addClass("active");
            hideArrows();
        }
    }
    function nextSlide()
    {
        if (!paused && hasNext())
        {
            slider().animate({
                "left":"-="+rowWidth()+"px"
            });
            currentRow().removeClass("active").next().addClass("active");
            hideArrows();
        }
    }

    function hideArrows()
    {
        if (hasPrevious())
        {
            $btnPrevious.show();
        }
        else
        {
            $btnPrevious.hide();
        }

        if (hasNext())
        {
            $btnNext.show();
        }
        else
        {
            $btnNext.hide();
        }
    }

    function timerNext()
    {
        if (direction == "R")
        {
            if (hasNext())
            {
                nextSlide();
            }
            else
            {
                previousSlide();
                direction = "L";
            }
        }
        else
        {
            if (hasPrevious())
            {
                previousSlide();
            }
            else
            {
                nextSlide();
                direction = "R";
            }
        }
    }
}(jQuery));
