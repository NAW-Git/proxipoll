import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PollSearch from "./PollSearch/PollSearch";
import "./App.css";

function App() {
  const [testData, setTestData] = useState<number | null>(null);
  const [largeView, setLargeView] = useState<boolean>(
    window.innerWidth > 875 ? true : false
  );
  const [headerVisibility, setHeaderVisibility] = useState<string>(
    window.innerWidth > 875 ? "visible" : "hidden"
  );

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
        setLargeView(true);
      } else {
        setHeaderVisibility("hidden");
        setLargeView(false);
      }
    }

    window.addEventListener("resize", handleResize);
  });

  return (
    <div>
      <div
        className="PageDimmer"
        style={{
          display:
            headerVisibility === "visible" && !largeView ? "block" : "none",
        }}
        onClick={() =>
          headerVisibility === "visible"
            ? setHeaderVisibility("hidden")
            : setHeaderVisibility("visible")
        }
      ></div>
      <PollSearch></PollSearch>
      <div>
        <header className="App-header">
          <div className="App-header-title">
            {testData == 13 ? "ProxiPoll" : "ProxiPoll."}
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
            <div
              className="Page"
              onClick={() => {
                if (!largeView) setHeaderVisibility("hidden");
              }}
            >
              SEARCH
            </div>
            <div
              className="Page"
              onClick={() => {
                if (!largeView) setHeaderVisibility("hidden");
              }}
            >
              POST
            </div>
            <div
              className="Page"
              onClick={() => {
                if (!largeView) setHeaderVisibility("hidden");
              }}
            >
              PROFILE
            </div>
            <div
              className="Page"
              onClick={() => {
                if (!largeView) setHeaderVisibility("hidden");
              }}
            >
              LOGOUT
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
