/* ******************************************************************************** */
/* Towers                                                                           */
/* ******************************************************************************** */

function Tower(x, y) {
	//data validation
	try{
		towerDataValidation(x,y);
	}
	catch(err){
		codeFail = true;
		victoryStatus(false);
		$("#errors").html(err + $("#errors").html());
		$("#errors").show();
		waveTerminator();
	}	//create tower
	this.x = x + 0.5;
	this.y = y + 0.5;
	this.range = 0.0;
	this.canShoot = true;
	this.ai = farthestCreepAI;
	this.target = undefined;
	this.level = 1;
	this.laserOnHit = null;
	towers.push(this);
};
Tower.prototype.setAI = function(ai) {
	if(arguments.length == 0){
		var ai = targetStrongest;
	}
	this.ai = ai;
};
Tower.prototype.shoot = function(creep) {
	//var sound = new Audio("audio/punch.wav");
	playSound('punch');
	this.target = creep;
	this.canShoot = false;
	var pos = positionAfter(this.target, this.laserSpeed);
	new Laser(this, this.target, pos, this.laserType, this.laserSpeed, this.laserDamage, this.laserRender, this.laserOnHit);
	var tower = this;
	after(this.reload, function() { tower.canShoot = true; });
};
Tower.prototype.findTarget = function() {
	var near = creepsInRange(this, this.range);
	if(near.length == 0) return;
	if(this.ai){
		var creep = this.ai.call(this, near);
		if(creep instanceof Array){
			if(creep.length == 1){
				this.shoot(creep[0]);
			}
		}
		else if(creep !== undefined) {
			this.shoot(creep);
		} else {
			this.target = undefined;
		}
	}
};
Tower.prototype.update = function() {
	// do we have a target?
	if(this.target !== undefined) {
		// did it die or go out of range?
		if(this.target.health <= 0 || distance(this, this.target) > this.range) {
			this.target = undefined;
		}
	}
	// choose new target
	if(this.canShoot) {
		this.findTarget();
	}
};
Tower.prototype.message = function(msg) {
	output("<span class = 'badItem'>Upgrading</span> tower at (" + (this.x-0.5) + "," + (this.y-0.5) + ")" + msg + "\n");
};
Tower.prototype.upgrade = function(type) {
	if(this.level == 3){
		output('Towers cannot be upgraded above level 3.\n');
		return;
	}
	if(!type){
		var type = "reload";
	}
	type = (type || "").toLowerCase();
	if(type != "damage" && type != "range" && type != "reload") {
		output('Upgrades must be one of: "damage", "range", or "reload".\n');
		return;
	}
	var cost = GAME.towers[this.type].upgrades.costs[this.level - 1];
	var mod  = GAME.towers[this.type].upgrades[type];
	var msg  = "";
	if(!purchase(cost, type + " upgrade")) {
		return;
	}
	this.level += 1;
	if(type == "damage") {
		msg = "--Damage went from " + this.laserDamage + " to " + (this.laserDamage + mod)+" units";
		this.laserDamage += mod;
		if(this.type == 'rocket'){
		var newDamage = GAME.projectiles.rocket.damage + this.laserDamage;
			this.laserOnHit = function(creep) {
				ExplosiveDamage(creep,newDamage);
				new Explosion(creep, GAME.projectiles.rocket.splashRange);
			};
		}
	} else if(type == "range") {
		msg = "--Range went from " + this.range + " to " + (this.range + mod)+" units";
		this.range += (mod*2);
	} else if(type == "reload") {
		if(this.reload >= 20){
			msg = "--Reload delay went from " + this.reload + " to " + (this.reload + mod)+" milliseconds";
			this.reload += mod;
		}
		else{
			msg = "--Reload delay went from " + this.reload + " to " + (this.reload - 4)+" milliseconds";
			this.reload += mod;
		}
	}
	var remainder = logRemainingCash();
	this.message(" to level " + this.level + " for $"+cost+" "+remainder+"\n" + msg);
};

function NormalTower(x, y) {
	if (purchase(GAME.towers.normal.price, "Normal Tower")) {
		Tower.call(this, x, y);
		this.type = "normal";
		this.name = "NormalTower";
		this.range = GAME.towers.normal.range;
		this.reload = GAME.towers.normal.reload;
		this.laserSpeed = GAME.projectiles.normal.speed;
		this.laserDamage = GAME.projectiles.normal.damage;
		this.laserRender = GAME.render.projectile.normal;
		var remainder = logRemainingCash();
		output("<span class = 'badItem'>Creating</span> NormalTower at (" + (this.x-0.5) + "," + (this.y-0.5) + ") for $"+ GAME.towers.normal.price+"; "+remainder+"\n");
	}
}
NormalTower.prototype = Object.create(Tower.prototype);
NormalTower.prototype.constructor = NormalTower;



