import React from "react";
const LeaveChannelButton = () => {
  return (
    <div
      onClick={() => console.log("Leave button clicked")}
      className="sendbird-channel-settings__panel-item sendbird-channel-settings__leave-channel"
      role="button"
      tabIndex="0"
    >
      <div
        className="sendbird-channel-settings__panel-icon-left sendbird-channel-settings__panel-icon__leave sendbird-icon sendbird-icon-leave sendbird-icon-color--error"
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
            className="icon-leave_svg__fill"
            d="M32 5.333a2.667 2.667 0 01.311 5.316l-.311.018H10.667a2.67 2.67 0 00-2.65 2.355L8 13.333v37.334a2.667 2.667 0 002.356 2.648l.31.018H32a2.667 2.667 0 01.311 5.316l-.311.018H10.667a8.001 8.001 0 01-7.987-7.53l-.013-.47V13.333a8 8 0 017.53-7.986l.47-.014H32zm17.634 13.893l.252.222 10.666 10.666a2.666 2.666 0 01.222 3.52l-.222.252-10.666 10.666a2.666 2.666 0 01-3.993-3.52l.221-.251 4.78-4.782L20 36a2.667 2.667 0 01-.311-5.315l.311-.018h33.56l-7.446-7.448a2.668 2.668 0 01-.221-3.52l.221-.251a2.666 2.666 0 013.52-.222z"
            fill="#000"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      <span className="sendbird-label sendbird-label--subtitle-1 sendbird-label--color-onbackground-1">
        Leave channel
      </span>
    </div>
  );
};

export default LeaveChannelButton;
