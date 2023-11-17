import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Alert from "../components/Alert";

function LoginPage() {
  const API_LINK = process.env.REACT_APP_API_LINK;
  const navigate = useNavigate();

  const [loginData, setLoginDate] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDate({
      ...loginData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_LINK + "api/auth/login", loginData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (res.data.isMatch) {
        console.log("Match");

        navigate("/chat", { state: { user: res.data.message } });

        const userInfo = {
          nickname: res.data.message.nickname,
          userId: res.data.message.user_id,
          profileUrl: res.data.message.profile_url,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(res.data);
      } else {
        console.log("Not Match");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      }
    } catch (error) {
      setError(error);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  };

  return (
    <div className="login-page">
      {showAlert && <Alert message={"Error Credentials"} />}
      <h1>Login</h1>
      <a className="button btn btn-light" href="/">
        Home
      </a>

      <form onSubmit={handleFormSubmit} className="form-login">
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Username:
          </span>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Password:
          </span>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* {response && (
        <div>
          <h2>Response from Server:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default LoginPage;
