// Some default declarations
var timerLink;
var timerLength = 0;
var clockWorks = false;
var startX, startY, startWidth, startHeight;

// Main elements
var panel = document.querySelector('.panel');
var timer = document.querySelector(".timer");
var controls = document.querySelector(".controls");
var resizer = document.querySelector(".resizer")

// Teams
var homeName = document.querySelector(".team-home .teamName");
var homeScore = document.querySelector(".team-home .goals");
var guestName = document.querySelector(".team-guest .teamName")
var guestScore = document.querySelector(".team-guest .goals");

// Buttons
//  Team based buttons
var homeButtonGoal = document.querySelector(".goal-counter.home");
var homeButtonUnGoal = document.querySelector(".goal-uncounter.home");
var guestButtonGoal = document.querySelector(".goal-counter.guest");
var guestButtonUnGoal = document.querySelector(".goal-uncounter.guest");

//  General buttons
var timerButtonStart = document.querySelector(".timerButtonStart");
var timerButtonStop = document.querySelector(".timerButtonStop");
var timer1stHalf = document.querySelector(".timer1stHalf");
var timer2ndHalf = document.querySelector(".timer2ndHalf");
var bgcolor = document.querySelector(".bgcolor");
var colorPicker = document.querySelector(".colorPicker");
var team1name = document.querySelector(".enter-team-1-name");
var team2name = document.querySelector(".enter-team-2-name");
var saveNames = document.querySelector(".saveNames");

// "Control center"
controls.addEventListener("click",function(e){
	switch (e.target) {
		case homeButtonGoal:
			addGoal(homeScore);
			break;
		case guestButtonGoal:
			addGoal(guestScore);
			break;
		case homeButtonUnGoal:
			removeGoal(homeScore);
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
		case saveNames:
			saveName();
			break;
		default:
			break;
	}
})

// Resizable area listener
resizer.addEventListener('mousedown', initDrag, false);


// Functions
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
	console.log(document.querySelector(".panel.resizable").style.background = color);
}

function initDrag(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(panel).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(panel).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
    panel.style.width = (startWidth + e.clientX - startX) + 'px';
    panel.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
	document.documentElement.removeEventListener('mousemove', doDrag, false);    
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}

function saveName() {
	homeName.innerHTML = team1name.value;
	guestName.innerHTML = team2name.value;
}