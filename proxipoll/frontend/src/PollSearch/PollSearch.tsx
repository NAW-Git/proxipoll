import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBox from "@mui/icons-material/CheckBox";
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

  return (
    <div className="MainContainer">
      <div className="PollsContainer">
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
                    style={{ transform: "scale(130%)" }}
                  />
                  Active
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(130%)" }}
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
                    style={{ transform: "scale(130%)" }}
                  />
                  5 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(130%)" }}
                  />
                  10 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(130%)" }}
                  />
                  15 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(130%)" }}
                  />
                  20 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(130%)" }}
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
                    style={{ transform: "scale(130%)" }}
                  />
                  Newest
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(130%)" }}
                  />
                  Oldest
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(130%)" }}
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
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            Should NBA and WNBA players make the same money?
          </div>
          <div className="TimeRemaining" style={{ color: "rgb(0, 150, 0)" }}>
            32 minutes left
          </div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            Do you guys prefer to put cereal or milk first in the bowl?
          </div>
          <div className="TimeRemaining">14 minutes left</div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">Smile or personality?</div>
          <div className="TimeRemaining" style={{ color: "rgb(0, 150, 0)" }}>
            2 hours left
          </div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            What is the best name for a dog that is spotted with tan dots?
          </div>
          <div className="TimeRemaining">2 minutes left</div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">Who has the best burgers in town?</div>
          <div className="TimeRemaining">17 minutes left</div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            What is the best color in the rainbow?
          </div>
          <div className="TimeRemaining" style={{ color: "rgb(0, 150, 0)" }}>
            1 day left
          </div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            Who is the better programmer, Nico or Keaton?
          </div>
          <div className="TimeRemaining" style={{ color: "rgb(0, 150, 0)" }}>
            1 week left
          </div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            Should NBA and WNBA players make the same money?
          </div>
          <div className="TimeRemaining" style={{ color: "rgb(0, 150, 0)" }}>
            32 minutes left
          </div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            Do you guys prefer to put cereal or milk first in the bowl?
          </div>
          <div className="TimeRemaining">14 minutes left</div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">Smile or personality?</div>
          <div className="TimeRemaining" style={{ color: "rgb(0, 150, 0)" }}>
            2 hours left
          </div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            What is the best name for a dog that is spotted with tan dots?
          </div>
          <div className="TimeRemaining">2 minutes left</div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">Who has the best burgers in town?</div>
          <div className="TimeRemaining">17 minutes left</div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            What is the best color in the rainbow?
          </div>
          <div className="TimeRemaining" style={{ color: "rgb(0, 150, 0)" }}>
            1 day left
          </div>
        </div>
        <div className="Poll">
          <div className="PollPoster">Posted by AnonymousUser</div>
          <div className="PollQuestion">
            Who is the better programmer, Nico or Keaton?
          </div>
          <div className="TimeRemaining" style={{ color: "rgb(0, 150, 0)" }}>
            1 week left
          </div>
        </div>
      </div>
      <img className="MapContainer" src={Map} alt="Santa Cruz Map"></img>
    </div>
  );
}

export default PollSearch;
