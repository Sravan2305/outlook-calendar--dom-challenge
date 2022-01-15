import { nonConflict } from "./data.js";

/////////DOM Elements /////////////////
const containerEle = document.querySelector(".container");
const timeEle = document.querySelector(".time");
const lineEle = document.querySelector(".line");

for (let i = 0; i < 24; i++) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  const line = document.createElement("div");
  div.classList.add("time-wrapper");
  span.classList.add("time");
  line.classList.add(`line`, `line-${i}`);
  span.innerHTML =
    i === 12 ? `12:00 PM` : `${i % 12}:00 ${i >= 12 ? "PM" : "AM"}`;
  div.append(span, line);
  containerEle.appendChild(div);
}

function nonConflictMeetings(data) {
  const div = document.createElement("div");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");

  div.style.background = data.color;
  div.classList.add("activity");
  p1.innerText = data.title;
  p2.innerText =
    extractTime(data.startTime) + " - " + extractTime(data.endTime);
  div.append(p1, p2);
  const height = Math.floor(
    getTimeDifferenceInMinutes(data.startTime, data.endTime) * 0.5
  );
  div.style.minHeight = height
  const domNode = document.querySelector(`.line-${+(data.startTime.split(":")[0])}`)
  domNode.appendChild(div)
  console.log(domNode ,`line-${+(data.startTime.split(":")[0])}` )
}

function extractTime(time) {
  let [hours, minutes] = time.split(":");
  hours = Number(hours);
  if (hours > 12) {
    return `${hours % 12}:${minutes} PM`;
  } else if (hours === 12) {
    return `${12}:${minutes} PM`;
  }
  return `${hours}:${minutes} AM`;
}

function getTimeDifferenceInMinutes(start, end) {
  const startArr = start.split(":");
  const endArr = end.split(":");
  return +endArr[0] * 60 + +endArr[1] - (+startArr[0] * 60 + +startArr[1]);
}
nonConflict.map(nonConflictMeetings)
// nonConflictMeetings(nonConflict[0]);
