import React from "react";

function HomePage(props) {
  return (
    <div>
      <h1>Welcome!</h1>

      <div>
        <a href="./login">login</a>
        <a href="./register">register</a>
      </div>
    </div>
  );
}

export default HomePage;
