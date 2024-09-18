import React, { useState } from 'react';
import logo from "../../src/assets/logo.png";
import { useNavigate } from 'react-router-dom';
import apis from '../services';
import Loader from './Loader';
import { FaMaximize, FaMinimize } from 'react-icons/fa6';

const Header = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const fullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleLogout = async () => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId");
      let res= await apis.authLogout(userId); 
    if(res?.data)
    {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");  
    }else{
        console.log("Error",res)
    }

    } catch (err) {
      console.error("Logout failed:", err.response?.data?.message || err.message);
    }finally{
        setLoading(false)
    }
  };


  return (
    <div className="header">
      {loading && <Loader/>} 

      <div className='left'>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className='right'>
        {isFullscreen === true ? (
          <FaMinimize
          onClick={() => fullScreen()}
          style={{ cursor: "pointer" }}
          size={30}
            />
          ) : (
            <FaMaximize
              onClick={() => fullScreen()}
              style={{ cursor: "pointer" }}
              size={30}
              />
            )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
