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
	
	for (var i = 0; i < cssNames.length; i++){
		output.innerHTML += cssNames[i] + "{<br><br>}<br>"
	}
	
	document.querySelector('body').appendChild(output);
	
	return false;
}