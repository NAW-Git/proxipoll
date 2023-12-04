import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./ViewAndVote.css";

function ViewAndVote(props) {
  const { pollTitle } = props;
  return <div id="ViewAndVoteContainer">{pollTitle}</div>;
}

export default ViewAndVote;
