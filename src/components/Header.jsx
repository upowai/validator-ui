import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/validator.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Validator Logo"
            className="w-12 h-12 md:w-16 md:h-16"
          />
          <h1 className="text-xl font-bold">Validator</h1>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>

        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <li>
              <NavLink
                to="/"
                className="hover:text-gray-300"
                activeClassName="text-gray-300"
                exact
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/balance"
                className="hover:text-gray-300"
                activeClassName="text-gray-300"
              >
                Balance
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/withdraw"
                className="hover:text-gray-300"
                activeClassName="text-gray-300"
              >
                Withdraw
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/latest-withdraws"
                className="hover:text-gray-300"
                activeClassName="text-gray-300"
              >
                Latest Withdraws
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
