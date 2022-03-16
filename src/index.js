//GLOBAL VARIABLES
const searchbar = document.getElementById('searchbar')
const toolboxDisplay = document.getElementById('toolbox')
const searchBtn = document.querySelector('#search-btn')
const navWatchlist = document.querySelector('#nav-watchlist')
const navSearchResults = document.querySelector('#nav-search-results')
const tradeTableBody = document.querySelector('#trade-history-body')
const portfolioTableBody = document.querySelector('#my-portfolio-body')
let searchResultsMatches = [] ;
let stockDataObj ;
let watchlistFilter ;
let watchlistStocks ;


//EVENT LISTENERS

searchBtn.addEventListener('click',e => {
  e.preventDefault()
  const searchbarValue = searchbar.value 
  let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchbarValue}&apikey=VXY7DLJ0XAQQON66`
  marketSearch(url)
})

navWatchlist.addEventListener('click', e => {
  e.preventDefault
  fetchDatabase('watchlist',appendWatchlist)
})

navSearchResults.addEventListener('click', e =>{
  e.preventDefault()
  const searchbarValue = searchbar.value 
  let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchbarValue}&apikey=VXY7DLJ0XAQQON66`
  marketSearch(url)
})

document.querySelector('#my-portfolio-refresh').addEventListener('click',() => fetchDatabase('portfolio', appendPortfolio))


//Loads Trade history and Portfolio after DOM Content Loaded
document.addEventListener('DOMContentLoaded', e => {
  fetchDatabase("trade-history",prependTradeHistory)
  fetchDatabase('portfolio', appendPortfolio)
})

//Refreshes Trade History when Trade History Refresh Button Selected
document.querySelector('#trade-history-refresh').addEventListener('click', () => {
  tradeTableBody.innerHTML = ''
  fetchDatabase("trade-history",prependTradeHistory)
})

//Deletes All Trade History When Clear Button Is Clicked
document.querySelector('#trade-history-clear').addEventListener('click' , e => {
  const message = "Warning: You are about to delete all trading History! \nSelect OK to delete history or Cancel to return."
  if(confirm(message) == true) {
    fetchDatabase('trade-history', clearDatabase)
    fetchDatabase('portfolio', clearPortfolio)
    tradeTableBody.innerHTML = ''
  } 
})

//API Requests

//adds stock to Watchlist by sending Post request to the local server-watchlist
function addToWatchlist (stockDataObj) {
  fetch('http://localhost:3000/watchlist', {
    method: 'POST' ,
    headers: {
      'Content-Type': 'application/json'
    } ,
    body: JSON.stringify(stockDataObj)
  })
  .then(res => res.json())
  // .then(stock => console.log(stock))
}

