import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PollSearch from "./Search/PollSearch";
import PollPost from "./Post/PollPost";
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
      if (window.innerWidth > 860) {
        setHeaderVisibility("visible");
        setLargeView(true);
      } else {
        setHeaderVisibility("hidden");
        setLargeView(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <header className="App-header">
        <div className="App-header-title">
          {testData == 13 ? "ProxiPoll" : "ProxiPoll"}
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
          <Link to="/Search" style={{ textDecoration: "none" }}>
            <div
              style={{ color: largeView === true ? "white" : "black" }}
              className="Page"
              onClick={() => {
                if (!largeView) setHeaderVisibility("hidden");
              }}
            >
              SEARCH
            </div>
          </Link>
          <Link to="/Create" style={{ textDecoration: "none" }}>
            <div
              style={{ color: largeView === true ? "white" : "black" }}
              className="Page"
              onClick={() => {
                if (!largeView) setHeaderVisibility("hidden");
              }}
            >
              CREATE
            </div>
          </Link>
          <Link to="/Search" style={{ textDecoration: "none" }}>
            <div
              className="Page"
              style={{ color: largeView === true ? "white" : "black" }}
              onClick={() => {
                if (!largeView) setHeaderVisibility("hidden");
              }}
            >
              LOGOUT
            </div>
          </Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<PollSearch />} />
        <Route path="/Search" element={<PollSearch />} />
        <Route path="/Create" element={<PollPost />} />
      </Routes>
    </div>
  );
}

export default App;
