import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const API_LINK = process.env.REACT_APP_API_LINK;

  const [registerData, setRegisterData] = useState({
    nickname: "",
    username: "",
    password: "",
  });

  const [response, setResponse] = useState(null);
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
      setResponse(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      registerPage <a href="/">Home</a>
      <form onSubmit={handleFormSubmit}>
        <label>Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={registerData.nickname}
          onChange={handleInputChange}
        />

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={registerData.password}
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

export default RegisterPage;
