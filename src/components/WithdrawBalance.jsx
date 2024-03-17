import React, { useState, useEffect } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { NavLink } from "react-router-dom";
import config from "../config";
import axios from "axios";

const WithdrawBalance = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleWithdraw = async () => {
    if (!validateCaptcha(userCaptchaInput)) {
      alert("Captcha Does Not Match");
      return;
    }

    if (walletAddress.length <= 40) {
      setError("Invalid Wallet address");
      return;
    }

    const amountToDeduct = parseFloat(amount);
    if (
      isNaN(amountToDeduct) ||
      amountToDeduct <= 0 ||
      amountToDeduct < 0.001
    ) {
      setError(
        "Invalid amount. Amount must be a positive number and at least 0.001"
      );
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${config.pooApi}/deduct_balance/`,
        {
          wallet_address: walletAddress,
          amount_to_deduct: amountToDeduct,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data", response.data);

      if (response.data.message) {
        const msg = response.data.message.toString();
        setSuccessMessage(msg);
      } else {
        setError("Failed to withdraw balance. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.detail
          ? error.response.data.detail
          : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error fetching balance:", error);
    } finally {
      loadCaptchaEnginge(6);
      setUserCaptchaInput("");
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Withdraw Your Balance
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl">
              Enter your wallet address and the amount you wish to withdraw.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
        <div className="mb-5">
          <label
            htmlFor="walletAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="Enter your wallet address"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount to Withdraw
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="Enter amount to withdraw"
          />
        </div>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <div className="mt-5">
          <LoadCanvasTemplate />
          <input
            type="text"
            placeholder="Enter Captcha Value"
            value={userCaptchaInput}
            onChange={(e) => setUserCaptchaInput(e.target.value)}
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
          />
        </div>
        <button
          onClick={handleWithdraw}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Withdraw
        </button>
        {successMessage && (
          <>
            <p className="text-green-500 text-xs mt-2">{successMessage}</p>
            <p className="text-red-500">Note:</p>
            <p className="text-gray-600">
              It may take some time for your transaction to be reflected on your
              wallet address. Please check the{" "}
              <NavLink
                to="/latest-withdraws"
                className="font-semibold text-blue-500"
              >
                latest withdrawal section
              </NavLink>{" "}
              to get the transaction hash.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default WithdrawBalance;
