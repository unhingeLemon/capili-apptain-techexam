import react from "react";

function Header() {
  const profile_img_url =
    "https://sendbird.com/main/img/profiles/profile_05_512px.png";
  const handleClick = () => {
    console.log("Profile Edit");
  };
  return (
    <div>
      <div className="sendbird-channel-list__header">
        <div className="sendbird-channel-header sendbird-channel-header--allow-edit">
          <div className="sendbird-channel-header__title" onClick={handleClick}>
            <div className="sendbird-channel-header__title__left">
              <div
                className=" sendbird-avatar"
                role="button"
                tabIndex="0"
                style={{ height: "32px", width: "32px" }}
              >
                <div
                  className="sendbird-avatar-img sendbird-image-renderer"
                  style={{
                    width: "100%",
                    minWidth: "32px",
                    maxWidth: "400px",
                    height: "32px",
                  }}
                >
                  <div
                    className="sendbird-image-renderer__image"
                    style={{
                      width: "100%",
                      minWidth: "32px",
                      maxWidth: "400px",
                      height: "32px",
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
                    alt="Mark"
                  />
                </div>
              </div>
            </div>
            <div className="sendbird-channel-header__title__right">
              <span className="sendbird-channel-header__title__right__name sendbird-label sendbird-label--subtitle-2 sendbird-label--color-onbackground-1">
                Mark
              </span>
              <span className="sendbird-channel-header__title__right__user-id sendbird-label sendbird-label--body-2 sendbird-label--color-onbackground-2">
                LABEL
              </span>
            </div>
          </div>
          <div className="sendbird-channel-header__right-icon">
            <button
              className="sendbird-iconbutton"
              type="button"
              style={{ height: "32px", width: "32px" }}
              onClick={() => console.log("CHANNEL ADD HERE")}
            >
              <span className="sendbird-iconbutton__inner">
                <div
                  className="sendbird-icon sendbird-icon-create sendbird-icon-color--primary"
                  role="button"
                  tabIndex="0"
                  style={{
                    width: "24px",
                    minWidht: "24px",
                    height: "24px",
                    minHeight: "24px",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                    <path
                      className="icon-create_svg__fill"
                      d="M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333c-4.455 0-8.679-.993-12.461-2.77l-1.753.58c-5.965 1.912-10.133 2.572-12.504 1.981-2.799-.698-3.351-1.919-1.657-3.663 1.171-1.396 2.147-3.14 2.928-5.234.622-1.668.377-4.001-.737-7A29.15 29.15 0 012.666 32C2.667 15.8 15.8 2.667 32 2.667zM32 8C18.745 8 8 18.745 8 32c0 3.5.747 6.88 2.168 9.978l.405.837.137.271.106.285c1.517 4.085 1.89 7.622.734 10.72l-.382.972-.192.433.235-.05a62.067 62.067 0 004.886-1.363l1.721-.568 2.04-.696 1.95.917A23.882 23.882 0 0032 56c13.255 0 24-10.745 24-24S45.255 8 32 8zm2.667 16v5.333H40c3.556 0 3.556 5.334 0 5.334h-5.333V40c0 3.556-5.334 3.556-5.334 0v-5.333H24c-3.556 0-3.556-5.334 0-5.334h5.333V24c0-3.556 5.334-3.556 5.334 0z"
                      fill="#000"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
