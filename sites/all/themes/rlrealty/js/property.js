(function($) {
    var activeIndex = 0;
    var thumbnailIndex = 0;
    var timer;
    var direction = "R";
    var $btnPrevious, $btnNext;
    var paused = false;

    $(function(){
        if (container1().length > 0)
            setup();
    });

    function setup()
    {
        createArrows();
        createIndicators();
        rows().first().addClass("active");
        thumbnails().first().addClass("active");
        indicators().first().addClass("active")
        thumbnails().click(thumbnailClick);
        layout();
        hideArrows();
        container1().add(container2()).on("mouseenter", pause);
        container1().add(container2()).on("mouseleave", unpause);
        $(window).resize(layout).load(layout);
        start();
    }
    function createArrows()
    {
        $btnPrevious = $("<a href='#' class='btn-previous btn-property'>Previous</a>");
        $btnPrevious.click(previousClick);
        container2().prepend($btnPrevious);

        $btnNext = $("<a href='#' class='btn-next btn-property'>Next</a>");
        $btnNext.click(nextClick);
        container2().append($btnNext);
    }
    function createIndicators()
    {
        var $ul = $("<ul id='property-indicators' />");
        rows().each(function(i){
            var $li = $("<li><a href='#'>"+i+"</a></li>");
            $li.click(function(){
                indicatorClick(i);
                return false;
            });
            $ul.append($li);
        });
        container1().append($ul);
    }
    function start()
    {
        timer = setInterval(timerNext, 3000);
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
        if (width % numPerPage())
        {
            var rem = width%numPerPage();
            width2 += rem;
            width += rem;
        }
        width--;
        if (isTablet())
        {
            width = $(window).width();
        }
        container1().add(container2()).width(width).css("left","-"+width2+"px");
        
        var height = width*0.527777;
        container1().height(height);
        container2().css("top", height+"px");
        
        $("#main-wrapper").css("min-height", height + container2().height() + "px");

        thumbnails().each(function(){
            $(this).width(Math.ceil(width/numPerPage()));
        });
        
        moveThumbnails();
    }
    function isTablet()
    {
        return $(window).width() <= 800;
    }

    function container1()
    {
        return $(".view-property .views-field-field-images-1, .view-special-rental .views-field-field-images-1");
    }
    function container2()
    {
        return $(".view-property .views-field-field-images, .view-special-rental .views-field-field-images");
    }
    function slider()
    {
        return container2().find(".item-list")
    }
    function rows()
    {
        return container1().find(".field-content li");
    }
    function thumbnails()
    {
        return container2().find("li");
    }
    function indicators()
    {
        return $("#property-indicators li");
    }
    function currentRow()
    {
        return rows().filter(".active");
    }

    function indicatorClick(i)
    {
        stop();
        gotoSlide(i);
    }
    function thumbnailClick()
    {
        stop();
        var i = $(this).index();
        gotoSlide(i);
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
        if ($(window).width() <= 480)
        {
            return 3;
        }
        if ($(window).width() <= 768)
        {
            return 4;
        }
        if ($(window).width() <= 1024)
        {
            return 5;
        }
        
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
        return rows().length - 1;
    }
    function minThumbnailIndex()
    {
        return 0;
    }
    function maxThumbnailIndex()
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
            gotoSlide(activeIndex-1);
        }
    }
    function nextSlide()
    {
        if (hasNext())
        {
            gotoSlide(activeIndex+1);
        }
    }
    
    function gotoSlide(i)
    {
        if (i == activeIndex) return;
            
        currentRow().css("z-index",10).removeClass("active").fadeOut();
        rows().eq(i).css("z-index",2).addClass("active").show();
        thumbnails().removeClass().eq(i).addClass("active");
        indicators().removeClass().eq(i).addClass("active");
        activeIndex = i;
        hideArrows();
        moveThumbnails();
    }
    
    function moveThumbnails()
    {
        updateThumbnailIndex();
        
        var left = thumbnailIndex * rowWidth() * -1;
        slider().stop(true, true).animate({
            "left":left+"px"
        });
    }
    function updateThumbnailIndex()
    {
        if (activeIndex < thumbnailIndex)
        {
            thumbnailIndex = activeIndex;
        }
        else if (activeIndex > thumbnailIndex + numPerPage() - 2)
        {
            thumbnailIndex = activeIndex - numPerPage() + 1;
        }
        
        if (thumbnailIndex < minThumbnailIndex())
            thumbnailIndex = minThumbnailIndex();
        
        if (thumbnailIndex > maxThumbnailIndex())
            thumbnailIndex = maxThumbnailIndex();
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
        if (paused) return;
            
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
        paused = true;
    }
    function unpause()
    {
        paused = false;
    }
}(jQuery));
