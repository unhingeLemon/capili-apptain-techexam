import React, { useState } from "react";
import {
  useChannelListContext,
  ChannelListProvider,
} from "@sendbird/uikit-react/ChannelList/context";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import { useCreateChannelContext } from "@sendbird/uikit-react/CreateChannel/context";

import ChannelListUI from "@sendbird/uikit-react/ChannelList/components/ChannelListUI";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import { ChannelList, Channel, ChannelSettings } from "@sendbird/uikit-react";
import CreateChannel from "@sendbird/uikit-react/CreateChannel";
import ChannelListHeader from "@sendbird/uikit-react/ChannelList/components/ChannelListHeader";
import AddChannel from "@sendbird/uikit-react/ChannelList/components/AddChannel";

const AddComponent = () => {
  const [channelUrl, setChannelUrl] = useState("");

  const globalStore = useSendbirdStateContext();
  const createChannel = sendbirdSelectors.getCreateGroupChannel(globalStore);
  const leaveChannel = sendbirdSelectors.getLeaveGroupChannel(globalStore);
  const getGroupChannel = sendbirdSelectors.getGetGroupChannel(globalStore);

  return (
    <>
      <button
        onClick={() => {
          // For TypeScript, use const params: GroupChannelCreateParams = {};
          const params = { name: "CREATEDDDD", invitedUserIds: ["dev.cmark"] };
          createChannel(params)
            .then((channel) => {
              setChannelUrl(channel._url);
              // console.log(channel);\
              getGroupChannel(channel._url)
                .then((channel) => {
                  console.log(channel);
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
          leaveChannel(channelUrl)
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

  const createChannel = sendbirdSelectors.getCreateGroupChannel(globalStore);
  const leaveChannel = sendbirdSelectors.getLeaveGroupChannel(globalStore);
  const getGroupChannel = sendbirdSelectors.getGetGroupChannel(globalStore);
  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <ChannelListProvider
          onBeforeCreateChannel={(users) => {
            console.log(users);
            // const params = {
            //   name: "CREATEDDDD",
            //   invitedUserIds: users,
            // };
            // createChannel(params)
            //   .then((channel) => {
            //     setCurrentChannel(channel);
            //     // console.log(channel);\
            //     getGroupChannel(channel._url)
            //       .then((channel) => {
            //         console.log(channel);
            //       })
            //       .catch((error) => console.warn(error));
            //   })
            //   .catch((error) => console.warn(error));
          }}
          renderHeader={AddComponent}
          onChannelSelect={(channel) => {
            setCurrentChannel(channel);
            // const globalStore = useSendbirdStateContext();

            // const query = channel.members;
            // console.log(query);
            // console.log(channelListState);
          }}
          allowProfileEdit={true}
          onProfileEditSuccess={(user) => console.log(user)}
          onThemeChange={(theme) => console.log(theme)}
        >
          <ChannelListUI />
        </ChannelListProvider>

        {/* <ChannelList
          onChannelSelect={(channel) => {
            setCurrentChannel(channel);

            // const query = channel.members;
            // console.log(query);
            // console.log(channelListState);
          }}
          allowProfileEdit={true}
          disableUserProfile={true}
          onProfileEditSuccess={(user) => {
            console.log(user);
          }}
          onBeforeCreateChannel={(e) => {
            console.log(e);
          }}
          renderUserProfile={Profile}
        ></ChannelList> */}

        {/* <div style={{ width: "320px", height: "500px" }}>
          <AddComponent></AddComponent>
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
        </div> */}
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
