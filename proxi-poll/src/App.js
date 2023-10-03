import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:7500/test")
      .then((res) => res.json())
      .then((data) => setTestData(data["title"]))
      .catch((err) => console.log("Error fetching test data"));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h6>
          {"If you see the welcome, frontend is fetching from backend ->"}{" "}
          {testData}
        </h6>
      </header>
    </div>
  );
}

export default App;
