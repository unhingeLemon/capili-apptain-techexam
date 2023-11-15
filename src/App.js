import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import CustomizedApp from "./CustomizedApp";
import "./App.css";
const APP_ID = "889A4AFB-55EC-4B5D-93FE-B72BC1729840";
const USER_ID = "1";
function App() {
  return (
    <div className="App">
      <SendbirdProvider appId={APP_ID} userId={USER_ID} nickname="Cap">
        <CustomizedApp />
      </SendbirdProvider>
    </div>
  );
}

export default App;
