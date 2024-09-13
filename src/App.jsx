import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QRCode from 'react-qr-code'

function App() {
  const submitHandler=(e)=>{
     e.preventDefault();
  }
  return (
    <>
         <div
        class="wrapper"
      >
        <div className="mainContent">
            <div className="rbox-headerBox">
           <form onSubmit={submitHandler}>
             <input type="number"/>
             <button type="submit">Create</button>
           </form>
              <h1 className="stepTitle" style={{ textAlign: "center" }}>
                Scan Qr Code To Pay Via JTC Tokens
              </h1>
              <div
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 294,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={21312}
                  viewBox={`0 0 256 256`}
                />
               </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
