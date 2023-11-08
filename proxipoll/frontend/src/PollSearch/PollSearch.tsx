import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import "./PollSearch.css";
import Map from "./Map.png";

function PollSearch() {
  const [currentDropdown, setCurrentDropdown] = useState<string>("");
  const dropdownRefs = {
    status: useRef<HTMLDivElement>(null),
    type: useRef<HTMLDivElement>(null),
    radius: useRef<HTMLDivElement>(null),
    voted: useRef<HTMLDivElement>(null),
    "sort by": useRef<HTMLDivElement>(null),
  };

  function uncheckInputs(groupName: string): void {
    const inputs = document.querySelectorAll(
      `input[name="${groupName}"]`
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      input.checked = false;
    });
    setCurrentDropdown("");
  }

  useEffect(() => {
    function handleResize() {
      setCurrentDropdown("");
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    function adjustDropdownPosition() {
      console.log(currentDropdown);
      const dropdownRef = dropdownRefs[currentDropdown];
      if (dropdownRef === undefined) return;
      dropdownRef.current.style.left = "0";
      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        if (dropdownRect.right > windowWidth) {
          const newLeft = windowWidth - dropdownRect.right;
          dropdownRef.current.style.left = newLeft - 1 + "px";
        }
      }
    }
    adjustDropdownPosition();
  }, [currentDropdown]);

  function generatePolls() {
    const pollTitles = [
      ["We should be able to divide by 0 in calculus, right?", 32],
      ["Is ice cream or cake better?", 12],
      ["Best burger spot in town?", 2],
      ["How old should you have to be to drive?", 45],
      ["What are the four best Marvel movies of all time?", 32],
      [
        "Should healthcare be free in the United States, what do y'all think?",
        12,
      ],
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
      ["Best burger spot in town?", 1],
      ["How old should you have to be to drive?", 34],
      ["What are the four best Marvel movies of all time?", 34],
      ["What are the four best Marvel movies of all time?", 34],
      ["What are the four best Marvel movies of all time?", 34],
      ["Dominos or RoundTable?", 1],
      ["Is the end near?", 52],
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
              color:
                Number(title[1]) > 30 ? "rgb(0, 150, 0)" : "rgb(200, 0, 0)",
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
          <div className="SearchContainer">
            <input
              className="SearchBar"
              type="text"
              placeholder="Search"
              onClick={() => setCurrentDropdown("")}
            ></input>
            <button className="SearchButton">
              <SearchIcon style={{ transform: "scale(115%)" }} />
            </button>
          </div>
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
              Status{" "}
              <KeyboardArrowDownIcon
                style={{
                  transition: "transform 0.1s",
                  transform:
                    currentDropdown === "status"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                }}
              />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRefs["status"]}
              style={{
                display: currentDropdown === "status" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="status"
                  />
                  Active
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="status"
                  />
                  Inactive
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => uncheckInputs("status")}>
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
              Type{" "}
              <KeyboardArrowDownIcon
                style={{
                  transition: "transform 0.1s",
                  transform:
                    currentDropdown === "type"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                }}
              />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRefs["type"]}
              style={{
                display: currentDropdown === "type" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <input
                    type="checkbox"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="type"
                  />
                  Multiple Choice
                </li>
                <li>
                  <input
                    type="checkbox"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="type"
                  />
                  Free Response
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => uncheckInputs("type")}>
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
              Radius{" "}
              <KeyboardArrowDownIcon
                style={{
                  transition: "transform 0.1s",
                  transform:
                    currentDropdown === "radius"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                }}
              />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRefs["radius"]}
              style={{
                display: currentDropdown === "radius" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="radius"
                  />
                  5 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="radius"
                  />
                  10 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="radius"
                  />
                  15 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="radius"
                  />
                  20 Miles
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="radius"
                  />
                  25 Miles
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => uncheckInputs("radius")}>
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
              Voted{" "}
              <KeyboardArrowDownIcon
                style={{
                  transition: "transform 0.1s",
                  transform:
                    currentDropdown === "voted"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                }}
              />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRefs["voted"]}
              style={{
                display: currentDropdown === "voted" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="voted"
                  />
                  Have Voted
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="voted"
                  />
                  Have Not Voted
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => uncheckInputs("voted")}>
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
              Sort By{" "}
              <KeyboardArrowDownIcon
                style={{
                  transition: "transform 0.1s",
                  transform:
                    currentDropdown === "sort by"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                }}
              />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRefs["sort by"]}
              style={{
                display: currentDropdown === "sort by" ? "block" : "none",
              }}
            >
              <ul className="vertical-list">
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="sortby"
                  />
                  Newest
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="sortby"
                  />
                  Oldest
                </li>
                <li>
                  <input
                    type="radio"
                    className="Radio"
                    style={{ transform: "scale(138%)" }}
                    name="sortby"
                  />
                  Most Voted
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset" onClick={() => uncheckInputs("sortby")}>
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
