/* ******************************************************************************** */
/* Rendering																		*/
/* ******************************************************************************** */

var CS = GAME.render.cellSize;


/* render game */
function render() {
	//ctx.drawImage(resources["basic_level"], 0, 0);
	renderLevel();
	renderExplosions();
	renderTowers();
	renderCreeps();
	renderProjectiles();
}

function renderLevel() {
	var half = CS / 2;
	// fill margin
	ctx.fillStyle = GAME.render.color.margin;
	ctx.fillRect(0, 0, width, height);
	// fill level
	ctx.fillStyle = GAME.render.color.background;
	ctx.fillRect(CS, CS, width-CS, height-CS);
	// render creep path
	renderPath();
	// draw grids
	ctx.strokeStyle = GAME.render.color.grid;
	ctx.lineWidth = 1;
	ctx.beginPath();
	// draw vertical grid
	for(var x=0; x<width; x+=CS) {
		ctx.moveTo(x+0.5, 0);
		ctx.lineTo(x+0.5, height);
	}
	// draw horizontal grid
	for(var y=0; y<height; y+=CS) {
		ctx.moveTo(0,	 y+0.5);
		ctx.lineTo(width, y+0.5);
	}
	ctx.stroke();
	// draw cell labels
	ctx.fillStyle = GAME.render.color.text;
	ctx.stokeStyle = GAME.render.color.text;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = GAME.render.marginText;
	// draw top text
	for(var i=1; i<width/CS; i++) {
		ctx.fillText(i-1, i*CS+half, half);
	}
	// draw left text
	for(var i=1; i<height/CS; i++) {
		ctx.fillText(i-1, half, i*CS+half);
	}
}

function renderPath() {
	for (var j = 0; j < path.length; j++){
	if(path[j].length > 0) {
	//if(path.length > 0) {
		ctx.save();
		ctx.lineWidth = CS/4;
		ctx.lineJoin = "bevel";
		ctx.strokeStyle = GAME.render.color.path;
		ctx.beginPath();
		ctx.moveTo(CS + path[j][0].x*CS, CS + path[j][0].y*CS);
		for(var i=1; i<path[j].length; i++) {
			ctx.lineTo(CS + path[j][i].x*CS, CS + path[j][i].y*CS);
		}
		ctx.stroke();
		ctx.restore();
		}
	}
}

