//GLOBAL VARIABLES
const searchbar = document.getElementById('searchbar')
const searchMatches = document.getElementById('search-matches')
let matchResults = [] ;


//EVENT LISTENERS

searchbar.addEventListener('change',e => {
  e.preventDefault()
  const searchbarValue = e.target.value 
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
      console.log(matchResults[0].ticker)
    })
}

//this function pushes a simplified object to the matchResults array for every best match found
function simpleResults(bestMatch) {
  const bestMatchSimplified = Object.values(bestMatch)
   console.log(bestMatchSimplified)
  const stockSymbol = bestMatchSimplified[0].toString()
  const stockName = bestMatchSimplified[1].toString()
  const stockType = bestMatchSimplified[2].toString()
  let match = {
    name : stockName ,
    ticker : stockSymbol , 
    type : stockType 
  }
  matchResults.push(match)
}


