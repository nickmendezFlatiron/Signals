![Signals](https://github.com/nickmendezFlatiron/Signals/blob/main/img/Signals.png)

# Signals
### Overview

Signals is a stock market tool for trading ,research, and analysis. Signals simplifies the fundamental uses of advanced trading tools into a user-friendly interface. No previous experience with any stock market tools is required. Use Signals to keep up to date with daily updated fundamental trading information and stock quotes, as well as real-time charting capabilities. Keep track of your favorite stocks and personal trades with localhost database.

## Installation

[Follow these instructions to fork and clone this repository](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-a-repository-from-github-to-github-desktop)

Run in terminal - json-server --watch db.json to setup localhost database
Note: [Make sure to install node.js first](https://nodejs.org/en/)

## Signals Features

![Signals Interface](https://github.com/nickmendezFlatiron/Signals/blob/main/img/Signals%20Interface.png)


###  1.  Navigation Bar
  -   Note : The tabs on the lefthand side of the navigation bar are features that I hopefully will be able to add into the Signals app as I learn more through the SE bootcamp. 
  - The Toolbox consists of 2 different tools, formatted in a dropdown menu style. The Watchlist displays all of the different stocks you have added to your 
  - The Search bar populates the Toolbox display (#3) with the top 5 best-matching stock symbols(ticker) based on keywords of your choice, in descending relevancy. 

### 2. Main Display

  - The Main Display lists all relevant data for the selected stock, formally known as a stock quote. Select a stock by clicking on it in either the Search Results list or Watchlist in the Toolbox display area. 
  - Change charts by clicking on the top left corner of the chart, where the ticker is displayed, and enter the ticker indicated in section 2 next to Symbol.
  - The chart widget allows the user to technically analyze stock price action and plan trades through multiple indicators and timeframes
  - The Watchlist button allows a user to build a stock watchlist. The watchlist is stored in the localhost database "watchlist". The watchlist button is highlighted blue when the stock is added to the Watchlist. There is no limit to how many stocks a user can watch
  - The Buy/Sell dropdown allows you to execute simulated stock trades. Enter a quantity , select either "buy" or "sell" from the dropdown, and hit the "enter" button to execute the trade.

### 3. Toolbox Display
  - This area is where the information from the selected Toolbox tool is displayed. This area is automatically populated with a list of the top 5 search results whenever a user runs a new stock search.
  - Select Watchlist from the Toolbox to view all watched stock tickers.
  - Click on any of the listed stock tickers for an up to date stock quote

### 4. My Portfolio 
  - My portfolio is built based on the trades executed by a user
  - Click the refresh button to update My portfolio in real time
  - My portfolio stores all of your positions in a local database "portfolio"
  - Displays the Ticker , Quantity of shares , and latest daily close price for that ticker
  - 

### 5. Trading History
  - Note: clearing the trading history will also clear all trades
  - Trade history displays every trade a user has executed.
  - Specifies the type of trade, the ticker traded, the quantity, and price at the time of the trade
  - Click on the refresh button to update your trade history in real time
  - Trading History stores all of your positions in a local database "trade-history"


## Example
  - A user wants the latest information on Tesla , but does not know the ticker symbol.
  - User enters "Tesla" in the Search bar and selects the most relevant symbol (the first one)
  - Tesla, we now knoe as TSLA , has it's latest stock quote populated in the main display
  - User wants to set up a trade based on price action. User enters TSLA into the chart widget and uses the tools and indicators to decide whether or not they want to execute a trade.
  - If user wants to execute a trade now, then they enter the quantity and trade type, and clicks enter
  - If user wants to execute a trade later, but doesn't want to search for TSLA again, then they add it to their watchlist by clicking on the watchlist button.
  - Cool
  - User believes TSLA is undervalued and buys 10 shares at market price. They submit their trade and click the refresh button on "My Portfolio" to see their current position in TSLA stock.
  

### Future Ideas

  - My Signals tab : I'd like to build an easy way for people to build their own automated trade strategies because currently, the only way to develop algorithmic trade strategies is by knowing how to code. The barrier to entry is high , especially for those who would like automate their trades but do not have the time to learn to code. These automated trade strategies and alerts made by a user would be called Signals. 
    - Also, I haven't found any platforms that allow you to execute such strategies against historical data. Ideally, a user can test his Signals against historical data before they made their Signal live.
  - Community tab : This is a form style area where Signals users can communicate ideas with one another , help one another with building their own Signals, and post discussions.
  - Marketplace : This is where users can buy, sell, and trade their Signals. I'd set up different price models and have some type of standardized performance rating system for all Signals listed on the Marketplace. 

## Sources

- [Alpha Vantage API](https://www.alphavantage.co/)
- [Tradingview Chart Widget](https://www.tradingview.com/widget/)

## Contributors

- [Nick Mendez (Me)](https://github.com/nickmendezFlatiron)
