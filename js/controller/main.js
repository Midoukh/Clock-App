//grab all elements
export const elements = {
    seeMoreBtn : document.querySelector('.expand--infos'),
    endpointUrlIP: `http://api.ipstack.com/41.200.57.204?access_key=5a4f8c969a4f54a00b26462db1773536`,
    endpointUrlQuotes: 'https://type.fit/api/quotes',
    grettingTxt: document.querySelector('.display--gretting h5'),
    quote: document.querySelector('.quote'),
    quoteText: document.querySelector('.quote p'),
    quoteAuthor: document.querySelector('.quote h5'),
    reloadQuote: document.querySelector('.bi-arrow-repeat')
}

//vars
const randomQu = Math.floor(Math.random() * 1645)

//functions

function updateQuote(text, author){

    elements.quoteText.textContent = text
    elements.quoteAuthor.textContent = author
 
}

function updateUI(){
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
            return data
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
            updateQuote(data[randomQu].text, data[randomQu].author)
        });
    }
    catch(error){
        console.error(error)
    }
}


//events listeners
window.addEventListener('load', () => {
    getIP(elements.endpointUrlIP)
    getQuotes(elements.endpointUrlQuotes)
    updateUI()
})

//reaload a new quote when clicking the button
elements.reloadQuote.addEventListener('click', updateUI)


