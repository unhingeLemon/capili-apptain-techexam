import React, { useState, useEffect } from "react";
import { ChannelList, Channel, ChannelSettings } from "@sendbird/uikit-react";
import axios from "axios";
import Header from "./components/Header";
import LeaveChannelButton from "./components/LeaveChannelButton";

// eslint-disable-next-line no-empty-pattern
function CustomizedApp({ userId }) {
  const [currentChannel, setCurrentChannel] = useState(null);
  var currentChannelUrl = currentChannel ? currentChannel.url : "";
  localStorage.setItem(
    "currentChannelUrl",
    currentChannel ? currentChannel.url : ""
  );
  const [showSettings, setShowSettings] = useState(false);
  var userInfo = {
    nickname: "",
    userId: "",
    profileUrl: "",
  };
  var channelChatDiv = document.getElementsByClassName("channel-chat")[0];

  const hideSettingsBar = () => {
    channelChatDiv.style.width = "100%";
    channelChatDiv.style.cssFloat = "right";
    console.log("settings bar");
  };

  useEffect(() => {
    // console.log(currentChannelUrl);
    localStorage.setItem("currentChannelUrl", currentChannelUrl);
  }, [currentChannelUrl]);

  const renderSettingsBar = () => {
    channelChatDiv.style.width = "76%";
    channelChatDiv.style.cssFloat = "left";
  };

  const getUserInfo = async () => {
    const apiUrl = `https://api-${process.env.REACT_APP_SENDBIRD_APP_ID}.sendbird.com/v3/users/${userId}`;
    // console.log(apiUrl);
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Api-Token": process.env.REACT_APP_SENDBIRD_API_TOKEN,
        },
      });

      // console.log(response.data);
      userInfo = {
        nickname: response.data.nickname,
        userId: response.data.user_id,
        profileUrl: response.data.profile_url,
      };
      // console.log(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getUserInfo();

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <a
          href="/"
          className="btn btn-light"
          style={{
            margin: "0 auto",
            width: "100px",
          }}
        >
          Home
        </a>
        <div style={{ width: "320px" }}>
          <ChannelList
            onChannelSelect={(channel) => {
              setCurrentChannel(channel);

              // const query = channel.members;
              // console.log(query);
              // console.log(channelListState);
            }}
            allowProfileEdit={true}
            onProfileEditSuccess={(user) => {
              console.log(user);
            }}
            renderHeader={() => (
              <Header currentChannelUrl={currentChannelUrl} />
            )}
          />
        </div>
      </div>

      <div className="channel-chat">
        <Channel
          channelUrl={currentChannelUrl}
          onChatHeaderActionClick={() => {
            setShowSettings(!showSettings);
            renderSettingsBar();
          }}
        />
      </div>
      {showSettings && (
        <div className="channel-settings">
          <ChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
              hideSettingsBar();
            }}
            renderLeaveChannel={() => (
              <LeaveChannelButton
                setShowSettings={setShowSettings}
                hideSettingsBar={hideSettingsBar}
              />
            )}
          />
        </div>
      )}
    </div>
  );
}

export default CustomizedApp;
