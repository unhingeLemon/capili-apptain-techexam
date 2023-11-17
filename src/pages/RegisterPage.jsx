import React, { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
  const API_LINK = process.env.REACT_APP_API_LINK;
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [registerData, setRegisterData] = useState({
    nickname: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        API_LINK + "api/auth/register",
        registerData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data);
      navigate("/login");
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
      {showAlert && <Alert message={"Something went wrong!"} />}
      <h1>Register</h1>
      <a className="btn btn-light" href="/">
        Home
      </a>
      <form onSubmit={handleFormSubmit} className="form-login">
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Nickname:
          </span>
          <input
            type="text"
            name="nickname"
            value={registerData.nickname}
            onChange={handleInputChange}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Username:
          </span>
          <input
            type="text"
            name="username"
            value={registerData.username}
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
            value={registerData.password}
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

export default RegisterPage;
