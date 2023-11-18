import React, { useState, useEffect } from "react";
import "./PollPost.css";

function PollPost() {
  const [pollType, setPollType] = useState("MC");
  const [choices, setChoices] = useState([
    { id: 0, text: "" },
    { id: 1, text: "" },
  ]);

  const addChoice = () => {
    const newChoice = { id: choices.length, text: "" };
    setChoices([...choices, newChoice]);
  };

  const removeChoice = (index: number) => {
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    for (let i = 0; i < updatedChoices.length; i++) {
      updatedChoices[i].id = i;
    }
    setChoices(updatedChoices);
  };

  return (
    <div className="PollPostBackground">
      <div className="PollPostContainer">
        <div id="Title">Create your poll.</div>
        <div className="InputSection">
          <div className="SectionTitle">TYPE</div>
          <div id="TypeSection">
            <div
              className="Selected"
              style={{
                transform:
                  pollType === "MC" ? "translateX(0%)" : "translateX(100%)",
                borderRadius:
                  pollType === "MC" ? "5px 0px 0px 5px" : "0px 5px 5px 0px",
              }}
            ></div>
            <div
              className="Type"
              id="MC"
              onClick={() => setPollType("MC")}
              style={{
                color: pollType === "MC" ? "white" : "gray",
              }}
            >
              Multiple Choice
            </div>
            <div
              className="Type"
              id="FR"
              onClick={() => setPollType("FR")}
              style={{
                color: pollType === "FR" ? "white" : "gray",
              }}
            >
              Free Response
            </div>
          </div>
        </div>
        <div className="InputSection">
          <div className="SectionTitle">QUESTION</div>
          <input className="SectionInput" type="text" placeholder="Question" />
        </div>
        <div className="InputSection">
          <div className="SectionTitle">DURATION</div>
          <div id="TimeSection">
            <span className="DurationTime">
              <select name="minutes" className="TimeInput">
                <option value="volvo" selected>
                  0
                </option>
                <option value="saab">1</option>
                <option value="mercedes">2</option>
                <option value="audi">3</option>
                <option value="audi">4</option>
                <option value="audi">5</option>
                <option value="audi">6</option>
                <option value="audi">7</option>
              </select>
              <span className="TimeUnit" id="Days">
                Days
              </span>
            </span>
            <span className="DurationTime">
              <select name="minutes" className="TimeInput">
                <option value="volvo" selected>
                  0
                </option>
                <option value="saab">1</option>
                <option value="mercedes">2</option>
                <option value="audi">3</option>
                <option value="audi">4</option>
                <option value="audi">5</option>
                <option value="audi">6</option>
                <option value="audi">7</option>
                <option value="audi">8</option>
                <option value="audi">9</option>
                <option value="audi">10</option>
                <option value="audi">11</option>
                <option value="audi">12</option>
                <option value="saab">13</option>
                <option value="saab">14</option>
                <option value="saab">15</option>
                <option value="saab">16</option>
                <option value="saab">17</option>
                <option value="saab">18</option>
                <option value="saab">19</option>
                <option value="mercedes">20</option>
                <option value="mercedes">21</option>
                <option value="mercedes">22</option>
                <option value="mercedes">23</option>
              </select>
              <span className="TimeUnit" id="Hours">
                Hrs.
              </span>
            </span>
            <span className="DurationTime">
              <select name="minutes" className="TimeInput">
                <option value=" 0" selected>
                  0
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
                <option value="45">45</option>
                <option value="50">50</option>
                <option value="55">55</option>
              </select>
              <span className="TimeUnit" id="Mins">
                Mins.
              </span>
            </span>
          </div>
        </div>
        <div
          className="InputSection"
          style={{
            display: pollType === "MC" ? "block" : "none",
            height: "fit-content",
          }}
        >
          <div className="SectionTitle">CHOICES</div>
          {choices.map((choice, index) => (
            <div key={index} className="Choice">
              <input
                className="ChoiceInput"
                type="text"
                placeholder="Choice"
                value={choice.text}
                onChange={(e) =>
                  setChoices((prevChoices) =>
                    prevChoices.map((prevChoice) =>
                      prevChoice.id === choice.id
                        ? { ...prevChoice, text: e.target.value }
                        : prevChoice
                    )
                  )
                }
              />
              <div
                className="Remove"
                onClick={() => removeChoice(choice.id)}
                style={{ display: choices.length > 2 ? "block" : "none" }}
              >
                -
              </div>
            </div>
          ))}
          <div
            className="Add"
            onClick={addChoice}
            style={{ display: choices.length < 5 ? "block" : "none" }}
          >
            +
          </div>
        </div>
        <div className="ActionButtons">
          <div id="Reset">Reset</div>
          <div id="Post">Post</div>
        </div>
      </div>
    </div>
  );
}

export default PollPost;
