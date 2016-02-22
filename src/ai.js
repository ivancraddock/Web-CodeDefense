/* ******************************************************************************** */
/* AI                                                                               */
/* ******************************************************************************** */

/* targetting AI that favors most distant creep */
function farthestCreepAI(creeps) {
	var ret;
	var best = 100;
	for(var key in creeps) {
		var creep = creeps[key];
		var dist = distance(creep, this);
		if(dist > best) {
			best = dist;
			ret = creep;
		}
	}
	return creep;
}

/* list of all creeps within range */
function creepsInRange(tower, range) {
	var ret = [];
	for(var key in creeps) {
		var creep = creeps[key];
		if(distance(creep, tower) <= range) {
			ret.push(creep);
		}
	}
	return ret;
}

function targetFurthest(creeps){
	return farthestCreepAI(creeps);
}

function targetClosest(creeps){
	var 	nearestCreep, nearestCreepDist=1000;
	for(var index=0; index<creeps.length; index++) {
		var creep, creepDist;
		creep = creeps[index];
		creepDist = distance(creep, this);
		if(creepDist < nearestCreepDist) {
			nearestCreep = creep;
			nearestCreepDist = creepDist;
		}
	}
	return nearestCreep;
}	


var functionList = [];

var defaultTarget = "return creeps[0];";
functionList.push({name:"defaultTarget", resource: 1, title: "Default Function (1 Byte)"});

var closestTarget = "var 	nearestCreep, nearestCreepDist=1000;\nfor(var index=0; index<creeps.length; index++) {\n\tvar creep, creepDist;\n\tcreep = creeps[index];\n\tcreepDist = distance(creep, this);\n\tif(creepDist < nearestCreepDist) {\n\t\tnearestCreep = creep;\n\t\tnearestCreepDist = creepDist;\n\t}\n}\nreturn nearestCreep;";
functionList.push({name:"closestTarget", resource: 9, title: "Target Closest Creep (9 Byte)"});

var fartherTarget = "var target;\nvar best = 100;\nfor(var key in creeps) {\n\tvar creep = creeps[key];\n\tvar dist = distance(creep, this);\n\tif(dist > best) {\n\t\tbest = dist;\n\t\ttarget = creep;\n\t}\n}\nreturn creep;"
functionList.push({name:"fartherTarget", resource: 9, title: "Target Farthest Creep (9 Byte)"});

var strongTarget = "for(var i = 0; i < creeps.length; i++)\n{\n\tif(creeps[i].type == 'strong')\n\t{\n\t\treturn creeps[i];\n\t}\n}\nreturn creeps[0];";
functionList.push({name:"strongTarget", resource: 4, title: "Target Strong Types (4 Byte)"});

var avoidGood = "var firstSpam = -1;\nfor( i = 0 ; i < creeps.length ; i++){\n\tif( ( creeps[i].type != 'Good' ) &&( creeps[i],creepType != 'Spam' ))\n\t{\n\t\treturn creeps[i];\n\t}\n\telse if ( ( creeps[i].creepType == 'Spam' ) && ( firstSpam < 0 ))\n\t{\n\t\tfirstSpam = i;\n\t}\n}\n\nif (firstSpam > 0)\n{\n\treturn creeps[firstSpam];\n}\n\nreturn false;";
functionList.push({name:"avoidGood", resource: 9, title: "Avoid Good Types (9 Byte)"});