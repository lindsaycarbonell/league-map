console.log("start");

var mymap;
var mapData;
var markers = [];

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

      mymap = L.map('mapid').setView([35.28374272801905, -79.65396881103516], 7);
      //THE ZOOM IS SET UP HERE DUMMY

      var places = mapData;


      // L.tileLayer('https://api.mapbox.com/styles/v1/lindsaycarbonell/citeusxid006x2ip17zp0ed55/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w').addTo(mymap);
      L.tileLayer('https://api.mapbox.com/styles/v1/lindsaycarbonell/ciyuctvpo002k2rmx5xriumbr/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w').addTo(mymap);

      mymap.scrollWheelZoom.disable();

      $('#lister').append('<div><h2>' + places[0].name + '</h2><img class="list-img" src="assets/' + places[0].photo + '"/><a class="list-link link-button" href="' + places[0].website + '">Visit Website</a><a class="list-link link-button fb" href="' + places[0].facebook + '">Facebook</a></div>');



      for (var x = 1; x < places.length; x++){
        console.log(places[x].name + " " + x);


          console.log("not nc");
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


            console.log('markers is empty');
            markers.push(thisMarker);

            markers[x-1].addTo(mymap);
            console.log(markers[x]);
          }
        }


      function onClickMarker(){
          $('#lister').empty();
          if (this.presidents){
            $('#lister').append('<div><h2>' + this.name + '</h2><img class="list-img" src="assets/' + this.photo + '"/><h3 style="display:block;">President: ' + this.presidents + '</h3><a class="list-link link-button" href="' + this.website + '">Visit Website</a><a class="list-link link-button" href="' + this.facebook + '">Facebook</a></div>');
          } else {
            $('#lister').append('<div><h2>' + this.name + '</h2><img class="list-img" src="assets/' + this.photo + '"/><a class="list-link" href="' + this.website + '">Visit Website</a><a class="list-link" href="' + this.facebook + '">Facebook</a></div>');
          }

      }
