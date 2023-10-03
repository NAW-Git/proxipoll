import React, { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
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
    <div>
        <header className="App-header">
          <MenuIcon className="App-header-menu-icon"/>
          <div className="App-header-title">
            {testData}
          </div>
        </header>
        <div className="Main-page">
        </div>
    </div>
  );
}

export default App;
