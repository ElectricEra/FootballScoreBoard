var timerLink;
var timerLength = 0;
var clockWorks = false;
var startX, startY, startWidth, startHeight;

var mainBlock = document.querySelector('.screen-width');

var timer = document.querySelector(".timer");

var controls = document.querySelector(".controls");

var lvivButtonGoal = document.querySelector(".goal-counter.lviv");
var guestButtonGoal = document.querySelector(".goal-counter.guest");

var lvivButtonUnGoal = document.querySelector(".goal-uncounter.lviv");
var guestButtonUnGoal = document.querySelector(".goal-uncounter.guest");

var lvivScore = document.querySelector(".team-lviv .goals");
var guestScore = document.querySelector(".team-guest .goals");

var timerButtonStart = document.querySelector(".timerButtonStart");
var timerButtonStop = document.querySelector(".timerButtonStop");

var timer1stHalf = document.querySelector(".timer1stHalf");
var timer2ndHalf = document.querySelector(".timer2ndHalf");

var bgcolor = document.querySelector(".bgcolor");
var colorPicker = document.querySelector(".colorPicker");

controls.addEventListener("click",function(e){
	switch (e.target) {
		case lvivButtonGoal:
			addGoal(lvivScore);
			break;
		case guestButtonGoal:
			addGoal(guestScore);
			break;
		case lvivButtonUnGoal:
			removeGoal(lvivScore);
			break;
		case guestButtonUnGoal:
			removeGoal(guestScore);
			break;
		case timerButtonStart:
			timerSetUp();
			break;
		case timerButtonStop:
			timerStop();
			break;
		case timer1stHalf:
			setTime(0);
			break;
		case timer2ndHalf:
			setTime(60*45);
			break;
		case bgcolor:
			changeColor();
			break;
		default:
			break;
	}
})

/*Resizable stuff*/

mainBlock.className = mainBlock.className + ' resizable';
var resizer = document.createElement('div');
resizer.className = 'resizer';
mainBlock.appendChild(resizer);
resizer.addEventListener('mousedown', initDrag, false);


/*Functions*/
function timerSetUp() {
	if (!clockWorks) {
		clockWorks = true;
		timerLink = setInterval(function(){
			timerLength+=1;
			doVisualUpdate();
		},1000);
	}
}

function timerStop() {
	clearInterval(timerLink);
	clockWorks = false;
}

function setTime(time) {
	timerStop();
	timerLength = time;
	doVisualUpdate();
}

function addGoal(team) {
	var current = +team.innerHTML + 1;
	team.innerHTML = current; 
}

function doVisualUpdate() {
	var minutes = Math.floor(timerLength/60);
	var seconds = timerLength%60;

	if (seconds < 10) {
		seconds = "0"+seconds;
	}
	if (minutes < 10) {
		minutes = "0"+minutes;
	}
	timer.innerHTML = minutes + ":" + seconds;
}

function removeGoal(team) {
	var current = +team.innerHTML - 1;
	if (current < 0) { current = 0; }
	team.innerHTML = current; 
}

function changeColor() {
	var color = colorPicker.value;
	console.log(document.querySelector(".screen-width.resizable").style.background = color);
}

function initDrag(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(mainBlock).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(mainBlock).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
    mainBlock.style.width = (startWidth + e.clientX - startX) + 'px';
    mainBlock.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
	document.documentElement.removeEventListener('mousemove', doDrag, false);    
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}