function SlowTower(x, y) {
	if (purchase(GAME.towers.slow.price, "Slow Tower")) {
		Tower.call(this, x, y);
		this.type = "slow";
		this.name = "SlowTower";
		this.range = GAME.towers.slow.range;
		this.reload = GAME.towers.slow.reload;
		this.laserSpeed = GAME.projectiles.slow.speed;
		this.laserDamage = GAME.projectiles.slow.damage;
		this.laserRender = GAME.render.projectile.slow;
		this.laserOnHit = function(creep) {
			creep.overclock = false;
			creep.encryption = false;
			creep.slowed += (1);
			creep.updateSpeed = true;
		};
		var remainder = logRemainingCash();
		output("<span class = 'badItem'>Creating</span> SlowTower at (" + (this.x-0.5) + "," + (this.y-0.5) + ") for $"+GAME.towers.slow.price+"; "+remainder+"\n");
	}
}
SlowTower.prototype = Object.create(Tower.prototype);
SlowTower.prototype.constructor = SlowTower;

function PulseTower(x,y){
	return new RocketTower(x,y);
}


function RocketTower(x, y) {
	if (purchase(GAME.towers.rocket.price, "Rocket Tower")) {
		Tower.call(this, x, y);
		this.type = "rocket";
		this.name = "RocketTower";
		this.range = GAME.towers.rocket.range;
		this.reload = GAME.towers.rocket.reload;
		this.laserSpeed = GAME.projectiles.rocket.speed;
		this.laserDamage = 0;
		this.laserRender = GAME.render.projectile.rocket;
		this.laserOnHit = function(creep) {
			ExplosiveDamage(creep,GAME.projectiles.rocket.damage);
			new Explosion(creep, GAME.projectiles.rocket.splashRange);
		};
		var remainder = logRemainingCash();
		output("<span class = 'badItem'>Creating</span> PulseTower at (" + (this.x-0.5) + "," + (this.y-0.5) + ") for $"+GAME.towers.rocket.price+"; "+remainder+"\n");
		
	}
}
RocketTower.prototype = Object.create(Tower.prototype);
RocketTower.prototype.constructor = RocketTower;


function ExplosiveDamage(impact,damage) {
	var ret = [];
	for(var key in creeps) {
		var creep = creeps[key];
		if(distance(creep, impact) <= 1.1) {
			ret.push(creep);
		}
	}
	for(var i=0; i<ret.length; i++) {
		ret[i].hit(damage);
	};
}


function towerDataValidation(x,y) {
	spaceString = x + ":" + y;
	if(GAME.resources.space[spaceString]){

		throw new Error("Multiple towers can not be placed at the same location ("+x+","+y+")\n")
	}
	if(x > ((width/GAME.render.cellSize) - 2) || x < 0)
	{

		throw new Error("Invalid X given for a tower ("+x+","+y+")\nThe tower cannot be placed outside the boundary\n");
	}
	if(x % 1 != 0 || isNaN(x))
	{

		throw new Error("X values entered for a tower must be an integer ("+x+","+y+")\nAn integer is a number with no decimal places\n");
	}
	if(y > ((height/GAME.render.cellSize) - 2) || y < 0)
	{

		throw new Error("Invalid Y given for a tower ("+x+","+y+")\nThe tower cannot be placed outside the boundary\n");
	}
	if(y % 1 != 0 || isNaN(y))
	{

		throw new Error("Y values entered for a tower must be an integer ("+x+","+y+")\nAn integer is a number with no decimal places\n");
	}
	var pInvalid = checkPath(x, y);
	if(pInvalid) {

		throw new Error("Tower cannot be located on a pathway ("+x+","+y+")\n");
	}
	GAME.resources.space[spaceString] = true;
}

function logRemainingCash(){
	var remaining = GAME.resources.cash - GAME.resources.usedCash
	return("<span class = 'badItem'>$"+remaining+" left</span>");

}

function targetStrongest(creeps) {
		var strongest = 0;
		var strongestIndex;
		for(var zzz=0; zzz<creeps.length; zzz++) {
			if (creeps[zzz].maxHealth > strongest){
				strongest = creeps[zzz].maxHealth;
				strongestIndex = zzz;
			}
		}
		return creeps[strongestIndex];
}
