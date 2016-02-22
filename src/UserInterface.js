/* ******************************************************************************** */
/* UI                                                                               */
/* ******************************************************************************** */

/* called when "Show Advanced" checkbox is clicked */
function showAdvanced() {
	var name = tabs[curTab];
	$("#" + name).toggle();
	curTab++;
	if (curTab > tabs.length - 1) { curTab = 0; }
	name = tabs[curTab];
	$("#" + name).toggle();
	codeWindows[curTab].refresh();
	if (curTab == 0)
	$('#showAdvanced').html("towerOneAI");
	else
	$('#showAdvanced').html("game");
}

function playSound(name){
	if(!muteBool){
		Sounds[name].currentTime = 0;
		Sounds[name].play();
	}
}

function initSounds()
{
	muteBool = !muteBool;
}


/* called when "Start Wave" / "End Wave" button is clicked */
function waveButton() {
	//$("#errors").hide();
	try {
		var btn = $("#waveButton");
		var state = btn.html();
		if(state == "Start Wave") {
			$("#errors").hide();
			codeFail = false;
			GAME.resources.space = {};
			btn.html("End Wave");
			$("#waveTime").html("0.0");
			startWave();
		} else {
			btn.html("Start Wave");
			victoryStatus(false);
			waveTerminator();
		}
	} catch(e) {
		waveTerminator();
		showException(e);
	}
}

function waveTerminator(){
	codeFail = true;
	waveRunning = false;
	towers = [];
	creeps = [];
	events = [];
	projectiles = [];
	render();
	endWave();
	revertCreeps();


}

function transitionRefresh(){
	try {
		//loadTowers();
		towers = [];
		eval("function game() {\n} game();");
		render();
	} catch(e) {
		waveTerminator();
	}
	var creepString = displayNextWave();
	$("#output").html(creepString);
	

}

function previewButton() {
	$("#errors").hide();
	GAME.resources.usedCash = 0;
	GAME.resources.space = {};
	try {
		$("#output").text("");
		//loadTowers();
		towers = [];
		compile();
		render();
	} catch(e) {
		showException(e);
		waveTerminator();
	}
	GAME.resources.space = {};
	GAME.resources.usedCash = 0;
}

var buttonState = [];

function blockButtons(){
	if(!($("#previousLevel").is(":disabled"))){
		buttonState.push("#previousLevel");
		$("#previousLevel").prop("disabled", true);
	}
	if(!($("#nextLevel").is(":disabled"))){
		buttonState.push("#nextLevel");
		$("#nextLevel").prop("disabled", true);
	}
	$("#compile").prop("disabled", true);
	
	
	
}

function unblockButtons(){
	for(var i = 0; i < buttonState.length; i++){
		$(buttonState[i]).prop("disabled", false);
	}
	if(currentLevel < getLength(GAME.levels[currentLevel].waves)){
		$("#compile").prop("disabled", false);
	}
}

function prevLevel() {
	if(!waveRunning){
		currentLevel--;
		if (currentLevel < GAME.firstLevel) {
			currentLevel = GAME.firstLevel;
		}
		setLevel(currentLevel);
		$("#curLevel").html("Current Level: " + currentLevel);
		if(GAME.levels[currentLevel]["complete"]){
			$("#nextLevel").prop('disabled', false);

		}
	}
	else
	{$("#errors").html("You cannot change levels in the middle of a wave");
	$("#errors").show();}
}

function nextLevel() {
	//
	if(!waveRunning && GAME.levels[currentLevel]["complete"]){
		currentLevel++;

		setLevel(currentLevel);
		$("#curLevel").html("Current Level: " + currentLevel);
	}
	else{
		$("#errors").html("You cannot change levels in the middle of a wave");
		$("#errors").show();
	}
}

var curTab = 0;

function gotoNewTab() {
	$("#changeTab").show();
	$("#changeTabBack").show();
	$('#showAdvanced').hide();
	
	var name = tabs[curTab];
	$("#" + name).toggle();
	curTab = tabs.length - 1;
	name = tabs[curTab];
	$("#" + name).toggle();
	
	tabLables();
}

function changeTab() {
	var name = tabs[curTab];
	$("#" + name).toggle();
	curTab++;
	if (curTab > tabs.length - 1) { curTab = 0; }
	name = tabs[curTab];
	$("#" + name).toggle();
	
	codeWindows[curTab].refresh();
	tabLables();
}

function changeTabBackward() {
	var name = tabs[curTab];
	$("#" + name).toggle();
	curTab--;
	if (curTab < 0) { curTab = tabs.length - 1; }
	name = tabs[curTab];
	$("#" + name).toggle();
	
	codeWindows[curTab].refresh();
	tabLables();
}

