import React, { useEffect, useState } from "react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizedApp from "../CustomizedApp";
import "../App.css";
const APP_ID = "889A4AFB-55EC-4B5D-93FE-B72BC1729840";

function ChatPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    console.log(state);
    if (state === null || state === undefined) {
      console.log("asdasd");
      navigate("/login");
    } else {
      setRenderPage(true);
    }
  });
  return (
    <div className="App">
      {renderPage ? (
        <SendbirdProvider
          appId={APP_ID}
          userId={state.user.userid}
          nickname={state.user.nickname}
        >
          <CustomizedApp />
        </SendbirdProvider>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}

export default ChatPage;