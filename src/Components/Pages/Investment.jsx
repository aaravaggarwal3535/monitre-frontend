import React, { useState, useEffect } from "react";
import InvestmentCard from "../InvestmentCard";

function Investment() {
  const [stocks, setStocks] = useState([]); // Store all stocks
  const [filteredStocks, setFilteredStocks] = useState([]); // Store filtered stocks
  const [salary, setSalary] = useState(""); // Store user salary input

  useEffect(() => {
    const stockData = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 229.79,
        exchange: "NASDAQ",
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        price: 412.22,
        exchange: "NASDAQ",
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 185.35,
        exchange: "NASDAQ",
      },
      {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        price: 346.75,
        exchange: "NASDAQ",
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        price: 745.23,
        exchange: "NASDAQ",
      },
      {
        symbol: "META",
        name: "Meta Platforms, Inc.",
        price: 320.65,
        exchange: "NASDAQ",
      },
      {
        symbol: "BABA",
        name: "Alibaba Group Holding Ltd",
        price: 86.4,
        exchange: "NYSE",
      },
      {
        symbol: "TSM",
        name: "Taiwan Semiconductor Manufacturing",
        price: 135.5,
        exchange: "NYSE",
      },
      {
        symbol: "PYPL",
        name: "PayPal Holdings, Inc.",
        price: 68.95,
        exchange: "NASDAQ",
      },
    ];

    setStocks(stockData);
    setFilteredStocks(stockData); // Default: Show all stocks
  }, []);

  const handleSalarySubmit = () => {
    const salaryNumber = parseInt(salary);

    if (salaryNumber < 30000) {
      setFilteredStocks(stocks.filter((stock) => stock.price <= 200)); // Low-price stocks
    } else if (salaryNumber >= 30000 && salaryNumber < 100000) {
      setFilteredStocks(stocks.filter((stock) => stock.price <= 400)); // Mid-range stocks
    } else {
      setFilteredStocks(stocks); // High salary -> Show all stocks
    }
  };

  return (
    <>
      <div className="text-[#04AD83] font-bold text-3xl mx-[3rem] pt-[1rem]">
        Investment
      </div>

      {/* Input and Button */}
      <div className="flex items-center gap-2 p-4">
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter your salary"
          className="border-2 px-2 py-1 rounded-md"
        />
        <button
          onClick={handleSalarySubmit}
          className="bg-green-500 text-white px-5 py-2 rounded-md"
        >
          Show Recommended Stocks
        </button>
      </div>

      {/* Green Box for Displaying Stocks */}
      <div className=" bg-green-300 rounded-3xl mt-4 p-6 min-h-[400px] flex flex-wrap justify-center items-center overflow-auto">
        {/* Stock Cards inside the green box */}
        <div className="grid cursor-pointer hover: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredStocks.map((stock) => (
            <InvestmentCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Investment;
