//Startup script.
var isTop;
var parallax = [];

//Startup script
$(document).ready(function(){
  $(".smooth").smoothScroll({
    offset:-54,
    speed:"auto",
    autoCoefficient:2
  });
  addParallax("#late","./media/late.jpg");
  addParallax("#spilled_coffee","./media/spilled_coffee.jpg");
  addParallax("#coffee-table","./media/coffee-table.jpg");
  addParallax("#atlas-coffee","./media/atlas-coffee.jpg");
  //Attach this function to scroll event.
  $(window).scroll(function() {
    if(!isTop && document.body.scrollTop < 10){
      isTop = true;
      $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
    } else {
      isTop = false;
      $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
    }
  });
  //In case the page doesn't load on the Top.
  if(document.body.scrollTop < 10){
    isTop = true;
    $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
  } else {
    isTop = false;
    $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
  }

  var button = "<div class='col col-xs-12 text-white text-xs-center'><a href='https://www.instagram.com/the_atlas/' target='about_blank' class='btn btn-primary'>Open with Instagram</a></div>";
  //Instagram feed stuff.
  $.getJSON("https://aswwu.com/server/atlas", function(data){
    var feed = ``;
    var count = 6;
    $.each(data.data, function(i,o){
      if(count <= 0){
        return false;
      }
      count--;
      var html = `
      <div class="col-md-6">
        <div class="fh5co-press-item to-animate fadeInUp animated">
					<a class="fh5co-press-img" href="` + o.link + `" style="background-image: url(` +  o.images.low_resolution.url+ `)">
						</a>
					<div class="fh5co-press-text">
						<p>` + o.caption.text + `</p>
					</div>
          <a href="`+ o.link + `" target="about_blank"><div class="fh5co-like text-black"><font color="red"> &hearts;</font> ` + o.likes.count + `</div></a>
				</div>
      </div>
          `;
      feed += html;
    })

    $("#atlasFeed").append(feed + button);
  }).fail(function(){
    $("#atlasFeed").append("<div class='col col-xs-12 text-xs-center'><p><font color='red'>Failed to fetch instagram content.</font></p></div>" + button);
  })
});

//PARALLAX STUFF
function addParallax(id, imgUrl) {
  $(id).css('background-image',"url(" + imgUrl + ")")
}

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