//Alpha Vantage API search Results Best Matches
function marketSearch(url)  {
  fetch(url)
    .then(res => res.json())
    .then(searchresults => {
      let bestMatchesArray = (Object.values(searchresults))[0]
      searchResultsMatches = []
      bestMatchesArray.map(bestMatch => simpleResults(bestMatch))
      
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

// fetches local db watchlist data
function fetchDatabase(db,funct) {
  fetch(`http://localhost:3000/${db}`)
  .then(res => res.json())
  .then(watchlistObj => {
    funct(watchlistObj)
  })
}

function updateDatabase (newTrade, db = 'trade-history') {
  fetch(`http://localhost:3000/${db}`, {
    method: 'POST' ,
    headers: {
      'Content-Type': 'application/json'
    } ,
    body: JSON.stringify(newTrade)
  })
}


//removes an id from a selected database
function removeFromDb (db,id) {
  fetch(`http://localhost:3000/${db}/${id}`, { method: 'DELETE' })
}

//FUNCTIONS

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
  toolboxDisplay.innerHTML = `<h4 class="text-center text-primary">Search Results</h4>`
  let n  = 0
  searchResultsMatches.length < 5 ? n = searchResultsMatches.length : n = 5 ;
  for(let i = 0 ; i < n ; i++)
   {
    let match = searchResultsMatches[i]
    let li = document.createElement('li')
    
    li.classList.add('list-group-item')
    li.id = `${match.ticker}`
    li.innerHTML = `${match.name}<span class="text-primary"> (${match.ticker})</span>`
    toolboxDisplay.appendChild(li)
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
  
}

//Prepends data of selected stock to the the main display
function printToDOM(stockDataObj){
  let ul = document.querySelector("#main-display-data")
  ul.innerHTML = `
    <li class="list-group-item text-start" id="symbol"><span class="text-primary">Symbol </span> ${stockDataObj.Symbol}</li>
    <li class="list-group-item text-start" id="date"><span class="text-primary">Trading Day </span> ${stockDataObj.LatestTradingDay} </li>
    <li class="list-group-item text-start" id="price"><span class="text-primary">Price </span> $${roundNumber(stockDataObj.Price)}</li>
    <li class="list-group-item text-start" id="change-value"><span class="text-primary">Change </span> $${roundNumber(stockDataObj.Change)} <small>${roundNumber(parseFloat(stockDataObj.ChangePercent,10))}%</small></li>
    <li class="list-group-item text-start" id="volume"><span class="text-primary">Volume </span> ${stockDataObj.Volume} Trades</li>
    <li class="list-group-item d-flex">
    <button type="button" class="btn btn-outline-primary col" data-bs-toggle="button" id="watchlist-btn">Watchlist</button>
  <div class="input-group">
    <input type="text" class="form-control col" placeholder="Quantity" aria-label="Buy-Sell" aria-describedby="trade-options" id="trade-quantity">
    <select class="form-select btn-primary" id="trade-options">
      <option selected value="buy">Buy</option>
      <option value="sell">Sell</option>
    </select>
  </div>
  </li>
  `
  let price =  document.querySelector('#price')
  let change = document.querySelector('#change-value')
  // console.log(stockDataObj.Change)
  if(stockDataObj.Change < 0) {
    price.classList.add('text-danger')
    change.classList.add('text-danger')
  } else if (stockDataObj.Change > 0) {
    price.classList.add('text-success')
    change.classList.add('text-success')
  }
  const watchlistBtn = document.querySelector('#watchlist-btn')
  watchlistBtn.addEventListener('click', e => {WatchlistListener()}
  )
  const tradeOptions = document.querySelector("#trade-options")
  const tradeQuantity = document.querySelector("#trade-quantity")
  tradeQuantity.addEventListener('keypress', e =>{
    let newTrade = {}
    newTrade.price = roundNumber(stockDataObj.Price)
    newTrade.date = Date().toString()
    newTrade.symbol = stockDataObj.Symbol
    newTrade.type = camelCase(tradeOptions.value.toString())
    newTrade.quantity = e.target.value

    if(e.key === 'Enter' && Number.isInteger(Number(e.target.value)) && e.target.value > 0){ 
      updateDatabase(newTrade) 
      alert(`Market ${camelCase(newTrade.type)} of ${newTrade.quantity} ${newTrade.symbol} Shares Successfully Executed`)
      fetchDatabase("trade-history",makePortfolio)
      e.target.value = "" 

      } else if (e.key ==='Enter' && (Number.isInteger(Number(e.target.value)) || e.target.value > 0))
      {alert('Execution Failed: Must enter an integer greater than 0')}

    
    })
  //sets watchlist button to active if the stock exists in the Watchlist
  function existsInWatchlist(watchlistObj) {
    const duplicates = watchlistObj.filter(stock => {
      return stock.Symbol === stockDataObj.Symbol
    })
    // console.log(duplicates[0].Symbol)
    duplicates.length === 1 ? watchlistBtn.classList.add('active') : false ;
  }
  fetchDatabase('watchlist',existsInWatchlist)
}

//adds Selected Stock to Watchlist 
function WatchlistListener(stockDataObj) {
  watchlistBtn = document.querySelector('#watchlist-btn')
  if (!watchlistBtn.classList.contains('active')) {
    watchlistBtn.classList.remove('active') 
    fetchDatabase('watchlist',toggleWatchlist)
   } else { 
       watchlistBtn.classList.add('active')
      //  console.log(stockDataObj)
       fetchDatabase("watchlist",toggleWatchlist)
     }
}

function appendWatchlist(watchlistObj) {
  toolboxDisplay.innerHTML = `<h4 class="text-center text-primary">WatchList</h4>
  <input class="form-control"  placeholder="Filter WatchList..." id="watchlist-filter">
  <ul class="list-group list-group-horizontal-xxl rounded-3 text-start d-flex justify-content-center overflow-auto" id="watchlist-stocks"></ul>
  `
  watchlistFilter = document.querySelector('#watchlist-filter')
  watchlistStocks = document.querySelector('#watchlist-stocks')
  makeWatchlistItems(watchlistObj)
  watchlistFilter.addEventListener('input',e => {
    const filterList = filterWatchlist(watchlistObj)
    makeWatchlistItems(filterList)
    })
  
}

//Filters out all Watchlist stocks that do not contain the string input from filter bar
function filterWatchlist(watchlistObj){
 return watchlistObj.filter(stock => {
    let stockStr = stock.Symbol.toString()
    return stockStr.includes(watchlistFilter.value.toUpperCase())
  })
}

//adds or removes a stock from the watchlist
function toggleWatchlist(watchlistObj){
 const duplicates = watchlistObj.filter(stock =>{
    return stock.Symbol === stockDataObj.Symbol
  })
  if(duplicates.length === 0) {
    addToWatchlist(stockDataObj)
  } else if (duplicates.length === 1) {
    removeFromDb("watchlist",duplicates[0].id)
  }
}


//appends trade history to the DOM
function prependTradeHistory(tradeHistoryObj){
  tradeHistoryObj.forEach(trade =>{
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <th scope="row">${trade.symbol}</th>
    <td class="${trade.type}">${trade.type}</td>
    <td>${trade.quantity}</td>
    <td>${trade.price}</td>
    `
  tradeTableBody.prepend(tr)
  })
  
}

function appendPortfolio(portfolioObj) {
  portfolioTableBody.innerHTML = ''
  portfolioObj.forEach(stock => {
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <th scope="row">${stock.symbol}</th>
    <td>${stock.quantity}</td>
    <td>${stock.price}</td>
    `
    portfolioTableBody.appendChild(tr)
  })
}

//Reduces the trade History to make the portfolio
function makePortfolio(tradeHistoryObj) {
  const reducer = tradeHistoryObj.reduce((reducer, trade) => {
    const existing = reducer.find(stock => stock.symbol === trade.symbol)
    if (existing && trade.type === 'Buy') {
    existing.quantity =  parseInt(existing.quantity) + parseInt(trade.quantity);
    } else if(existing && trade.type === 'Sell') {
      existing.quantity =  parseInt(existing.quantity) - parseInt(trade.quantity);
    }
    else {
      reducer.push(trade);
    }
    return reducer;
  }, [])
  console.log(reducer)
  fetchDatabase('portfolio',clearPortfolio)
  setTimeout( () => {reducer.forEach(stock => {
      if(stock.quantity > 0) {
        updateDatabase(stock,'portfolio')
      }
    })}, 250) 
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

//Rounds a number to the nearest 2 decimal places
function roundNumber (number){
    const x = Math.pow(10,2)
    return Math.round(number * x) / x;

}

//inserts the Watchlist stocks into the DOM
function makeWatchlistItems(watchlistObj) {
  watchlistStocks.innerHTML = ''
  for (let stock of watchlistObj) {
    let li = document.createElement('li')
    li.id = stock.Symbol
    li.classList.add('list-group-item' , 'text-start')
    li.innerText = `${stock.Symbol} : $${roundNumber(stock.Price)}`
    li.addEventListener('click', e => appendDisplay(e))
    watchlistStocks.appendChild(li)   
  }
}

//deletes all data inside a database in db.json,
function clearDatabase(obj,db = 'trade-history'){
  obj.forEach(element =>{
    removeFromDb(db,element.id)
  })
}

function clearPortfolio (obj,db = 'portfolio'){
  obj.forEach(element =>{
    removeFromDb(db,element.id)
  })
}

