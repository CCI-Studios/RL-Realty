(function($) {
    var map;
    var geocoder;
    var infowindow;

    $(function(){
        if ($("#block-views-eat-play-block").length > 0)
            mapInit();
    });

    function mapInit()
    {
        $("#block-views-eat-play-block").after("<div id='gmap'></div>");
        
        geocoder = new google.maps.Geocoder();
        var mapOptions = {
            zoom: getZoom(),
            mapTypeControl: false,
            scrollwheel: false,
            streetViewControl: false,
            zoomControlOptions: {position: google.maps.ControlPosition.TOP_RIGHT}
        }
        map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
        
        google.maps.event.addListener(map, 'click', function() {
            if (infowindow)
                infowindow.close();
        });

        var firstAddress = $(".view-eat-play .views-row-first .views-field-field-address .field-content").text();
        showMap(firstAddress);
        showMarkers();
    }
    function getZoom()
    {
        return 13;
    }

    function showMarkers()
    {
        $(".view-eat-play .views-row").each(function(i){
            var address = $(this).find(".views-field-field-address .field-content").text();
            var type = $(this).find(".views-field-field-business-type .field-content").text().toLowerCase();
            var title = $(this).find(".views-field-title .field-content").text();
            var phone = $(this).find(".views-field-field-phone .field-content").text();
            var website = $(this).find(".views-field-field-website .field-content").text();
            var args = {
                "address":address,
                "type":type,
                "title":title,
                "phone":phone,
                "website":website,
                "index":i
            };
            getAddressLatLng(address, showMarkerLatLng, args);
        });
    }
    function showMarkerLatLng(latlng, address, args)
    {
        var marker = new google.maps.Marker({
            "map": map,
            "position": latlng,
            "icon": getMarkerIcon(args.type),
            "title": args.title
        });
        google.maps.event.addListener(marker, 'click', showInfo);
        $(".view-eat-play .views-row").eq(args.index).click(showInfo);
        
        function showInfo()
        {
            if (infowindow)
                infowindow.close();
            var content = "<div style='height:75px;'><h3>"+args.title+"</h3>";
            content += "<p>"+args.address;
            if (args.phone || args.website)
            {
                content += "<br />";
                if (args.phone)
                    content += args.phone;
                if (args.phone && args.website)
                    content += " | ";
                if (args.website)
                    content += "<a href='"+args.website+"' target='_blank'>Website</a>";
            }
            content += "</p></div>";
            infowindow = new google.maps.InfoWindow({
                "content": content,
                "maxWidth": 250
            });
            marker.anchorPoint = new google.maps.Point(0, -59);
            infowindow.open(map, marker);
        }
    }
    function getMarkerIcon(type)
    {
        var icon = "/sites/all/themes/rlrealty/img/map-marker-";

        if (type != "play" && type != "movies" && type != "eat")
        {
            type = "play";
        }
        icon += type + ".png";
        
        return {
            "url":icon,
            "anchor":new google.maps.Point(20,59),
        };
    }

    function showMap(address)
    {
        getAddressLatLng(address, showMapLatLng);
    }
    function showMapLatLng(latlng)
    {
        map.setCenter(latlng);
    }

    function getAddressLatLng(address, callback, args)
    {
        geocoder.geocode( { 'address':address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location, address, args);
            } else {
                //alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}(jQuery));
