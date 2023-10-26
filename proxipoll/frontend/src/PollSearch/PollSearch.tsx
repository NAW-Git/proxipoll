import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBox from "@mui/icons-material/CheckBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import "./PollSearch.css";
import Map from "./Map.png";

function PollSearch() {
  const [currentDropdown, setCurrentDropdown] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleResize() {
      setCurrentDropdown("");
    }
    window.addEventListener("resize", handleResize);
  }, []);

  function generatePolls() {
    const pollTitles = [
      [
        "Does anyone else think that we should be able to divide by 0 in calculus?",
        32,
      ],
      ["Is ice cream or cake better?", 12],
      ["Best burger spot in town?", 2],
      ["How old should you have to be to drive?", 45],
      ["What are the four best Marvel movies of all time?", 32],
      ["Should healthcare be free in the United States?", 12],
      ["Is this town boring?", 52],
      ["Should they build a townhall for the city?", 45],
      ["Who is the basketball goat?", 32],
      ["Is ice cream or cake better?", 12],
      ["Best burger spot in town?", 2],
      ["How old should you have to be to drive?", 45],
      ["What are the four best Marvel movies of all time?", 32],
      ["Should healthcare be free in the United States?", 12],
      ["Who is the basketball goat?", 32],
      ["Is ice cream or cake better?", 12],
      ["Best burger spot in town?", 2],
      ["How old should you have to be to drive?", 45],
      ["What are the four best Marvel movies of all time?", 32],
      ["Dominos or RoundTable?", 12],
      ["Is this the last poll ever?", 52],
      ["What are the four best Marvel movies of all time?", 32],
      ["Should healthcare be free in the United States?", 12],
      ["Who is the basketball goat?", 32],
      ["Is ice cream or cake better?", 12],
      ["Best burger spot in town?", 2],
      ["How old should you have to be to drive?", 45],
      ["What are the four best Marvel movies of all time?", 32],
      ["Dominos or RoundTable?", 12],
      ["Is the end near?", 52]
    ];

    const polls = pollTitles.map((title, index) => (
      <div key={index}>
        <div className="Poll">
          <div className="PollPoster">
            Posted by AnonymousUser &#8226; 49 Answers
            <div style={{ display: "flex", alignItems: "center" }}>
              <MoreHorizIcon
                className="PollMoreIcon"
                onClick={() =>
                  currentDropdown === `poll${index}`
                    ? setCurrentDropdown("")
                    : setCurrentDropdown(`poll${index}`)
                }
              />
              <div
                className="PollDropdown"
                style={{
                  display:
                    currentDropdown === `poll${index}` ? "block" : "none",
                }}
              >
                <div
                  className="PollOption"
                  onClick={() =>
                    currentDropdown === `poll${index}`
                      ? setCurrentDropdown("")
                      : setCurrentDropdown(`poll${index}`)
                  }
                >
                  <ReportIcon
                    style={{
                      transform: "scale(90%)",
                    }}
                  />
                  Report
                </div>
                <div className="OptionBorder"></div>
                <div
                  className="PollOption"
                  onClick={() =>
                    currentDropdown === `poll${index}`
                      ? setCurrentDropdown("")
                      : setCurrentDropdown(`poll${index}`)
                  }
                >
                  <DeleteIcon
                    style={{
                      transform: "scale(90%)",
                    }}
                  />
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div className="PollQuestion">{title[0]}</div>
          <div
            className="TimeRemaining"
            style={{
              color: title[1] > 30 ? "rgb(0, 150, 0)" : "rgb(200, 0, 0)",
            }}
          >
            {title[1]} minutes left
          </div>
        </div>
      </div>
    ));
    return polls;
  }

  return (
    <div className="MainContainer">
      <div className="FilterAndPollsContainer">
        <div className="FilterContainer">
          <input
            className="SearchBar"
            type="text"
            placeholder="Search"
            onClick={() => setCurrentDropdown("")}
          ></input>
          <div className="ToggleContainer">
            <div
              className="Toggle"
              onClick={() =>
                currentDropdown === "status"
                  ? setCurrentDropdown("")
                  : setCurrentDropdown("status")
              }
              style={{
                backgroundColor: "#1f66e0",
                color: "white",
                borderColor: "transparent",
              }}
            >
              Status <KeyboardArrowDownIcon />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRef}
              style={{
                display: currentDropdown === "status" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  Active
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  Inactive
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => setCurrentDropdown("")}>
                  Reset
                </div>
                <div className="Update" onClick={() => setCurrentDropdown("")}>
                  Update
                </div>
              </div>
            </div>
          </div>
          <div className="ToggleContainer">
            <div
              className="Toggle"
              onClick={() =>
                currentDropdown === "type"
                  ? setCurrentDropdown("")
                  : setCurrentDropdown("type")
              }
            >
              Type <KeyboardArrowDownIcon />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRef}
              style={{
                display: currentDropdown === "type" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <CheckBox className="CheckBox" />
                  Multiple Choice
                </li>
                <li>
                  <CheckBox className="CheckBox" />
                  Free Response
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => setCurrentDropdown("")}>
                  Reset
                </div>
                <div className="Update" onClick={() => setCurrentDropdown("")}>
                  Update
                </div>
              </div>
            </div>
          </div>
          <div className="ToggleContainer">
            <div
              className="Toggle"
              onClick={() =>
                currentDropdown === "radius"
                  ? setCurrentDropdown("")
                  : setCurrentDropdown("radius")
              }
            >
              Radius <KeyboardArrowDownIcon />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRef}
              style={{
                display: currentDropdown === "radius" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  5 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  10 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  15 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  20 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  25 Miles
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => setCurrentDropdown("")}>
                  Reset
                </div>
                <div className="Update" onClick={() => setCurrentDropdown("")}>
                  Update
                </div>
              </div>
            </div>
          </div>
          <div className="ToggleContainer">
            <div
              className="Toggle"
              onClick={() =>
                currentDropdown === "voted"
                  ? setCurrentDropdown("")
                  : setCurrentDropdown("voted")
              }
            >
              Voted <KeyboardArrowDownIcon />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRef}
              style={{
                display: currentDropdown === "voted" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <CheckBox className="CheckBox" />
                  Have Voted
                </li>
                <li>
                  <CheckBox className="CheckBox" />
                  Have Not Voted
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => setCurrentDropdown("")}>
                  Reset
                </div>
                <div className="Update" onClick={() => setCurrentDropdown("")}>
                  Update
                </div>
              </div>
            </div>
          </div>
          <div className="ToggleContainer">
            <div
              className="Toggle"
              onClick={() =>
                currentDropdown === "sort by"
                  ? setCurrentDropdown("")
                  : setCurrentDropdown("sort by")
              }
            >
              Sort By <KeyboardArrowDownIcon />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRef}
              style={{
                display: currentDropdown === "sort by" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  Newest
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  Oldest
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(140%)" }}
                  />
                  Most Voted
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => setCurrentDropdown("")}>
                  Reset
                </div>
                <div className="Update" onClick={() => setCurrentDropdown("")}>
                  Update
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="PollsContainer">{generatePolls()}</div>
      </div>
      <img className="MapContainer" src={Map} alt="Santa Cruz Map"></img>
    </div>
  );
}

export default PollSearch;
