//Global vars.
var parallax = [];

//Startup script
$(document).ready(function(){
  $(".smooth").smoothScroll({
    offset:-74,
    speed:"auto",
    autoCoefficient:2
  });
  addParallax("#window2","./media/voiceCello.jpg");
  addParallax("#window3","./media/voiceDrums.jpg");
  //Attach this function to scroll event.
  // TODO: use bootstrap .affix() to do this. http://getbootstrap.com/javascript/#affix
  $(window).scroll(function() {
    if(getScrollHeight() < 10){
      $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
    } else {
      $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
    }
  });
  //In case the page doesn't load on the Top.
  if(getScrollHeight() < 10){
    isTop = true;
    $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
  } else {
    isTop = false;
    $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
  }

  $.each(baristas,function(i,v){
    var role = "Barista";
    if(v.role){
      role = v.role;
    }
    var outerHTML = `
      <div class="person col col-md-4">
      <a id="` + i + `profile" href="https://aswwu.com/#/profile/` + v.username + `" target="_blank"></a>
      </div>`;
    $("#baristas").append(outerHTML);
    if(v.photo == "None"){
      $("#" + i + "profile").parent().remove();
      return false;
    }
    var html = `
      <div class="img-container">
        <img src="https://aswwu.com/media/img-sm/`+ v.photo + `" alt="`+ v.full_name + `">
      </div>
      <h3 class="name">`+ v.full_name + `</h3>
      <div class="position">`+ role + `</div>
    `;
    $("#" + i + "profile").append(html);
  });

  $(window).resize(function() {
    google.maps.event.trigger(map, "resize");
  })

});

//GLOBAL FUNCTIONS

//parallax handler
function addParallax(id, imgUrl) {
  $(id).css('background-image',"url(" + imgUrl + ")");
}

//Returns any of the valid scroll variables or zero if there is an error.
function getScrollHeight() {
  var height = 0;
  try {
    height = window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0
  }
  catch (e) {
    height = 0;
  }
  return height;
}

//Google maps stuff
function initMap() {
  var atlas = {lat: 46.049530, lng: -118.388233};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: atlas,
    disableDefaultUI: true,
    scrollwheel:false,
    zoomControl: true,
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
    content: "<a href='https://www.google.com/maps/dir//46.049527,-118.3882132/' target='_blank'>Get Directions</a>",
    pixelOffset: new google.maps.Size(-44,0)
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
