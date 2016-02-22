/* ******************************************************************************** */
/* Misc                                                                             */
/* ******************************************************************************** */

function resolvePath(){
	paths = [];
	for (var i = 0; i < GAME.levels[currentLevel].levelChar.length; i++){
		paths.push(tracePath(i, (GAME.levels[currentLevel]['levelChar'][i].layout - 1)));
	}
	return paths;
}

/* generate the path creeps will follow */
function tracePath(path, chosenLayout) {
	var lines = GAME.levels[currentLevel].layout[chosenLayout].split("\n");
	var finalPath = [];
	var truePath = [];
	var reverse = false;
	var curY = 0;
	var curX = 0;
	var lastChar = "";
	var curDirection = "x";
	var last;
	var startChar = GAME.levels[currentLevel].levelChar[path].start;
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].search(startChar) != -1) {
			curY = i;
			curX = lines[i].search(startChar)
			finalPath.push({x:curX + .5, y:curY});
			truePath.push({x:curX + .5, y:curY});
			last = {x:curX + .5, y:curY};
			lastChar = startChar;
		}
	}
	lines.shift();
	if (lines[curY].charAt(curX) == '+')
	{
		finalPath.push({x: curX + .5, y: curY + .5});
		lastChar = "+";
		truePath.push({x:curX + .5, y:curY + .5});
		last = {x:curX + .5, y:curY + .5};
		curDirection = checkDirection(truePath[0], last)
	}
	
	var pathChar = GAME.levels[currentLevel].levelChar[path].path;
	var count = 0; //used to prevent infinite loops
	while (lastChar != "@" && lastChar != "%" && count < 200) {
		var retVal;
		retVal = charChecker(lines, pathChar, curX, curY, finalPath);
		if (retVal) {
			finalPath.push(retVal);
			curX = retVal['x'] - .5;
			curY = retVal['y'] - .5;
			lastChar = pathChar;
		}
		else {
			retVal = charChecker(lines, "+", curX, curY, finalPath);
			if (retVal) {
				finalPath.push(retVal);
				curX = retVal['x'] - .5;
				curY = retVal['y'] - .5;
				lastChar = "+";
			}
			else {
				retVal = charChecker(lines, "@", curX, curY, finalPath);
				if (retVal) {
					finalPath.push(retVal);
					curX = retVal['x'] - .5;
					curY = retVal['y'] - .5;
					lastChar = "@";
				}
				else {
					retVal = charChecker(lines, "%", curX, curY, finalPath);
					if (retVal) {
						finalPath.push(retVal);
						curX = retVal['x'] - .5;
						curY = retVal['y'] - .5;
						lastChar = "%";
						reverse = true;
					}
				}	
			}
		}
		if (lastChar == '@' || lastChar == '%'){
			truePath.push(retVal);
		}
		else if (curDirection != checkDirection(last, retVal))
		{
				truePath.push(last);
				curDirection = checkDirection(last, retVal);
		}
		last = retVal;
		count++;
	}
	
	if (reverse) {
		var revPath = finalPath.concat();
		revPath.pop();
		while(revPath.length != 0) {
			finalPath.push(revPath.pop());
		}
		var revPath = truePath.concat();
		revPath.pop();
		while(revPath.length != 0) {
			truePath.push(revPath.pop());
		}
	}
	duplicateCheck(truePath);
	
	return truePath;
	//return finalPath;
}

