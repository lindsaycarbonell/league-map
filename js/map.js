console.log("start");

var mymap;
var mapData;

window.onload = function() { init() };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1mMysqBwttNhm_BsvO9m8Mv9rDZUFUy7BcL9_DRm72qk/pubhtml?gid=0&single=true';

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: build,
                     simpleSheet: true } );
  }



  function build(data){
    // console.log("sucessfully processed");
    // console.log(data[0]);
    lats = [];
    longs = [];
    for (i in data){
      // console.log(data[i].lat);
    }
    mapData = data;
    buildMap(mapData);

  }



    function buildMap(mapData) {

      mymap = L.map('mapid').setView([35.7595731, -79.01929969999998], 7);
      //THE ZOOM IS SET UP HERE DUMMY

      var places = mapData;
      var markers = [];

      L.tileLayer('https://api.mapbox.com/styles/v1/lindsaycarbonell/citeusxid006x2ip17zp0ed55/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w').addTo(mymap);

      mymap.scrollWheelZoom.disable();


      for (var x in places){

        var thisIcon = L.icon({
          iconUrl: 'assets/map-scott.png',
          iconSize:     [38, 38], // size of the icon
          iconAnchor:   [22, 38], // point of the icon which will correspond to marker's location
          popupAnchor:  [-3, -45] // point from which the popup should open relative to the iconAnchor

        });

        var thisMarker = L.marker([places[x].lat, places[x].long], {icon: thisIcon})
            .on('click', onClickMarker.bind(places[x]))
            .bindPopup("<h2>" + places[x].name + "</h2>" )
            .openPopup();

        // console.log(thisMarker);
        markers.push(thisMarker);
        // console.log("markers: " + markers);
        markers[x].addTo(mymap);
      }

      function onClickMarker(){
          $('#view-all').show();
          $('#lister').empty();
          $('#lister').append('<div><h2>' + this.name + '</h2><h3 style="display:block;">President: ' + this.presidents + '</h3><img class="list-img" src="http://placehold.it/350x200/"/><a class="list-link" href="' + this.website + '">Visit Website</a><a class="list-link" href="' + this.facebook + '">Visit Facebook</a></div>');
      }



    }

    $('#view-all').on('click', function(){
      $('#lister').empty();
      $('#view-all').hide();
      console.log(mapData);
      for (var x in mapData){
        $('#lister').append('<div><h2>' + mapData[x].name + '</h2><h3 style="display:block;">President: ' + mapData[x].presidents + '</h3><img class="list-img" src="http://placehold.it/350x200/"/><a class="list-link" href="' + mapData[x].website + '">Visit Website</a><a class="list-link" href="' + mapData[x].facebook + '">Visit Facebook</a></div>');
      }


    });
