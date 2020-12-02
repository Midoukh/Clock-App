//grab all elements
export const elements = {
    seeMoreBtn : document.querySelector('.expand--infos'),
    endpointUrlIP: `http://api.ipstack.com/41.200.57.204?access_key=5a4f8c969a4f54a00b26462db1773536`,
    endpointUrlQuotes: 'https://type.fit/api/quotes',
    grettingTxt: document.querySelector('.display--gretting h5'),
    quote: document.querySelector('.quote'),
    quoteText: document.querySelector('.quote p'),
    quoteAuthor: document.querySelector('.quote h5'),
    reloadQuote: document.querySelector('.bi-arrow-repeat'),
    hours: document.getElementById('hour'),
    minuts: document.getElementById('minut'),
    city: document.getElementById('city'),
    country: document.getElementById('country'),
    flag: document.getElementById('flag'),
    sun: document.getElementById('sun'),
    moon: document.getElementById('moon'),
    additionalInfos: document.querySelector('.additional--infos'),
    expandInfosBtn: document.querySelector('.expand--infos'),
    chevronUp: document.querySelector('.bi-chevron-up'),
    chevronDown: document.querySelector('.bi-chevron-down'),
    continent: document.getElementById('continent'),
    countryName: document.getElementById('country-name'),
    dayOfTheYear: document.querySelector('.day-of-theYear h1'),
    dayOfTheWeek: document.querySelector('.day--of--theWeek h1'),
    weekNumber: document.querySelector('.week--number h1')

}

//vars
const randomQu = Math.floor(Math.random() * 1645)
const quote = []

//functions

function updateQuote(text, author){

    elements.quoteText.textContent = text
    elements.quoteAuthor.textContent = author
 
}

function updateUI(){
    const time = new Date()

    //change gretting text based on device
    if (window.innerWidth > 900){
        elements.grettingTxt.textContent += `, It's currently: `
    }
  
}

async function getIP (url){
    try{
        const res = await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            updateLocation(data.region_name, data.country_code, data.location.country_flag, data.continent_name, data.country_name)
        });
    }
    catch(error){
        console.error(error)
    }
}

async function getQuotes(url) {
    try{
        const res = await fetch(url)
        .then(response => response.json())
        .then(data => {
            // updateUI(data[randomQu])
            quote.push(data)
            updateQuote(data[randomQu].text, data[randomQu].author)
        });
    }
    catch(error){
        console.error(error)
    }
}
//updating the time to the UI

function updateTime(){
    const time = new Date()
    //get hours of the day in 24Hr format (0-23)
    const hours = time.getHours()+1
    
    let [h, m] = (time.getHours().toString() + ':' + time.getMinutes().toString()).split(':')
    let hourAndMin = parseFloat(`${h}.${m}`)
  
    elements.hours.textContent = time.getHours() < 10? '0' + time.getHours(): time.getHours()
    elements.minuts.textContent = time.getMinutes() < 10? '0' + time.getMinutes(): time.getMinutes()

    //update background image and the moon or sun when time change
    const isDay = hours > 6 && hours <= 20
    
    
        //morning
        if (isDay){
            document.body.style.backgroundImage = "url('../img/morning.jpg')"
            elements.sun.classList.remove('hide')
            elements.moon.classList.add('hide')
        }

        //night
        else{
            document.body.style.backgroundImage = "url('../img/Night.jpg')"
            elements.sun.classList.add('hide')
            elements.moon.classList.remove('hide')

            //update gretting message
            elements.grettingTxt.textContent = elements.grettingTxt.textContent.replace('Morning', 'Evening')

        }
   
    //day of the year, day of week, week number
    const start = new Date(time.getFullYear(), 0, 0);
    const diff = time - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const oneWeek = oneDay * 7
    const day = Math.floor(diff / oneDay);
    const week = Math.floor(diff/oneWeek)+1
    elements.dayOfTheYear.textContent = day

    elements.dayOfTheWeek.textContent = time.getUTCDay()+1

    elements.weekNumber.textContent = week

}

//updating location

function updateLocation(city, country, flag, continent, countryName){
    elements.city.textContent = city
    elements.country = country
    elements.flag.setAttribute('src', flag)
    elements.continent.textContent = continent
    elements.countryName.textContent = countryName}

//show additional infos on click
function expandInfos(){
    // let additionalInfosStyle = elements.additionalInfos.style.display
    // let chevronUpStyle = elements.chevronUp.style.display
    // let chevronDownStyle = elements.chevronDown.style.display

    // if (additionalInfosStyle === 'none'){
     

    // }
    // else{

    // }
    elements.additionalInfos.classList.toggle('hide-info')
}

//events listeners
window.addEventListener('load', () => {
    getIP(elements.endpointUrlIP)
    getQuotes(elements.endpointUrlQuotes)
    updateUI()
    elements.additionalInfos.classList.add('hide-info')
})
setInterval(updateTime, 100)


//reaload a new quote when clicking the button
elements.reloadQuote.addEventListener('click', () => {
const randomQu = Math.floor(Math.random() * 1645)

    // updateQuote(quote[0], quote[1])
    quote.forEach(q => {
        updateQuote(q[randomQu +1].text, q[randomQu +1].author)
    })
})

elements.expandInfosBtn.addEventListener('click', expandInfos)
