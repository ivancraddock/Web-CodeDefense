/* ******************************************************************************** */
/* Resource Handling                                                                */
/* ******************************************************************************** */
/* load all required resources (images mostly) */
var list;

function loadResources() {
	resources["basic_level"] = image("./resources/basic_board.png");
}

/* create an image object */
function image(uri) {
	var img = new Image();
	img.src = uri;
	return img;
}

/* returns true when all resources have fully loaded */
function resourcesLoaded() {
	if(!resources[".loaded"]) {
		var loaded = true;
		for(key in resources) {
			if(key != ".loaded" && !resources[key].complete) {
				loaded = false;
				break;
			}
		}
		resources[".loaded"] = loaded;
	}
	return resources[".loaded"];
}


function setLevel(lvl) {
	$("#compile").prop("disabled", false);

	waveRunning = false;
	currentLevel = lvl;
	if((currentLevel > 1)&&(GAME.levels[currentLevel]["complete"] == false)){
		document.cookie="CodeDefense_CurrentLevel="+currentLevel+"; expires=Thu, 16 Aug 2016 12:00:00 UTC";
	}
		
	if(GAME.levels[currentLevel]["complete"] == true){
		$("#nextLevel").prop('disabled', false);
	}


	GAME.levels[currentLevel]['doodads'] = [];
	for(var i = 0; i < GAME.levels[currentLevel]['layout'].length; i++){
		tempLineArray = GAME.levels[currentLevel]['layout'][i].split("\n");
		for(var j = 0; j < tempLineArray.length; j++){
			tempCharArray = tempLineArray[j].split("");
			if(!GAME.levels[currentLevel]['doodads'][j]){
				GAME.levels[currentLevel]['doodads'][j] = [];
			}
			for(var k = 0; k < tempCharArray.length; k++){
				if(tempCharArray[k] != " "){
					GAME.levels[currentLevel]['doodads'][j][k] = tempCharArray[k];
				}
				
				
			}
		}
	}
	GAME.resources.mainResource = GAME.levels[currentLevel]['resources']['lines'];
	GAME.resources.cash = GAME.levels[currentLevel]['resources']['cash'];
	GAME.currentWave = 0;
	increaseWave();
	//path = tracePath(); 
	path = resolvePath();
	render();
	try {
				
		if (getLength(GAME.levels) == currentLevel)
		{
			$("#nextLevel").prop('disabled', true);
		}
		else if (GAME.levels[currentLevel].complete == false)
		{
			$("#nextLevel").prop('disabled', true);
		}
		else{
			$("#nextLevel").prop('disabled', false);
		}
		
		if(currentLevel == 1 ){
			$("#previousLevel").prop('disabled', true);
		}
		else{
			$("#previousLevel").prop('disabled', false);
		}
		waveRunning = false;

	}
	catch(err){
		$("#nextLevel").prop('disabled', true);
		waveRunning = false;
		revertCreeps();
	}
	transitionRefresh();
}

/* changes the wave number */
function increaseWave() {
	if(codeFail){
		codeFail = false;
		return;
	}
	$("#errors").html("");
	GAME.resources.mainResource = GAME.levels[currentLevel]['resources']['lines'][GAME.currentWave];
	GAME.resources.cash = GAME.levels[currentLevel]['resources']['cash'][GAME.currentWave];
	GAME.currentWave ++;
	if (GAME.resources.cash < 0)
	{
		$("#compile").prop("disabled", true);
		$("#waveButton").prop('disabled', true);
		GAME.levels[currentLevel]["complete"] = true;
		$("#nextLevel").prop('disabled', false);
		GAME.currentWave = getLength(GAME.levels[currentLevel].waves);
		$("#output").text("");
		output("All Waves Completed!!\n");
		output("You may move on to the next Level.\n")
		return;
	}
	else{
		$("#waveButton").prop('disabled', false);
	}
	$("#waveCount").html(GAME.currentWave);
	changeResourceCount();
	var creepCount = 0;
	for (var i = 0; i < GAME.levels[currentLevel]["waves"][GAME.currentWave].length; i++) {
		creepCount += GAME.levels[currentLevel]["waves"][GAME.currentWave][i]['count'];
	}
	$("#creepTotal").text(creepCount);
	$("#cashTotal").text("$" + (GAME.resources.cash - GAME.resources.usedCash));
	messageManager();
}

//gets the length of a purely associative array
function getLength(array){
	var count = 0;
	var i;
	for (i in array) {
		if (array.hasOwnProperty(i)) {
			count++;
		}
	}
	return count;
}

//respond to key press rather than general call
function changeResourceCount(retVal) {
	var main;
	var adv;
	var advRemain
	try {
		var used = -1;
		for (var i = 0; i < codeWindows.length; i++) {
			used  += countCode(codeWindows[i]);
		}
		usedResource = used;
		GAME.resources.usedResource = used;
		$("#resourceAvailMain").html(used);
		$("#resourceTotalMain").html(GAME.resources.mainResource);
	}
	catch (err){
		var used = 0 + main;
		usedResource = used;
		$("#resourceAvailMain").html(used);
		$("#resourceTotalMain").html(GAME.resources.mainResource);
	}
	
	if (retVal == "main")
	{
		return main;
	}
	else if (retVal == "adv")
	{
		return adv;
	}
}

function purchase(price, item) {
	if (GAME.resources.usedCash + price <= GAME.resources.cash) {
		/*output("you have bought a(n) " + item + " for $" + price + ".\n");*/
		GAME.resources.usedCash += price;
		return true;
	}
	else {
		output("You do not have enough cash to buy a(n) " + item + " (cost: $" + price + ").\n");
		return false;
	}
}
