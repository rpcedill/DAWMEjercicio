/*!
* Start Bootstrap - Clean Blog v6.0.7 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

function initialize() {
    var earth = new WE.map('earth_div');
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

    fetch("composer.json")
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < Object.keys(data).length ; i++){
            let htmLine = "<b>"+ data[i]['name'] + "</b><br>Artistas más escuchados<br><a href='https://spotifycharts.com/regional/"+ data[i]['country'].toLowerCase()+"/daily/latest'>click here</a>";
            let latitude = data[i]['latitude'];
            let longitude = data[i]['longitude'];
            var marker = WE.marker([latitude, longitude]).addTo(earth);
            marker.bindPopup(htmLine, {maxWidth: 120, closeButton: true});
        }
    })
    .catch(console.error);

    var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-white-100.png', 100, 24).addTo(earth);

    earth.setView([-1.6, -78], 4);
}


const peticion = () => {
   let proxy = 'https://damp-beach-17296.herokuapp.com/'
   let url = 'https://api.eluniverso.arcpublishing.com/feeds/rss/?website=el-universo&query=taxonomy.sections._id:%22/entretenimiento/musica%22&sort=first_publish_date:desc'

   fetch(proxy+url)
   .then(response => response.text())
   .then(data =>{
     const parser = new DOMParser();
     const xml = parser.parseFromString(data, "application/xml");

     let items =xml.getElementsByTagName('item')

     for(let i=0 ; i < 5 ; i++){
       let plantilla = `
        <div class="card mb-3" >
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="assets/img/news01.jpg" class="img-fluid img-thumbnail" alt="news01">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <a href=""><h5 class="card-title">Card title</a></h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text"><small class="text-muted">Updated: Nov/3/2021</small></p>
                    </div>
                  </div>
                </div>
              </div>
        `

      let title = items[i].getElementsByTagName('title')[0]
      let texto = items[i].getElementsByTagName('description')[0]
	  let date = items[i].getElementsByTagName('pubDate')[0]

      plantilla = plantilla.replace('Card title', title.innerHTML)
      plantilla = plantilla.replace('This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', texto.innerHTML)
	  plantilla = plantilla.replace('Updated: Nov/3/2021', date.innerHTML)

      document.getElementsByClassName('noticias container')[0].innerHTML += plantilla
     }

     console.log(xml);
   })


   .catch(console.error)
 }

 peticion()