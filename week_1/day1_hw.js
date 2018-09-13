var name = "Jeremy";
var x = 10;

//bonus variables
var byear = 1997;
var fyear = 2030;

function minusThree(x){
	console.log(x + " is the initial");
	var temp = x;
	temp += 2;
	temp -= 5;
	console.log(temp + " is the final");
	return temp;
}

function loopOneTen(){
	var temp = 1;
	for (i = 0; i < 10; i++){
		console.log(temp);
		i++;
	}
}

function futureYear(byear, fyear){
	var temp = fyear - byear;
	console.log("I will be either " + temp + " or " + temp + " in year " + fyear);
}

