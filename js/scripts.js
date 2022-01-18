

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//array of location
var myArray = [
{
  name:'AbhaCenters',
  position:{lat:18.214454926349504,lng: 42.49875099955248},
  title:`<div id="content">
  <div  id ="station"> محطةأبها  </div><hr>
  <div id="details"> <i class='far fa-clock'></i>نعمل على مدار الساعه </div>
  ابها
  
    </div>`
},
{
  name:'RiyadhtestCenters',
  position:{lat:24.829711599593548,lng:46.72418804546476}, 
  title:
  `<div id="content">
<div  id ="station">محطة مطار الرياض   </div><hr>
<div id="details"> <i class='far fa-clock'></i>نعمل على مدار الساعه </div>
الرياض

  </div>`
},
{ 
  name:'RiyadhtestCenters',
  position:{lat:24.66228732272091,lng:46.73805874608075}, 
  title:
  `<div id="content">
<div  id ="station"> محطة الملز   </div><hr>
<div id="details"> <i class='far fa-clock'></i>نعمل على مدار الساعه </div>
الرياض

  </div>`
},
{ 
  name:'RiyadhtestCenters',
  position:{lat:24.630921484338096,lng:46.78351730314091}, 
  title:
  `<div id="content">
<div  id ="station"> محطة جنوب الرياض </div><hr>
<div id="details"> <i class='far fa-clock'></i>نعمل على مدار الساعه </div>
الرياض

  </div>`
},
{
  name:'RiyadhtestCenters',
  position:{lat:24.11672279387588,lng:47.25555081664364}, 
  title: `<div id="content">
<div  id ="station"> محطة الخرج  </div><hr>
<div id="details"> <i class='far fa-clock'></i>نعمل على مدار الساعه </div>

الرياض
  </div>`
},
{
  name:'DammamCenters',
  position:{lat:26.383773288623935,lng:50.120080487758386},
  title:`<div id="content">
  <div  id ="station"> محطة الدمام </div><hr>
  <div id="details"> <i class='far fa-clock'></i>نعمل على مدار الساعه </div>
  الدمام
  
    </div>`
},
{         
  name:'JeddahCenters',
  position:{lat:22.51267671939449,lng: 39.801214573758486},
  title:
  `<div id="content">
<div  id ="station"> محطة مكة </div><hr>
<div id="details"> <i class='far fa-clock'></i>نعمل على مدار الساعه </div>

جدة
  </div>`
},
{  
  name:'JeddahCenters',
  position:{lat:21.501382112155294, lng:39.25468133203821},
  title:`<div id="content">
  <div  id ="station"> محطة جدة </div><hr>
  <div id="details"> <i class='far fa-clock'></i>نعمل على مدار الساعه </div>
  
  جدة
    </div>`
}
];

    
function initMap(){

  const map = new google.maps.Map(document.getElementById("map"),{
  center:{lat:24.774265 ,lng:46.738586 },
  zoom:5
  });
  const allCitiesName = document.querySelectorAll(".cityName");
 //function thats show markers
  function MarkerFunction(city){
    myArray.forEach(loc=>{
    if(loc.name == city){
      var marker = new google.maps.Marker({
        position:loc.position,
        map:map  ,
        title:loc.title
      });

       //  marker Listener
      marker.addListener("click", () => {
       //content of show details
       var infowindow = new google.maps.InfoWindow({
        content:loc.title
      });
        infowindow.open(map,marker);
            //get current location
      infoWindow = new google.maps.InfoWindow();
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
          var cmarker = new google.maps.Marker({
            position:pos,
            icon:"http://maps.google.com/mapfiles/kml/pal4/icon57.png",
            map:map 
          });
          const directionsService = new google.maps.DirectionsService();
          const directionsDisplay = new google.maps.DirectionsRenderer();
          var boudha=new google.maps.LatLng(pos.lat,pos.lng);
          var hattisar=new google.maps.LatLng(loc.position.lat,loc.position.lng);
          directionsDisplay.setMap(map);
          var request={
            origin:boudha,
            destination:hattisar,
            travelMode:'DRIVING'
          };
          directionsService.route(request,function(result,status){
            directionsDisplay.setDirections(result);
          if(status=="OK"){
            directionsDisplay.setDirections(result);
          }
          })
          
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infowindow, map.getCenter());
        }
        
     
      });
    }
    })
    
    }
    const getCenters =(event)=>{
      let city = event.target.getAttribute("data-value")
      MarkerFunction(city);
      }
      for(let i=0;i<allCitiesName.length;i++){
        allCitiesName[i].addEventListener("click",getCenters)    
}}