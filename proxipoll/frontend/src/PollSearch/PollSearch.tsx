import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBox from "@mui/icons-material/CheckBox";
import debounce from "lodash/debounce";
import "./PollSearch.css";
import Map from "./Map.png";

function PollSearch() {
  const [leftOffset, setLeftOffset] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const calculateDropdownPosition = () => {
    if (dropdownRef.current) {
      const dropdownBounds = dropdownRef.current.getBoundingClientRect();
      const spaceToRightOfDropdown = window.innerWidth - dropdownBounds.right;

      if (spaceToRightOfDropdown < 0) {
        setLeftOffset(spaceToRightOfDropdown - 30);
      } else {
        setLeftOffset(0);
      }
    }
  };

  const debouncedCalculatePosition = debounce(calculateDropdownPosition, 100);

  useEffect(() => {
    calculateDropdownPosition();
    window.addEventListener("resize", debouncedCalculatePosition);

    return () => {
      window.removeEventListener("resize", debouncedCalculatePosition);
    };
  }, []);

  return (
    <div className="MainContainer">
      <div className="PollsContainer">
        <div className="FilterContainer">
          <input className="SearchBar" type="text" placeholder="Search"></input>
          <div className="ToggleContainer">
            <div
              className="Toggle"
              style={{
                backgroundColor: "#1f66e0",
                color: "white",
                borderColor:
                  "transphttp://localhost:3000/static/media/Map.ae565714fa7124b4a67e.pngarent",
              }}
            >
              Status <KeyboardArrowDownIcon />
            </div>
            <div
              className="Dropdown"
              ref={dropdownRef}
              style={{ left: `${leftOffset}px` }}
            >
              <ul className="vertical-list">
                <li>
                  <CheckBox className="CheckBox" />
                  Active
                </li>
                <li>
                  <CheckBox className="CheckBox" />
                  Inactive
                </li>
                <li>
                  <CheckBox className="CheckBox" />
                  All
                </li>
                <li>
                  <CheckBox className="CheckBox" />
                  Item 4
                </li>
              </ul>
              <div className="ResetUpdateContainer">
                <div className="Reset">Reset</div>
                <div className="Update">Update</div>
              </div>
            </div>
          </div>
          <div>
            <div className="Toggle">
              Type
              <KeyboardArrowDownIcon />
            </div>
            <div className="Dropdown" style={{ display: "none" }}>
              Test
            </div>
          </div>
          <div>
            <div className="Toggle">
              Radius
              <KeyboardArrowDownIcon />
            </div>
            <div className="Dropdown" style={{ display: "none" }}>
              Test
            </div>
          </div>
          <div>
            <div className="Toggle">
              Voted
              <KeyboardArrowDownIcon />
            </div>
            <div className="Dropdown" style={{ display: "none" }}>
              Test
            </div>
          </div>
          <div>
            <div className="Toggle">
              Sort By
              <KeyboardArrowDownIcon />
            </div>
            <div className="Dropdown" style={{ display: "none" }}>
              Test
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
