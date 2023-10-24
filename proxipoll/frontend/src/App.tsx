import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PollSearch from "./PollSearch/PollSearch";
import "./App.css";

function App() {
  const [testData, setTestData] = useState<number | null>(null);
  const [headerVisibility, setHeaderVisibility] = useState<string>("visible");

  useEffect(() => {
    fetch("http://localhost:7500/test")
      .then((res) => res.json())
      .then((data) => setTestData(data.number))
      .catch((err) => {
        console.log(`Error Fetching Test Data: ${err}`);
      });
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 875) {
        setHeaderVisibility("visible");
      } else {
        setHeaderVisibility("hidden");
      }
    }

    window.addEventListener("resize", handleResize);
  });

  return (
    <div>
      <PollSearch></PollSearch>
      <div>
        <header className="App-header">
          <div className="App-header-title">
            {testData == 13 ? "ProxiPoll" : "ProxiPoll Frontend"}
          </div>
          <MenuIcon
            className="App-header-menu-icon"
            onClick={() =>
              headerVisibility === "visible"
                ? setHeaderVisibility("hidden")
                : setHeaderVisibility("visible")
            }
          />
          <div
            className="PagesContainer"
            style={{
              visibility: headerVisibility,
              opacity: headerVisibility === "visible" ? 1 : 0,
            }}
          >
            <div className="Page">SEARCH</div>
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
