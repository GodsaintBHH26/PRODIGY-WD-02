import './style.css'

// ===========================================
// Code for the whole website
// ============================================
document.querySelector('#app').innerHTML = `
  <div class="w-full bg-gradient-to-b from-[#5fbbff] to-[#003773] shadow-lum">
    <div class="toolsDiv flex relative w-[1440px] p-0 -left-20 items-center">
    <img src="public/images/arrow.png" class="h-24 z-30 absolute left-0" id="left-arrow">

    <div class="toolsContainer flex gap-36 px-24 z-0 w-full overflow-hidden ">
    <span><div class="stopWatch slider bg-gradient-to-b from-[#5fbbff] to-[#003773]"></div></span>
    <span><div class="timerCountDown slider  bg-gradient-to-b from-[#5fbbff] to-[#003773]"></div></span>
    
    </div>

    <img src="public/images/arrow.png" class="h-24 z-30 rotate-180 absolute right-0" id="right-arrow">
    </div>  

  </div>
`;
// --------------------------------------------
// code for the scroll menu
// -----------------------------------------------
let index = null;
let rgtBtn = document.getElementById("right-arrow");
let lftBtn = document.getElementById("left-arrow");
let container = document.querySelector(".toolsContainer");
let slideo = document.querySelectorAll(".slider");
const scrollAmount = 1400;

lftBtn.addEventListener("click", ()=>{
  if(index==0){
    index = (slideo.length - 1);
    changeSlide(index, 1);
  }else if(index==1){
    index = 0;
    changeSlide(1, -1);
  }else{
    index -=1;
    changeSlide(index, -1);
  }
});

rgtBtn.addEventListener("click", ()=>{
  if(index==(slideo.length -1)){
    index=0;
    changeSlide((slideo.length-1), -1)
  }else{
    index +=1;
    changeSlide(index, 1);
  }
});

function changeSlide(index, direction){
  if(direction>0){
    container.style.scrollBehavior = "smooth";
    container.scrollLeft += (index)* scrollAmount;
  }else if(direction<0){
    container.style.scrollBehavior = "smooth";
    container.scrollLeft -= (index)* scrollAmount;
  }
  
}

// ------------------------------------------------

let swHTML = "";
let tcHTML = "";

// ================================================
// Code for the Stopwatch 
// ==============================================
swHTML += `
<div class="p-5 items-center">
<button class="bg-gradient-to-b from-[#005ff1] to-[#006d78] w-48 h-48 rounded-full font-extrabold text-3xl stop-watch-btn hidden-btn drop-shadow-lg mt-16">Stopwatch</button>
<div class="sw-container mt-5 hidden">
<div class="border-2 p-5 max-h-80 justify-items-center">
<h2 class="underline text-2xl">Stop-watch</h2>
<h1 class="display-time drop-shadow-lg">00:00:00</h1>

<div class="btn-container flex items-center justify-center gap-5">
<img src="public/images/stop-118.png" class="stop-btn w-16 h-16 bg-gradient-to-r from-[#ff002c] to-[#d000f1] rounded-full">
<img src="public/images/play-118.png" class="play-js w-20 h-20 bg-gradient-to-r from-[#00ff59] to-[#00d4f1] rounded-full">
<img src="public/images/restart-118.png" class="restart-btn w-16 h-16 bg-gradient-to-r from-[#b8f100] to-[#ffa300] rounded-full">
</div>
<button class="lapse-btn bg-blue-400 rounded-lg p-1 mt-5 mb-2">Lapse</button>

<div class="lapse-time max-h-16 overflow-y-auto w-28 justify-center">
</div>

</div>

</div>
</div>
`;
document.querySelector(".stopWatch").innerHTML=swHTML;
// ------------------------------------------------
// Code for the stopwatch to work 
// -----------------------------------------------

const playBtn = document.querySelector(".play-js");
const stopBtn = document.querySelector(".stop-btn");
const restartBtn = document.querySelector(".restart-btn");
let timer = null;
let [milSec, sec, min] = [0,0,0];
let [milL, secL, minL] = [0, 0, 0];
let displayTime = document.querySelector(".display-time");
let lapseTimeHtml = "";
let lapseTime = document.querySelector(".lapse-time");
const lapseBtn = document.querySelector(".lapse-btn");

function stopWatch(){
  milSec++;
  if(milSec==10){
    milSec=0;
    sec++;
    if(sec==60){
      sec=0;
      min++;
    }
  }
  
  let mil = milSec < 10 ? "0" + milSec : milSec;
  let s = sec < 10 ? "0" + sec : sec;
  let m = min < 10 ? "0" + min : min;

  displayTime.innerHTML = m + ":" + s +":"+ mil; 
}

function playAcn(){
  if(timer != null){
    clearInterval(timer);
  }
  timer = setInterval(stopWatch, 100);
}

function pauseAcn(){
  clearInterval(timer);
}

function restartAcn(){
  clearInterval(timer);
  [milSec, sec, min] = [0,0,0];
  displayTime.innerHTML = "00:00:00";
  lapseTimeHtml='';
  lapseTime.innerHTML = lapseTimeHtml;
}

