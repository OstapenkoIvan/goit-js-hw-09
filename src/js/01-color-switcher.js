const refs = {
  bodyEl: document.querySelector("body"),
  startButton: document.querySelector("[data-start]"),
  stopButton: document.querySelector("[data-stop]"),
};
let colorInterval = null;

refs.bodyEl.addEventListener("click", changeBackgroundColor);

function changeBackgroundColor(evt) {
  if (evt.target.nodeName !== "BUTTON") {
    return;
  }

  if ("start" in evt.target.dataset) {
    refs.startButton.setAttribute("disabled", "");
    colorInterval = setInterval(() => {
      refs.bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
  }

  if ("stop" in evt.target.dataset) {
    refs.startButton.removeAttribute("disabled");
    clearInterval(colorInterval);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
