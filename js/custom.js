//Startup script.
var top = true;
$(document).ready(function(){
  $(".smooth").smoothScroll({
    offset:-54,
    speed:"auto",
    autoCoefficient:2
  });
  //TODO: Design your own (faster) parallax.
  //$('#late').parallax({imageSrc: './media/late.jpg',bleed:10,naturalWidth:2000,naturalHeight:1333});
  $('#spilled_coffee').parallax({imageSrc: './media/spilled_coffee.jpg',bleed:10,naturalWidth:4288,naturalHeight:2848});
  $('#coffee-table').parallax({imageSrc: './media/coffee-table.jpg',bleed:10,naturalWidth:1280,naturalHeight:956});
  $('#atlas-coffee').parallax({imageSrc: './media/atlas-coffee.jpg',bleed:10,naturalWidth:1080,naturalHeight:1080});
  $(window).scroll(function(){
    if(top && document.body.scrollTop < 10){
      top = true;
      $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
    } else {
      top = false;
      $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
    }
  })
});

//Google maps stuff
function initMap() {
  var atlas = {lat: 46.049530, lng: -118.388233};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: atlas,
    disableDefaultUI: true,
    scrollwheel:false,
    styles: [
      {
        featureType: 'all',
        stylers: [
          {hue: "#ae8648"},
          {saturation: 70},
          {lightness: 0},
          {gamma: 1}
        ]
      },{
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ]
  });

  var image = {
    url: './media/coffeeMarker.png',
    anchor: new google.maps.Point(20,40),
    origin: new google.maps.Point(0, 0),
    size: new google.maps.Size(128, 128),
    scaledSize: new google.maps.Size(40,40)
  };
  var infowindow = new google.maps.InfoWindow({
    content: "<a href='https://www.google.com/maps/dir//46.049527,-118.3882132/' target='_blank'>Get Directions</a>"
  });
  var marker = new google.maps.Marker({
    position: atlas,
    map: map,
    icon: image
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
