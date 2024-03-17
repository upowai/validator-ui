import React from "react";
import { NavLink } from "react-router-dom";
import { FaWallet, FaMoneyBillWave, FaRegListAlt } from "react-icons/fa";

const Home = () => {
  const links = [
    { name: "Balance", to: "/balance", icon: <FaWallet /> },
    { name: "Withdraw", to: "/withdraw", icon: <FaMoneyBillWave /> },
    {
      name: "Latest Withdraws",
      to: "/latest-withdraws",
      icon: <FaRegListAlt />,
    },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-6 text-center rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`
            }
          >
            <div className="text-3xl mb-3">{link.icon}</div>
            <div className="font-semibold">{link.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
