// Variables and Constants

let rotate = 0;
let run = false;
let trigger = '@';
let time = 5;

// Functions

function loadSpin() {
  elems = document.getElementsByTagName("*");
  for(let i = 0; i < elems.length; i ++) {
    elems[i].style.transition = 'rotate ' + time + 's linear';
  }
  
  console.log('Spin Ready, press "' + trigger + '" (t = ' + time + ')');
  
  run = true;
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

// Send Events

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Spin msg: ' + request.action);

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
