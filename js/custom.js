//Startup script.
var parallax = [];

//Startup script
$(document).ready(function(){
  $(".smooth").smoothScroll({
    offset:-74,
    speed:"auto",
    autoCoefficient:2
  });
  addParallax("#late","./media/IMG_6201.jpg");
  addParallax("#spilled_coffee","./media/Sept.%2017-2.jpg");
  //addParallax("#coffee-table","./media/coffee-table.jpg");
  addParallax("#atlas-coffee","./media/Sept.%2017-6.jpg");
  //Attach this function to scroll event.
  // TODO: use bootstrap .affix() to do this. http://getbootstrap.com/javascript/#affix
  $(window).scroll(function() {
    if(document.body.scrollTop < 10){
      $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
    } else {
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
  $.getJSON("https://aswwu.com/server/feed?name=atlas", function(data){
    var feed =``;
    $.each(data.data, function(i,o){
      if(i >= 6){
        return false;
      }
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
    });

    $("#atlasFeed").append(feed + button);
  }).fail(function(){
    $("#atlasFeed").append("<div class='col col-xs-12 text-xs-center'><p><font color='red'>Failed to fetch instagram content.</font></p></div>" + button);
  });

  //Add baristas.
  var baristas = [{"user":"jonathan.fitch","role":"Manager","full_name":"Jonathan Fitch","photo":"profiles/1617/01864-2024483.jpg"},{"user":"austin.mock","role":"Assistant Manager","full_name":"Austin Mock","photo":"profiles/1617/00975-2001055.jpg"},{"user":"austin.thomson","full_name":"Austin-Neil Thomson","photo":"profiles/1617/02490-2022518.jpg"},{"user":"brennan.hoenes","full_name":"Brennan Hoenes","photo":"profiles/1617/02100-1496419.jpg"},{"user":"joshua.huh","full_name":"Joshua Huh","photo":"profiles/1617/01018-1499491.jpg"},{"user":"lindsey.haffner","full_name":"Lindsey Haffner","photo":"profiles/1617/01861-2002773.jpg"},{"user":"nicholas.chebeleu","full_name":"Nicholas Chebeleu","photo":"profiles/1617/02525-2012265.jpg"},{"user":"nicolas.ribeiro","full_name":"Nicolas Ribeiro","photo":"profiles/1617/02571-2013572.jpg"},{"user":"Nicolette.Horning","full_name":"Nicolette Horning","photo":"profiles/1617/00430-2038764.jpg"},{"user":"ryan.thorpe","full_name":"Ryan Thorpe","photo":"profiles/1516/03618-1486927.jpg"},{"user":"sarah.fandrich","full_name":"Sarah Fandrich","photo":"profiles/1617/02528-1496247.jpg"}];

  $.each(baristas,function(i,v){
    var role = "Barista";
    if(v.role){
      role = v.role;
    }
    var outerHTML = `
      <div class="person col col-md-4">
      <a id="` + i + `profile" href="https://aswwu.com/#/profile/` + v.user + `" target="_blank"></a>
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

//PARALLAX STUFF
function addParallax(id, imgUrl) {
  $(id).css('background-image',"url(" + imgUrl + ")");
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
