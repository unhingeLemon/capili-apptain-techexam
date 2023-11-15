import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const API_LINK = process.env.REACT_APP_API_LINK;
  const navigate = useNavigate();

  const [loginData, setLoginDate] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

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
      } else {
        console.log("Not Match");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      registerPage <a href="/">Home</a>
      <form onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
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
