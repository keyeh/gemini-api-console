import ccxt from "ccxt";
import _ from "lodash";
import secrets from "./secrets";
(async function() {
  let gemini = new ccxt.gemini(secrets);

  const allMarkets = await gemini.loadMarkets();
  const btcusdMarket = allMarkets["BTC/USD"];
  console.log("Maker Fee:", btcusdMarket.maker, "%\n");
  console.log("Taker Fee:", btcusdMarket.taker, "%\n");

  const ticker = await gemini.fetchTicker("BTC/USD");
  console.log("Bid:", ticker.bid);
  console.log("Ask:", ticker.ask);
  console.log("Last:", ticker.last);

  const balances = await gemini.fetchBalance();
  console.log("\nFree: ", balances.free);
  console.log("Used: ", balances.used);
  console.log("Total: ", balances.total);

  const priceToBuy = parseFloat(ticker.ask); // - 0.01;
  let amountToBuy = (balances.free.USD - balances.free.USD * btcusdMarket.taker) / priceToBuy;
  amountToBuy = _.floor(amountToBuy, 5);
  // const amountToBuy = 1000 / priceToBuy;
  console.log({ priceToBuy, amountToBuy });

  // const limitOrder = await gemini.createLimitBuyOrder("BTC/USD", amountToBuy, priceToBuy);
  // console.log({ limitOrder });
})();
