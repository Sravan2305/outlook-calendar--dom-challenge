import { nonConflict } from "./data.js";

/////////DOM Elements /////////////////
const containerEle = document.querySelector(".container");
const timePadding = "3rem";

for (let i = 0; i < 24; i++) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  const line = document.createElement("div");
  div.classList.add("time-wrapper");
  div.style.height = timePadding;
  span.classList.add("time");
  line.classList.add(`line`);
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
    getTimeDifferenceInMinutes(data.startTime, data.endTime)
  );
  div.style.height = (+height * +timePadding.split("rem")[0]) / 60 + "rem";

  [...document.querySelectorAll(".time")].map((childNode, i) => {
    if (extractTime(data.startTime) === childNode.innerHTML) {
      const lineEle = childNode.nextSibling;
      lineEle.appendChild(div);
    }
  });
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
// nonConflict.map(nonConflictMeetings);
// nonConflictMeetings(nonConflict[0]);
nonConflict.map((data) => nonConflictMeetings(data));
