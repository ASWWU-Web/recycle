//Startup script.
var top = true;
var parallax = [];

//Startup script
$(document).ready(function(){
  $(".smooth").smoothScroll({
    offset:-54,
    speed:"auto",
    autoCoefficient:2
  });
  //TODO: Design your own (faster) parallax.
  //$('#late').parallax({imageSrc: './media/late.jpg',bleed:10,naturalWidth:2000,naturalHeight:1333});
  addParallax("late","./media/late.jpg");
  addParallax("spilled_coffee","./media/spilled_coffee.jpg");
  addParallax("coffee-table","./media/coffee-table.jpg");
  addParallax("atlas-coffee","./media/atlas-coffee.jpg");
  // $('#spilled_coffee').parallax({imageSrc: './media/spilled_coffee.jpg',bleed:10,naturalWidth:4288,naturalHeight:2848});
  // $('#coffee-table').parallax({imageSrc: './media/coffee-table.jpg',bleed:10,naturalWidth:1280,naturalHeight:956});
  // $('#atlas-coffee').parallax({imageSrc: './media/atlas-coffee.jpg',bleed:10,naturalWidth:1080,naturalHeight:1080});
  //Attach this function to scroll event.
  $(window).scroll(function() {
    if(top && document.body.scrollTop < 10){
      top = true;
      $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
    } else {
      top = false;
      $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
    }
    updateParallax();
  });
  //In case the page doesn't load on the top.
  if(top && document.body.scrollTop < 10){
    top = true;
    $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
  } else {
    top = false;
    $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
  }
});

//PARALLAX STUFF
function addParallax(id, imgUrl) {
  var offset = $("#" + id).offset().top;
  $("#" + id).append("<div id='sub-" + id + "' class='bg-parallax'></div>")
  .children(".bg-parallax")
  .css('background-image',"url(" + imgUrl + ")")
  .css("transform","translatey(-300px)");

  parallax.push({
    "id":id,
    "url":imgUrl,
    //"height": height,
    "offset":offset
  });

  // //IDEA: Instead of having static heights use the img height.
  // $(id).append("<img class='bg-parallax' src="+ imgUrl +"></img>")
  //   .children("img")
  //   //.children(".bg-parallax")
  //   //.css('background-image',"url(" + imgUrl + ")")
  //   .css("transform","translatey(-120px)");
  // //Get IMG height.
  // var height = 0;
  // var img = new Image();
  // img.onload = function() {
  //   height = this.height;
  //   //push info to array
  //   parallax.push({
  //     "id":id,
  //     "url":imgUrl,
  //     "height": height,
  //     "offset":offset
  //   });
  // }
  // img.src = imgUrl;
}
function updateParallax(){

  var scrollTop = document.body.scrollTop;
  var winHeight = window.innerHeight;
  // $.each(parallax, function(i,o){
  //   //var move = scrollTop -
  //   if(-120 < move && move < 0){
  //     $(o.id + " > .bg-parallax").css("transform","translateY(" + move + "px)");
  //   }
  // })
  // parallax.forEach(function(o){
  //
  //   var move = (scrollTop - o.offset) * 300 / winHeight;
  //   //console.log(move, scrollTop, o.offset, winHeight);
  //   if(-300 < move && move < 300){
  //     $(o.id + " > .bg-parallax").css("transform","translateY(" + move + "px)");
  //   }
  // })
  var length = parallax.length;
  for (var i = 0; i < length; i++){
    var move = (scrollTop - parallax[i].offset) * 300 / winHeight;
    //console.log(move, scrollTop, o.offset, winHeight);
    if(-300 < move && move < 300){
      $("#sub-" + parallax[i].id).css("transform","translateY(" + move + "px)");
    }
  }
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
