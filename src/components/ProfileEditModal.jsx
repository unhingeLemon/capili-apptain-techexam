import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import axios from "axios";

function ProfileEditModal({ showProfileEdit, setShowProfileEdit, userInfo }) {
  const [profile_img_url, setProfile_img_url] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileFile, setProfileFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleProfileFileChange = (e) => {
    // Assuming you have an input of type 'file' for profile image upload
    const file = e.target.files[0];
    console.log(file);
    setProfileFile(file);
    if (file) {
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(file);
      setProfile_img_url(imageUrl);
    }
  };

  const handleUploadClick = () => {
    // Trigger click on the hidden file input
    fileInputRef.current.click();
  };

  const onUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("Update Progile");
    const apiUrl = `https://api-${process.env.REACT_APP_SENDBIRD_APP_ID}.sendbird.com/v3/users/${userInfo.userId}`;
    const backendApiUrl = process.env.REACT_APP_API_LINK;

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append("profile_file", profileFile);
    formData.append("nickname", nickname);

    try {
      const response = await axios.put(apiUrl, formData, {
        headers: {
          "Api-Token": process.env.REACT_APP_SENDBIRD_API_TOKEN,
          "Content-Type": "multipart/form-data", // Make sure to set the correct content type for FormData
        },
      });

      console.log(response);
      const newStoredUser = {
        nickname: response.data.nickname,
        userId: response.data.user_id,
        profileUrl: response.data.profile_url,
      };

      // UPDATE THE DATABSE
      const res = await axios.put(
        backendApiUrl + "api/user/update",
        newStoredUser,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(res);
      localStorage.setItem("userInfo", JSON.stringify(newStoredUser));
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    setNickname(userInfo.nickname);
    setProfile_img_url(userInfo.profileUrl);
  }, []);
  return (
    <>
      {/* <Modal show={show} onHide={handleClose}> */}
      <Modal show={showProfileEdit}>
        <div className="sendbird-modal__content" style={{ width: "100%" }}>
          <div className="sendbird-modal__header">
            <span className="sendbird-label sendbird-label--h-1 sendbird-label--color-onbackground-1">
              My profile
            </span>
          </div>
          <div className="sendbird-modal__body">
            <span className="sendbird-label sendbird-label--subtitle-1 sendbird-label--color-onbackground-2">
              <form
                id="updateProfileFormId"
                onSubmit={onUpdateProfile}
                className="sendbird-edit-user-profile"
              >
                <section className="sendbird-edit-user-profile__img">
                  <span className="sendbird-input-label sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-1">
                    Profile image
                  </span>
                  <div className="sendbird-edit-user-profile__img__avatar">
                    <div
                      className="sendbird-avatar"
                      role="button"
                      tabIndex="0"
                      style={{ height: "80px", width: "80px" }}
                    >
                      <div
                        className="sendbird-avatar-img sendbird-image-renderer"
                        style={{
                          width: "100%",
                          minWidth: "80px",
                          maxWidth: "400px",
                          height: "80px",
                        }}
                      >
                        <div
                          className="sendbird-image-renderer__image"
                          style={{
                            width: "100%",
                            minWidth: "80px",
                            maxWidth: "400px",
                            height: "80px",
                            position: "absolute",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                            backgroundSize: "cover",
                            backgroundImage: `url("${profile_img_url}")`,
                          }}
                        ></div>
                        <img
                          className="sendbird-image-renderer__hidden-image-loader"
                          src={profile_img_url}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleProfileFileChange}
                  />
                  <div
                    className="sendbird-edit-user-profile__img__avatar-button sendbird-color--onbackground-1 sendbird-textbutton--not-underline "
                    role="button"
                    tabIndex="0"
                    onClick={handleUploadClick}
                  >
                    <span className="sendbird-label sendbird-label--button-1 sendbird-label--color-primary">
                      Upload
                    </span>
                  </div>
                </section>
                <section className="sendbird-edit-user-profile__name">
                  <span className="sendbird-input-label sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-1">
                    Nickname
                  </span>
                  <div className="sendbird-input">
                    <input
                      className="sendbird-input__input"
                      name="nickname"
                      required
                      type="text"
                      value={nickname}
                      onChange={handleNicknameChange}
                    />
                  </div>
                </section>
                <section className="sendbird-edit-user-profile__userid">
                  <span className="sendbird-input-label sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-1">
                    User ID
                  </span>
                  <div className="sendbird-input">
                    <input
                      className="sendbird-input__input"
                      name="sendbird-edit-user-profile__userid__input"
                      disabled
                      value="mark"
                    />
                  </div>
                </section>
              </form>
            </span>
          </div>
          <div className="sendbird-modal__footer">
            <button
              className="sendbird-button sendbird-button--secondary sendbird-button--big"
              type="button"
              onClick={() => setShowProfileEdit(false)}
            >
              <span className="sendbird-button__text sendbird-label sendbird-label--button-1 sendbird-label--color-oncontent-1">
                <span className="sendbird-label sendbird-label--button-1 sendbird-label--color-onbackground-1">
                  Cancel
                </span>
              </span>
            </button>
            <button
              className="sendbird-button sendbird-button--primary sendbird-button--big"
              type="button"
              form="updateProfileFormId"
              onClick={onUpdateProfile}
            >
              <span className="sendbird-button__text sendbird-label sendbird-label--button-1 sendbird-label--color-oncontent-1">
                Save
              </span>
            </button>
          </div>
          <div
            className="sendbird-modal__close "
            onClick={() => setShowProfileEdit(false)}
          >
            <button
              className="sendbird-iconbutton"
              type="button"
              style={{ height: "32px", width: "32px" }}
            >
              <span className="sendbird-iconbutton__inner">
                <div
                  className="sendbird-icon sendbird-icon-close"
                  role="button"
                  tabIndex="0"
                  style={{
                    width: "24px",
                    minWidth: "24px",
                    height: "24px",
                    minHeight: "24px",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                    <path
                      className="icon-close_svg__fill"
                      d="M52.552 11.448a2.666 2.666 0 01.222 3.52l-.222.251-16.781 16.78 16.781 16.782a2.665 2.665 0 010 3.771 2.666 2.666 0 01-3.52.222l-.251-.222L32 35.771 15.219 52.552a2.665 2.665 0 01-3.771 0 2.666 2.666 0 01-.222-3.52l.222-.251L28.228 32l-16.78-16.781a2.665 2.665 0 010-3.771 2.666 2.666 0 013.52-.222l.251.222 16.78 16.78 16.782-16.78a2.665 2.665 0 013.771 0z"
                      fill="#000"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </span>
            </button>
          </div>
        </div>
        <div className="sendbird-modal__backdrop false"></div>
      </Modal>
    </>
  );
}

export default ProfileEditModal;
