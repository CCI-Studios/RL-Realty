(function($) {
    var timer;
    var direction = "R";
    var $btnPrevious, $btnNext;

    $(function(){
        setup();
        start();
        hideArrows();
    });

    function setup()
    {
        createArrows();
        rows().first().addClass("active");
        container().on("mouseenter", pause).on("mouseleave", unpause);
    }
    function createArrows()
    {
        $btnPrevious = $("<a href='#' class='btn-previous btn-team-members'>Previous</a>");
        $btnPrevious.click(previousClick);
        container().before($btnPrevious);

        $btnNext = $("<a href='#' class='btn-next btn-team-members'>Next</a>");
        $btnNext.click(nextClick);
        container().after($btnNext);
    }
    function start()
    {
        timer = setInterval(timerNext, 5000);
    }

    function container()
    {
        return $(".view-team-members");
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

    function numPerPage()
    {
        return 3;
    }
    function rowWidth()
    {
        return 320;
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
        if (hasNext())
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
        if (isPaused())
        {
            return;
        }
        
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
    
    function pause()
    {
        container().addClass("paused");
    }
    function unpause()
    {
        container().removeClass("paused");
    }
    function isPaused()
    {
        return container().hasClass("paused");
    }
}(jQuery));
