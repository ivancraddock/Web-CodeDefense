
var canvas;
var ctx;
var width;
var height;
var currentTick = 0;
var curInterval;
var paused = false;
var resources = {".loaded": false};
var waveRunning = false;
var victory;
var towers = [];
var creeps = [];
var path = [];
var events = [];
var projectiles = [];
var explosions = [];
var display;
var currentLevel;
var tabs = [];
var CodeWindow;
var codeFail;
var muteBool = false;
var goodCreepDead = false;
var creepCounter = [];


function revertCreeps(){
	creepCounter = [];
}

function getCreepLength(){
	return creepCounter.length;
}

var Sounds = {
	punch: new Audio('audio/punch.wav'),
	blast: new Audio('audio/blast.wav')
};

$(document).ready(function() {
	currentLevel = readCookie('CodeDefense_CurrentLevel');
	$("#helpButton").prop('disabled', false);
	if (!currentLevel) {
		currentLevel = 1;
		$("#previousLevel").prop('disabled', true);
	}
	else{
		for(var i = 0; i < currentLevel; i++){
			GAME.levels[i]["complete"] = true;
		}
		$("#previousLevel").prop('disabled', false);
	}
	
	var appTemp = navigator.appVersion;
	if(appTemp.length > 30){
		var chromeTemp = appTemp.indexOf('Chrome',0);
		if(chromeTemp == -1){
			window.location.href = "errorpage.html";
		}

	}
	
	canvas = $("#canvas")[0];
	ctx = canvas.getContext("2d");
	width = $("#canvas").width();
	height = $("#canvas").height();
	setLevel(currentLevel);
	changeResourceCount();
	$("#creepCount").text(creeps.length);
	if(currentLevel == 1)
		alert(GAME.firstIntro);
	else
		alert(GAME.returnIntro + " " + currentLevel + ": " +GAME.levels[currentLevel].levelName)

	$('#side').animate({width:272});
	$('#mainBody').animate({left:272});
	display = true;

 	$('#button').click(function(){
	 	if(display == true){
		 	$('#side').animate({width:0});
		 	$('#mainBody').animate({left:0});
			document.getElementById("right").style.left = "0px";
			display = false;
	 	}else{
			$('#side').animate({width:272});
			$('#mainBody').animate({left:272});
			display = true;
	 	}
 	});
	

	function init() {
		$('#showAdvanced').click(showAdvanced);
		$("#waveButton").click(waveButton);
		$("#compile").click(previewButton);
		$("#previousLevel").click(prevLevel);
		$("#nextLevel").click(nextLevel);
		$("#curLevel").html("Current Level: " + currentLevel);
		$("#pause").click(pause);
		$("#canvas").click(pause);
		$('#soundsButton').click(initSounds);
		$('#helpButton').click(helpWindow);
		$('#answersButton').click(answersWindow);

		if(GAME.levels[currentLevel]["complete"]){
			$("#nextLevel").prop('disabled', false);
			$("#waveButton").prop('disabled', true);
		}
		else{
			$("#waveButton").prop('disabled', false);
		}
		loadResources();
		var sound1 = new Audio("audio/blast.wav");
		var sound2 = new Audio("audio/punch.wav");
		//path = tracePath(); 
		curInterval = setInterval(gameLoop, 1000/GAME.updateHertz);
		output("Game initialized (" + width + "x" + height + ")\n");
	}

	/* called every tick */
	var _initialRender = true;
	function gameLoop() {
		if(!resourcesLoaded()) return;
		if(!waveRunning) {
			if(_initialRender) {
				_initialRender = false;
				render();
			}
			return;
		}
		currentTick += 1;
		update();
		render();
	}
	
	
	function pause() {
		if (paused){
			curInterval = setInterval(gameLoop, 1000/GAME.updateHertz);
			paused = false;
			$("#pause").html("Pause Wave");
		}
		else {
			clearInterval(curInterval);
			paused = true;
			$("#pause").html("Resume Wave");
		}
	}
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function helpWindow(){
		var helpWin = window.open('help/help.html', 'HelpTopics');
		helpWin.focus();
	}
	
	function answersWindow(){
		var answersWin = window.open('help/solutions.html', 'Correct Answers');
		answersWin.focus();
	}
	
	init();
});
