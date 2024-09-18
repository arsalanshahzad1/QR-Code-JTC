import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../src/assets/logo.png";
import mailIcon from "../../src/assets/mail-icon.png";
import passIcon from "../../src/assets/pass-icon.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import apis from "../services/index"; // Adjust the import path as needed
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

const Login = () => {
  const [pass, setPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const { data } = await apis.authLogin({ email, password });
      const { user, token } = data?.data;
      console.log(data,"datadata")
      if(user?.type == "Coordinator")
      {
        localStorage.setItem("userId", user?.id);
        localStorage.setItem("token", token);
        toast.success("Login successfully");
        navigate("/home");
      }else{
        toast.error("Invalid email or password");
      }
     
    } catch (err) {
      toast.error("Invalid email or password");
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <section className="login-sec">
      {loading && <Loader/>} 
      <div className="login-main">
        <Link to="/login">
          <img src={logo} alt="logo" className="logimg" />
        </Link>
      </div>

      <h1>WELCOME BACK!</h1>
      <p>Welcome back to JTC</p>

      {error && <div className="error-message">{error}</div>}

      <div className="form-con">
        <form onSubmit={handleSubmit}>
          <div className="email-input">
            <label>Email</label>
            <div className="email-input-field">
              <img src={mailIcon} alt="" />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="password-input">
            <label>Password</label>
            <div className="pass-input-field">
              <img src={passIcon} alt="" />
              <input
                id="password"
                type={pass ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              {pass ? (
                <FaRegEye
                  className="eye"
                  onClick={() => setPass(!pass)}
                />
              ) : (
                <FaRegEyeSlash
                  className="eye"
                  onClick={() => setPass(!pass)}
                />
              )}
            </div>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
