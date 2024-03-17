import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wallet from "./components/Wallet";
import Home from "./components/Home";
import HeroSection from "./components/HeroSection";
import WithdrawBalance from "./components/WithdrawBalance";
import LatestWithdraw from "./components/LatestWithdraw";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Home />
                </>
              }
            />
            <Route path="/balance" element={<Wallet />} />

            <Route path="/withdraw" element={<WithdrawBalance />} />
            <Route path="/latest-withdraws" element={<LatestWithdraw />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
