//GLOBAL VARIABLES
const searchbar = document.getElementById('searchbar')
const searchMatches = document.getElementById('search-matches')
const searchBtn = document.querySelector('#search-btn')
let matchResults = [] ;


//EVENT LISTENERS

searchBtn.addEventListener('click',e => {
  e.preventDefault()
  const searchbarValue = searchbar.value 
  let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchbarValue}&apikey=VXY7DLJ0XAQQON66`
  marketSearch(url)
})



//FUNCTIONS

//Alpha Vantage API search Results Best Matches
function marketSearch(url)  {
  fetch(url)
    .then(res => res.json())
    .then(searchresults => {
      let bestMatchesArray = (Object.values(searchresults))[0]
      matchResults = []
      bestMatchesArray.map(bestMatch => simpleResults(bestMatch))
      // console.log(matchResults[0].ticker)
      appendResults(matchResults)
    })
}

//fetches the stock data for the selected stock 
function fetchStockData(url){
  fetch(url)
    .then(res => res.json())
    .then(data => console.log(Object.entries(data))) 
}

//this function pushes a simplified object to the matchResults array for every best match found
function simpleResults(bestMatch) {
  const bestMatchSimplified = Object.values(bestMatch)
   console.log(bestMatchSimplified)
  const stockSymbol = bestMatchSimplified[0].toString()
  const stockName = bestMatchSimplified[1].toString()
  const stockType = bestMatchSimplified[2].toString()
  const stockRegion = bestMatchSimplified[3].toString()
  let match = {
    name : stockName ,
    ticker : stockSymbol , 
    type : stockType ,
    region : stockRegion
  }
  matchResults.push(match)
}

//appends the top 5 search results to the DOM Search Results Container 
function appendResults(matchResults) {
  searchMatches.innerHTML = ``
  let n  = 0
  matchResults.length < 5 ? n = matchResults.length : n = 5 ;
  for(let i = 0 ; i < n ; i++)
   {
    let match = matchResults[i]
    let li = document.createElement('li')
    
    li.classList.add('list-group-item')
    li.id = `${match.ticker}`
    li.innerHTML = `${match.name}<span class="text-primary"> (${match.ticker})</span>
    `
    searchMatches.appendChild(li)
    li.addEventListener('click', e => appendDisplay(e))
  }
}

//Populates the main info section with the selected 
function appendDisplay(e) {
  let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${e.target.id}&apikey=VXY7DLJ0XAQQON66`
  fetchStockData(url)
}
