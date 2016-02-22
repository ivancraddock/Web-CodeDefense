var updateSpeed = 20;
var cellSize = 50;



GAME = {
	/* both game updates and render calls happen this many times per second */
	updateHertz: updateSpeed,

	/* level data */
	

	/* render data */
	render: {
		cellSize: cellSize,
		marginText: "14pt sans-serif",
		debug: false,
		color: {
			margin:     "#cccccc",
			background: "#339933",
			grid:       "#000000",
			path:       "#ffff66",
			text:       "#000000"
		},
		creep: {
			normal: {
				size:   0.1 * cellSize, //GAME.render.cellSize
				fill:   "red",
				stroke: "black"
			},
			strong: {
				size:   0.1 * cellSize, //GAME.render.cellSize
				fill:   "grey",
				stroke: "red"
			},
			spam: {
				size:   0.05 * cellSize, //GAME.render.cellSize
				fill:   "white",
				stroke: "black"
			},
			trojan: {
				size:   0.2 * cellSize, //GAME.render.cellSize
				fill:   "pink",
				stroke: "black"
			},
			good: {
				size:   0.15 * cellSize, //GAME.render.cellSize
				fill:   "#1E90FF",
				stroke: "black"
			},
			encrypted: {
				size:   0.2 * cellSize, //GAME.render.cellSize
				fill:   "grey",
				stroke: "red"
			},
			overclocked: {
				size:   0.2 * cellSize, //GAME.render.cellSize
				fill:   "#FDFF00",
				stroke: "black"
			}
		},
		tower: {
			radius: "white",
			target: "blue",
			normal: {
				body: "black",
				pins: "#999999"
			},
			rocket: {
				body:   "#333333",
				top:    "#000000",
				center: "#666666",
				pins:   "#999999"
			},
			slow: {
				body: "#d2b48c",
				pins: "#999999",
				bands: {
					// http://www.digikey.com/en/resources/conversion-calculators/conversion-calculator-resistor-color-code-4-band
					resA: ["brown", "black", "black", "gold"], // 10 ohms +/- 5%
					resB: ["grey", "red", "brown", "gold"],    // 820 ohms +/- 5%
					resC: ["brown", "green", "red", "red"],    // 1.5k ohms +/- 2%
					resD: ["blue", "grey", "orange", "red"]    // 68k ohms +/- 2%
				}
			}
		},
		projectile: {
			normal: {
				fill:   "blue",
				stroke: "blue",
				size:   cellSize/8 //GAME.render.cellSize
			},
			slow: {
				fill:   "white",
				stroke: "white",
				size:   cellSize/6
			},
			rocket: {
				fill:   "red",
				stroke: "red",
				size:   cellSize/4
			},
			debug:  "yellow"
		},
		explosion: {
			frames: 3,
			stroke: ["red", "yellow", "white"],
			fill:   ["white", "red", "yellow"]
		}
	},

	/* creep data */
	creeps: {
		/* creeps are considered to have reached a target when their distance is less than this variable (in game units). Needs to be at least half of the fastest speed. */
		nodeRadius: 0.03,
		normal: {
			speed: 0.06,
			health: 2.0,
			delay: 10 //This is the delay between creeps of this type
		},
		strong: {
			speed: 0.06,
			health: 3.0,
			delay: 40 //This is the delay between creeps of this type
		},
		spam: {
			speed: 0.11,
			health: 0.3,
			delay: 7 //This is the delay between creeps of this type
		},
		slowspam: {
			speed: 0.06,
			health: 0.3,
			delay: 10 //This is the delay between creeps of this type
		},
		trojan: {
			speed: 0.04,
			health: 4.0,
			delay: 30, //This is the delay between creeps of this type
			count: 3
		},
		good: {
			speed: 0.06,
			health: 1.0,
			delay: 10 //This is the delay between creeps of this type
		},
		encrypted: {
			speed: 0.02,
			health: 1.0,
			delay: 30 //This is the delay between creeps of this type
		},
		overclocked: {
			speed: 0.038,
			health: 5.0,
			delay: 30 //This is the delay between creeps of this type
		}
	},

	/* tower data */
	towers: {
		normal: {
			range: 1.5,
			reload: 1.0 * updateSpeed, //GAME.updateHertz
			price: 0,
			upgrades: {
				costs:  [1, 2, 4],
				damage: 1,
				range:  0.5,
				reload: -6
			}
		},
		slow: {
			range: 2.0,
			reload: 2.5 * updateSpeed,
			price: 0,
			upgrades: {
				costs:  [1, 2, 4],
				damage: 1.3,
				range:  0.5,
				reload: -5
			}
		},
		rocket: {
			range: 2.0,
			reload: 3.0 * updateSpeed,
			price: 2,
			upgrades: {
				costs:  [1, 2, 4],
				damage: 1,
				range:  0.5,
				reload: -6
			}
		}
	},

	/* projectile data */
	projectiles: {
		collisionRadius: 0.05,
		normal: {
			speed: 0.5 * updateSpeed, //GAME.updateHertz,
			damage: 1.0
		},
		slow: {
			speed: 0.3 * updateSpeed,
			damage: 0.1,
			slowAmount: 0.75 // creeps will move at this percentage of their normal speed
		},
		rocket: {
			speed: 0.7 * updateSpeed,
			damage: 1,
			splashRange: 0.60 * cellSize
		}
	},
	
	currentWave : 0,
	
	resources: {
		mainResource : 0,
		usedResource : 0,
		advUsed : 0,
		cash : 0,
		usedCash : 0,
		space:{}
	}
};
