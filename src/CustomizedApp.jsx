import React, { useState } from "react";
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import { ChannelList, Channel, ChannelSettings } from "@sendbird/uikit-react";
import axios from "axios";

const AddComponent = ({ currentChanelUrl }) => {
  const [channelUrl, setChannelUrl] = useState("");
  const API_LINK = process.env.REACT_APP_API_LINK;
  const globalStore = useSendbirdStateContext();
  const createChannel = sendbirdSelectors.getCreateGroupChannel(globalStore);
  const leaveChannel = sendbirdSelectors.getLeaveGroupChannel(globalStore);
  const getGroupChannel = sendbirdSelectors.getGetGroupChannel(globalStore);

  const [createChannelData, setCreateChannelData] = useState({
    channelName: "",
    userId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateChannelData({
      ...createChannelData,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <label>Channel Name:</label>
        <input
          type="text"
          name="channelName"
          value={createChannelData.channelName}
          onChange={handleInputChange}
        />
        <label>USER ID:</label>
        <input
          type="text"
          name="userId"
          value={createChannelData.userId}
          onChange={handleInputChange}
        />
      </div>
      <button
        onClick={() => {
          // For TypeScript, use const params: GroupChannelCreateParams = {};
          const params = {
            name: createChannelData.channelName,
            invitedUserIds: [createChannelData.userId],
          };
          createChannel(params)
            .then((channel) => {
              setChannelUrl(channel._url);
              // console.log(channel);\
              getGroupChannel(channel._url)
                .then(async (channel) => {
                  console.log(channel);

                  setCreateChannelData({
                    channelName: "",
                    userId: "",
                  });

                  // POST TO DB:

                  try {
                    const response = await axios.post(
                      API_LINK + "api/channel/",
                      {
                        channel_url: channel.url,
                        created_by: channel.creator.userId,
                        chatmate: createChannelData.userId,
                        channel_name: createChannelData.channelName,
                      },
                      {
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                      }
                    );
                    console.log(response.data.message);
                  } catch (error) {
                    console.log(error);
                  }
                })
                .catch((error) => console.warn(error));
            })
            .catch((error) => console.warn(error));
        }}
      >
        Create channel
      </button>
      <button
        onClick={() => {
          leaveChannel(currentChanelUrl)
            .then(() => {
              setChannelUrl("");
            })
            .catch((error) => console.warn(error));
        }}
      >
        Leave channel
      </button>
      <br />
      {`Created channel is: ${channelUrl}`}
    </>
  );
};

// eslint-disable-next-line no-empty-pattern
function CustomizedApp({}) {
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  const [showSettings, setShowSettings] = useState(false);
  var channelChatDiv = document.getElementsByClassName("channel-chat")[0];

  const globalStore1 = useChannelListContext();
  const globalStore = useSendbirdStateContext();

  const renderSettingsBar = () => {
    channelChatDiv.style.width = "52%";
    channelChatDiv.style.cssFloat = "left";
  };

  const hideSettingsBar = () => {
    channelChatDiv.style.width = "76%";
    channelChatDiv.style.cssFloat = "right";
    const disconnect = sendbirdSelectors.getUpdateUserInfo(globalStore);
    disconnect()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(globalStore1);
  };

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <div style={{ width: "320px", height: "500px" }}>
          <AddComponent currentChanelUrl={currentChannelUrl}></AddComponent>
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
          />
        </div>
      )}
    </div>
  );
}

export default CustomizedApp;
