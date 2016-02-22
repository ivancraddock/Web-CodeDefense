/* ******************************************************************************** */
/* Creeps                                                                           */
/* ******************************************************************************** */

function Creep(path) {
	this.threat = 1;
	this.type = 'virus';
	this.armor = 0;
	this.overclock = false;
	this.encryption = false;
	this.speed = GAME.creeps.normal.speed;
	this.path = path;
	this.x = path[0].x;
	this.y = path[0].y;
	this.speedX = 0.0;
	this.speedY = 0.0;
	this.distance = 999;
	this.objective = 0; // path[0]
	this.category = "normal";
	this.maxHealth = GAME.creeps.normal.health;
	this.health = GAME.creeps.normal.health;
	this.slowed = 0;
	this.updateSpeed = true;
	creeps.push(this);
	Creep.prototype.update =  CUpdate;
	Creep.prototype.hit = CHit;
	Creep.prototype.died = CDied;
}
function StrongCreep(path, curX, curY, objective) {
	this.threat = 1;
	this.type = 'virus';
	this.armor = 1;
	this.overclock = false;
	this.encryption = false;
	this.speed = GAME.creeps.strong.speed;
	this.path = path;
	if (curX == null){ //Default settings
		this.x = path[0].x;
		this.y = path[0].y;
		this.objective = 0;  // path[0]
		this.speedX = 0.0;
		this.speedY = 0.0;
		this.distance = 999;
	}
	else { //called if this creep is given a starting location
		this.x = curX;
		this.y = curY;
		this.objective = objective;
		initSpeed(this);
		this.distance = 999;
	}
	this.category = "strong";
	this.maxHealth = GAME.creeps.strong.health;
	this.health = GAME.creeps.strong.health;
	this.slowed = 0;
	this.updateSpeed = true;
	creeps.push(this);
	StrongCreep.prototype.update =  CUpdate;
	StrongCreep.prototype.hit = CHit;
	StrongCreep.prototype.died = CDied;
}
function SpamCreep(path, curX, curY, objective) {
	this.threat = 0;
	this.type = 'spam';
	this.armor = 0;
	this.overclock = false;
	this.encryption = false;
	this.speed = GAME.creeps.spam.speed;
	this.path = path;
	if (curX == null){ //Default settings
		this.x = path[0].x;
		this.y = path[0].y;
		this.objective = 0;  // path[0]
		this.speedX = 0.0;
		this.speedY = 0.0;
		this.distance = 999;
	}
	else { //called if this creep is given a starting location
		this.x = curX;
		this.y = curY;
		this.objective = objective;
		initSpeed(this);
		this.distance = 999;
	}
	this.category = "spam";
	this.maxHealth = GAME.creeps.spam.health;
	this.health = GAME.creeps.spam.health;
	this.slowed = 0;
	this.updateSpeed = true;
	creeps.push(this);
	SpamCreep.prototype.update =  CUpdate;
	SpamCreep.prototype.hit = CHit;
	SpamCreep.prototype.died = CDied;
}

function SlowSpamCreep(path, curX, curY, objective) {
	this.threat = 0;
	this.type = 'spam';
	this.armor = 0;
	this.overclock = false;
	this.encryption = false;
	this.speed = GAME.creeps.slowspam.speed;
	this.path = path;
	if (curX == null){ //Default settings
		this.x = path[0].x;
		this.y = path[0].y;
		this.objective = 0;  // path[0]
		this.speedX = 0.0;
		this.speedY = 0.0;
		this.distance = 999;
	}
	else { //called if this creep is given a starting location
		this.x = curX;
		this.y = curY;
		this.objective = objective;
		initSpeed(this);
		this.distance = 999;
	}
	this.category = "spam";
	this.maxHealth = GAME.creeps.spam.health;
	this.health = GAME.creeps.spam.health;
	this.slowed = 0;
	this.updateSpeed = true;
	creeps.push(this);
	SlowSpamCreep.prototype.update =  CUpdate;
	SlowSpamCreep.prototype.hit = CHit;
	SlowSpamCreep.prototype.died = CDied;
}

function GoodCreep(path) {
	this.threat = -1;
	this.type = 'packet';
	this.armor = 0.3;
	this.overclock = false;
	this.encryption = false;
	this.speed = GAME.creeps.good.speed;
	this.path = path;
	this.x = path[0].x;
	this.y = path[0].y;
	this.speedX = 0.0;
	this.speedY = 0.0;
	this.distance = 999;
	this.objective = 0; // path[0]
	this.category = "good";
	this.maxHealth = GAME.creeps.good.health;
	this.health = GAME.creeps.good.health;
	this.slowed = 0;
	this.updateSpeed = true;
	creeps.push(this);
	GoodCreep.prototype.update =  CUpdate;
	GoodCreep.prototype.hit = CHit;
	GoodCreep.prototype.died = CDied;
}

function EncryptedCreep(path) {
	this.threat = 1;
	this.type = 'virus';
	this.armor = 0;
	this.overclock = false;
	this.encryption = true;
	this.speed = GAME.creeps.encrypted.speed;
	this.path = path;
	this.x = path[0].x;
	this.y = path[0].y;
	this.speedX = 0.0;
	this.speedY = 0.0;
	this.distance = 999;
	this.objective = 0; // path[0]
	this.category = "encrypted";
	this.maxHealth = GAME.creeps.encrypted.health;
	this.health = GAME.creeps.encrypted.health;
	this.slowed = 0;
	this.updateSpeed = true;
	creeps.push(this);
	EncryptedCreep.prototype.update =  CUpdate;
	EncryptedCreep.prototype.hit = CHit;
	EncryptedCreep.prototype.died = CDied;
}

