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
		var obj = {};
		if(typeof i === 'undefined') {
			return obj;
		}
		var layer = "";
		if(i < levels.length-1) {
			layer = arg.substring(levels[i][0][0]+1, levels[i+1][0][0]-1) + 
									arg.substring(levels[i+1][0][1]+1, levels[i][0][1]);
		} else {
			layer = arg.substring(levels[i][0][0]+1, levels[i][0][1]);
		}

		var properties = layer.split(',');
		properties.forEach(function(property) {
			if(property.indexOf(':') > 0) {
				var attrs = property.split(':');
				obj[attrs[0]] = attrs[1];
			} else if(i < levels.length-1) {
				return obj[property] = parseObj(levels, arg, (i+1));
			} else {
				obj[property] = this.parseObj(levels, arg);
			}
		});
		return obj;
	}

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
						&& (lvls[i][k][1] - lvls[i][k][0]) < (bLvl[j][1] - bLvl[j][0])) {
						good = true;
					} else good = false;
					
					for(var b = 0; b < lvls.length; b++) {
						for(var e = 0; e < lvls[b].length; e++) {
							if(this.arrayCompare(lvls[b][e], brktLvls[j])) 
								good = false;
						}
					}
					if(k === lvls[i].length-1 && good) {
						lvls[i].push(brktLvl[j]);
					}
				} 
			}
		}
		return lvls;
	}
};

ObjectParser.prototype.parse = function(arg) {

	//Remove every whitespace
	arg = arg.replace(/ /g,'');
	var bracketLevels = [];

	if(arg.charAt(0) === '{' && arg.charAt(arg.length-1) === '}') {
		for (var i = 0, len = arg.length; i < len; i++) {
			if(arg.charAt(i) === '{') {
				var level = [i];
				bracketLevels.push(level);
			} 
		}
		for (var i = 0, len = arg.length; i < len; i++) {
			if(arg.charAt(i) === '}') {
				console.log(i);
				for(var j = bracketLevels.length-1; j >= 0; j--) {
					if(bracketLevels[j].length === 1) {
						bracketLevels[j].push(i);
						break;
					} 
				}
			}
		}
	}
	console.log(this);
	var limits = this.getLimits(arg, bracketLevels);	

	return parseObj(limits, arg, 0);
} 

module.exports = ObjectParser;
