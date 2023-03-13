
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
