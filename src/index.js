
const searchbar = document.getElementById('searchbar')
const searchMatches = document.getElementById('search-matches')


//Alpha Vantage search results and auto-complete best matches list
// const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchbar.value}&apikey=VXY7DLJ0XAQQON66`;

function marketSearch(url)  {
  fetch(url)
    .then(res => res.json())
    .then(searchresults => {
      // console.log(searchresults)
      let bestMatchesArray = (Object.values(searchresults))[0]
      bestMatchesArray.forEach(bestMatch => search)
    })
}

searchbar.addEventListener('change',e => {
  e.preventDefault()
  const searchbarValue = e.target.value 
  let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchbarValue}&apikey=VXY7DLJ0XAQQON66`
  marketSearch(url)
})