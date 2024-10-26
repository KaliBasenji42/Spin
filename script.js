// Variables and Constants

let rotate = 0;
let run = false;
let trigger = '@';
let time = 5;

const spinOutput = document.createElement('div');
document.body.appendChild(spinOutput);
spinOutput.style.position = 'fixed';
spinOutput.style.top = '0';
spinOutput.style.left = '0';
spinOutput.style.backgroundColor = 'rgb(255, 255, 255)';
spinOutput.style.fontSize = '2rem';

// Functions

function loadSpin() {
  elems = document.getElementsByTagName("*");
  for(let i = 0; i < elems.length; i ++) {
    elems[i].style.transition = 'rotate ' + time + 's linear';
  }
  
  run = true;
  
  // Output
  
  spinOutput.innerHTML = 'Spin Ready, press "' + trigger + '" (t = ' + time + ')';
  spinOutput.style.transition = 'none';
  spinOutput.style.opacity = '1';
  window.setTimeout(flashOutput, 1000);
  
}

function animate() {
    rotate += 180;
    
    for(let i = 0; i < elems.length; i ++) {
        elems[i].style.rotate = '' + rotate + 'deg';
    }
}

function spin() {
  run = false;
  
  animate();
  
  window.setTimeout(animate, time * 1000);
  window.setTimeout(function runTrue(){
    run = true;
  }, time * 1000 * 2);
}

document.addEventListener('keypress', function() {
    if(event.key == trigger && run) spin();
});

function flashOutput() {
  spinOutput.style.transition = 'opacity 2s';
  spinOutput.style.opacity = '0';
}

// Events

//document.addEventListener('DOMContentLoaded', function() {

//})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  
  if(request.action === 'spin' && run) spin();
  
  if(request.action === 'load') loadSpin();
  
  if(request.action.slice(0,1) === 't' && request.action.length > 1) {
    time = parseFloat(request.action.slice(1));
    loadSpin();
  }
  
  if(request.action.slice(0,1) === 'e' && request.action.length > 1) {
    trigger = request.action.slice(1,2);
    loadSpin();
  }
  
});
