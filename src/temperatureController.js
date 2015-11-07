var math = require('mathjs');


var targetTemperature = 225;

var getTargetTemperature = function(){
    return targetTemperature;
}

var setTargetTemperature = function(newTargetTemp){
    targetTemperature = newTargetTemp;
}
var incrementTargetTemperature = function() {
    setTargetTemperature(++targetTemperature);
}
var decrementTargetTemperature = function() {
    setTargetTemperature(--targetTemperature);
}


module.exports = {
    getTargetTemperature: getTargetTemperature,
    setTargetTemperature: setTargetTemperature,
    incrementTargetTemperature: incrementTargetTemperature,
    decrementTargetTemperature: decrementTargetTemperature,
    getActualTemperature: getActualTemperature
}
