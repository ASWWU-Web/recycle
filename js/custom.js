//Startup script.
var parallax = [];
var baristas =[];

//Startup script
$(document).ready(function(){
  $(".smooth").smoothScroll({
    offset:-74,
    speed:"auto",
    autoCoefficient:2
  });
  addParallax("#late","./media/late.jpg");
  addParallax("#spilled_coffee","./media/spilled_coffee.jpg");
  addParallax("#coffee-table","./media/coffee-table.jpg");
  addParallax("#atlas-coffee","./media/atlas-coffee.jpg");
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

  //Add baristas.
  baristas = [
    {"user":"jonathan.fitch","role":"Mangager"},
    {"user":"austin.mock","role":"Assistant Manager"},
    {"user":"austin.thomson"},
    {"user":"brennan.hoenes"},
    {"user":"joshua.huh"},
    {"user":"lindsey.haffner"},
    {"user":"nicholas.chebeleu"},
    {"user":"nicolas.ribeiro"},
    {"user":"nicolette.horning"},
    {"user":"ryan.thorpe"},
    {"user":"stephanie.smith2"},
    {"user":"Sarah.Fandrich"}
  ]

  // TODO: Make this better. (There is a chance that the order is not preserved due to the asynchronous nature of ajax requrests). 
  $.each(baristas,function(i,v){
    if(v.role){
      var role = v.role;
    } else {
      var role = "Barista";
    }
    $.get('https://aswwu.com/server/profile/1516/' + v.user, function(data) {
      console.log("working on " , v.user, data);
      if(data.error){
        //$("#baristas").append('<div class="col col-xs-12" style="color:red;">Could not fetch users.</div>');
        return false;
      }
      if(data.photo == "None"){
        return false;
      }
      var html = `
        <div class="person col col-md-4">
         <a href="https://aswwu.com/#/profile/` + v.user + `" target="_blank">
          <div class="img-container">
            <img src="https://aswwu.com/media/img-sm/`+ data.photo + `" alt="`+ data.full_name + `">
          </div>
          <h3 class="name">`+ data.full_name + `</h3>
          <div class="position">`+ role + `</div>
        </a>
      </div>
      `;
      $("#baristas").append(html);
    }).fail(function(){
      $("#baristas").append('<div class="col col-xs-12" style="color:red;">Could not fetch users.</div>');
    })
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