function OverclockedCreep(path) {
	this.threat = 1;
	this.type = 'virus';
	this.armor = 0;
	this.overclock = true;
	this.currentOverclock = 1;
	this.encryption = false;
	this.speed = GAME.creeps.overclocked.speed;
	this.path = path;
	this.x = path[0].x;
	this.y = path[0].y;
	this.speedX = 0.0;
	this.speedY = 0.0;
	this.distance = 999;
	this.objective = 0; // path[0]
	this.category = "overclocked";
	this.maxHealth = GAME.creeps.overclocked.health;
	this.health = GAME.creeps.overclocked.health;
	this.slowed = 0;
	this.updateSpeed = true;
	creeps.push(this);
	OverclockedCreep.prototype.update =  CUpdate;
	OverclockedCreep.prototype.hit = CHit;
	OverclockedCreep.prototype.died = CDied;
}

function TrojanCreep(path) {
	this.threat = 1
	this.type = 'virus';
	this.armor = 0;
	this.overclock = false;
	this.encryption = false;
	this.speed = GAME.creeps.trojan.speed;
	this.path = path;
	this.x = path[0].x;
	this.y = path[0].y;
	this.speedX = 0.0;
	this.speedY = 0.0;
	this.distance = 999;
	this.slowed = 0;
	this.objective = 0; // path[0]
	this.category = "trojan";
	this.maxHealth = GAME.creeps.trojan.health;
	this.health = GAME.creeps.trojan.health;
	creeps.push(this);
	TrojanCreep.prototype.update =  CUpdate;
	TrojanCreep.prototype.hit = CHit;
	TrojanCreep.prototype.died = function (){
				output("Trojan Destroyed! "+GAME.creeps.trojan.count + " Viruses have been released!\n");
				remove(creeps, this);
				var count = GAME.creeps.trojan.count;
				var curX = this.x;
				var curY = this.y;
				var goal = this.objective;
				function release() {
					new StrongCreep(path, curX, curY, goal);
					count -= 1;
					if(count > 0) {
						after(2, release);
					}
				}
				release();
				};
}

function CUpdate() {
	var node = this.path[this.objective];
	// did we reach our target?
	if(distance(this, node) < GAME.creeps.nodeRadius || distance(this, node) > this.distance) {
		this.objective += 1;
		this.x = node.x;
		this.y = node.y;
		// did we reach the end?
		if(this.objective == this.path.length) {
			creepReachedEnd(this);
			return;
		}
		node = this.path[this.objective];
		this.updateSpeed = true;
	}
	if(this.updateSpeed) {
		this.updateSpeed = false;
		var speed = this.speed;
		if(this.overclock){
			speed *= this.currentOverclock;
		}
		if(this.slowed > 0) {
			speed *= Math.pow(GAME.projectiles.slow.slowAmount,this.slowed);
		}
		// find speed vector based on new target
		var v = speedVector(this, node, speed);
		this.speedX = v.x;
		this.speedY = v.y;
	}
	this.distance = distance(this, node);
	// advance towards our target
	this.x += this.speedX;
	this.y += this.speedY;
};

function initSpeed(mod)
{
	node = mod.path[mod.objective];
	// find speed vector based on new target
	var v = speedVector(mod, node, mod.speed);
	mod.speedX = v.x;
	mod.speedY = v.y;
}

function CHit(damage) {
	if ((this.health > 0) && (this.encryption == false)) {
		this.health -= damage;
		if(this.health <= 0) {
			if(!muteBool){
				var sound = new Audio("audio/blast.wav");
				sound.play();
			}
			this.died();
			remove(creeps, this);
		}
		if(this.overclock){
			this.updateSpeed = true;
			this.currentOverclock++;
		}
	}
};

function CDied(){
	if(this.category == "spam"){
		
	}
	else if (this.category == "good"){
		output("<span class = 'dodgerItem'>Protected Packet</span> destroyed! <span class = 'badItem'>Mission Failed.</span>\n");
		victoryStatus(false);

	}
	else{
		output("<span class = 'badItem'>"+this.category.charAt(0).toUpperCase()+this.category.slice(1)+" Virus</span> destroyed!\n"); 
	}
}

function displayNextWave(){
	var returnString = "Next Wave Will Contain:\n";
	for (var i = 0; i < GAME.levels[currentLevel]["waves"][GAME.currentWave].length; i++) {
		var creepTypeVar = GAME.levels[currentLevel]["waves"][GAME.currentWave][i]['group'];
		returnString += GAME.levels[currentLevel]["waves"][GAME.currentWave][i]['count']+" ";
		if(creepTypeVar == "spam"){
			returnString +="<span class = 'spamItem'>Spam</span> files";
		}
		else if(creepTypeVar == "good"){
			returnString +="<span class = 'dodgerItem'>Protected Packet</span> files"
		}
		else{
			returnString +="<span class = 'badItem'>"+creepTypeVar.charAt(0).toUpperCase()+creepTypeVar.slice(1)+" Viruses</span>"
		}
		returnString+=" beginning at "+GAME.levels[currentLevel]["waves"][GAME.currentWave][i]['delay']+" milliseconds.\n";
    
	}
	return returnString;
}

/* spawn creeps at start of path with delay */
function spawnCreeps(type, count, delay, path) {
	function spawn() {
		new type(path);
		count -= 1;
		if(count > 0) {
			after(delay, spawn);
		}
	}
	spawn();
}
