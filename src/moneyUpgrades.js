var towerList = [];
//towerTypes is a two dimensional Array with each element being an assossiative array with the type of tower, price etc
var towerTypes = [{type : "NormalTower", price : 2}]; //EDIT TO INCLUDE PRICE
//towerOptions is a two dimensional array with each element being a type of upgrade and the price per tower type
var towerOptions = [{upgrade : "upgrade", NormalTower : 1}];
var index;



function loadTowers(){
	console.log("Loading Towers");
	output("Calcuating Spending\n");
	var code = mainCodeWindow.getValue();
	var lines = code.split("\n");
	index = 0;
	for (var t = 0; t < towerTypes.length; t++){
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].search(towerTypes[t]['type']) != -1)
			{
				addTower(lines[i], towerTypes[t]);
			}
		}		
	}
	//check for upgrades now
	for (var t = 0; t < towerOptions.length; t++){
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].search(towerOptions[t]['upgrade']) != -1)
			{
				upgradeTower(lines[i], towerOptions[t]);
			}
		}		
	}
	if (GAME.resources.usedCash > GAME.resources.cash){
		throw new Error("You are trying to spend more\nthan you currently have.\nPlease reduce the number of Towers or Upgrades");
	}
	return true;
	
}

function addTower(line, Tower) {
	if (line.search("=") != -1) {
		//used cash = full price
		GAME.resources.usedCash += Tower['price'];
		var assign = line.indexOf("=");
		var TName = line.substr(0, assign);
		if (TName.search("var") != -1)
		{
			TName = TName.substr(3);
		}
		TName = TName.trim();
		nameIndex = nameExists(TName);
		if (nameIndex == -1) { nameIndex = index; index++;}
		
		var towerData = [];
		towerData["name"] = TName;
		towerData["type"] = Tower['type'];
		towerData["upgrade"] = 0;
		towerList[nameIndex] = towerData;
		console.log(towerList[nameIndex])
		output("Bought a " + Tower['type'] + " for $" + Tower['price'] + "\n")
	}
	else {
		//used cash = half price
		GAME.resources.usedCash += Tower['price'] / 2;
		output("Bought a " + Tower['type'] + " for $" + (Tower['price'] /2) + "\n")
	}
}

function upgradeTower(line, upgrade) {
		//used cash = full price
		var assign = line.indexOf(".");
		var TName = line.substr(0, assign);
		nameIndex = nameExists(TName);
		if (nameIndex != -1) {
			var towerType = towerList[nameIndex]['type'];
			if (towerList[nameIndex][upgrade['upgrade']] < 4) {
				towerList[nameIndex][upgrade['upgrade']]++;
				GAME.resources.usedCash += upgrade[towerType];
				output("Upgraded a Tower for $" + upgrade[towerType] + "\n");
			}
		}

}

function nameExists(name) {
	for (var j = 0; j < towerList.length; j++) {
		if (towerList[j]['name'] == name)
		{
			return j;
		}
	}
	return -1;
}