function renderExplosions() {
	for(key in explosions) {
		var exp = explosions[key];
		ctx.strokeStyle = exp.stroke[exp.frame];
		ctx.fillStyle = exp.fill[exp.frame];
		ctx.beginPath();
		ctx.arc(CS + exp.x*CS, CS + exp.y*CS, exp.range, 0, 2.0*Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

function renderCreeps() {
	for(key in creeps) {
		var creep = creeps[key];
		//ctx.fillStyle = GAME.render.creep.normal.fill;
		ctx.fillStyle = GAME.render.creep[creep.category]["fill"];
		//ctx.strokeStyle = GAME.render.creep.normal.stroke;
		ctx.strokeStyle = GAME.render.creep[creep.category]["stroke"];
		var size = GAME.render.creep[creep.category]["size"];
		var x = CS + creep.x*CS - size/2;
		var y = CS + creep.y*CS - size/2;
		ctx.fillRect(x, y, size, size);
		if(creep.encryption == true){
			ctx.strokeStyle = "purple";
			ctx.lineWidth=3;
		}
		else{
			ctx.strokeStyle = GAME.render.creep[creep.category]["stroke"];
			ctx.lineWidth=1;
		}
		ctx.strokeRect(x, y, size, size);
		if(GAME.render.debug) {
			// render future creep
			creep = positionAfter(creep, GAME.projectiles.normal.speed);
			size = 0.1*CS;
			x = CS + creep.x*CS - size/2;
			y = CS + creep.y*CS - size/2;
			ctx.strokeRect(x, y, size, size);
		}
	}
}

function renderTowers() {
	var body = GAME.render.tower.normal.body;
	var pins = GAME.render.tower.normal.pins;
	for (key in towers) {
		var tower = towers[key];
		if(tower.type == "normal") {
			renderNormalTower(tower);
		} else if(tower.type == "slow") {
			renderSlowTower(tower);
		} else if(tower.type == "rocket") {
			renderRocketTower(tower);
		}
	}
}

function renderNormalTower(tower) {
	var body = GAME.render.tower.normal.body;
	var pins = GAME.render.tower.normal.pins;
	var x = CS + tower.x*CS;
	var y = CS + tower.y*CS;
	function rect(width, height, color, offx, offy) {
		ctx.fillStyle = color;
		ctx.fillRect(x-(width/2)+offx, y-(height/2)+offy, width, height);
	}
	if(tower.level == 1) {
		rect(CS/2, CS/12,  pins, 0, -(CS/5));
		rect(CS/2, CS/12,  pins, 0, 0);
		rect(CS/2, CS/12,  pins, 0,  (CS/5));
		rect(CS/3.5, CS/1.6, body, 0, 0);
	} else if(tower.level == 2) {
		rect(CS/1.5, CS/12,   pins, 0, -(CS/4));
		rect(CS/1.5, CS/12,   pins, 0, -(CS/12));
		rect(CS/1.5, CS/12,   pins, 0,  (CS/12));
		rect(CS/1.5, CS/12,   pins, 0,  (CS/4));
		rect(CS/2,   CS/1.25, body, 0, 0);
	} else {
		rect(CS/1.25, CS/12,   pins, 0, -(CS/5));
		rect(CS/1.25, CS/12,   pins, 0, 0);
		rect(CS/1.25, CS/12,   pins, 0,  (CS/5));
		rect(CS/12,   CS/1.25, pins, -(CS/5), 0);
		rect(CS/12,   CS/1.25, pins, 0,              0);
		rect(CS/12,   CS/1.25, pins,  (CS/5), 0);
		rect(CS/1.5,  CS/1.5,  body, 0, 0);
	}
	if(GAME.render.debug) {
		// render targetting range
		var radius = tower.range * CS;
		ctx.strokeStyle = GAME.render.tower.radius;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2*Math.PI);
		ctx.stroke();
		// render target
		if(tower.target !== undefined) {
			var tx = CS + tower.target.x*CS;
			var ty = CS + tower.target.y*CS;
			ctx.strokeStyle = GAME.render.tower.target;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(tx, ty);
			ctx.stroke();
		}
	}
}

function renderRocketTower(tower) {
	var body = GAME.render.tower.rocket.body;
	var top  = GAME.render.tower.rocket.top;
	var pins = GAME.render.tower.rocket.pins;
	var center = GAME.render.tower.rocket.center;
	var x = CS + tower.x*CS;
	var y = CS + tower.y*CS;
	function rect(width, height, color, offx, offy) {
		ctx.fillStyle = color;
		ctx.fillRect(x-(width/2)+offx, y-(height/2)+offy, width, height);
	}
	function circle(radius, centerx, centery, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(centerx, centery, radius, 0, 2.0*Math.PI);
		ctx.fill();
	}
	if(tower.level == 1) {
		rect(CS/2.5, CS/12, pins, 0, 0);
		circle(CS/8, x, y, body);
		rect(CS/4, CS/4, body, 0, -CS/8);
		circle(CS/8, x, y-CS/4, top);
		circle(CS/14, x, y-CS/4, center);
	} else if(tower.level == 2) {
		rect(CS/2, CS/16, pins, 0, -CS/16);
		rect(CS/2, CS/16, pins, 0,  CS/16);
		circle(CS/6, x, y, body);
		rect(CS/3, CS/3, body, 0, -CS/8);
		circle(CS/6, x, y-CS/4, top);
		circle(CS/10, x, y-CS/4, center);
	} else if(tower.level == 3) {
		rect(CS/1.5, CS/14, pins, 0, -CS/16);
		rect(CS/1.5, CS/14, pins, 0,  CS/16);
		rect(CS/14, CS/1.5, pins, -CS/16, 0);
		rect(CS/14, CS/1.5, pins,  CS/16, 0);
		circle(CS/4, x, y, body);
		rect(CS/2, CS/2.5, body, 0, -CS/8);
		circle(CS/4, x, y-CS/4, top);
		circle(CS/6, x, y-CS/4, center);
	}
}

function renderSlowTower(tower) {
	var body = GAME.render.tower.slow.body;
	var pins = GAME.render.tower.slow.pins;
	var bands = GAME.render.tower.slow.bands;
	var x = CS + tower.x*CS;
	var y = CS + tower.y*CS;
	function rect(width, height, color, offx, offy) {
		ctx.fillStyle = color;
		ctx.fillRect(x-(width/2)+offx, y-(height/2)+offy, width, height);
	}
	function circle(radius, centerx, centery, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x+centerx, y+centery, radius, 0, 2.0*Math.PI);
		ctx.fill();
	}
	function resistor(x, y, colors) {
		rect(CS/1.25, CS/16, pins, x, y);
		rect(CS/2, CS/8, body, x, y);
		circle(CS/16, x-CS/4, y, body);
		circle(CS/16, x+CS/4, y, body);
		rect(CS/18, CS/8, colors[0], x-CS/5, y);
		rect(CS/18, CS/8, colors[1], x-CS/10, y);
		rect(CS/18, CS/8, colors[2], x, y);
		rect(CS/18, CS/8, colors[3], x+CS/5, y);
	}
	if(tower.level == 1) {
		resistor(0, 0, bands.resA);
	} else if(tower.level == 2) {
		resistor(0, -CS/10, bands.resA);
		resistor(0,  CS/10, bands.resB);
	} else if(tower.level == 3) {
		resistor(0, -CS/3,  bands.resC);
		resistor(0, -CS/10, bands.resA);
		resistor(0,  CS/10, bands.resB);
		resistor(0,  CS/3,  bands.resD);
	}
}

function renderProjectiles() {
	for(var key in projectiles) {
		var proj = projectiles[key];
		ctx.fillStyle = proj.render.fill;
		ctx.strokeStyle = proj.render.stroke;
		var size = proj.render.size;
		var hsize = size / 2;
		var x = CS + proj.x*CS;
		var y = CS + proj.y*CS;
		ctx.beginPath();
		for(var i=0; i<4; i++) {
			// vertical line
			ctx.moveTo(x+0, y-hsize);
			ctx.lineTo(x+0, y+hsize);
			// horizontal line
			ctx.moveTo(x-hsize, y);
			ctx.lineTo(x+hsize, y);
			// back slash
			ctx.moveTo(x-hsize, y-hsize);
			ctx.lineTo(x+hsize, y+hsize);
			// forward slash
			ctx.moveTo(x-hsize, y+hsize);
			ctx.lineTo(x+hsize, y-hsize);
		}
		ctx.stroke();
		if(GAME.render.debug) {
			ctx.strokeStyle = GAME.render.projectile.debug;
			// projectile target
			x = CS + proj.targetPos.x*CS;
			y = CS + proj.targetPos.y*CS;
			ctx.fillRect(x, y, 5, 5);
			ctx.strokeRect(x, y, 5, 5);
			// projectile path
			ctx.beginPath();
			x = CS + proj.source.x*CS;
			y = CS + proj.source.y*CS;
			ctx.moveTo(x, y);
			x = CS + proj.targetPos.x*CS;
			y = CS + proj.targetPos.y*CS;
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	}
}
