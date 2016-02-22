/* ******************************************************************************** */
/* Code                                                                             */
/* ******************************************************************************** */

	/* execute user code */
	function compile() {
		output("Compiling...\n");
		try{ mainTextMarker.clear();}
		catch(err){revertCreeps()}
		try{ AdvTextMarker.clear();}
		catch(err){}
		// compile AI functions
		eval("function game() {try{" + $("#mainCode").val() + "} catch(err){revertCreeps();showException(err)}\n} game();");
	}

	function countOcurrences(str, value){
	   var regExp = new RegExp(value, "gi");
	   return ( str.match(regExp) ? str.match(regExp).length : 0);  
	}
	
	function countCode(codeBox) {
		var mainCode = codeBox.getValue();
		
		var newLines = countOcurrences(mainCode, "[!-z]+\s*{?}?\s*\n") + 1;
		var semi = countOcurrences(mainCode, ";");
		var forloops = countOcurrences(mainCode, "for");
		semi = semi - forloops;
		var mainTot = Math.max(semi, newLines);
		
		return mainTot;
	}
	
var codeWindows = [];
var setBox = [];
var advancedCodeWindow;

$(document).ready(function() {
	//sets up the main code text area for highlighting and updating
	
	CodeWindow = CodeMirror.fromTextArea(document.getElementById("mainCode"), {lineNumbers: true, mode: "javascript", extraKeys:{"Ctrl-Space" : "autocomplete"} });
	setBox.push("true");
	tabs.push("mainEdit");
	CodeWindow.setSize(390,450);
	codeWindows.push(CodeWindow);
	CodeWindow.on('change',function(cMirror){
	// get value right from instance
		changeResourceCount();
		if (GAME.resources.mainResource >= GAME.resources.usedResource) {
			$("#output").text("");
			$("#mainCode").val(cMirror.getValue());
			$("#errors").hide();
		}
		else {
			var message = "ERROR: You may only use <span class = 'spamItem'>"+GAME.resources.mainResource+" LINES </span> at this time\nAll code after <span class = 'spamItem'>LINE "+GAME.resources.mainResource+"</span> in the terminal will be .";
			message = message.fontcolor("red");
			$("#errors").html(message);
			$("#errors").show();
		}
	});
	
	$("#advancedEdit").show();
	advancedCodeBox();
	$("#advancedEdit").hide();
});
//sets up the advanced code text area for highlighting and updating
var boxDone = false;
function advancedCodeBox() {
	if(!boxDone){
		var advancedCodeWindow = CodeMirror.fromTextArea(document.getElementById("advancedCode"), {lineNumbers: true, mode: "javascript", extraKeys : {"Ctrl-Space" : "autocomplete"}});
		codeWindows.push(advancedCodeWindow);
		tabs.push("advancedEdit");
		changeResourceCount();
		advancedCodeWindow.on('change',function(cMirror){
			// get value right from instance
			changeResourceCount();
			if (GAME.resources.mainResource >= GAME.resources.usedResource) {
				$("#output").text("");
				$("#advancedCode").val(cMirror.getValue());
				$("#errors").hide();
			}
			else {
				var message = "No more resources remaining; Code not updated\nChanges will not be reflected when wave is run";
				message = message.fontcolor("red");
				$("#errors").html(message);
				$("#errors").show();
			}
		});
		setBox.push('true');
		boxDone = true;
	}
}

function addCodeBox(myBox, id, section) {
	var newestBox = CodeMirror.fromTextArea(myBox, {lineNumbers: true, mode: "javascript", extraKeys : {"Ctrl-Space" : "autocomplete"}});
	codeWindows.push(newestBox);
	tabs.push(section);
	changeResourceCount();
	newestBox.on('change',function(cMirror){
		// get value right from instance
		changeResourceCount();
		if (GAME.resources.mainResource >= GAME.resources.usedResource) {
			$("#output").text("");
			$("#" + id).val(cMirror.getValue());
			$("#errors").hide();
		}
		else {
			var message = "No more resources remaining; Code not updated\nChanges will not be reflected when wave is run";
			message = message.fontcolor("red");
			$("#errors").html(message);
			$("#errors").show();
		}
	});
	setBox.push('true');
}

function colorCode(row, column, section) {
		if (section == "main"){
			codeWindows[0].markText({line: (row -1), ch: 0}, {line: row, ch:0}, {css : "color: #DF013A"});
		}
		else{
			codeWindows[section].markText({line: (row -1), ch: 0}, {line: row, ch:0}, {css : "color: #DF013A"});
		}
	}