function charChecker(lines, key, curX, curY, finalPath) {
	//Below
	if (lines[curY + 1].charAt(curX) == key && !checkExistance(finalPath, curY + 1, curX)) {
		return {x: curX + .5, y: curY + 1.5};
	}
	//Left
	else if (lines[curY].charAt(curX - 1) == key && !checkExistance(finalPath, curY, curX - 1)) {
		return {x: curX - .5, y: curY + .5};
	}
	//Above
	else if (lines[Math.max(curY - 1, 0)].charAt(curX) == key && !checkExistance(finalPath, Math.max(curY - 1, 0), curX)) {
		return {x: curX + .5, y: Math.max(curY - 1, 0) + .5};
	}
	//Right
	else if (lines[curY].charAt(curX + 1) == key && !checkExistance(finalPath, curY, curX + 1)) {
		return {x: curX + 1.5, y: curY + .5};
	}
	//Down-Left
	else if (lines[curY + 1].charAt(curX - 1) == key && !checkExistance(finalPath, curY + 1, curX - 1)) {
		return {x: curX - .5, y: curY + 1.5};
	}
	//Top-Left
	else if (lines[Math.max(curY - 1, 0)].charAt(curX - 1) == key && !checkExistance(finalPath, Math.max(curY - 1, 0), curX - 1)) {
		return {x: curX - .5, y: Math.max(curY - 1, 0) + .5};
	}
	//Top-Right
	else if (lines[Math.max(curY - 1, 0)].charAt(curX + 1) == key && !checkExistance(finalPath, Math.max(curY - 1, 0), curX + 1)) {
		return {x: curX + 1.5, y: Math.max(curY - 1, 0) + .5};
	}
	//Down-Right
	else if (lines[curY + 1].charAt(curX + 1) == key && !checkExistance(finalPath, curY + 1, curX + 1)) {
		return {x: curX + 1.5, y: curY + 1.5};
	}
	else {
		return false;
	}
}

function checkExistance(curPath, y, x) {
	for (var i = 0; i < curPath.length; i++){
		if (curPath[i]['x'] == x + .5) {
			if (curPath[i]['y'] == y + .5) {
				return true;
			}
		}
	}
	return false;
}

function checkDirection(last, newest){
	var difX = last.x - newest.x;
	var difY = last.y - newest.y;
	var dirX = sign(difX);
	var dirY = sign(difY);
	if (dirX == 1){
		if (dirY == 1){
			return "UL";
		}
		else if (dirY == -1){
			return "DL";
		}
		else if (dirY == 0){
			return "NL";
		}
	}
	else if (dirX == -1){
		if (dirY == 1){
			return "UR";
		}
		else if (dirY == -1){
			return "DR";
		}
		else if (dirY == 0){
			return "NR";
		}
	}
	else if (dirX == 0){
		if (dirY == 1){
			return "UN";
		}
		else if (dirY == -1){
			return "DN";
		}
		else if (dirY == 0){
			return "DN"; //same point assumes downward movement
		}
	}
}

function duplicateCheck(myPath){
	for(var i = 1; i < myPath.length; i++)
	{
		if (myPath[i - 1].x == myPath[i].x && myPath[i-1].y == myPath[i].y){
			myPath.splice(i - 1, 1);
			i--;
		}
	}
}

/* returns the sign of a number */
function sign(n) {
	if(n > 0) return 1;
	if(n < 0) return -1;
	return 0;
}

/* remove an element from an array */
function remove(arr, item) {
	for(var i = arr.length; i--;) {
		if(arr[i] === item) {
			arr.splice(i, 1);
			return;
		}
	}
}

/* distance between two objects */
function distance(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/* determine speed vector between two points given a speed */
function speedVector(a, b, speed) {
	var dx = b.x - a.x;
	var dy = b.y - a.y;
	var adx = Math.abs(dx);
	var ady = Math.abs(dy);
	var px = adx / (adx+ady);
	var py = ady / (adx+ady);
	return {
		x: speed * px * sign(dx),
		y: speed * py * sign(dy)
	};
}

function checkPath(x, y) {
	if(GAME.levels[currentLevel]['doodads'][y+1][x]){
		return true
	}
	return false;

}

/* find position of creep after certain number of ticks */
function positionAfter(creep, ticks) {
	var pos = creep;
	var objective = creep.objective;
	var speed = {x: creep.speedX, y: creep.speedY};
	var totalSpeed = Math.abs(speed.x) + Math.abs(speed.y);
	var ticksNeeded = 0;
	var dist;
	while(ticksNeeded < ticks) {
		dist = distance(pos, creep.path[objective]);
		ticksNeeded = dist / totalSpeed;
		// can we move to the next destination?
		if(ticksNeeded < ticks) {
			pos = creep.path[objective];
			speed = speedVector(creep.path[objective], creep.path[objective+1], creep.speed);
			//console.log("new speec vector", speed);
			objective += 1;
			ticks -= ticksNeeded;
		}
	}
	// FIXME why are we off by 2!?
	// TODO seems to be a rendering bug?
	ticks += 4;
	return {
		x: pos.x + speed.x*ticks,
		y: pos.y + speed.y*ticks
	};
}
