import React, { useState, useEffect } from "react";
import boxes from "../assets/boxes.png";
import leaf from "../assets/leaf.png";

const Dashboard = () => {
  // Sidebar navigation items
  const navItems = [
    "Dashboard",
    "Expenses",
    "Wallets",
    "Summary",
    "Accounts",
    "Settings",
  ];

  const transactionsData = [
    {
      title: "Today",
      transactions: [
        {
          icon: "🛒",
          bgColor: "bg-blue-500",
          category: "Grocery",
          time: "5:12 pm",
          note: "Belanja di pasar",
          amount: "-326.800",
        },
        {
          icon: "🚌",
          bgColor: "bg-purple-500",
          category: "Transportation",
          time: "5:12 pm",
          note: "Naik bus umum",
          amount: "-15.000",
        },
        {
          icon: "🏠",
          bgColor: "bg-orange-500",
          category: "Housing",
          time: "5:12 pm",
          note: "Bayar Listrik",
          amount: "-185.750",
        },
      ],
    },
    {
      title: "Monday, 23 March 2020",
      transactions: [
        {
          icon: "🍽",
          bgColor: "bg-red-500",
          category: "Food and Drink",
          time: "5:12 pm",
          note: "Makan Steak",
          amount: "-156.000",
        },
        {
          icon: "🎬",
          bgColor: "bg-green-500",
          category: "Entertainment",
          time: "5:12 pm",
          note: "Nonton Bioskop",
          amount: "-35.200",
        },
      ],
    },
  ];

  const spendingCategories = [
    { category: "Food and Drinks", amount: "872.400", progress: "w-[60%]" },
    { category: "Shopping", amount: "1.378.200", progress: "w-[80%]" },
    { category: "Housing", amount: "928.500", progress: "w-[50%]" },
    { category: "Transportation", amount: "420.700", progress: "w-[40%]" },
    { category: "Vehicle", amount: "520.000", progress: "w-[30%]" },
  ];

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Generate random heights for the bars
    const data = Array.from(
      { length: 20 },
      () => Math.floor(Math.random() * 50) + 10
    );
    setChartData(data);
  }, []);

  // State to track active menu item
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="h-screen bg-black grid grid-cols-12">
      {/* Left Sidebar */}
      <div className="col-span-2 p-6 text-white flex flex-col h-full">
        {/* Profile Section (30%) */}
        <div className="h-[30%] flex flex-col justify-center items-start text-white pl-10">
          <img
            src="https://randomuser.me/api/portraits/women/45.jpg"
            alt="Profile"
            className="w-30 h-30 rounded-full border-2 border-gray-500"
          />

          <h3 className="text-3xl font-semibold mt-2">Samantha</h3>
          <p className="text-xl text-gray-400">samantha@email.com</p>
        </div>

        {/* Sidebar Navigation (70%) */}
        <div className="h-[70%] flex flex-col gap-y-10 justify-center items-start pl-10">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveItem(item)}
              className={`text-left text-3xl ${
                activeItem === item ? "text-white font-bold" : "text-gray-400"
              } hover:text-white transition-all`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="col-span-10 bg-white p-6 text-black rounded-3xl m-6 grid grid-cols-10 gap-4">
        {/* Left Section - 70% */}
        <div className="col-span-7 flex flex-col gap-6">
          {/* Top Section */}
          <div className="bg-white shadow-lg p-6 h-[30%] rounded-xl">
            {/* Title & Date */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Expenses</h2>
                <p className="text-gray-500 text-sm">01 - 25 March, 2020</p>
              </div>
              {/* Profile Icons */}
              <div className="flex -space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/women/50.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/50.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/51.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full border-2 border-white">
                  +
                </button>
              </div>
            </div>

            {/* Bar Chart (Dynamic & Full Height) */}
            <div className="w-full h-full flex mt-[-8%] items-end gap-1">
              {chartData.map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-md ${
                    i === 15 ? "bg-blue-600" : "bg-blue-200"
                  }`}
                  style={{ height: `${(height / 100) * 100}%` }} // Scale heights to fit container
                />
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-gray-100 p-6 rounded-xl">
            {transactionsData.map((section, index) => (
              <div key={index} className="mb-6">
                {/* Section Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {section.title}
                </h3>

                {/* Transaction List */}
                {section.transactions.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-2"
                  >
                    {/* Left: Icon & Details */}
                    <div className="flex items-center gap-4">
                      {/* Rounded Icon */}
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${item.bgColor} text-white text-xl`}
                      >
                        {item.icon}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.category}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.time} • {item.note}
                        </p>
                      </div>
                    </div>

                    {/* Right: Amount */}
                    <p className="text-gray-900 font-semibold">{item.amount}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - 30% */}
        <div className="col-span-3 p-6 bg-white shadow-lg rounded-xl flex flex-col gap-6">
          {/* Top Section */}
          <div className="p-4  h-[60%]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Where your money go?
            </h3>

            {/* Mapping Over Categories */}
            {spendingCategories.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-gray-900 font-medium">
                  <span>{item.category}</span>
                  <span>{item.amount}</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                  <div
                    className={`h-1.5 bg-green-500 rounded-full ${item.progress}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="relative p-6 bg-gray-100 shadow-lg rounded-xl flex flex-col items-center text-center space-y-4">
            {/* Image Container */}
            <div className="w-full flex justify-between px-4 relative mb-10">
              <img
                src={boxes}
                alt="Boxes"
                className="w-40 h-40 object-contain absolute -top-20 -left-2"
              />
              <img
                src={leaf}
                alt="Leaf"
                className="w-20 h-30 object-contain absolute -top-20 -right-2"
              />
            </div>

            {/* Text Content */}
            <h3 className="text-gray-900 font-semibold text-lg">
              Save more money
            </h3>
            <p className="text-gray-500 text-sm px-2">
              Elusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim.
            </p>

            {/* View Tips Button */}
            <button className="bg-black text-white text-sm font-medium px-5 py-2 rounded-lg">
              VIEW TIPS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
