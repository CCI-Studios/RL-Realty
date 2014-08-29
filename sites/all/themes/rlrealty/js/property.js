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
        layout();
        $(window).resize(layout);
    }
    function createArrows()
    {
        $btnPrevious = $("<a href='#' class='btn-previous btn-property'>Previous</a>");
        $btnPrevious.click(previousClick);
        container2().before($btnPrevious);

        $btnNext = $("<a href='#' class='btn-next btn-property'>Next</a>");
        $btnNext.click(nextClick);
        container2().after($btnNext);
    }
    function start()
    {
        timer = setInterval(timerNext, 5000);
    }

    function layout()
    {
        var width1 = $("#block-system-main").width()*0.6;
        var width2 = ($(window).width()-$("#block-system-main").width())/2;
        var width = width1 + width2;
        if (width > 720)
        {
            width = 720;
            width2 = 720 - width1;
        }
        container1().add(container2()).width(width).css("left","-"+width2+"px");

        thumbnails().each(function(){
            $(this).width(Math.floor(width/numPerPage()));
        });
    }

    function container1()
    {
        return $(".view-property .views-field-field-images-1");
    }
    function container2()
    {
        return $(".view-property .views-field-field-images");
    }
    function slider()
    {
        return container2().find(".field-content")
    }
    function rows()
    {
        return container1().find("li");
    }
    function thumbnails()
    {
        return container2().find("li");
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
        return 6;
    }
    function rowWidth()
    {
        return thumbnails().first().width();
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
