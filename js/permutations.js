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

function (targetID){
	var packedCSS = document.querySelector(targetID).value;
	
	return false;
}