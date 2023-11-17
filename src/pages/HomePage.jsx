import React from "react";
function HomePage(props) {
  return (
    <div className="home-page">
      <h1>Welcome!</h1>

      <div>
        <a href="./login" className="btn btn-primary">
          Login
        </a>
        <a href="./register" className="btn btn-primary">
          Register
        </a>
      </div>
    </div>
  );
}

export default HomePage;
