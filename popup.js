// Variables and Constants

let output = document.getElementById("output");

// Functions

function send(msg) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: msg});
  });
  output.innerHTML = 'Sent: ' + msg;
  output.style.transition = 'none';
  output.style.backgroundColor = 'rgb(0,192,0)';
  window.setTimeout(flashOutput, 10);
}

function flashOutput() {
  output.style.transition = 'background-color 1s';
  output.style.backgroundColor = 'rgb(255,255,255)';
}

// Form Send

document.getElementById("form").addEventListener("submit", function (event) {
  
  event.preventDefault();
  
  // send
  
  send("t" + document.getElementById("time").value.trim());
  send("e" + document.getElementById("trigger").value.trim());
  
});

// Send Events

document.getElementById('spin').addEventListener('click', () => {
  send('spin');
});

document.getElementById('load').addEventListener('click', () => {
  send('load');
});