import React from "react";

function InvestmentCard({ stock }) {
  if (!stock) return null; // Prevent errors if stock is undefined

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-bold">{stock.name}</h2>
      <p className="text-gray-700">Symbol: {stock.symbol}</p>
      <p className="text-green-600">Price: ${stock.price.toFixed(2)}</p>
      <p className="text-gray-500">
        Day Low: ${stock.dayLow} | Day High: ${stock.dayHigh}
      </p>
      <p className="text-blue-500">Exchange: {stock.exchange}</p>
    </div>
  );
}

export default InvestmentCard;
