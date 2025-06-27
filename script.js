const MinutesLabel = document.getElementById('inutes');
const SecondsLabel = document.getElementById('Seconds');
const MilliSecondsLabel = document.getElementById('MilliSeconds');

const StartButton = document.getElementById('StartBtn');
const StopButton = document.getElementById('StopBtn');
const PauseButton = document.getElementById('PauseBtn');
const ResetButton = document.getElementById('ResetBtn');

const LapList = document.getElementById('LapList');

// Stopwatch Variables

let Minutes = 0;
let Seconds = 0;
let MilliSeconds = 0;
let interval;

StartButton.addEventListener('click',StartTimer);
StopButton.addEventListener('click',StopTimer);
PauseButton.addEventListener('click',PauseTimer);
ResetButton.addEventListener('click',ResetTimer);


function StartTimer(){
    interval = setInterval(UpdateTimer,10);
    StartButton.disabled = false;

}

function StopTimer(){

    clearInterval(interval);
    addToLapList();
    ResetTimerData();
    StartButton.disabled = false;
}

function PauseTimer(){
    clearInterval(interval);
    StartButton.disabled = false;
}

function ResetTimer(){
    clearInterval(interval);
    ResetTimerData();
    StartButton.disabled = false;
}

function UpdateTimer(){
    MilliSeconds++;
    if(MilliSeconds === 100){  // 1000 1 = 1000 milliseconds
        MilliSeconds = 0;
        Seconds++;
        if(Seconds === 60){
            Seconds = 0;
            Minutes++;
        }
    }
    displayTimer();

}

function displayTimer(){
    MilliSecondsLabel.textContent = padTime(MilliSeconds);
    SecondsLabel.textContent = padTime(Seconds);
    MinutesLabel.textContent = padTime(Minutes);
}

function padTime(Time){
    return Time.toString().padStart(2,'0');

}

function ResetTimerData(){
    Minutes = 0;
    Seconds = 0; 
    MilliSeconds = 0;
    displayTimer();

}

function addToLapList(){
    const lapTime = `${padTime(Minutes)}:${padTime(Seconds)}:${padTime(MilliSeconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML =`<span>Lap ${LapList.childElementCount + 1}: </span>${lapTime}`;
    LapList.appendChild(listItem);
}