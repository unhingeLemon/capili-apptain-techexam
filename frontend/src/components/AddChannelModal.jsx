import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import "../App.css";
import Alert from "./Alert";

function AddChannelModal({ currentChannelUrl, show, setShow }) {
  const [channelUrl, setChannelUrl] = useState("");
  const [error, setError] = useState("");
  const API_LINK = process.env.REACT_APP_API_LINK;
  const globalStore = useSendbirdStateContext();
  const createChannel = sendbirdSelectors.getCreateGroupChannel(globalStore);
  const getGroupChannel = sendbirdSelectors.getGetGroupChannel(globalStore);

  const [createChannelData, setCreateChannelData] = useState({
    channelName: "",
    userId: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateChannelData({
      ...createChannelData,
      [name]: value,
    });
  };

  const handleClose = () => setShow(false);

  const handleCreateChannelSubmit = async () => {
    // For TypeScript, use const params: GroupChannelCreateParams = {};
    const params = {
      name: createChannelData.channelName,
      invitedUserIds: [createChannelData.userId],
    };

    // Check if chatmate exist:
    try {
      const response = await axios.post(
        API_LINK + "api/user/check",
        {
          username: params.invitedUserIds[0],
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data.message);

      // If exist create the channel:
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
              console.log(channel);
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
                handleClose();
              } catch (error) {
                console.log(error);
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 4000);
              }
            })
            .catch((error) => console.warn(error));
        })
        .catch((error) => console.warn(error));
    } catch (error) {
      console.log(error);
      setError("Error 404: Chatmate not found");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {showAlert && <Alert message={"Something went wrong!"} />}
        <Modal.Header closeButton>
          <Modal.Title>Add Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-channel-container">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Name:
              </span>
              <input
                type="text"
                name="channelName"
                value={createChannelData.channelName}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Channel Name"
                aria-label="ChannelName"
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                User ID:
              </span>
              <input
                type="text"
                name="userId"
                value={createChannelData.userId}
                onChange={handleInputChange}
                className="form-control"
                placeholder="User ID"
                aria-label="userId"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          <br />
          {/* {`Created channel is: ${channelUrl}`}
          {`Error: ${error}`} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleCreateChannelSubmit} variant="primary">
            Create Channel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddChannelModal;
