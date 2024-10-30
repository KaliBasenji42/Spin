// Variables and Constants

let output = document.getElementById('output');

let logCheck = document.getElementById('log');

// Functions

function send(msg) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: msg});
  });

  if(logCheck.checked) {
    
    output.innerHTML += 'Sent: ' + msg + '<br>';
    output.style.transition = 'none';
    output.style.backgroundColor = 'rgb(0,192,0)';
    window.setTimeout(flashOutput, 10);
    
  }
  
}

function flashOutput() {
  output.style.transition = 'background-color 1s';
  output.style.backgroundColor = 'rgb(255,255,255)';
}

// Events

document.getElementById("form").addEventListener("submit", function (event) {
  
  event.preventDefault();
  
  // send
  
  send("t" + document.getElementById("time").value.trim());
  send("e" + document.getElementById("trigger").value.trim());
  
});

document.getElementById('spin').addEventListener('click', () => {
  send('spin');
});

document.getElementById('load').addEventListener('click', () => {
  send('load');
});

document.getElementById('clear').addEventListener('click', () => {
  output.innerHTML = '';
});

document.getElementById('log')