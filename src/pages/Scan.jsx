import React, { useState } from "react";
import QRCode from "react-qr-code";
import Header from "../components/Header";
import Loader from "../components/Loader"; // Adjust the import path as needed
import { toast } from "react-hot-toast";

const Scan = () => {
  const [amount, setAmount] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    
    setLoading(true);
    setTimeout(() => {
      setQrCodeValue(JSON.stringify({
        amount: amount,
        privateKey: "JTC-SCAN",
      }));

      
      setLoading(false); 
    }, 1000); 


    setTimeout(() => {
      setQrCodeValue(null);
      setAmount("");
    },20000);

  };





  return (
    <>
      <Header />
      {loading && <Loader />} {/* Show loader while loading */}
      <div className="wrapper">
        <div className="mainContent">
          <form onSubmit={submitHandler} className="inputForm">
            <h1>Enter Amount:</h1>
            <input
               required
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <button type="submit">Create QR Code</button>
          </form>
          {qrCodeValue && (
            <div className="qrSection">
              <h1>
                Scan QR Code to Pay via <span>JTC Tokens</span>
              </h1>
              <div className="qrCodeContainer">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "60%", width: "100%" }}
                  value={qrCodeValue}
                />
                <span>{JSON.parse(qrCodeValue).amount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Scan;