function lapse(){
  clearInterval(timer);
  [milL, secL, minL] = [milSec, sec, min];
  let mill = milL < 10 ? "0" + milL : milL;
  let secl = secL < 10 ? "0" + secL : secL;
  let minl = minL < 10 ? "0" + minL : minL;
  lapseTimeHtml +=`
  ${minl}:${secl}:${mill}<br>
  `;
  timer = setInterval(stopWatch, 100);
}

playBtn.addEventListener("click", ()=>{
  playAcn();
});
stopBtn.addEventListener("click", ()=>{
  pauseAcn();
});
restartBtn.addEventListener("click", ()=>{
  restartAcn();
});

lapseBtn.addEventListener("click", ()=>{
  lapse();
  lapseTime.innerHTML = lapseTimeHtml;
})

const stopWatchBtn = document.querySelector(".stop-watch-btn");
const stopWatchContainer = document.querySelector(".sw-container");

stopWatchBtn.addEventListener("click", ()=>{
  stopWatchContainer.classList.toggle("hidden");
  stopWatchBtn.classList.toggle("hidden");
})

// ================================================
// Code for the countdown timer 
// ================================================
tcHTML +=`
<div class="p-5">
<button class="timer-countdown-btn hidden-btn bg-gradient-to-b from-[#005ff1] to-[#006d78] w-48 h-48 rounded-full font-extrabold text-3xl  drop-shadow-lg mt-16">Timer Counter</button>

<div class="timer-container mt-5 hidden">
<div class="border-2 p-5">
<h2 class="underline text-2xl">Timer</h2>
<h1 class="timer-display drop-shadow-lg">00:00:00</h1>

<div class="flex flex-col items-center justify-center mx-auto p-5">
<span class="inp-container flex gap-5 text-white">
<input type="number" id="min-inp" placeholder="minutes" min="0" max="60" class="bg-gradient-to-r from-[#0020ff] to-[#00d0f1] w-16 t-inp rounded-sm p-1 border-slate-900 border">
<input type="number" id="sec-inp" placeholder="seconds" min="0" max="60" class="bg-gradient-to-r from-[#0020ff] to-[#00d0f1] w-16 t-inp rounded-sm p-1 border-slate-900 border">
<input type="number" id="mill-inp" placeholder="millsec" min="1" max="10" class="bg-gradient-to-r from-[#0020ff] to-[#00d0f1] w-16 t-inp rounded-sm p-1 border-slate-900 border">
</span>

<div class="button-container mt-5 flex gap-5">
<button class="bg-blue-800 px-2 py-1 rounded-lg timer-start-btn t-button" >Start</button>
<button class="bg-blue-800 px-2 py-1 rounded-lg timer-pause-btn t-button">Pause</button>
<button class="bg-blue-800 px-2 py-1 rounded-lg timer-reset-btn t-button">Reset</button>
</div>
</div>

</div>

</div>

</div>
`;
document.querySelector(".timerCountDown").innerHTML=tcHTML;

// -----------------------------------------------
// code for the countdown timer to function
// -----------------------------------------------
let milliInp;
let secInp;
let minInp;
let ttimer;
let displayTimer = document.querySelector(".timer-display");
const timerStartBtn = document.querySelector(".timer-start-btn");
const timerResetBtn = document.querySelector(".timer-reset-btn");
const timerPauseBtn = document.querySelector(".timer-pause-btn");
let [tmill, tsec, tmin]=[0, 0, 0];

timerStartBtn.addEventListener("click", ()=>{
  
  milliInp = parseInt(document.getElementById("mill-inp").value) || 10;
  secInp = parseInt(document.getElementById("sec-inp").value) || 0;
  minInp = parseInt(document.getElementById("min-inp").value) || 0;

  [tmill, tsec, tmin] = [milliInp, secInp, minInp];

  if(ttimer) clearInterval(ttimer);


  ttimer= setInterval(timerCount, 100);


});

timerResetBtn.addEventListener("click", reset)
timerPauseBtn.addEventListener("click", timerPause);
function timerCount(){
  tmill--;
  if(tmill<0){
    tmill=9;
    tsec--;
    if(tsec<0){
      tsec=59;
      tmin--;
      if(tmin<0){
        clearInterval(ttimer);
        alert("Times up!");
        [tmill, tsec, tmin]=[0, 0, 0];
      }
    }
  }

  let milT = tmill<10 ? "0"+ tmill : tmill;
  let secT = tsec <10 ? "0" + tsec : tsec;
  let minT = tmin < 10? "0" + tmin : tmin;

  displayTimer.innerHTML = `${minT}:${secT}:${milT}`;
  
}

function timerPause(){
  clearInterval(ttimer);
}

function reset(){
  clearInterval(ttimer);
  [tmill, tsec, tmin]=[0, 0, 0];
  displayTimer.innerHTML ="00:00:00";

  document.getElementById("mill-inp").value = "";
  document.getElementById("sec-inp").value = "";
  document.getElementById("min-inp").value = "";

  document.getElementById("mill-inp").placeholder = "millsec";
  document.getElementById("sec-inp").placeholder = "seconds";
  document.getElementById("min-inp").placeholder = "minutes";

}
// ----------------------------------------------
const CountDownBtn = document.querySelector(".timer-countdown-btn");
const timerContainer = document.querySelector(".timer-container")

CountDownBtn.addEventListener("click", ()=>{
  CountDownBtn.classList.toggle("hidden");
  timerContainer.classList.toggle("hidden");
})
// ----------------------------------------------

