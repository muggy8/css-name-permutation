function transmute(cssCluster){
	var returnCluster = [];
	var permutationRegex = /\<[a-zA-Z]?[\w\/\\\-\_]*\>/;
	var foundCluster = cssCluster.match(permutationRegex);
	
	if (foundCluster !== null){
		
		var clusterList = foundCluster[0].substr(1, foundCluster[0].length-2).split("/");
		//console.log(clusterList);
		for (var i = 0; i < clusterList.length; i++){
			//console.log(foundCluster.input.replace(permutationRegex, clusterList[i]));
			returnCluster = returnCluster.concat(transmute( foundCluster.input.replace(permutationRegex, clusterList[i]) ));
		}
		
	}
	else{
		return "." + cssCluster;
	}
	
	return returnCluster;
}

//var styleRegexRule = [];
function cssUnpack(targetID){
	var resultDumpID = "name-dump";
	var previousList = document.querySelector("#" + resultDumpID);
	if (previousList){
		previousList.parentNode.removeChild(previousList);
	}
	
	var styleRulesMaster = document.querySelector("#framework-rules");
	var styleRegex = styleRulesMaster.querySelectorAll("[id*='regex']:not([id*='style'])");
	var styleRule = styleRulesMaster.querySelectorAll("[id*='style']:not([id*='regex']");
	
	var styleRegexRule = [];
	for (var i = 0; i < styleRegex.length; i++){
		var curRule = {"regex": new RegExp(styleRegex[i].value), "rule":styleRule[i].value};
		styleRegexRule.push(curRule);
	}
	
	var output = document.createElement("p");
	output.id = resultDumpID;
	var cssNames = transmute(document.querySelector(targetID).value);
	if (document.querySelector("#common-select").checked){
		output.innerHTML = cssNames.toString() + "{<br><br>}<br>";
	}
	
	for (var i = 0; i < cssNames.length; i++){
		output.innerHTML += "<div name='"+cssNames[i]+"'>";
		output.innerHTML += "<span class='selector-name'>" + cssNames[i] + "</span>{"
		styleRegexRule.forEach(function(ruleItem, ruleIndex){
			if (cssNames[i].match(ruleItem.regex)){
				output.innerHTML += " <span class='regex-rule-"+ruleIndex+"'>" + ruleItem.rule + "</span>";				
			}
		});
		output.innerHTML += "}</div>"
	}
	
	document.querySelector('body').appendChild(output);
	
	return false;
}

function dupRegexInput(){
	var clone = document.getElementById("regex-style-template").cloneNode(true);
	clone.setAttribute("id", "regex-style-template" + document.querySelectorAll("[id*='regex-style-template']").length);
	
	clone.querySelector("#regex0").id = "regex" + document.querySelectorAll('[id*="regex"]:not([id*="style"])').length;
	clone.querySelector("#style0").id = "style" + (document.querySelectorAll('[id*="regex"]:not([id*="style"])').length);
	
	document.getElementById("regex-style-template").parentNode.appendChild(clone);
}

function deleteRuleDom(ele){
	var ruleDiv = ele.parentNode;
	if (ruleDiv.id != "regex-style-template"){		
		ruleDiv.parentNode.removeChild(ruleDiv);
	}
	else{
		alert("cannot delete the first rule");
	}
}

function jsReload(){
	var timestamp = new Date().getTime()
	var newScript = document.createElement("script");
	newScript.src = 'js/permutations.js?t='+timestamp;
	document.querySelector("body").appendChild(newScript);
}

(function(){
	window.$ = function(selector){
		return Array.from(document.querySelectorAll(selector));
	}
	
	Array.prototype.each = function(callback){
		this.forEach(function(item, index, array){
			callback(item, index, array);
		});
		return this;
	}
	
	Array.prototype.find = function(selector){
		var collection = [];
		this.forEach(function(item){
			console.log(item);
		});
		return collection;
	}
})()