function tabLables() {
	if (curTab == 1) {
		$("#changeTabBack").html("game");
	}
	else if (curTab == 0) {
		$("#changeTabBack").html($("#" + tabs[tabs.length - 1]).find(".ai").html());
	}
	else {
		$("#changeTabBack").html($("#" + tabs[curTab - 1]).find(".ai").html());
	}
	
	if (curTab == tabs.length - 1) {
		$("#changeTab").html("game");
	}
	else {
		$("#changeTab").html($("#" + tabs[curTab + 1]).find(".ai").html());
	}
}


function messageManager(){
	if (GAME.levels[currentLevel]["hasMessage"][GAME.currentWave - 1]){
		$("#inputOne").empty();
		story(GAME.levels[currentLevel]["message"][GAME.currentWave - 1]);
	}
	if (GAME.levels[currentLevel]["hasExample"][GAME.currentWave - 1]){
		$("#inputTwo").empty();
		example(GAME.levels[currentLevel]["example"][GAME.currentWave - 1]);
	}
	if (GAME.levels[currentLevel]["hasExecutable"][GAME.currentWave - 1]){
		executable(GAME.levels[currentLevel]["executable"][GAME.currentWave - 1]);
	}
	
}

function story(message){
	$("#inputOne").html(message);
}

function example(message){
	$("#inputTwo").html(message);
}

function executable(message){
	CodeWindow.getDoc().setValue(message);
}

/* send 'message' to the output window */
function output(message) {
	$("#output").prepend(message);
}

	/* called on exceptions */
function showException(e) {
	var d = new Date();
	var d_string = "";
	d_string += d.getHours(); // => 9
	d_string += ":" + d.getMinutes(); // =>  30
	d_string += ":" + d.getSeconds(); // => 51
	var msg = "<span class = 'badItem'>A JavaScript error occured at "+d_string+"</span>\n<b>" + e.message + "</b>\n" + exceptionDetail(e);
	output("A JavaScript error occured: " + e.message);
	//msg = msg + "\n<b>" + getLineNumber(e) + "</b>";
	msg = msg +"\n--------------------------------------------------\n"+ $("#errors").html()
	$("#errors").html(msg);
	$("#errors").show();
	victoryStatus(false);
	waveTerminator();
}

/* lookup error text for exception */
function exceptionDetail(e) {
	var msg;
	if(e instanceof ReferenceError) {
		var varName = e.message.split(" ")[0];
		return "This means you tried to use <i>" + varName +
			"</i> before you created it.";
	// TODO fill in more known exception types
	}
	if(e instanceof RangeError) {
		return "This means that you have tried to access a number\nthat is outside the range possible for a function or array.";
	}
	if(e instanceof ReferenceError) {
		return "This means that you attempted to dereference a variable that has not been defined yet.";
	}
	if(e instanceof EvalError) {
		return "This means that something went wrong while we were running your code.";
	}
	if(e instanceof SyntaxError){
		return "Typically this is the result of a missing character(s) or variable.";
	}
	if(e instanceof TypeError){
		return "This means that you are attempting to use a function of an object that does not exist for said object.";
	}
	return "";
}

	
function getLineNumber(err) {
	var msg = "";
	var stack = err.stack;
	//console.log(stack);
	var lines = stack.split("\n");
	$.each (lines, function(key, keyLine) {
		if (keyLine.search("game") != -1 && keyLine.search("gameLogic") == -1 && keyLine.search("gameLoop") == -1) {
				var parts = keyLine.split(",");
				if(parts[1]){
				var numbers = parts[1].split(":");
				row = numbers[1];
				column = numbers[2].replace(")", "");
				msg = ("The error occured in the game function.\n");
				msg = msg + ("The error occured on line " + row + "\n");
				msg = msg + ("The error occured around character " + column + " in the row\n");
				colorCode(row, column, "main");
			}
		}
		else if (keyLine.search("as ai") != -1) {
			var name = keyLine.split(' ');
			var func = name[5];
			var myName = func.split('.')[1];
			var index = 0;
			for (var i = 1; i < tabs.length; i++) {
				
				var funcName = 	$("#" + tabs[i]).find(".ai").html();
				if (funcName == myName)	{
					index = i * 1;
				}
			}
			var parts = keyLine.split(",");
			var numbers = parts[1].split(":");
			row = numbers[1];
			column = numbers[2].replace(")", "");
			msg = ("The error occured in the " + myName + "function.\n");
			msg = msg + ("The error occured on line " + row + "\n");
			//msg = msg + ("The error occured around character " + column + " in the row\n");
			colorCode(row, column, index);
		}
	});
	if (err instanceof SyntaxError) {
		//msg = "Potentially unable to locate error line number.\nCheck the code for missing characters,\n or incorrect terms or names";
	}
	return msg;	
}
