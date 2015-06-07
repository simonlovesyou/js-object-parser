

var ObjectParser = function () {
	this.arrayCompare = function (arr1, arr2) {
    // if any array is falsy, return false 
    if (!arr1 || !arr2)
        return false;

    // compare lengths
    if (arr1.length != arr2.length)
        return false;

    for (var i = 0, l=arr1.length; i < l; i++) {
        // Check if we have nested arrays
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!arr1[i].equals(arr2[i]))
                return false;       
        }           
        else if (arr1[i] != arr2[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
	}   
	parseObj = function (levels, arg, i) {
		console.log("===================================");
		var obj = {};
		if(typeof i === 'undefined') {
			return obj;
		}
		var layer = "";
		if(i < levels.length-1) {
			if(i >= 0) {
				for(var j = 0; j < levels[i+1].length; j++) {
					if(levels)
					console.log("i:" + i + " j: " +j);
					if(levels[i+1][j][0] === 0 && levels[i+1][j][1] === 0) {
						console.log("SISTA LAGRET");
						console.log(arg.substring(levels[i][j][0], levels[i][j][1]));
					} else {
						console.log("TESTAR");
						if(j === 0){
							console.log("MELLAN:");
							console.log((levels[i][0][0]+1)+":"+(levels[i+1][j][0]-1))
							console.log(arg.substring(levels[i][0][0]+1, levels[i+1][j][0]-1));
							layer += arg.substring(levels[i][0][0]+1, levels[i+1][j][0]-1);
						}
						else if(j === 1) {
							console.log("MELLAN:");
							console.log((levels[i+1][0][1]+2)+":"+(levels[i+1][j][0]-1))
							console.log(arg.substring(levels[i+1][0][1]+2, levels[i+1][j][0]-1));
							layer += ","+arg.substring(levels[i+1][0][1]+2, levels[i+1][j][0]-1);
						} else if(j >= 2) {
							console.log("MELLAN:");
							console.log(levels[i+1]);
							console.log(levels[i+1][j]);
							console.log((levels[i+1][2][1])+":"+(levels[i+1][2][0]))
							console.log(arg.substring(levels[i+1][j-1][1]+2, levels[i+1][j][0]-1));
							layer +=","+arg.substring(levels[i+1][j-1][1]+2, levels[i+1][j][0]-1);
						}
					}

				}
			}
			
		} else {
			console.log("ELSE");
			layer = arg.substring(levels[i][0][0]+1, levels[i][0][1]);
		}
		console.log("LAYER:");
		console.log(layer);
		var properties = layer.split(',');
		console.log("PROPERTIES");
		console.log(properties);
		properties.forEach(function(property) {
			console.log("ADDING PROPERTY");
			console.log(property);
			if(property.indexOf(':') > 0) {
				var attrs = property.split(':');
				console.log("TOP LEVLE?");
				obj[attrs[0]] = attrs[1];
			} else if(i < levels.length-1) {
				return obj[property] = parseObj(levels, arg, (i+1));
			} else {
				obj[property] = this.parseObj(levels, arg);
			}
		});
		console.log("\n");
		return obj;
	}

	/**TODO: Fixa så att om objektet har strukturen

	_   ____    ____   ___
	 ...    ....    ...

	 så läggs det padding mellan ... och ... med [0,0], som det är just nu läggs inget till.

	 Just nu ser det ut såhär:

	 [ [ [ 0, 54 ] ],
   [ [ 3, 11 ], [ 15, 20 ], [ 24, 33 ], [ 37, 42 ], [ 49, 53 ] ],
   [ [ 6, 10 ] ] ]

   Bör se ut såhär:

	 [ [ [ 0, 54 ] ],
   [ [ 3, 11 ], [ 15, 20 ], [ 24, 33 ], [ 37, 42 ], [ 49, 53 ] ],
   [ [ 6, 10 ], [ 0, 0 ], [ 25, 30] ] ]
										^
										|
	 */

	this.getLimits = function (arg, brktLvls) {
		var limit = 0;
		var lvls = [];
		for(var i = 0; i < brktLvls.length; i++) {
			lvls.push([[0,0]]);
			for(var j = i; j < brktLvls.length; j++) {
				for(var k = 0; k < lvls[i].length; k++) {
					var good = false,
					    exists = false;
					for(var b = 0; b < lvls.length; b++) {
						for(var e = 0; e < lvls[b].length; e++) {
							if(this.arrayCompare(lvls[b][e], brktLvls[j])) {						
								exists = true;
							}
						}
					}
					if((lvls[i][k][1] - lvls[i][k][0]) === 0 && !exists) {
						lvls[i][k] = brktLvls[j];
					} else if(lvls[i][k][0] < brktLvls[j][0] 
						&& lvls[i][k][1] < brktLvls[j][1] 
						|| (lvls[i][k][1] - lvls[i][k][0]) <= (brktLvls[j][1] - brktLvls[j][0])) {
						good = true;	
					} else {
						good = false
					};
					
					for(var b = 0; b < lvls.length; b++) {
						for(var e = 0; e < lvls[b].length; e++) {
							if(this.arrayCompare(lvls[b][e], brktLvls[j])) 
								good = false;
						}
					}
					if(k === lvls[i].length-1 && good) {
						lvls[i].push(brktLvls[j]);
					}
				} 
			}
		}
		return lvls.filter(function(lvl) {
			//console.log(lvl);
			for(var i = 0; i < lvl.length; i++) {
				console.log("LVL");
				console.log(lvl[i][0]);
				if(lvl[i][0] === 0 && lvl[i][1] === 0) {
					return false;
				} else return true;
			}
		});
	}
};

ObjectParser.prototype.parse = function(arg) {

	//Remove every whitespace
	arg = arg.replace(/ /g,'');
	var bracketLevels = [];
	console.log(arg);

	for(var i = 0; i < arg.length; i++) {
		if(arg.charAt(i) === '{') {
			var level = [i];
			console.log("LEVEL START: " + i);
			bracketLevels.push(level);
		} else if(arg.charAt(i) === '}') {
			for(var j = bracketLevels.length-1; j >= 0; j--) {
				if(bracketLevels[j].length === 1) {
					console.log("LÄGGER TILL I " + j + " FRÅN CHAR " + i);
					bracketLevels[j].push(i);
					break;
				}
			}
		}
	}

	/*if(arg.charAt(0) === '{' && arg.charAt(arg.length-1) === '}') {
		for (var i = 0, len = arg.length; i < len; i++) {
			if(arg.charAt(i) === '{') {
				var level = [i];
				console.log("LEVEL START");
				console.log(level);
				bracketLevels.push(level);
			} 
		}
		for (var i = 0, len = arg.length; i < len; i++) {
			if(arg.charAt(i) === '}') {
				//console.log(arg.charAt(i) + " at " + i);
				for(var j = bracketLevels.length-1; j >= 0; j--) {
					if(bracketLevels[j].length === 1) {
						console.log("LEVEL END");
						console.log(level);
						bracketLevels[j].push(i+1);
						break;
					} 
				}
			}
		}
	}*/
	console.log("bracketLevels");
	console.log(bracketLevels);
	console.log("All Levels:");
	for(var i = 0; i < bracketLevels.length; i++) {
		console.log(i);
		console.log(arg.substring(bracketLevels[i][0],bracketLevels[i][1]));
	}
	console.log(this);
	console.log(bracketLevels);
	var limits = this.getLimits(arg, bracketLevels);	
	console.log(limits);

	return parseObj(limits, arg, 0);
} 

function test() {
	var objectParser = new ObjectParser();
	//var test = '{A:{B:{G:{h:i}}},l:{t:s}}';
	var test = '{A:{t:{s:t}},C:{h:ss},D:{kjrg:aka},e:{s:fe}, g123:{t:s}}';
	console.log("TEST SUBSTRING");
	console.log(test.substring(1,2)); //+1 -1
	console.log(test.substring(9,10)); //+2 -1
	console.log(test.substring(18,19)); //+2 -1
	console.log(test.substring());
	//var lvlStart = 19;
	//console.log(test.substring(lvlStart,lvlStart+1));
	var obj = objectParser.parse(test);
	//console.log(obj["A"]["B"]);
	console.log(obj);
}

test();



module.exports = ObjectParser;
