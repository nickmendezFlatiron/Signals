![Signals](https://github.com/nickmendezFlatiron/Signals/blob/main/img/Signals.png)

# Signals

Signals is a stock market tool for trading ,research, and analysis. Signals simplifies the fundamental uses of advanced trading tools into a user-friendly interface. No previous experience with any stock market tools is required. Use Signals to keep up to date with daily updated fundamental trading information and stock quotes, as well as real-time charting capabilities. Keep track of your favorite stocks and personal trades with localhost database.

## Installation

[Follow these instructions to fork and clone this repository](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-a-repository-from-github-to-github-desktop)

Run - json-server --watch db.json to setup localhost database

## Signals Features

### Overview

![Signals Interface](https://github.com/nickmendezFlatiron/Signals/blob/main/img/Signals%20Interface.png)


###  1.  Navigation Bar
  -   Note : The tabs on the lefthand side of the navigation bar are features that I hopefully will be able to add into the Signals app as I learn more through the SE bootcamp. 
  - The Toolbox consists of 2 different tools, formatted in a dropdown menu style. 
The Stock Watchlist displays all of the different stocks you have added to your 
  - The Search bar populates the Toolbox display (#3) with the top 5 best-matching symbols and market information based on keywords of your choice. 

### 2. Main Display

  - The Main Display lists all relevant data for the selected stock. Select a stock by clicking on it in either the Search Results list or Watchlist in the Toolbox display area. 
  - Change charts by clicking on the top left corner of the chart, where the ticker is displayed, and enter the ticker indicated in section 2 next to Symbol.
  - The Watchlist button allows a user to build a stock watchlist. The watchlist is stored in the localhost database. The button is highlighted blue when the stock is added to the Watchlist. There is no limit to how many stocks a user can watch
  - The Buy/Sell dropdown allows you to execute simulated stock trades. Enter a quantity , select either "buy" or "sell" from the dropdown, and hit the "enter" button to execute the trade.

### 3. Toolbox Display
  - This area is where the information from the selected Toolbox tool is displayed. This area is automatically populated with a list of the top 5 search results whenever a user runs a new stock search.
  - Select Watchlist from the Toolbox to view all watched stock tickers.
  - Click on any of the listed stock tickers for an up to date stock quote

### 4. My Portfolio 
  - The portfolio is built and updated every time a user executes a new trade
  - Click the refresh button to update your portfolio in real time
  - My portfolio stores all of your positions in a local database
  - Displays the Ticker , Quantity of shares , and latest daily close price for that ticker
  - 

### 5. 
  - Note: clearing the trading history will also clear all trades
  - Trade history displays every trade a user has executed.
  - Specifies the type of trade, the ticker traded, the quantity, and price at the time of the trade
  - Click on the refresh button to update your trade history in real time



## Sources

- [Alpha Vantage API](https://www.alphavantage.co/)
- [Tradingview Chart Widget](https://www.tradingview.com/widget/)

## Contributors

- [Nick Mendez (Me)](https://github.com/nickmendezFlatiron)
