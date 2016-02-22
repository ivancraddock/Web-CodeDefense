/* ******************************************************************************** */
/* Projectiles                                                                      */
/* ******************************************************************************** */

function Laser(source, target, targetPos, type, ticks, damage, render, onHit) {
	this.x = source.x;
	this.y = source.y;
	this.target = target;
	this.targetPos = targetPos;
	this.source = source;
	this.targetDist = distance(source, targetPos);
	this.speed = this.targetDist / ticks;
	var v = speedVector(this, targetPos, this.speed);
	this.speedX = v.x;
	this.speedY = v.y;
	this.type = type;
	this.damage = damage;
	this.render = render;
	this.onHit = onHit;
	projectiles.push(this);
}
Laser.prototype.update = function() {
	if(distance(this, this.target) < GAME.projectiles.collisionRadius
		|| distance(this, this.source) > this.targetDist) {
		this.target.hit(this.damage);
		if(this.onHit != null) {
			this.onHit(this.target);
		}
		remove(projectiles, this);
	}
	this.x += this.speedX;
	this.y += this.speedY;
};


function Explosion(source, range) {
	this.x = source.x;
	this.y = source.y;
	this.range = range;
	this.frame = -1;
	this.stroke = GAME.render.explosion.stroke;
	this.fill = GAME.render.explosion.fill;
	explosions.push(this);
};
Explosion.prototype.update = function() {
	this.frame += 1;
	if(this.frame == this.fill.length) {
		remove(explosions, this);
		return;
	}
}
