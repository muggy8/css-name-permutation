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

function cssUnpack(targetID){
	var resultDumpID = "name-dump";
	
	var cssNames = transmute(document.querySelector(targetID).value);
	
	var previousList = document.querySelector("#" + resultDumpID);
	if (previousList){
		previousList.parentNode.removeChild(previousList);
	}
	
	var output = document.createElement("p");
	output.id = resultDumpID;
	
	output.innerHTML = cssNames.toString() + "{<br><br>}<br>";
	
	for (var i = 0; i < cssNames.length; i++){
		output.innerHTML += cssNames[i] + "{"
		
		output.innerHTML += cssNames[i] + "}"
	}
	
	document.querySelector('body').appendChild(output);
	
	return false;
}

function dupRegexInput(){
	var clone = document.getElementById("regex-style-template").cloneNode(true);
	clone.setAttribute("id", );
	
	clone.querySelector("#regex1").id = "regex" + document.querySelectorAll('[id*="regex"]').length;
	clone.querySelector("#style1").id = "style" + (document.querySelectorAll('[id*="regex"]').length);
	
	document.getElementById("regex-style-template").parentNode.appendChild(clone);
}