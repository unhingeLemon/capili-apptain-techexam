import React, { useEffect } from "react";

const Alert = ({ message }) => {
  useEffect(() => {
    // Set a timeout to hide the alert after 5 seconds
    const timeout = setTimeout(() => {
      const alertElement = document.getElementById("myAlert");
      if (alertElement) {
        alertElement.style.opacity = "0";
      }
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      id="myAlert"
      className="alert alert-danger"
      role="alert"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 1000,
        margin: "20px",
        opacity: 1,
        transition: "opacity 1s ease-out",
      }}
    >
      {message}
    </div>
  );
};

export default Alert;
