	GAME.firstLevel = 0;
	GAME.firstIntro="Welcome to CodeDefense.org \n\nIn this simulation, you will use JavaScript to create, modify, and control different defensive structures called \"Towers\" in order to stop computer viruses. If you don't know JavaScript, DON'T WORRY. This tutorial-series will teach you everything you need to know. \n\nPress \"OK\" to continue, and use the \"Mission\" and \"Help\" buttons in the top-left corner for assistance";
	GAME.returnIntro="Welcome back to CodeDefense.org \n\nPress \"OK\" to continue, and use the the \"Mission\" and \"Help\" buttons in the top-left corner for assistance\n\nYou are currently on training mission ";
	GAME.levels = {
		0: { //test Level
			levelName:"Debug",
			levelChar:[{start:"#", path:"$", layout:1}, {start:"&", path:"!", layout:1}, {start:"#", path:"default", layout:2}],
			layout:[" &   # \n" + //top
					" !   + \n" + //0
					" +++++T\n" + //1
					" $   !T\n" + //2
					"  $ ! T\n" + //3
					"   + T \n" + //4
					"  ! +  \n" + //5
					" !  T$ \n" + //6
					" !  T$ \n" + //7
					" !  T$ \n" + //8
					" %  %% \n",
					//Layout 2
					"     # \n" + //top
					"  %  + \n" + //0
					"  +  + \n" + //1
					"  +  + \n" + //2
					"  +  + \n" + //3
					"  +  + \n" + //4
					"  +  + \n" + //5
					"  +  + \n" + //6
					"  +  + \n" + //7
					"  ++++ \n" + //8
					"       \n"], //unseen row
			waves: {
				1: [{delay: 1, creep: SpamCreep, group: "spam", count: 1, path:0},
						{delay: 10, creep: Creep, group: "normal", count: 1, path:1},
						{delay: 1, creep: StrongCreep, group: "strong", count: 1, path:0},
						{delay: 1, creep: GoodCreep, group: "good", count: 1, path:2},
						{delay: 30, creep: TrojanCreep, group:"trojan", count: 1, path:1}],
				2: [{delay: 20, creep: Creep, group: "normal", count: 1, path:0},
					{delay: 0, creep: Creep, group: "normal", count: 1, path:1},
					{delay: 0, creep: Creep, group: "normal", count: 1, path:2}],
				3: [{delay: 1, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 4, creep: Creep, group: "normal", count: 3, path:0}]
			},
			resources: {
				cash: [100,200,300],
				lines: [100,200,300]
				
			},
			complete: true,
			hasMessage:[true, true, true],
			message: ["THIS IS THE TESTING LEVEL! EVERYTHING HERE IS JUST FOR TESTING. EVEN THIS WAVE 1", "Test WAVE 2", "Test WAVE 3"],
			hasExample:[true, true, true],
			example: ["creep.type == 'good Wave 1'", " test wave 2", " test wave 3"],
			hasExecutable:[true,false,false],
			executable:["", false, false]
		},
		1: { //Note: Level is reads clockwise around a point, starting at the bottom.
			//two passes are made first checking cardinal directions, then the diagonals.
			
			//Pathways can either have a 90 degree turn or 45.
			
			levelName:"Introduction",
			levelChar:[{start:"#", path:"default", layout:1}],
			// the levelChar array is used to determine what characters to look for in the array
			// the start char is the char that indicates where the pathway starts.
				//it is good form to have a path directly below the start 
			// a + indicates a default or universal path. These paths can be used regardless of the path Char
			// the path character has priority over the default path character
			// Layout specifies which layout to use. Layout index for creation is 1 based.
			layout:["#      \n" + //unseen Only contain beginning. Row removed after finding beginning
					"+      \n" + //0 
					"+      \n" + //1
					"+      \n" + //2
					"+ +    \n" + //3
					" + + + \n" + //4
					"    + +\n" + //5
					"      +\n" + //6
					"      +\n" + //7
					"      +\n" + //8
					"      @\n"], //unseen, contain beginning or end only
			// a @ is used to indicate the end of a path
			// a % means to reverse direction and go back to start
			waves: {
				//Notes: Delay must be greater than 0.
				//delay time is based on updateHertz.
				//delay of 20 is 1 second.
				//creep is creep function
				//group should match up with the type of creep
				//group also determines the delay between members of the group
				//count is the number of creeps in the group
				1: [{delay: 1, creep: Creep, group: "normal", count: 1, path:0}],
				2: [{delay: 4, creep: Creep, group: "normal", count: 3, path:0}],
				3: [{delay: 1, creep: Creep, group: "normal", count: 6, path:0}],
				4: [{delay: 1, creep: Creep, group: "normal", count: 12, path:0}]
			},
			resources: {
				//note: Cash and lines get a gain immediately
				//set them so that the starting value is less
				//than you want by the gain.
				//initial resources == lines + lineGain
				//initial cash == cash + cashGain
				cash: [1,1,1,1,-1],
				lines: [3,3,4,8,-1]
			},
			complete: false, //marks whether a level has been completed by a user or not
			hasMessage:[true, true, true, true],
			message:["For the first exercise, you will need to stop one <span class='badItem'>virus</span> from reaching the end of the pathway.<br><img src='./images/normalGIF.gif' alt='normalcreep'><br>The virus will travel along the yellow path to the bottom of the grid, where it will reach your system. You must stop it using a defensive structure known as a <span class = 'goodItem'>NormalTower</span>.<br><img src='./images/normaltowerGIF.gif' alt='normal'><br>To create a new <span class = 'goodItem'>NormalTower</span> on the grid, you must use the following coding formula in the terminal...<br><br><textarea readonly class='sideTextLine'>new NormalTower(x,y)</textarea><br><br>...where '<span class = 'otherItem'>x</span>' and '<span class = 'otherItem'>y</span>' are the horizontal and vertical coordinates for the tower on the grid. <span class = 'otherItem'>Towers must not be placed on the yellow path.</span>",
			
			"Congratulations! You defeated your first <span class='badItem'>virus</span>! Lets examine how the JavaScript code works.<br><br><textarea readonly class='sideTextLine'>new NormalTower(x,y)</textarea><br><br><span class = 'goodItem'>new</span>: This is called an '<span class = 'otherItem'>operator</span>'. It signals that it's time to create something. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new' target='_blank'>More info</a> <br><br><span class = 'goodItem'>NormalTower()</span>: This is called a '<span class = 'otherItem'>constructor</span>'. It defines the type of thing that will be created. <a href='https://developer.mozilla.org/en-US/docs/Glossary/Constructor' target='_blank'>More info</a><br><br><span class = 'goodItem'>(x,y)</span>: These numbers are called '<span class = 'otherItem'>arguments</span>'. They control where the new tower will be located.<br><br>Code in the terminal may contain multiple <span class = 'otherItem'>constructors</span> that place towers in multiple locations.",
			
			"Lets examine one of the resources needed to create towers: <span class = 'otherItem'>LINES</span><br><img src='./images/cashlines.jpg' alt='lines'><br>You can find this value above the grid. This is the maximum number of horizontal lines that you can use in the terminal for writing code.<br><br>Each new line is created by using the '<span class = 'otherItem'>Enter</span>' key on the keyboard.<br><br>At this point, the <span class = 'otherItem'>constructor</span> for each tower must be placed on an individual line. Later on, we will learn other techniques for creating additional towers.  <span class = 'otherItem'>If you use too many LINES, your code will not work properly.</span>",			
			
			"We are almost done with the first exercise! This is the final wave, and also the <span class='badItem'>most difficult</span>.<br><br>For review, more info about constructors can be found <a href='https://developer.mozilla.org/en-US/docs/Glossary/Constructor' target='_blank'>here,</a> and <a href='https://en.wikipedia.org/wiki/Constructor_%28object-oriented_programming%29' target='_blank'>here.</a>"], //This array is required. It tells the game whether there is a new message to display to the user or not
										//Note. The previous message will be erased from the box
			//message: ["", "", ""], //this array is only required if there is a message to be displayed. If there is the array must be filled.
									//empty places with no message can just be left as a simple "".
			hasExample:[true, true, true, true], //similar to the hasMessage this is required to tell whether there is example code for the user or not.
			example: ["The code in the terminal will create a <span class = 'goodItem'>NormalTower</span> at position (<span class = 'otherItem'>1,2</span>). You may reposition it on the grid.<br><br> Press <span class = 'otherItem'>Start Wave</span> to begin the exercise.",

			"The code in the terminal will create two <span class = 'goodItem'>NormalTowers</span>. You may reposition them on the grid.<br><br> Press <span class = 'otherItem'>Start Wave</span> to begin the exercise.",

			"This next wave will contain several <span class='badItem'>viruses</span>! You have enough <span class = 'otherItem'>LINES</span> to place up to 4 <span class = 'goodItem'>NormalTowers</span> to stop them.<br><br>Add your code, and press <span class = 'otherItem'>Start Wave</span> to begin the exercise.",
			
			"You have enough <span class = 'otherItem'>LINES</span> to place up to 8 separate <span class = 'goodItem'>NormalTowers</span>.<br><br>Add your code to the terminal, and press <span class = 'otherItem'>Start Wave</span> to begin<br><br>Press <span class = 'otherItem'>Next Level</span> when you are finished."],
			hasExecutable:[true,true,false, false],
			executable:["new NormalTower(1,2)", "new NormalTower(1,2)\nnew NormalTower(5,5)", false]
			//All the above arrays must be equal in length to the number or waves
		},
		

		2: {
			levelName:"Variables and the 'upgrade' Method",
			levelChar:[{start:"#", path:"default", layout:1}],
			layout:[" #     \n" + //top
					" +     \n" + //0
					" +++++ \n" + //1
					"      +\n" + //2
					" +++++ \n" + //3
					" +     \n" + //4
					" +     \n" + //5
					" +     \n" + //6
					" +     \n" + //7
					" +     \n" + //8
					" +     \n"+
					" @     \n"], //unseen row
			waves: {
				1: [{delay: 0, creep: Creep, group: "normal", count: 4, path:0}],
				2: [{delay: 0, creep: Creep, group: "normal", count: 6, path:0}],
				3: [{delay: 0, creep: Creep, group: "normal", count:4, path:0},
				{delay: 80, creep: Creep, group: "normal", count:6, path:0}],
				4: [{delay: 1, creep: Creep, group: "normal", count: 5, path:0},
					{delay: 4, creep: Creep, group: "normal", count: 5, path:0}],
				5: [{delay: 1, creep: Creep, group: "normal", count: 9, path:0},
					{delay: 4, creep: Creep, group: "normal", count: 9, path:0},]
			},
			resources: {
				cash: [1,1,2,3,4-1],
				lines: [2,4,5,7,10-1]
				
			},
			complete: false,
			hasMessage:[true, true, true, true, true],
			message: ["In order to improve a tower, it must be given a name. A tower's name is called a <span class = 'otherItem'>variable</span>, and it is assigned using the following code formula:<br><br><textarea readonly class='sideTextLine'>var T = new NormalTower(x,y)</textarea><br><br>Doing so is similar to putting a nametag on the tower that can be used to identify it later. In this case, the tower is named <span class = 'otherItem'>T</span>.<br><img src='./images/nametag.jpg' alt='nametag'><br>Towers can be named almost anything, with these restrictions:<br><br>1)<span class = 'otherItem'> Only use letters, numbers, and the underscore character ( _ ).</span><br><br>2) <span class = 'badItem'>Names must begin with a letter or underscore, NOT a number.<br><br><a href='https://msdn.microsoft.com/en-us/library/67defydd%28v=vs.94%29.aspx#Anchor_1' target='_blank'>More info</a></span>",
			
			"Lets examine the code we just used:<br><br><textarea readonly class='sideTextLine'>var T = new NormalTower(x,y)</textarea><br><br>This is almost identical to the code from last level, with some additions:<br><br><span class = 'goodItem'>var</span>: This is called an '<span class = 'otherItem'>declaration</span>'. It allows for a tower to be modified at a later time. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var' target='_blank'>More info</a><br><br><span class = 'goodItem'>T</span>: This is called the '<span class = 'otherItem'>variable name</span>'. It's used to identify the tower. The name <span class = 'otherItem'>T</span> is used for simplicity.<br><br><span class = 'goodItem'>=</span>: A single '<span class = 'otherItem'>equals</span>' symbol (also known as an '<span class = 'otherItem'>assignment operator</span>') assigns the variable name on the left side to the tower's constructor on the right side. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Assignment' target='_blank'>More info</a><br><br>The rest of the code is simply the constructor we learned in the last exercise. <a href='https://developer.mozilla.org/en-US/docs/Glossary/Constructor' target='_blank'>More info</a>",
			
			"When a new tower is created with a variable name... <br><br><textarea readonly class='sideTextLine'>var T = new NormalTower(x,y)</textarea><br><br>... its variable name can later be used to improve the tower. This is done by using the <span class = 'goodItem'>upgrade()</span> method, like so:<br><br><textarea readonly class='sideTextLine'>T.upgrade()</textarea><br><br>This line of code effectively tells the tower to upgrade itself...<br><img src='./images/caption.jpg' alt='caption'><br>Using the <span class = 'goodItem'>upgrade()</span> method requires some of the <span class = 'otherItem'>CASH</span> resource.",
			
			"Did you notice anything different between the two towers?<br><img src='./images/upgrade.jpg' alt='upgrade'><br>Upgrading a tower made it larger, and caused it to shoot faster. However, using the <span class = 'goodItem'>upgrade()</span> method requires some of your <span class = 'otherItem'>CASH</span> resource:<br><img src='./images/cash.jpg' alt='cash'><br>You can use the <span class = 'goodItem'>upgrade()</span> to improve a tower multiple times, but each use requires more <span class = 'otherItem'>CASH</span>.<br><br>If your code ever uses too much <span class = 'otherItem'>CASH</span> or <span class = 'otherItem'>LINES</span>, don't worry. Your code will still execute as much as it can until you run out of either:<br><img src='./images/zero.jpg' alt='zero'>",
			
			"Congratulations! You are almost finished with this level.<br><br>The last wave will be the most challenging. Don't forget to utilize your resources.<br><br>Please refer to these links for more info about the <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var' target='_blank'>var</a> and <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Assignment' target='_blank'>assignment</a> operators.",

			"wave 3 level 2"],
			hasExample:[true, true, true, true, true],
			example: ["The code in the terminal will create 2 named <span class = 'goodItem'>NormalTowers</span>. You may rename or reposition them.<br><br> Press <span class = 'otherItem'>Start Wave</span> to begin.",

			"You have enough of the <span class = 'otherItem'>LINES</span> resource to build 4 <span class = 'goodItem'>NormalTowers</span>. <br><br>Write your own code to add another <span class = 'goodItem'>NormalTower</span> to the grid, and press <span class = 'otherItem'>Start Wave</span> to begin the exercise.",
			
			"The code in the terminal will upgrade one of the <span class = 'goodItem'>NormalTowers</span>. You may modify it if you want.<br><br> Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"Press <span class = 'otherItem'>Start Wave</span> to begin.",

			"You have enough <span class = 'otherItem'>CASH</span> and <span class = 'otherItem'>LINES</span> to create and upgrade several <span class = 'goodItem'>NormalTowers</span>. Use them to stop this next wave of <span class = 'badItem'>viruses</span><br><br>Press <span class = 'otherItem'>Start Wave</span> to begin, and press <span class = 'otherItem'>Next Level</span> when you are finished.",
			
			],
			hasExecutable:[true,false,true,false,false],
			executable:["var Julia = new NormalTower(4,2)\nvar _002x = new NormalTower(5,2)",

			"var Julia = new NormalTower(4,2)\nvar _002x = new NormalTower(5,2)",

			"var Julia = new NormalTower(4,2)\nvar _002x = new NormalTower(5,2)\nJulia.upgrade()",
			
			]
		},
		3: {
			levelName:"Method Arguments",
			levelChar:[{start:"#", path:"default", layout:1}],
			layout:["#      \n" + //top
					"+  ++  \n" + //0
					"+ +  +\n" + //1
					"+ + +\n" + //2
					"+ + +\n" + //3
					"+ + +\n" + //4
					"+ + +\n" + //5
					"+ + +\n" + //6
					"+  + +\n" + //7
					" ++   +\n" + //8
					"      +\n" + //unseen row
					"      @\n"], //unseen row
			waves: {
				1: [{delay: 10, creep: OverclockedCreep, group: "overclocked", count: 1, path:0}],
				2: [{delay: 10, creep: OverclockedCreep, group: "overclocked", count: 2, path:0}],
				3: [{delay: 10, creep: OverclockedCreep, group: "overclocked", count: 3, path:0}],
				4: [{delay: 10, creep: OverclockedCreep, group: "overclocked", count: 4, path:0},
				{delay: 20, creep: Creep, group: "normal", count: 5, path:0},
				{delay: 100, creep: Creep, group: "normal", count: 5, path:0}]
			},
			resources: {
				cash: [1,2,3,4,-1],
				lines: [3,4,5,7,-1]
				
			},
			complete: false,
			hasMessage:[true, true, true,true],
			message: ["The <span class = 'goodItem'>upgrade()</span> method can be modified by giving it an <span class = 'otherItem'>argument</span> inside its parenthesis.<br><br><textarea readonly class='sideTextLine'>T.upgrade('range')</textarea><br><br>We can give the <span class = 'goodItem'>upgrade()</span> method the argument <span class = 'otherItem'>'range'</span>. This will allow the tower to strike at units up to 3 squares away! <span class = 'badItem'>The word 'range' must be contained within quotes. Otherwise, you will receive an error.</span><br><br><span class = 'otherItem'>If anything besides 'range' is used as an argument, the tower's reload speed will be upgraded by default.</span>", 
			
			"Did you notice anything unusual about that last <span class = 'badItem'>virus</span>?<br><img src='./images/overclocked.gif' alt='overclocked' height='140'><br>This is known as an <span class = 'badItem'>Overclocked Virus</span>. These viruses get faster every time they are hit. To compensate for this, we can use <span class = 'goodItem'>upgrade()</span> method to make each shot do more damage:<br><br><textarea readonly class='sideTextLine'>T.upgrade('damage')</textarea><br><br>Again, the word <span class = 'otherItem'>'damage'</span> must be in quotes when it is used as an argument for the <span class = 'goodItem'>upgrade()</span> method.<br><br><span class = 'badItem'>Every single hit makes an <span class = 'badItem'>Overclocked Virus</span> move faster. Use more damaging shots to take them down with fewer hits.</span>", 
			
			"It should also be noted that the <span class = 'goodItem'>upgrade()</span> method can be used twice per tower, costing more <span class = 'otherItem'>CASH</span> the second time it is used.<br><img src='./images/3levels.JPG' alt'3levels'><br><br>Regardless of the upgrade type, <span class = 'goodItem'>NormalTowers</span> have the following <span class = 'otherItem'>CASH</span> prices:<br><br>Construction: <span class = 'otherItem'>$0</span><br>First Upgrade: <span class = 'otherItem'>$1</span><br>Second Upgrade <span class = 'otherItem'>$2</span><br><br>You can combine different tower upgrades (<span class = 'otherItem'>'reload'</span>, <span class = 'otherItem'>'damage'</span>, or <span class = 'otherItem'>'range'</span>), or perform the same upgrade twice to further enhance towers.<br><br>Remember, if you misspell <span class = 'otherItem'>'damage'</span> or <span class = 'otherItem'>'range'</span>, or don't include any argument at all, the <span class = 'goodItem'>upgrade()</span> method will enhance a tower's <span class = 'otherItem'>'reload'</span> speed by default.",
			
			"We are almost done with this exercise. We will now try a mixture of different <span class = 'badItem'>virus</span> types.<br><br>It is recommended that more powerful towers be placed earlier in the path, to limit the speed of <span class = 'badItem'>Overclocked Viruses</span>."],
			hasExample:[true, true, true,true],
			example: ["The code in the terminal will create a <span class = 'goodItem'>NormalTower</span> and upgrade its attack <span class = 'otherItem'>range</span>. You may edit the code.<br><br> Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"The code in the terminal will create a <span class = 'goodItem'>NormalTower</span> and upgrade its attack <span class = 'otherItem'>damage</span>. You may edit the code.<br><br> Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"You have enough <span class = 'otherItem'>CASH</span> and <span class = 'otherItem'>LINES</span> to construct and upgrade multiple towers. Use them to withstand the next wave of <span class = 'badItem'>Overclocked Viruses</span>.","This last wave will contain a mixture of <span class = 'badItem'>normal</span> and <span class = 'badItem'>Overclocked Viruses</span>. Your <span class = 'otherItem'>CASH</span> resource has been increased so that you can construct and upgrade several <span class = 'goodItem'>NormalTowers</span>.<br><br>Press <span class = 'otherItem'>Next Level</span> when you are finished with this wave."],
			hasExecutable:[true,true,false],
			executable:["var Julia = new NormalTower(1,6)\nJulia.upgrade('range')", "var Julia = new NormalTower(1,6)\nJulia.upgrade('damage')", false]
		},
		4: {
			levelName:"Spam and the 'setAI' method",
			levelChar:[{start:"&", path:"!", layout:1}, {start:"#", path:"default", layout:2}],

			
			layout:["&      \n" + //top
					"!      \n" + //0
					" !     \n" + //1
					"  !    \n" + //2
					"   !   \n" + //3
					"    !  \n" + //4
					"     ! \n" + //5
					"    !  \n" + //6
					"   !   \n" + //7
					"  !    \n" + //8
					"  !    \n" + //9
					"  @    \n",
					//Layout 2
					"      #\n" + //top
					"      +\n" + //0
					"     + \n" + //1
					"    +  \n" + //2
					"   +   \n" + //3
					"  +    \n" + //4
					" +     \n" + //5
					"  +    \n" + //6
					"   +   \n" + //7
					"    +  \n" + //8
					"    +  \n" + //9
					"    @  \n"], //unseen row
			waves: {
				1: [{delay: 0, creep: SpamCreep, group: "spam", count: 10, path:0},{delay: 20, creep: SpamCreep, group: "spam", count: 10, path:1}],
				2: [{delay: 0, creep: SpamCreep, group: "spam", count: 35, path:0},
					{delay: 0, creep: Creep, group: "normal", count: 1, path:1},
					{delay: 20, creep: Creep, group: "normal", count: 1, path:1},
					{delay: 40, creep: Creep, group: "normal", count: 1, path:1},
					{delay: 60, creep: Creep, group: "normal", count: 1, path:1}],
				3: [{delay: 0, creep: SpamCreep, group: "spam", count: 30, path:0},
					{delay: 0, creep: SpamCreep, group: "spam", count: 30, path:1},
					{delay: 0, creep: Creep, group: "normal", count: 2, path:1},
					{delay: 20, creep: Creep, group: "normal", count: 2, path:1},
					{delay: 40, creep: Creep, group: "normal", count: 2, path:1},
					{delay: 10, creep: Creep, group: "normal", count: 2, path:0}],
				4: [{delay: 0, creep: SpamCreep, group: "spam", count: 20, path:0},
					{delay: 5, creep: SpamCreep, group: "spam", count: 20, path:1},
					{delay: 0, creep: Creep, group: "normal", count: 5, path:1},
					{delay: 5, creep: Creep, group: "normal", count: 5, path:0},
					{delay: 40, creep: OverclockedCreep, group: "overclocked", count: 1, path:0},
					{delay: 10, creep: OverclockedCreep, group: "overclocked", count: 1, path:1}]
			
			},
			resources: {
				cash: [2,2,3,4,-1],
				lines: [4,5,6,12,-1]
				
			},
			complete: false,
			hasMessage:[true, true, true,true],
			message: ["Lets try something different...<br><br>Not everything traveling through the grid is a hostile <span class = 'badItem'>virus</span>. Some grid traffic is due to neutral <span class = 'spamItem'>spam</span>:<br><img src='./images/spam.gif' alt='spam'><br><span class = 'spamItem'>Spam</span> is not harmful and can pass through to the end of the system without any negative effects. You can also destroy it with no negative consequences.<br><br><span class = 'goodItem'>How you deal with <span class = 'spamItem'>spam</span> is up to you.</span><br><br>The next wave is a demonstration of <span class = 'spamItem'>spam</span>.", 
			
			"As you can see, <span class = 'spamItem'>spam</span> is weak and fast moving. Normally, <span class = 'spamItem'>spam</span> is harmless.<br><br>However, sometimes a threat may include <span class = 'badItem'>viruses</span> as well as <span class = 'spamItem'>spam</span>. This is done so that towers will waste time targeting the <span class = 'spamItem'>spam</span> instead of the <span class = 'badItem'>viruses</span> (by default, towers attack the farthest target, regardless of type).<br><br>There is a solution for this: the tower's <span class = 'goodItem'>setAI()</span> method.<br><br><textarea readonly class='sideTextLine'>T.setAI()</textarea><br><br>When the <span class = 'goodItem'>setAI()</span> method is used, the tower's behavior will change: Instead of attacking the farthest target, the tower will now attack the strongest (most damage-resistant) target.<br><br><span class = 'spamItem'>Spam</span> are comparably weaker. <span class = 'badItem'>Viruses</span> will always be targeted first by towers using the <span class = 'goodItem'>setAI()</span> method.",
			
			"Unlike the <span class = 'goodItem'>upgrade()</span> method, the <span class = 'goodItem'>setAI()</span> method doesn't require any <span class = 'otherItem'>CASH</span> to use. You must still use the <span class = 'goodItem'>setAI()</span> method on its own <span class = 'otherItem'>LINE</span> though.<br><br>When towers are set to attack the strongest target, <span class = 'badItem'>viruses</span> will always be attacked over <span class = 'spamItem'>spam</span>. This next wave will contain a more challenging mix of different threats. You should place several towers and set their AI to attack the strongest target.<br><br>You will also be given enough <span class = 'otherItem'>CASH</span> to upgrade multiple towers.",
			
			"Congratulations, you are almost finished with this level!<br><br>This last wave will contain a tricky mixture of <span class = 'spamItem'>spam</span>, <span class = 'badItem'>Overclocked</span> and <span class = 'badItem'>normal viruses</span>.<br><br>You have been given more <span class = 'otherItem'>CASH</span> and <span class = 'otherItem'>LINES</span> to upgrade your towers.<br><br>Use all your resources wisely to proceed, and don't forget to use the <span class = 'goodItem'>setAI()</span> and <span class = 'goodItem'>upgrade()</span> method on some of your towers.<br><br>"],
			hasExample:[true, true, true,true],
			example: ["The next wave contains no actual <span class = 'badItem'>viruses</span>, just <span class = 'spamItem'>spam</span>. You may place some towers on the grid to target the spam if you like.<span class = 'goodItem'> You have been given some <span class = 'otherItem'>CASH</span> too, in case you want to try upgrading some towers.</span><br><br>Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"The code in the terminal will create a <span class = 'goodItem'>NormalTower</span> and set its AI to attack the strongest target. You may modify it if you like.<br><br>Press <span class = 'otherItem'>Start Wave</span> to begin.",

			"Write the code to place more towers.<br><br>Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"Press <span class = 'otherItem'>Start Wave</span> to begin, and press <span class = 'otherItem'>Next Level</span> when you are finished."],
			hasExecutable:[true,true,false],
			executable:["", "var Bob = new NormalTower(3,4)\nBob.upgrade()\nBob.setAI()", false]
		},
		
		5: {
			levelName:"Pulse Towers",
			levelChar:[{start:"&", path:"!", layout:1}, {start:"#", path:"default", layout:2}],
			layout:[" &     \n" + //top
					" !     \n" + //0
					" !     \n" + //1
					" !     \n" + //2
					" !!!!  \n" + //3
					"    !  \n" + //4
					" !!!!  \n" + //5
					" !     \n" + //6
					" !     \n" + //7
					" !     \n" + //8
					" !     \n" + //9
					" @     \n",
					//Layout 2
					"      #\n" + //top
					"   ++++\n" + //0
					"   +   \n" + //1
					"   ++++\n" + //2
					"      +\n" + //3
					"      +\n" + //4
					"      +\n" + //5
					"   ++++\n" + //6
					"   +   \n" + //7
					"   ++++\n" + //8
					"      +\n" + //9
					"      @\n"], //unseen row
			waves: {
				1: [{delay: 1, creep: SpamCreep, group: "spam", count: 20, path:0},
				{delay: 10, creep: SpamCreep, group: "spam", count: 20, path:1}],
				2: [{delay: 0, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 40, creep: Creep, group: "normal", count: 3, path:1},
					{delay: 40, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 40, creep: Creep, group: "normal", count: 3, path:1}],
				3: [{delay: 0, creep: Creep, group: "normal", count: 2, path:0},
					{delay: 5, creep: Creep, group: "normal", count: 2, path:0},
					{delay: 40, creep: Creep, group: "normal", count: 2, path:1},
					{delay: 5, creep: Creep, group: "normal", count: 2, path:1},
					{delay: 40, creep: Creep, group: "normal", count: 2, path:0},
					{delay: 5, creep: Creep, group: "normal", count: 2, path:0}],
				4: [{delay: 0, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 5, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 50, creep: Creep, group: "normal", count: 3, path:1},
					{delay: 5, creep: Creep, group: "normal", count: 3, path:1},
					{delay: 50, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 5, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 50, creep: Creep, group: "normal", count: 3, path:1},
					{delay: 5, creep: Creep, group: "normal", count: 3, path:1}]
			},
			resources: {
				cash: [2,4,5,6,-1],
				lines: [2,6,8,12,-1]
				
			},
			complete: false,
			hasMessage:[true, true, true,true],
			message: ["Let's examine another defense structure: <span class = 'goodItem'>PulseTowers</span><br><img src='./images/1pulse.jpg' alt='1 pulse'><br>The <span class = 'goodItem'>PulseTower</span> has a powerful projectile that damages targets near its primary point of impact.<br><img src='./images/pulseGIF.gif' alt='pulse projectile'><br><span class = 'goodItem'>PulseTowers</span> are created almost the same way as <span class = 'goodItem'>NormalTowers</span><br><br><textarea readonly class='sideTextLine'>P = new PulseTower(x,y)</textarea><br><br>Unlike <span class = 'goodItem'>NormalTowers</span>, creating a <span class = 'goodItem'>PulseTower</span> will cost $2 from your <span class = 'otherItem'>CASH</span> resource.",

			"<span class = 'goodItem'>PulseTowers</span> can be upgraded using the same method as <span class = 'goodItem'>NormalTowers</span>. When a <span class = 'goodItem'>PulseTower</span> is created with a variable name...<br><br><textarea readonly class='sideTextLine'>P = new PulseTower(x,y)</textarea><br><br>...it can be upgraded using the following code:<br><br><textarea readonly class='sideTextLine'>P.upgrade()</textarea><br><br><img src='./images/3pulse.jpg' alt='1 pulse'><br>Use a combination of <span class = 'goodItem'>PulseTowers</span> and <span class = 'goodItem'>NormalTowers</span> to stop the next wave of <span class = 'badItem'>viruses</span>.",

			"The <span class = 'goodItem'>upgrade()</span> method improves reload speed by default for all towers. Different <span class = 'otherItem'>arguments</span> can be put inside the parenthesis to improve other attributes:<br><br><textarea readonly class='sideTextLine'>P.upgrade('damage')</textarea><br><textarea readonly class='sideTextLine'>P.upgrade('range')</textarea><br><br>(Don't forget to put quotation marks around <span class = 'otherItem'>'range'</span> and <span class = 'otherItem'>'damage'</span> when they are used as <span class = 'otherItem'>arguments</span>).<br><br>Regardless of the upgrade type, <span class = 'goodItem'>PulseTowers</span> have the following <span class = 'otherItem'>CASH</span> prices:<br><br>Construction: <span class = 'otherItem'>$2</span><br>First Upgrade: <span class = 'otherItem'>$2</span><br>Second Upgrade <span class = 'otherItem'>$4</span><br>",
			
			"You are almost done with this lesson! Prepare to defend against 24 <span class = 'badItem'>viruses</span>!<br><br>Upgrade the <span class = 'otherItem'>'damage'</span> for your towers in order to take down <span class = 'badItem'>viruses</span> with fewer hits. Here are the <span class = 'otherItem'>CASH</span> prices for the different towers:<br><br><span class='goodItem'>NormalTowers</span> <br>Construction: <span class = 'otherItem'>$0</span><br>First Upgrade: <span class = 'otherItem'>$1</span><br>Second Upgrade <span class = 'otherItem'>$2</span><br><br><span class='goodItem'>PulseTowers</span> <br>Construction: <span class = 'otherItem'>$2</span><br>First Upgrade: <span class = 'otherItem'>$2</span><br>Second Upgrade <span class = 'otherItem'>$4</span>"],
			hasExample:[true, true, true,true],
			example: ["<span class = 'goodItem'>The next wave will contain only <span class = 'spamItem'>spam</span>; there is no immediate threat.</span><br><br>The code in the terminal creates a <span class = 'goodItem'>PulseTower</span>. You may reposition it.<br><br>Press <span class = 'otherItem'>Start Wave</span> to begin.",

			"For this next wave, you have only a few <span class = 'otherItem'>LINES</span> to use, but lots of <span class = 'otherItem'>CASH</span> to place and upgrade <span class = 'goodItem'>PulseTowers</span>.<br><br>Remember, creating <span class = 'goodItem'>NormalTowers</span> doesn't require any <span class = 'otherItem'>CASH</span>.<br><br>Press <span class = 'otherItem'>Start Wave</span> to begin.",

			"The next wave will contain a challenging mix of different threats. You have been given additional <span class = 'otherItem'>CASH</span> and <span class = 'otherItem'>LINES</span>.<br><br>Try using different upgrades.<br><br>Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"You have been given several additional <span class = 'otherItem'>LINES</span> to deal with this threat. Remember, <span class='goodItem'>NormalTowers</span> cost no <span class='otherItem'>CASH</span> to construct. If you have unused <span class='otherItem'>LINES</span>, you can always make another <span class='goodItem'>NormalTower</span>.<br><br>Add your code to the terminal and press <span class = 'otherItem'>Start Wave</span> to begin<br><br>Press <span class = 'otherItem'>Next Level</span> when you are done."],
			hasExecutable:[true,true,false],
			executable:["var p1 = new PulseTower(5,3)", "var p1 = new PulseTower(5,3)\np1.upgrade()", false]
		},
		6: {
			levelName:"Basic 'for' loops",
			levelChar:[{start:"#", path:"default", layout:1}],
			layout:["     # \n" + //top
					"++++++ \n" + //0
					"+      \n" + //1
					"++++++ \n" + //2
					"     + \n" + //3
					"++++++ \n" + //4
					"+      \n" + //5
					"++++++ \n" + //6
					"     + \n" + //7
					"++++++ \n" + //8
					"+      \n"+
					"@      \n"], //unseen row
			waves: {
				1: [{delay: 1, creep: SpamCreep, group: "spam", count: 16, path:0},
				{delay: 3, creep: SpamCreep, group: "spam", count: 16, path:0}],
				2: [{delay: 0, creep: Creep, group: "normal", count: 24, path:0}],
				3: [{delay: 1, creep: SpamCreep, group: "spam", count: 48, path:0},
					{delay: 4, creep: Creep, group: "normal", count: 32, path:0}],
				4: [{delay: 1, creep: SpamCreep, group: "spam", count: 50, path:0},
					{delay: 10, creep: TrojanCreep, group: "trojan", count: 9, path:0}]
			},
			resources: {
				cash: [1,2,3,5,-1],
				lines: [4,5,8,12,-1]
				
			},
			complete: false,
			hasMessage:[true, true, true, true],
			message: ["Now we will examine a different coding concept: <span class = 'goodItem'>for() loops</span>. When a <span class = 'goodItem'>for() loop</span> is used, the same code can be executed several times.<br><br>Here is the general code formula that <span class = 'goodItem'>for() loops</span> use:<br><br><textarea readonly class='tripleTextLine'>for (start ; stop ; repeat){\n\tcode\n}</textarea><br><br>The three statements inside the parenthesis <span class = 'otherItem'>()</span> control how many times the loop repeats. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for' target='_blank'>More info</a> <br><br>The <span class = 'otherItem'>start</span> statement is executed before the loop begins, the <span class = 'otherItem'>stop</span> statement controls when the loop finishes, and the <span class = 'otherItem'>repeat</span> statement is performed every repetition of the loop along with the <span class = 'goodItem'>code</span> inside the curly brackets <span class = 'goodItem'>{}</span>", 
			
			"Look at all those towers! As you can see, using a <span class = 'goodItem'>for() loop</span> allows you to create several <span class = 'goodItem'>NormalTowers</span> using only 3 <span class = 'otherItem'>LINES</span>. Here's how it works:<br><br><span class = 'goodItem'>for()</span>: This statement signals that it's time to start a loop, and the conditions for the loop will be inside the parenthesis <span class = 'otherItem'>()</span>. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for' target='_blank'>More info</a><br><br><span class = 'goodItem'>var i = 1</span>: This <span class = 'otherItem'>start</span> statement is executed before the loop begins. It sets a variable named <span class = 'otherItem'>i</span> equal to 1. <br><br><span class = 'goodItem'>i < 6</span>: This <span class = 'otherItem'>stop</span> statement is checked every time the loop repeats. When it stops being true (after <span class = 'otherItem'>i</span> is no longer less than 6) the loop will stop.<br><br><span class = 'goodItem'>i++</span>: This <span class = 'otherItem'>repeat</span> statement is executed after every time the loop repeats. The two '<span class = 'otherItem'>plus</span>' symbols (also known as an '<span class = 'otherItem'>increment operator</span>') cause <span class = 'otherItem'>i</span> to increase by one.  <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment_%28%29' target='_blank'>More info</a><br><br>The code within the curly brackets <span class = 'goodItem'>{}</span> will execute a number of times depending on these conditions. In this case, the code contains a <span class = 'goodItem'>NormalTower</span> constructor that uses <span class = 'otherItem'>i</span> as one of its arguments.", 
			
			
			"So far, we have only been using a <span class = 'otherItem'>constructor</span> inside the <span class = 'goodItem'>for() loop</span>. Additional code can be repeated by placing it on separate <span class = 'otherItem'>LINES</span> within the curly brackets <span class = 'goodItem'>{}</span><br><br>For example, the <span class = 'goodItem'>setAI()</span> method can be used inside the loop along with the <span class = 'otherItem'>constructor</span> to create a row of towers with improved targeting.",
			
			"You are almost done with this level!<br><br>This last wave will contain a new type of threat, the <span class = 'badItem'>Trojan Virus</span>:<br><img src='./images/trojan.gif' alt='trojan virus'><br>A <span class = 'badItem'>Trojan Virus</span> will fragment into several smaller <span class = 'badItem'>viruses</span> after it takes enough damage. <span class = 'otherItem'>Take them out fast or they may get past you.</span><br><br>The <span class = 'goodItem'>upgrade()</span> method can be used inside the <span class = 'goodItem'>for() loop</span> the same way that the <span class = 'goodItem'>setAI()</span> method is used. You have enough <span class = 'otherItem'>CASH</span> to improve several towers.<br><br><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for' target='_blank'>More info on for loops</a>"],
			hasExample:[true, true, true, true],
			example: ["<span class = 'goodItem'>The next wave will contain only <span class = 'spamItem'>spam</span>; there is no immediate threat.</span><br><br>An example <span class = 'goodItem'>for() loop</span> has been added to the terminal that will create a row of towers from (1,1) to (5,1). Please take a moment to examine the code, and press <span class = 'otherItem'>Start Wave</span>.", 
			
			"This next wave will contain a large number of <span class = 'badItem'>viruses</span>, and you will need many towers to stop them. <br><br>Press <span class = 'otherItem'>Start Wave</span> when you are ready.", 
			
			"A large wave of <span class = 'badItem'>viruses</span> and <span class = 'spamItem'>spam</span> is coming. You will need several towers with upgraded AI to survive.<br><br>The code in the terminal will create a row of <span class = 'goodItem'>NormalTowers</span> and apply the <span class = 'goodItem'>setAI()</span> method to them.. You may modify it if you like.<br><br>Press <span class = 'otherItem'>Start Wave</span> to continue.",
			
			"Modify the code inside the terminal so that the <span class = 'goodItem'>upgrade()</span> method is part of the code within the <span class = 'goodItem'>for() loop</span>. Different upgrade types may produce different results.<br><br>Press <span class = 'otherItem'>Start Wave</span> to continue, and press <span class = 'otherItem'>Next Level</span> when you are finished."],
			hasExecutable:[true,false,true],
			executable:["for (var i = 1 ; i < 6 ; i++){\n\tvar temp = new NormalTower(i,1)\n}", false, "for (var i = 1 ; i < 6 ; i++){\n\tvar temp = new NormalTower(i,1)\n\ttemp.setAI()\n}"]
		},
		7: {
			levelName:"Advanced 'for' loops",
			levelChar:[{start:"#", path:"default", layout:1}],
			layout:[" #     \n" + //top
					" +     \n" + //0
					"  +    \n" + //1
					"   +   \n" + //2
					"    +  \n" + //3
					"     + \n" + //4
					"    +  \n" + //5
					"   +   \n" + //6
					"  +    \n" + //7
					" +     \n" + //8
					" +     \n" + //unseen row
					" @     \n"], //unseen row
			waves: {
				1: [{delay: 10, creep: Creep, group: "normal", count: 12, path:0}],
				2: [{delay: 20, creep: OverclockedCreep, group: "overclocked", count: 18, path:0},{delay: 10, creep: OverclockedCreep, group: "overclocked", count: 20, path:0}],
				3: [{delay: 20, creep: TrojanCreep, group: "trojan", count: 10, path:0},
					{delay: 0, creep: SpamCreep, group: "spam", count: 20, path:0}],
				4: [{delay: 0, creep: TrojanCreep, group: "trojan", count: 10, path:0},
					{delay: 10, creep: SpamCreep, group: "spam", count: 20, path:0},
					{delay: 80, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 5, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 80, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 5, creep: Creep, group: "normal", count: 3, path:0}]
			},
			resources: {
				cash: [1,2,4,6,-1],
				lines: [4,5,8,12,-1]
				
			},
			complete: false,
			hasMessage:[true, true, true,true],
			message: ["The code inside a <span class = 'goodItem'>for() loop</span> can be written to perform more advanced functions. <span class = 'otherItem'>Constructors</span> inside the loop can use the <span class = 'otherItem'>i</span> variable as part of both <span class = 'otherItem'>arguments</span>.<br><br><textarea readonly class='sideTextLine'>var T = new NormalTower(i,i)</textarea><br><br>When <span class = 'otherItem'>i</span> is used as part of both <span class = 'otherItem'>arguments</span>, a diagonal row of towers will be created. This is because the value for <span class = 'otherItem'>i</span> changes every time the <span class = 'goodItem'>for() loop</span> repeats. The tower's horizontal and vertical position will both be shifted, creating a diagonal row of towers. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for' target='_blank'>More info</a>", 
			
			"You can also place multiple rows of towers using a single <span class = 'goodItem'>for() loop</span>.<br><br>To to this, simply place a second <span class = 'otherItem'>constructor</span> inside the <span class = 'goodItem'>for() loop</span>, and add <span class = 'otherItem'>i</span> to an offset value. This simple addition can be done right where the <span class = 'otherItem'>arguments</span> are entered into the <span class = 'otherItem'>constructor</span> and the new tower will be placed at the calculated position.<br><br>It's easiest to do this when you can create two parallel rows of towers. It is also possible to use this trick with both flat and diagonal rows of towers", 
			
			"Finally, you can change the direction of a row of towers is placed in by making <span class = 'otherItem'>i</span> negative in the <span class = 'otherItem'>constructor</span>.<br><br>The easiest way to do this is to subtract <span class = 'otherItem'>i</span> from another set value within the <span class = 'otherItem'>constructor's arguments</span>. As the <span class = 'goodItem'>for() loop</span> repeats, the value for <span class = 'otherItem'>i</span> will increase for every repetition of the loop.",
			
			"Whenever you have 3 extra lines of code, you can always create another row of <span class = 'goodItem'>NormalTowers</span>.<br><br>Remember that <span class = 'goodItem'>NormalTowers</span> don't cost any <span class = 'otherItem'>CASH</span>.<br><br>This next wave will contain many enemies. Be sure to use all your <span class = 'otherItem'>LINES</span> and <span class = 'otherItem'>CASH</span> to neutralize them."],
			hasExample:[true, true, true,true],
			example: ["<span class = 'goodItem'>The next wave will contain only <span class = 'spamItem'>spam</span>; there is no immediate threat.</span><br><br>The code in the terminal will create a row of <span class = 'goodItem'>NormalTowers</span>, that spans from (0,0) to (5,5).<br><br>You may modify the code. Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"A large wave of <span class = 'badItem'>Overclocked Viruses</span> is coming next!<br><br>The code in the terminal will create a row of <span class = 'goodItem'>NormalTowers</span> spanning from (0,0) to (5,5), and another row from (2,0) to (5,7).<br><br>You may modify the code in the Terminal. Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"You have been awarded some <span class = 'otherItem'>CASH</span> to use the <span class = 'goodItem'>upgrade()</span> method, or to create some <span class = 'goodItem'>PulseTowers</span>.<br><br>A large wave of <span class = 'badItem'>Trojan Viruses</span> and <span class = 'spamItem'>spam</span> is coming next!<br><br>The code in the terminal will create a row of <span class = 'goodItem'>NormalTowers</span> spanning from (0,0) to (5,5), and another row from (2,8) to (6,4).<br><br>You may modify the code in the Terminal. Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"You have been given several extra <span class = 'otherItem'>LINES</span> and some <span class = 'otherItem'>CASH</span> to create some towers. Press <span class = 'otherItem'>Start Wave</span> when you are ready to begin, and press <span class = 'otherItem'>Next Level</span> when you are finished."],
			hasExecutable:[true,true,true,false,false],
			executable:["for (var i = 0 ; i < 5 ; i++){\n\tvar temp = new NormalTower(i,i)\n}", 
			
			"for (var i = 0 ; i < 5 ; i++){\n\tvar temp = new NormalTower(i,i)\n\tvar temp2 = new NormalTower(i+2, i)\n}", 
			
			"for (var i = 0 ; i < 5 ; i++){\n\tvar temp = new NormalTower(i,i)\n\tvar temp2 = new NormalTower(i+2,8-i)\n}"]
		},
		8: {
			levelName:"Slow Towers and Encrypted Viruses",
			levelChar:[{start:"#", path:"default", layout:1}],
			layout:["   #   \n" + //top
					"   + ++\n" + //0
					"  + + +\n" + //1
					" + + + \n" + //2
					"+ + +  \n" + //3
					"++  +  \n" + //4
					"+ +  + \n" + //5
					" + +  +\n" + //6
					"+   + +\n" + //7
					" ++  ++\n" + //8
					"   +   \n" + //unseen row
					"    @  \n"], //unseen row
			waves: {
				1: [{delay: 0, creep: SpamCreep, group: "spam", count: 10, path:0},{delay: 3, creep: SpamCreep, group: "spam", count: 10, path:0}],
				2: [{delay: 0, creep: SpamCreep, group: "spam", count: 50, path:0},{delay: 3, creep: SpamCreep, group: "spam", count: 50, path:0},
				{delay: 20, creep: OverclockedCreep, group: "overclocked", count: 8, path:0},{delay: 10, creep: OverclockedCreep, group: "overclocked", count: 8, path:0}],
				3: [{delay: 0, creep: SpamCreep, group: "spam", count: 50, path:0},{delay: 3, creep: SpamCreep, group: "spam", count: 50, path:0},
				{delay: 20, creep: TrojanCreep, group: "trojan", count: 5, path:0},{delay: 10, creep: Creep, group: "normal", count: 30, path:0}],
				4: [{delay: 0, creep: SpamCreep, group: "spam", count: 70, path:0},{delay: 20, creep: OverclockedCreep, group: "overclocked", count: 10, path:0},
				{delay: 20, creep: TrojanCreep, group: "trojan", count: 10, path:0},{delay: 10, creep: Creep, group: "normal", count: 30, path:0},
				{delay: 200, creep: OverclockedCreep, group: "overclocked", count: 10, path:0}]
			},
			resources: {
				cash: [1,2,4,8,-1],
				lines: [6,10,12,16,-1]
				
			},
			complete: false,
			hasMessage:[true, true, true, true],
			message: ["There is one final type of tower used to stop threats: The <span class = 'goodItem'>SlowTower</span>.<br><img src='./images/slowtowerGIF.gif' alt='slowtower'><br><span class = 'goodItem'>SlowTowers</span> do very little damage, but they reduce the movement speed of any targets they attack. This reduction in speed is <span class = 'badItem'>permanent</span>, and multiple attacks on the same target have a <span class = 'badItem'>cumulative effect</span>. Here is what the  <span class = 'otherItem'>constructor</span> looks like:<br><br><textarea readonly class='sideTextLine'>var S = new SlowTower(x,y)</textarea><br><br>Like <span class = 'goodItem'>NormalTowers</span>, <span class = 'goodItem'>SlowTowers</span> don't require any <span class = 'otherItem'>CASH</span> to construct.", 
			
			"Targets that <span class = 'goodItem'>SlowTowers</span> attack are permanently slowed down; this effect stacks after multiple attacks.<br><br><span class = 'goodItem'>SlowTowers</span> can use the <span class = 'goodItem'>setAI()</span> methods the same as other towers.<br><br><textarea readonly class='sideTextLine'>S.setAI()</textarea><br><br>To review, towers attack the farthest available target by default.<br><br>Using the <span class = 'goodItem'>setAI()</span> method on a tower will modify a its behavior so that it will instead attack the strongest available target. This ensures that more dangerous <span class = 'badItem'>viruses</span> are always targeted before <span class = 'spamItem'>spam</span>.", 
			
			"Finally, <span class = 'goodItem'>SlowTowers</span> can use the <span class = 'goodItem'>upgrade()</span> method .<br><br><textarea readonly class='sideTextLine'>S.upgrade()</textarea><br><br>The <span class = 'goodItem'>upgrade()</span> method improves <span class = 'otherItem'>'reload'</span> speed by default. The arguments <span class = 'otherItem'>'damage'</span> and <span class = 'otherItem'>'range'</span> can be used with the <span class = 'goodItem'>upgrade()</span> method to improve those attributes instead.<br><img src='./images/3slow.jpg' alt='3slow'><br>Regardless of the upgrade type, <span class = 'goodItem'>SlowTowers</span> have the following <span class = 'otherItem'>CASH</span> prices:<br><br>Construction: <span class = 'otherItem'>$0</span><br>First Upgrade: <span class = 'otherItem'>$2</span><br>Second Upgrade <span class = 'otherItem'>$4</span>",
			
			"Here is a review of <span class = 'otherItem'>CASH</span> prices:<br><br><span class = 'goodItem'>SlowTowers</span> cost:<br><br>Construction: <span class = 'otherItem'>$0</span><br>First Upgrade: <span class = 'otherItem'>$2</span><br>Second Upgrade <span class = 'otherItem'>$4</span><br><br><span class = 'goodItem'>NormalTowers</span> cost:<br><br>Construction: <span class = 'otherItem'>$0</span><br>First Upgrade: <span class = 'otherItem'>$1</span><br>Second Upgrade <span class = 'otherItem'>$2</span><br><br><span class = 'goodItem'>PulseTowers</span> cost:<br><br>Construction: <span class = 'otherItem'>$2</span><br>First Upgrade: <span class = 'otherItem'>$2</span><br>Second Upgrade <span class = 'otherItem'>$4</span>"],
			hasExample:[true, true, true, true],
			example: ["<span class = 'goodItem'>The next wave will contain only <span class = 'spamItem'>spam</span>; there is no immediate threat.</span><br><br>The code in the terminal will create a row of <span class = 'goodItem'>SlowTowers</span>, that spans from (0,6) to (5,1), and a <span class = 'goodItem'>NormalTower</span> at (5,7).<br><br>You may modify the code. Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"A large wave of <span class = 'badItem'>Overclocked Viruses</span> and <span class = 'spamItem'>spam</span> is coming next! Additional <span class = 'otherItem'>LINES</span> have been allocated to create and improve towers.<br><br>Remember that <span class = 'goodItem'>NormalTowers</span> do more damage than <span class = 'goodItem'>SlowTowers</span>.<br><br><span class = 'goodItem'>Add your code to the terminal</span>, and press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"Additional <span class = 'otherItem'>LINES</span> and <span class = 'otherItem'>CASH</span> have been allocated to create and improve towers. <span class = 'goodItem'>Use a mix of different towers for the best defense!<br><br>Add your code to the terminal</span>, and press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"<span class = 'goodItem'>Use a mixture of different tower types for the best defense.<br><br></span>Press <span class = 'otherItem'>Start Wave</span> when you are ready to begin, and press <span class = 'otherItem'>Next Level</span> when you are finished."],
			hasExecutable:[true,false,false],
			executable:["for (var i = 0 ; i < 6 ; i++){\n\tvar temp = new SlowTower(i,6-i)\n}\nvar temp2 = new NormalTower(5,7)", 
			
			false, false]
		},
		9: {
			levelName:"review",
			levelChar:[{start:"#", path:"default", layout:1}],
			layout:[" #     \n" + //unseen Only contain beginning. Row removed after finding beginning
					" +     \n" + //0 
					"  +    \n" + //1 
					"   +   \n" + //2
					"    +  \n" + //3
					"++   + \n" + //4
					"+ +   +\n" + //5
					"+  +  +\n" + //6
					"+   + +\n" + //7
					"+    ++\n" + //8
					"+      \n" +
					"@      \n"], //unseen row
			waves: {
				1: [{delay: 1, creep: SpamCreep, group: "spam", count: 10, path:0},
				{delay: 2, creep: SpamCreep, group: "spam", count: 20, path:0},
				{delay: 2, creep: SpamCreep, group: "spam", count: 20, path:0}],
				
				2: [{delay: 1, creep: SpamCreep, group: "spam", count: 36, path:0},
				{delay: 10, creep: Creep, group: "normal", count: 24, path:0}],
					
				3: [{delay: 1, creep: SpamCreep, group: "spam", count: 36, path:0},
				{delay: 0, creep: OverclockedCreep, group: "overclocked", count: 8, path:0},
				{delay: 15, creep: OverclockedCreep, group: "overclocked", count: 8, path:0}],
					
				4:[{delay: 0, creep: SpamCreep, group: "spam", count: 20, path:0},
				{delay: 2, creep: SpamCreep, group: "spam", count: 70, path:0},
				{delay: 20, creep: TrojanCreep, group: "trojan", count: 6, path:0},
				{delay: 10, creep: Creep, group: "normal", count: 30, path:0}],

				5:[{delay: 1, creep: SpamCreep, group: "spam", count: 96, path:0}, 
				{delay: 2, creep: SpamCreep, group: "spam", count: 96, path:0}, 
				{delay: 10, creep: Creep, group: "normal", count: 64, path:0},
				{delay: 20, creep: OverclockedCreep, group: "overclocked", count: 24, path:0},
				{delay: 10, creep: OverclockedCreep, group: "overclocked", count: 24, path:0}]
			},
			resources: {
				cash: [0,0,6,10,12,-1],
				lines: [11,12,13,14,15,-1]
				
			},
			complete: true,
			hasMessage:[true, true, true, true, true],
			message: ["As you may have noticed, it is necessary to often re-use the same code. For example, you may use multiple <span class = 'goodItem'>for() loops</span> to create several similar rows of towers.<br><br>Code that is used repeatedly can be simplified by placing it inside a <span class = 'otherItem'>function</span>. A <span class = 'otherItem'>function</span> is like a recipe for code. When a recipe is created, it can be used any number of times for the same results.<br><img src='./images/recipe.png' height='100' alt='recipe'><br>When a <span class = 'otherItem'>function</span> is created, the code it contains will be run every time the function is used. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions' target='_blank'>More info</a>", 
			
			"Lets examine the code we just used:<br><br><textarea readonly class='tripleTextLine'>function F(a){\n    new NormalTower(a,a)\n}</textarea><br><br><span class = 'goodItem'>function</span>: This is known as a '<span class = 'otherItem'>declaration</span>'. It signals that a function will be defined. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions' target='_blank'>More info</a><br><br><span class = 'goodItem'>F</span>: This establishes the name for the function (<span class = 'otherItem'>F</span> in the example). Function names must use the same rules as variable names. <a href='https://msdn.microsoft.com/en-us/library/67defydd%28v=vs.94%29.aspx#Anchor_1' target='_blank'>More info</a><br><br><span class = 'goodItem'>(a)</span>: This establishes how many <span class = 'otherItem'>arguments</span> the function can accept within its parenthesis (one argument named <span class = 'otherItem'>a</span> in the example).<br><br>The code within the curly brackets <span class = 'goodItem'>{}</span> is run each time the function is called. <span class = 'otherItem'>Functions</span> can be several lines long and perform many tasks.", 
			
			"<span class = 'otherItem'>Functions</span> can use multiple <span class = 'otherItem'>arguments</span> to perform more advanced tasks. Observe the code below:<br><br><textarea readonly class='tripleTextLine'>function F(a,b){\n    new NormalTower(a,b)\n}</textarea><br><br>In this case, <span class = 'goodItem'>F(a,b)</span> is defined so that it can accept two <span class = 'otherItem'>arguments</span>, <span class = 'goodItem'>a</span> and <span class = 'goodItem'>b</span>. <br><br><span class = 'otherItem'>Functions</span> can be defined to accept any number of <span class = 'otherItem'>arguments</span>.",
			
			"Almost any code can be used inside a <span class = 'otherItem'>function</span>. A <span class = 'goodItem'>for() loop</span> can be included in a <span class = 'otherItem'>function</span> to repeat certain instructions.<br><br>A <span class = 'goodItem'>for() loop</span> inside a <span class = 'otherItem'>function</span> can use one of the <span class = 'otherItem'>arguments</span> to control how many times it repeats.",
			
			"There are many more ways to use <span class = 'otherItem'>functions</span>. In the coming lessons, we will discuss how to use <span class = 'otherItem'>functions</span> to make custom AI for towers using the <span class = 'goodItem'>setAI()</span>  method.<br><br><span class = 'otherItem'>This is the final wave of the level, and the most challenging by far!</span>"],
			hasExample:[true, true, true,true,true],
			example: ["<span class = 'goodItem'>The next wave will contain only <span class = 'spamItem'>spam</span>; there is no immediate threat.</span><br><br>The code in the terminal defines a <span class = 'otherItem'>function</span> named <span class = 'goodItem'>F(a)</span> and then calls it four times. Each time it is called, a different <span class = 'otherItem'>argument</span> is used. <br><br>Take a moment to examine the code. Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"The code in the terminal defines a function named <span class = 'goodItem'>F(a)</span> that creates a <span class = 'goodItem'>NormalTower</span> and then applies the <span class = 'goodItem'>setAI()</span> method to it.<br><br>You will need to use <span class = 'goodItem'>F(a)</span> in the terminal. Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"The code in the terminal defines a function named <span class = 'goodItem'>F(a,b)</span> that creates a <span class = 'goodItem'>NormalTower</span>. It then applies the <span class = 'goodItem'>setAI()</span> and <span class = 'goodItem'>upgrade()</span> methods to it.<br><br><span class = 'goodItem'>F(a,b)</span> is called only once with the <span class = 'otherItem'>arguments</span> (5,7). You will need to call <span class = 'goodItem'>F(a,b)</span> several additional times with different <span class = 'otherItem'>arguments</span> to survive.<br><br> Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"The code in the terminal defines a <span class = 'otherItem'>function</span>  named <span class = 'goodItem'>F(a,b,c)</span> that creates a row of <span class = 'goodItem'>NormalTowers</span> and applies the <span class = 'goodItem'>setAI()</span> and <span class = 'goodItem'>upgrade()</span> methods to them.<br><br>Within <span class = 'goodItem'>F(a,b,c)</span>, <span class = 'otherItem'>a</span> and <span class = 'otherItem'>b</span> reference a position on the grid; <span class = 'otherItem'>c</span> determines how many towers the row will contain. Towers are placed going down diagonally to the left starting at position (<span class = 'otherItem'>a</span>,<span class = 'otherItem'>b</span>).<br><br><span class = 'goodItem'>F(a,b,c)</span> is called once to make a row of 6 towers starting at 0,1. You will need to call <span class = 'goodItem'>F(a,b,c)</span> at least one more time to continue.<br><br> Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"Additional <span class = 'otherItem'>CASH</span> and <span class = 'otherItem'>LINES</span> have been awarded for the final wave. It is now possible to call <span class = 'goodItem'>F(a,b,c)</span> multiple times. Alternately, <span class = 'goodItem'>F(a,b,c)</span> can be modified so that it performs different upgrades.<br><br>Or create some <span class = 'goodItem'>PulseTowers</span>. The choice is yours.<br><br></span>Press <span class = 'otherItem'>Start Wave</span> when you are ready to begin, and press <span class = 'otherItem'>Next Level</span> when you are finished."],
			hasExecutable:[true,true,true,true],
			executable:["function F(a){\n\tvar temp = new NormalTower(a,a)\n\ttemp.setAI()\n}\nF(5)\nF(4)\nF(3)\nF(2)", 
			
			"function F(a){\n\tvar temp = new NormalTower(a,a)\n\ttemp.setAI()\n}\nF(5)\nF(4)\nF(3)\nF(2)",

			"function F(a,b){\n\tvar temp = new NormalTower(a,b)\n\ttemp.setAI()\n\ttemp.upgrade('damage')\n}\nF(5,7)\nF(5,6)",
			
			"function F(a,b,c){\n\tfor(var i=0;i<c;i++){\n\t\tvar temp = new NormalTower(a+i,b+i)\n\t\ttemp.setAI()\n\t\ttemp.upgrade('range')\n\t}\n}\nF(0,1,6)"]
		},
		10: {
			levelName:"Simple custom AI",
			levelChar:[{start:"#", path:"default", layout:1}],
			layout:["#      \n" + //unseen Only contain beginning. Row removed after finding beginning
					"+      \n" + //0 
					"+      \n" + //1
					"+      \n" + //2
					"+      \n" + //3
					"+      \n" + //4
					"+      \n" + //5
					"++     \n" + //6
					"  ++++ \n" + //7
					"     + \n" + //8
					"     + \n" +
					"     @ \n"], //unseen row
			waves: {
				1: [{delay: 1, creep: GoodCreep, group: "good", count: 3, path:0}],
				2: [{delay: 20, creep: OverclockedCreep, group: "overclocked", count: 1, path:0}],
				3: [{delay: 10, creep: Creep, group: "normal", count: 6, path:0}],
				4:[{delay: 1, creep: GoodCreep, group: "good", count: 1, path:0},
					{delay: 10, creep: Creep, group: "normal", count: 4, path:0}],
				5:[{delay: 0, creep: GoodCreep, group: "good", count: 2, path:0},
					{delay: 15, creep: Creep, group: "normal", count: 3, path:0}]
			},
			resources: {
				cash: [0,2,4,6,8,-1],
				lines: [10,11,12,13,14,-1]
			},
			complete: false,
			hasMessage:[true, true, true, true, true],
			message: ["Not every target on the grid can be freely attacked. Some targets are <span class = 'dodgerItem'>Protected Packets</span>.<br><img src='./images/5packet.gif' alt='packets'><br><span class = 'dodgerItem'>Packets</span> are good data files that are authorized to travel through the grid. <span class = 'badItem'><span class = 'dodgerItem'>Packets</span> MUST make it to the end intact. If any are destroyed, you will fail the mission.</span><br><br>A tower's attacks can be disabled by using a custom <span class = 'otherItem'>function</span> as the <span class = 'otherItem'>argument</span> for the <span class = 'goodItem'>setAI()</span> method.<br><br><textarea readonly class='sideTextLine'>function doNothing(target){}</textarea><br><br>Since there is no code within the curly brackets <span class = 'goodItem'>{}</span>, the function does nothing. It can be passed into a tower's <span class = 'goodItem'>setAI()</span> as an <span class = 'otherItem'>argument</span>.<br><br><textarea readonly class='sideTextLine'>T.setAI(doNothing)</textarea>", 
			
			"So far, we have only defined <span class = 'otherItem'>functions</span> that create things on the grid. <span class = 'otherItem'>Functions</span> can also be used to detect things that already exist. This is done using the <span class = 'goodItem'>return</span> statement at the end of a <span class = 'otherItem'>function</span>. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return' target='_blank'>More info</a><br><br><textarea readonly class='tripleTextLine'>function returnTarget(target){\n\treturn target\n}</textarea><br><br>Functions passed to the <span class = 'goodItem'>setAI()</span> method must have a <span class = 'goodItem'>return</span> of some sort, or the tower will not attack.<br><br>When there is only one target on the grid, we can simply use a <span class = 'otherItem'>function</span> that includes a <span class = 'goodItem'>return</span> statement for whatever argument was passed to it.", 
			
			"When multiple targets are in range, towers automatically count them based on when they appear. Counting starts at the number <span class = 'otherItem'>0</span>. The first target will always be numbered <span class = 'otherItem'>0</span>, followed by <span class = 'otherItem'>1</span>, then <span class = 'otherItem'>2</span>, etc... <br><img src='./images/enumerated_virus.gif' height='55' alt='enum_virus'><br>When targets are destroyed, they are re-counted again from first-to-last.<br><img src='./images/rem_virus.gif' height='45' alt='enum_virus'><br>Thus, the target numbered as <span class = 'otherItem'>0</span> will always be the first target available.<br><br>To reference a specific target, use square brackets <span class = 'goodItem'>[ ]</span> after the word <span class = 'otherItem'>targets</span> with the target number inside the brackets. The first target would be referenced as <span class = 'otherItem'>target[0]</span>. This is called an <span class = 'otherItem'>array</span>, or a group of items. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array' target='_blank'>More info</a>",
			
			"It's possible to use the <span class = 'goodItem'>return</span> statement to reference targets besides the first one. If we return <span class = 'otherItem'>target[1]</span> instead of <span class = 'otherItem'>target[0]</span>, the first target will be ignored.<br><img src='./images/3_pak.gif' alt='single'><br>When targets are destroyed, they are re-counted again from first-to-last. Returning <span class = 'otherItem'>target[1]</span> will cause the tower to attack the second available target and ignore the previous targets.",
			
			"Returning any target greater than <span class = 'otherItem'>target[0]</span> will cause all previous targets to be ignored.<br><img src='./images/4_pak.gif' alt='single'><br>When targets are destroyed, they are re-counted again from first-to-last. <br><br>This technique can be used to skip multiple targets at the front of the line, so long as the correct initial target is returned by the AI function."],
			hasExample:[true, true, true, true, true],
			example: ["<span class = 'goodItem'>The next wave will contain only <span class = 'dodgerItem'>packets</span>; don't destroy any.</span><br><br>The code in the terminal will create a row of <span class = 'goodItem'>NormalTowers</span> without any AI. You may modify the code.<br><br>Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"The code in the terminal will set the towers' AI to a custom routine that attacks <span class = 'otherItem'>a single target</span>. <br><br>You may modify the code. Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"The code in the terminal will set the towers' AI to a custom routine that attacks <span class = 'otherItem'>the first target</span>. <br><br>You may modify the code. Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"The next wave will contain a <span class = 'dodgerItem'>packet</span> followed by several <span class = 'badItem'>viruses</span>. Protect the <span class = 'dodgerItem'>packet</span> and destroy the <span class = 'badItem'>viruses</span>.<br><br>The code in the terminal will set the towers' AI to a custom routine that attacks <span class = 'otherItem'>the second target</span>. <br><br>You may modify the code. Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"The next wave will contain two <span class = 'dodgerItem'>packets</span> followed by several <span class = 'badItem'>viruses</span>. Protect the <span class = 'dodgerItem'>packets</span> and destroy the <span class = 'badItem'>viruses</span>.<br><br><span class = 'badItem'>You must modify the code</span> to protect the two <span class = 'dodgerItem'>packets</span> at the front. See the animation at the top for a hint.<br><br>Press <span class = 'otherItem'>Start Wave</span> to begin, and press <span class = 'otherItem'>Next Level</span> when you are finished."],
			hasExecutable:[true,true,true, true],
			executable:["function customAI(target){}\nfor(var i = 0; i < 5; i++){\n\tvar temp = new NormalTower(1,i)\n\ttemp.setAI(customAI)\n}", 
			
			"function customAI(target){\n\treturn target\n}\nfor(var i = 0; i < 5; i++){\n\tvar temp = new NormalTower(1,i)\n\ttemp.setAI(customAI)\n}",

			"function customAI(target){\n\treturn target[0]\n}\nfor(var i = 0; i < 5; i++){\n\tvar temp = new NormalTower(1,i)\n\ttemp.setAI(customAI)\n}",
			
			"function customAI(target){\n\treturn target[1]\n}\nfor(var i = 0; i < 5; i++){\n\tvar temp = new NormalTower(1,i)\n\ttemp.setAI(customAI)\n}",
			
			]
		},
		11: {
			levelName:"Advanced custom AI",
			levelChar:[{start:"&", path:"!", layout:1}, {start:"#", path:"default", layout:2}, {start:"~", path:"`", layout:3}],
			layout:["     & \n" + //top
					"     ! \n" + //0
					"  !!!  \n" + //1
					" !     \n" + //2
					"  !!!  \n" + //3
					"     ! \n" + //4
					"  !!!  \n" + //5
					" !     \n" + //6
					"  !!!  \n" + //7
					"     ! \n" + //8
					"     ! \n" + //9
					"     @ \n",
					//Layout 2
					"   #   \n" + //top
					"   +   \n" + //0
					"   +   \n" + //1
					"   +   \n" + //2
					"   +   \n" + //3
					"   +   \n" + //4
					"   +   \n" + //5
					"   +   \n" + //6
					"   +   \n" + //7
					"   +   \n" + //8
					"   +   \n" +
					"   @   \n",
					
					" ~     \n" + //top
					" `     \n" + //0
					"  ```  \n" + //1
					"     ` \n" + //2
					"  ```  \n" + //3
					" `     \n" + //4
					"  ```  \n" + //5
					"     ` \n" + //6
					"  ```  \n" + //7
					" `     \n" + //8
					" `     \n" +
					" @     \n"], //unseen row
			waves: {
				1: [{delay: 0, creep: SlowSpamCreep, group: "spam", count: 14, path:1},
				{delay: 140, creep: GoodCreep, group: "good", count: 6, path:1}],
				
				2: [{delay: 10, creep: Creep, group: "normal", count: 12, path:0},
				{delay: 140, creep: GoodCreep, group: "good", count: 6, path:0}],
				
				3: [{delay: 0, creep: SlowSpamCreep, group: "spam", count: 30, path:2},
				{delay: 5, creep: GoodCreep, group: "good", count: 20, path:2}],
					
				4:[{delay: 0, creep: GoodCreep, group: "good", count: 20, path:2},
					{delay: 5, creep: Creep, group: "normal", count: 20, path:0},
					{delay: 0, creep: SlowSpamCreep, group: "spam", count: 20, path:1}],
					
				5:[{delay: 0, creep: GoodCreep, group: "good", count: 64, path:1},
					{delay: 0, creep: GoodCreep, group: "good", count: 64, path:0},
					{delay: 0, creep: GoodCreep, group: "good", count: 64, path:1},
					{delay: 0, creep: SpamCreep, group: "spam", count: 70, path:0},
					{delay: 0, creep: SpamCreep, group: "spam", count: 70, path:2},
					{delay: 20, creep: OverclockedCreep, group: "overclocked", count: 10, path:0},
					{delay: 20, creep: TrojanCreep, group: "trojan", count: 10, path:2},
					{delay: 10, creep: Creep, group: "normal", count: 30, path:0},
					{delay: 50, creep: OverclockedCreep, group: "overclocked", count: 10, path:2},
					{delay: 10, creep: Creep, group: "normal", count: 20, path:2}]				
			},
			resources: {
				cash: [1,2,4,8,16,-1],
				lines: [10,10,12,16,-1]
				
			},
			complete: false,
			hasMessage:[true, true, true, true, true],
			message: ["When a wave contains <span class = 'badItem'>viruses</span> intermixed with <span class = 'dodgerItem'>packets</span>, it is necessary to check the <span class = 'otherItem'>threat</span> level.<br><br>The target's <span class = 'otherItem'>threat</span> level is an attribute that describes what the target is.<br><span class = 'badItem'>Viruses</span> have a <span class = 'otherItem'>threat</span> level of <span class = 'badItem'>1</span>.<br><span class = 'spamItem'>Spam</span> has a <span class = 'otherItem'>threat</span> level of <span class = 'spamItem'>0</span>.<br><span class = 'dodgerItem'>Packets</span> have a <span class = 'otherItem'>threat</span> level of <span class = 'dodgerItem'>-1</span> since they are part of the system.<br><br><span class = 'otherItem'>Threat</span> level can be checked using an <span class = 'goodItem'>if()</span> statement. Here is an example:<br><br><textarea readonly class='tripleTextLine'>if(target[0].threat == 0){\n\treturn target[0]\n}</textarea><br><br>This code will check to see what <span class = 'otherItem'>threat</span> level that <span class = 'otherItem'>target[0]</span> has. If the target's <span class = 'otherItem'>threat</span> level is <span class = 'spamItem'>0</span> (the same as <span class = 'spamItem'>spam</span>), the tower will attack.<br><br>Take a moment to examine the code in the terminal. An <span class = 'goodItem'>if()</span> statement is used within a custom AI <span class = 'otherItem'>function</span>.", 
			
			"Lets examine how the <span class = 'goodItem'>if()</span> statement works in the terminal:<br><br><span class = 'goodItem'>if()</span>: When this statement is used, the computer checks to see whether the <span class = 'otherItem'>condition</span> within the parenthesis <span class = 'goodItem'>()</span> is true. Whenever the <span class = 'otherItem'>condition</span> is true, the code within the following curly brackets <span class = 'goodItem'>{}</span> will execute. <a href='http://www.w3schools.com/js/js_if_else.asp' target='_blank'>More info</a><br><br><span class = 'goodItem'>target[0].threat</span>: This is a number that indicates what type of thing <span class = 'otherItem'>target[0]</span> is. <span class = 'badItem'>Viruses</span>, <span class = 'spamItem'>spam</span>, and <span class = 'dodgerItem'>packets</span> are automatically assigned the numbers <span class = 'badItem'>1</span>, <span class = 'spamItem'>0</span>, and <span class = 'dodgerItem'>-1</span> respectively.<br><br><span class = 'goodItem'>==</span>: When two '<span class = 'otherItem'>equals</span>' symbols are used together, whatever is on the left- and right-hand sides of them will be compared. If they are the same thing, the <span class = 'otherItem'>condition</span> will be true. <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators' target='_blank'>More info</a><br><br>For example, <span class = 'goodItem'>1 == 1</span> and <span class = 'goodItem'>23 == 23</span> are both true. <span class = 'otherItem'>1 == 23</span> is not true.", 
			
			"Sometimes, <span class = 'dodgerItem'>packets</span> will enter the grid at the same time as other targets. When this happens, it is necessary to use the <span class = 'otherItem'>target.length</span> attribute to check the threat level of every target in range. <a href='http://www.w3schools.com/jsref/jsref_length_array.asp' target='_blank'>More info</a>.<br><br>To review, targets entering a tower's range are automatically numbered, starting with <span class = 'otherItem'>target[0]</span>. Similarly, <span class = 'otherItem'>target.length</span> is the total number of targets within a tower's range.<br><img src='./images/length.gif' height='155' alt='target.length'><br>Using a <span class = 'goodItem'>for() loop</span> with <span class = 'otherItem'>target.length</span> can check all targets in range. It starts by checking <span class = 'otherItem'>target[0].threat</span>, then <span class = 'otherItem'>target[1].threat</span>, and so forth until it finds a target with the same threat level as <span class = 'spamItem'>spam</span>. The tower will then attack and start the loop over.",
			
			"<span class = 'badItem'>Viruses</span> have a <span class = 'otherItem'>threat</span> level of <span class = 'badItem'>1</span>.<br><span class = 'spamItem'>Spam</span> has a <span class = 'otherItem'>threat</span> level of <span class = 'spamItem'>0</span>.<br><span class = 'dodgerItem'>Packets</span> have a <span class = 'otherItem'>threat</span> level of <span class = 'dodgerItem'>-1</span> since they are part of the system.<br><br>When <span class = 'badItem'>viruses</span> are intermixed with <span class = 'dodgerItem'>packets</span>, it is necessary to check the <span class = 'otherItem'>threat</span> level for all targets in range.<br><img src='./images/length.gif' height='155' alt='target.length'>",
			
			"<span class = 'goodItem'>Congratulations, you have reached the last wave in this simulation.</span> Reaching this stage has required you to learn about  <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var' target='_blank'>variables</a>, <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for' target='_blank'>for() loops</a>, <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function' target='_blank'>functions</a>, and the <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return' target='_blank'>return</a> statement. Many college level computer science students can't make it this far...<br><img src='./images/smugdog.jpg' height='155' alt='smugdog'><br>This final wave will contain all known <span class = 'badItem'>virus</span> types intermixed with several <span class = 'dodgerItem'>packets</span>.<br><br><span class = 'goodItem'>Make sure that you have enough towers, and that your towers are programmed with the correct AI.</span>"],
			hasExample:[true, true, true, true, true],
			example: ["<span class = 'goodItem'>The next wave will contain only <span class = 'spamItem'>spam</span>, followed by several <span class = 'dodgerItem'>packets</span></span>.</span><br><br>The code in the terminal creates a row of towers with custom AI that will only attack <span class = 'spamItem'>spam</span>.<br><br>You may modify the code. Press <span class = 'otherItem'>Start Wave</span> to begin.", 
			
			"The next wave will contain multiple <span class = 'badItem'>viruses</span> followed by <span class = 'dodgerItem'>packets</span>.<br><br><span class = 'badItem'>You must modify the code</span> so that towers only attack  <span class = 'badItem'>viruses</span>. Make sure that the custom AI is attacking targets with the correct <span class = 'otherItem'>threat</span> level.", 
			
			"<span class = 'goodItem'>The next wave will contain <span class = 'spamItem'>spam</span> that is mixed with <span class = 'dodgerItem'>packets</span></span>.</span><br><br>The code in the terminal creates a row of towers with custom AI that will only attack <span class = 'spamItem'>spam</span>.<br><br>You may modify the code. Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"<span class = 'goodItem'>The next wave will contain <span class = 'badItem'>viruses</span> that are mixed with <span class = 'dodgerItem'>packets</span></span>.<br><br><span class = 'badItem'>You must modify the code so that the towers only attack viruses. Be sure that your towers are set to attack targets with the same <span class = 'otherItem'>threat</span> level as viruses.</span><br><br>Press <span class = 'otherItem'>Start Wave</span> to begin.",
			
			"Thank you for playing this game! Press <span class = 'otherItem'>Start Wave</span> to begin, and please visit our <a href='comingsoon.html' target='_blank'>Kickstarter Page</a>.<br><br>CREDITS:<br>Jeffery Clark<br>Ian Clark<br>Ivan Craddock<br>Nick Spring<br>Nicholas Valentine"],
			hasExecutable:[true,false,true, false, false],
			executable:["function customAI(target){\n\tif(target[0].threat == 0){\n\t\treturn target[0]\n\t}\n}\nfor(var i = 0; i < 5; i++){\n\tvar temp = new NormalTower(2,i*2)\n\ttemp.setAI(customAI)\n}", 
			
			false, "function customAI(target){\n\tfor(var i=0;i<target.length;i++){\n\t\tif(target[i].threat == 0){\n\t\t\treturn target[i]\n\t\t}\n\t}\n}\nfor(var i = 0; i < 5; i++){\n\tvar temp = new NormalTower(2,i*2)\n\ttemp.setAI(customAI)\n}"]
		},
		12: {
			levelName:"Fail Level",
			levelChar:[{start:"&", path:"`", layout:1}, {start:"~", path:"default", layout:2}],
			layout:["      &\n" + //top
					"      `\n" + //0
					"      `\n" + //1
					"      `\n" + //2
					"     ` \n" + //3
					"      `\n" + //4
					"     ` \n" + //5
					"  ``  `\n" + //6
					" `  ` `\n" + //7
					" `   ``\n" + //8
					" `     \n" + //9
					" @    \n",
					//Layout 2
					"~      \n" + //top
					"+      \n" + //0
					" +++++ \n" + //1
					"      +\n" + //2
					" +++++ \n" + //3
					"+      \n" + //4
					" +     \n" + //5
					"  +    \n" + //6
					" +     \n" + //7
					" +     \n" + //8
					" +     \n"+
					" @     \n"], //unseen row
			waves: {
				1: [{delay: 1, creep: GoodCreep, group: "good", count: 1, path:1},
					{delay: 10, creep: Creep, group: "normal", count: 3, path:1}],
				2: [{delay: 1, creep: GoodCreep, group: "good", count: 2, path:1},
					{delay: 20, creep: Creep, group: "normal", count: 3, path:1}],
				3: [{delay: 1, creep: Creep, group: "normal", count: 3, path:0},
					{delay: 4, creep: Creep, group: "normal", count: 3, path:0}]
			},
			resources: {
				cash: [100,200,300],
				lines: [100,200,300]
				
			},
			complete: false,
			hasMessage:[true, true, true],
			message: ["Thanks for playing! You have become a true code champion!<br><br><img src='./images/winner.jpg' height='120' alt='awinnerisyou'><br><br>Please visit our <a href='comingsoon.html' target='_blank'>Kickstarter Page</a> and <a href='https://www.facebook.com/codedefense.org/' target='_blank'>Like us on Facebook</a>! ", 
			
			"wave 2 level 2", 
			
			"wave 3 level 2"],
			hasExample:[true, false, false],
			example: ["Thank you for playing this game! Please visit our <a href='comingsoon.html' target='_blank'>Kickstarter Page</a>.<br><br>CREDITS:<br>Jeffery Clark<br>Ian Clark<br>Ivan Craddock<br>Nick Spring<br>Nicholas Valentine", 
			
			"wave 2 level 2", 
			
			"wave 3 level 2"],
			hasExecutable:[true,false,false],
			executable:["", 
			
			false, false]
		}
	};
