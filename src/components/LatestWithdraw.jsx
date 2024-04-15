import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const LatestWithdraw = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  React.useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const fetchLatestWithdraws = async () => {
    if (!validateCaptcha(userCaptchaInput)) {
      alert("Captcha Does Not Match");
      return;
    }

    if (walletAddress.length <= 40) {
      setError("Invalid Wallet address");
      return;
    }

    setError("");
    try {
      const response = await axios.get(
        `${config.pooApi}/latestwithdraws/?wallet_address=${walletAddress}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTransactions(response.data.transactions);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.detail
          ? error.response.data.detail
          : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error fetching latest withdrawals:", error);
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
              Check Your Latest Withdrawals
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl">
              Enter your wallet address to view your latest withdrawal
              transactions.
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
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
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
          onClick={fetchLatestWithdraws}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Fetch Latest Withdrawals
        </button>
        {transactions.length > 0 && (
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-900">
              Latest Transactions:
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction, index) => {
                    let dateLocal = "No date";
                    let dateUTC = "No date";

                    if (transaction.timestamp) {
                      const utcTimestamp = transaction.timestamp.endsWith("Z")
                        ? transaction.timestamp
                        : `${transaction.timestamp}Z`;

                      dateLocal = new Date(utcTimestamp).toLocaleString();
                      dateUTC = new Date(utcTimestamp).toUTCString();
                    }

                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Hash: {transaction.hash}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Amount: {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Date: {dateLocal} (local) / {dateUTC} (UTC)
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LatestWithdraw;
