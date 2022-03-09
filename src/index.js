//GLOBAL VARIABLES
const searchbar = document.getElementById('searchbar')
const searchMatches = document.getElementById('search-matches')
const searchBtn = document.querySelector('#search-btn')
let searchResultsMatches = [] ;
let stockDataObj ;

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
      searchResultsMatches = []
      bestMatchesArray.map(bestMatch => simpleResults(bestMatch))
      // console.log(searchResultsMatches[0].ticker)
      appendResults(searchResultsMatches)
    })
}

//fetches the stock data for the selected stock 
function fetchStockData(url){
  fetch(url)
    .then(res => res.json())
    .then(data => {organizeStockData(data)
      printToDOM(stockDataObj)
    }) 
    
}

//this function pushes a simplified object to the searchResultsMatches array for every best match found
function simpleResults(bestMatch) {
  const bestMatchSimplified = Object.values(bestMatch)
  //  console.log(bestMatchSimplified)
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
  searchResultsMatches.push(match)
}

//appends the top 5 search results to the DOM Search Results Container 
function appendResults(searchResultsMatches) {
  searchMatches.innerHTML = ``
  let n  = 0
  searchResultsMatches.length < 5 ? n = searchResultsMatches.length : n = 5 ;
  for(let i = 0 ; i < n ; i++)
   {
    let match = searchResultsMatches[i]
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
  e.stopPropagation()
  let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${e.target.id}&apikey=VXY7DLJ0XAQQON66`
  fetchStockData(url)
//   console.log(e.target)
// console.log(`target id : ${e.target.id}`)
}


//organizes the stock data from the fetch request 
// Fixes API JSON Object Keys from the fetch request and makes them usable for dot notation
function organizeStockData(data) {
  stockDataObj = {} ;
  let dataArray = (Object.entries(data))[0][1]
  let dataArrayKeys = Object.keys(dataArray)

  dataArrayKeys.map(key => {
    let keyWithoutNumbers = key.slice(4)
    let newKey = camelCase(keyWithoutNumbers)
    stockDataObj[newKey] = `${dataArray[key]}`
  })
  console.log(stockDataObj)
  
}


//UTLITY FUNCTIONS

//camelCases a string
function camelCase (word) {
    word = word.split(" ");
    for (let i = 0, n = word.length; i < n; i++) {
      word[i]= word[i][0].toUpperCase() + word[i].substring(1)
    }
    word = word.join("");
    return word;
}

function printToDOM(stockDataObj){
  let stockDataObjKeys = Object.keys(stockDataObj)
  let ul = document.querySelector("#main-display-data")
  ul.innerHTML = `
    <li class="list-group-item text-start" id="symbol"><span class="text-primary">Symbol </span> ${stockDataObj.Symbol}</li>
    <li class="list-group-item text-start" id="date"><span class="text-primary">Trading Day </span> ${stockDataObj.LatestTradingDay} </li>
    <li class="list-group-item text-start" id="price"><span class="text-primary">Price </span> ${stockDataObj.Price}</li>
    <li class="list-group-item text-start" id="change-value"><span class="text-primary">Change </span> $${stockDataObj.Change} <small>${stockDataObj.ChangePercent}</small></li>
    <li class="list-group-item text-start" id="volume"><span class="text-primary">Volume </span> ${stockDataObj.Volume} Trades</li>
    <li class="list-group-item d-flex">
        <button type="button" class="btn btn-outline-primary col" data-bs-toggle="button" id="watchlist-button">Watchlist</button>
    <div class="input-group">
      <input type="text" class="form-control col" placeholder="Quantity" aria-label="Buy-Sell" aria-describedby="button-addon2">
      <button class="btn btn-primary" type="button" id="button-addon2">Buy/Sell</button>
    </div>
    </li>
  `
  let price =  document.querySelector('#price')
  let change = document.querySelector('#change-value')
  console.log(stockDataObj.Change)
  if(stockDataObj.Change < 0) {
    price.classList.add('text-danger')
    change.classList.add('text-danger')
  } else if (stockDataObj.Change > 0) {
    price.classList.add('text-success')
    change.classList.add('text-success')
  }
}