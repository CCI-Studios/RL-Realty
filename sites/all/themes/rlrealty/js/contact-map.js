(function($) {
    var map;
    var geocoder;

    $(function(){
        if ($("#gmap-contact").length > 0)
            mapInit();
    });

    function mapInit()
    {    
        geocoder = new google.maps.Geocoder();
        var mapOptions = {
            zoom: getZoom(),
            mapTypeControl: false,
            scrollwheel: false,
            streetViewControl: false,
            zoomControlOptions: {position: google.maps.ControlPosition.TOP_RIGHT}
        }
        map = new google.maps.Map(document.getElementById('gmap-contact'), mapOptions);


        var address = "notre dame, indiana";
        showMap(address);
        showMarker(address);
    }
    function getZoom()
    {
        return 13;
    }

    function showMarkerLatLng(latlng, address, args)
    {
        var marker = new google.maps.Marker({
            "map": map,
            "position": latlng
        });
    }

    function showMap(address)
    {
        getAddressLatLng(address, showMapLatLng);
    }
    function showMarker(address)
    {
        getAddressLatLng(address, showMarkerLatLng);
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
