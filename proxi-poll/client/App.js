import React, { useState, useEffect } from "react";
import PollSearch from "./PollSearch/PollSearch.js"
import MenuIcon from '@mui/icons-material/Menu';
import "./App.css";

function App() {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:7500/test")
      .then((res) => res.json())
      .then((data) => setTestData(data["title"]))
      .catch((err) => {setTestData("ProxiPoll"); console.log("Error fetching test data")});
  }, []);

  return (
    <div>
      <PollSearch></PollSearch>
      <div>
        <header className="App-header">
          <div className="App-header-title">
              {testData}
            </div>
          <MenuIcon className="App-header-menu-icon"/>
          <div className="PagesContainer">
            <div className="Page">BROWSE</div>
            <div className="Page">POST</div>
            <div className="Page">MY POLLS</div>
            <div className="Page">PROFILE</div>
            <div className="Page">LOGOUT</div>
          </div>
          </header>
          <div className="Main-page">
          </div>
      </div>
    </div>
  );
}

export default App;
