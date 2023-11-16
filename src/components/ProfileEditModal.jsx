import React from "react";

function ProfileEditModal() {
  const profile_img_url =
    "https://sendbird.com/main/img/profiles/profile_05_512px.png";
  return (
    <div id="sendbird-modal-root">
      <div className="sendbird-modal">
        <div className="sendbird-modal__content">
          <div className="sendbird-modal__header">
            <span className="sendbird-label sendbird-label--h-1 sendbird-label--color-onbackground-1">
              My profile
            </span>
          </div>
          <div className="sendbird-modal__body">
            <span className="sendbird-label sendbird-label--subtitle-1 sendbird-label--color-onbackground-2">
              <form className="sendbird-edit-user-profile">
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
                  />
                  <div
                    className="sendbird-edit-user-profile__img__avatar-button sendbird-color--onbackground-1 sendbird-textbutton--not-underline "
                    role="button"
                    tabIndex="0"
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
                      name="sendbird-edit-user-profile__name__input"
                      required
                      value="Mark"
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
            >
              <span className="sendbird-button__text sendbird-label sendbird-label--button-1 sendbird-label--color-oncontent-1">
                Save
              </span>
            </button>
          </div>
          <div className="sendbird-modal__close">
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
      </div>
    </div>
  );
}

export default ProfileEditModal;
