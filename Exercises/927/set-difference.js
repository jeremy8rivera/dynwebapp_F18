module.exports = function(set1, set2){

	let temp = [];
	for(i = 0; i < set1.length; i++){
		if(set2.indexOf(set1[i]) == -1){
			temp.push(set1[i])
		}
	}
	for(i = 0; i < set2.length; i++){
		if(set1.indexOf(set2[i]) == -1){
			temp.push(set2[i])
		}
	}
	return temp;
}