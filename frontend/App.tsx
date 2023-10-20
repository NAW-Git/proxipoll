import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PollSearch from "./PollSearch/PollSearch";
import "./App.css";

function App() {
  const [testData, setTestData] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:7500/test")
      .then((res) => res.json())
      .then((data) => setTestData(data.number))
      .catch((err) => {
        console.log(`Error Fetching Test Data: ${err}`);
      });
  }, []);

  return (
    <div>
      <PollSearch></PollSearch>
      <div>
        <header className="App-header">
          <div className="App-header-title">{testData}</div>
          <MenuIcon className="App-header-menu-icon" />
          <div className="PagesContainer">
            <div className="Page">BROWSE</div>
            <div className="Page">POST</div>
            <div className="Page">MY POLLS</div>
            <div className="Page">PROFILE</div>
            <div className="Page">LOGOUT</div>
          </div>
        </header>
        <div className="Main-page"></div>
      </div>
    </div>
  );
}

export default App;