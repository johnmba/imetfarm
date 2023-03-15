
function carouseTo(targetSlide) {
  //for carousel indicator showin active when active or in focus
  const slide = document.querySelector("li[data-target='" + targetSlide +"']")
  const active = document.querySelector(".carousel-indicators .active")
  const target = active.getAttribute("data-target")
  if(target != targetSlide){
    slide.classList.add("active")
    active.classList.remove("active")
  }
  return
}

let lastEvent = ""
const carouselBtns = document.querySelectorAll(".carousel__btn")
for (let index = 0; index < carouselBtns.length; index++) {
  const btn = carouselBtns[index];
  btn.addEventListener("click", (event) =>{
    event.preventDefault()
    let caroused_item = ""
    const target = event.target.getAttribute("href")
    if(caroused_item == ""){
      carouseTo(target)
      caroused_item = target
    }else if(caroused_item == "" && caroused_item != target) {
      carouseTo(target)
      caroused_item = target
    }
    window.location.href = target//event.target.href for absolute url
    return
  })
}
// timed carousing
//setInterval(() => {
//  carouseTo()
//}, 50000)

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('.navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero carousel indicators
   */
  let frontpageIndicators = select("carousel-indicators")
  let frontpageItems = select('#frontpage .carousel-item', true)

  frontpageItems.forEach((item, index) => {
    (index === 0) ?
    frontpageIndicators.innerHTML += "<li data-bs-target='#frontpage' data-bs-slide-to='" + index + "' class='active'></li>":
      frontpageIndicators.innerHTML += "<li data-bs-target='#frontpage' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()


/* FOR STORING AND LOADING FROM JSON DATA HOUSE

const portfolioMenus = document.querySelectorAll('.portfolio-menu a')

const info = document.querySelector('.info')
const quote = document.querySelector('.quote')
const slide = document.querySelector('.slider-wrapper')


function paragrapher(full_text) {
  //(^(\w{80,100})\s^[A-Z]$)?/  ([.?!])\s*(?=[A-Z]
  if (full_text.summary) {
    return "<p>"+full_text.summary+"</p>"
  }
  const splited_text = full_text.split(/\s/)
  var index = 0
  let joined_txt = splited_text.slice(0, 100)
  if(splited_text[-1] && index < 100){
    joined_txt = full_text
  }
  return "<p>" + joined_txt.join(" ") + "</p>"
}


function getDate(date_string) {
  let [_, day, month, year] = /(\d{1,2})-(\d{1,2})-(\d{1,4})/.exec(date_string)
  return new Date(year, month - 1, day).toDateString()
}

function load_menu_data(menu, json_data) {

  const tutorials__div = document.querySelector('#tutorials div')
  const views__div = document.querySelector('#views div')
  const more__btn = document.querySelector(menu + " .view__more")
  index =+ Number(more__btn.value)
  end_iter = index + 5

  if(menu==="#tutorials"){
    while (index <= end_iter) {
      const wrapper = document.createElement("div")
      if(json_data.tutorials[index] === undefined){
        more__btn.remove
        break
      }else if(index===end_iter){
        more__btn.value= index
      }
      const tutorial = json_data.tutorials[index]
      const art_date = getDate(tutorial.date)
      wrapper.innerHTML = `<h2 class="_10padTp"><a href="/pages/base.html?id=${index}">${tutorial.topic}</a>
        <div><small>${tutorial.author+" "+art_date}</small></div></h2>
        <div>${paragrapher(tutorial.body)}</div>`
      wrapper.className = "_10padTp"
      tutorials__div.appendChild(wrapper);
      index++
    }
    return

  }else if(menu==="#views"){
    while (index <= end_iter) {
      const wrapper = document.createElement("div")
      if(json_data.views[index] === undefined){
        more__btn.remove
        break
      }else if(index===end_iter){
        more__btn.value = index
        console.log(more__btn)
      }
      const view = json_data.views[index]
      wrapper.innerHTML = `<div>${view.quote}<span class="read__more">
      <a href="#">&nbsp;... ${view.phils}</a></span></div>
      <div class="_10padTp">
        <span class="fb-share-button read__more grad__bkground" data-href="https://johnmba.github.io" data-layout="button_count" data-size="large">
        <a rel="noopener" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjohnmba.github.io%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a>
        </span>
        <span class="read__more grad__bkground">
          <a rel="noopener" href="https://twitter.com/share?ref_src=twsrc%5Etfw" target="_blank" class="twitter-share-button" data-show-count="false">Twitter</a>
        </span>
        <span class="read__more grad__bkground">
          <a rel="noopener" href="href="https://api.whatsapp.com/send?text=${view.quote}"  data-action="share/whatsapp/share" target="_blank">Whatsapp</a>
        </span>
      </div>`
      wrapper.className = "quote"
      views__div.appendChild(wrapper);
      index++
    }
    return
  }else{
    alert("undefined variable")
  }
}


let lastEvent = ""

for (let item = 0; item < portfolioMenus.length; item++) {
  const portfolioMenu = portfolioMenus[item];
  let active = ""
  let portfolioItemClick = ""

  portfolioMenu.addEventListener('click', (e)=>{
    let portfolioItemId = e.target.getAttribute("href");

    if(lastEvent != ""){
      lastEvent.classList.add('portfolio-item')
      portfolioItemId = portfolioItemId.substring(1, portfolioItemId.length)
      portfolioItemClick = document.querySelectorAll(portfolioItemId)
      portfolioItemClick[0].classList.remove('portfolio-item')
      lastEvent = portfolioItemClick[0]
    }

    if (active === "" && lastEvent === "" && portfolioItemClick === "") {
      portfolioItemId = portfolioItemId.substring(1, portfolioItemId.length)
      portfolioItemClick = document.querySelectorAll(portfolioItemId)
      info.classList.add('hidden')
      slide.classList.remove('hidden')
      portfolioItemClick[0].classList.remove('portfolio-item')
      active = portfolioItemId
      lastEvent = portfolioItemClick[0]
    }else if (active === portfolioItemClick[0]){
      return
    }

  // the incoporation of fetched data into the DOM
    fetch('/src/json/data.json')
    .then((response) => response.json())
    .then((json) => {
      load_menu_data(portfolioItemId, json)
      document.querySelector(portfolioItemId + ' .view__more').addEventListener("click", (event) => {
        console.log(event.target)
        load_menu_data(portfolioItemId, json)
      })
      //const prev_state = document.querySelectorAll('.view__more')
    })
  })
}

// forEach will raise not a conditionfunction error if used on non iteration data
// path error in relative file directry because the file might not be relatve when linked in html page
// to avoide such error you have to use fullpath directory
*/