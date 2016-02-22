/* ******************************************************************************** */
/* Game Logic                                                                       */
/* ******************************************************************************** */

/* update all game state */
function update() {
	// fire events
	updateEvents();
	//update wave statistics
	var time = parseFloat($("#waveTime").text());
	time += 1/GAME.updateHertz;
	time = time.toFixed(2);
	$("#waveTime").text(time);
	callUpdate(projectiles);
	callUpdate(creeps);
	callUpdate(towers);
	callUpdate(explosions);
	creepSpawnCount();
	$("#creepCount").text(creeps.length);
	// Are all the creeps gone from the screen?
	if(creeps.length == 0 && getCreepLength() == 0) {
		endWave();
	}
}

/* call .update() for each item in array */
function callUpdate(arr) {
	for(var i in arr) {
		arr[i].update();
	}
}



/* called on start of wave */
function startWave() {
	if(codeFail){
		alert("CODEFAIL = false IN startWave")

		codeFail = false;
		return;
	}
	$("#cashTotal").text("$" + (GAME.resources.cash - GAME.resources.usedCash));
	blockButtons();
	waveRunning = true;
	victory = true;
	towers = [];
	creeps = [];
	events = [];
	projectiles = [];
	render();
	$("#output").text("");
	compile();
	$("#cashTotal").text("$" + (GAME.resources.cash - GAME.resources.usedCash));
	for (var i = 0; i < GAME.levels[currentLevel]["waves"][GAME.currentWave].length; i++) {
		creepCounter.push({index: i, delay: GAME.levels[currentLevel]["waves"][GAME.currentWave][i]['delay']})
	}
}

/* called on end of wave */
function endWave() {
	unblockButtons();
	revertCreeps();
	waveRunning = false;
	//disable the code below to re-enable realistic mode (no auto advance on wave termination)
	/*
	if(GAME.levels[currentLevel]["complete"] == true){
		victory = true;
		$("#nextLevel").prop('disabled', false);
	}*/
	var btn = $("#waveButton");
	btn.html("Start Wave");
	if (victory && !codeFail) {
		increaseWave();
		if(GAME.resources.cash >= 0){
			var creepString = displayNextWave();
			$("#output").text("");
			output("Wave was victorious!\n----------------------------------\n"+creepString);
			$("#errors").html("");
		}
	}
	else {
		$("#output").text("");
		var creepString = displayNextWave();
		output("Wave was not victorious. Try again!\n----------------------------------\n"+creepString);
		
	}
	GAME.resources.usedCash = 0;
	GAME.resources.space = {};
	$("#cashTotal").text("$" + (GAME.resources.cash));
}

/* called when a creep reached the end of it's path */
function creepReachedEnd(creep) {
	
	if(creep.category == 'good'){
		output("Packet successfully reached the end!\n");
	}
	else if(creep.category == "spam"){
		//output("Spam reached the end.\n");
	}
	else {
		victoryStatus(false);
		output("Virus reached the end!\n");
	}
	remove(creeps, creep);
	// did we end the wave?
}


function victoryStatus(mod) {
	victory = victory && mod;
}


function creepSpawnCount(){
	if (creepCounter.length > 0) {
	creepCounter[0].delay = creepCounter[0].delay - 1;
		if (creepCounter[0].delay <= 0)	{
			spawnCreeps(GAME.levels[currentLevel]["waves"][GAME.currentWave][creepCounter[0].index]['creep'], 
				GAME.levels[currentLevel]["waves"][GAME.currentWave][creepCounter[0].index]['count'], 
				GAME.creeps[GAME.levels[currentLevel]["waves"][GAME.currentWave][creepCounter[0].index]['group']]['delay'], 
				path[GAME.levels[currentLevel]["waves"][GAME.currentWave][creepCounter[0].index]['path']]);
			creepCounter.shift();
		}
	}
}
