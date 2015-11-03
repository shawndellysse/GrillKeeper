var math = require('mathjs');
var adcinterface = require('./adcinterface');

var temperatureControlerObject = function() {


  var targetTemperature = 225;
  var actualTempurature = 0;

  var GetTargetTemperature = function(){
    return targetTemperature;
  }

  var SetTargetTemperature = function(newTargetTemp){
    targetTemperature = newTargetTemp;
  }
  var IncrementTargetTemperature = function() {
    SetTargetTemperature(++targetTemperature);
  }
  var DecrementTargetTemperature = function() {
    SetTargetTemperature(--targetTemperature);
  }

  var GetActualTemperature = function(){
    //Run code to determine actual temperature
    adcinterface.readChannel(0, function(thermValue){
      adcinterface.readChannel(1, function(controlValue){
        console.log('ThermValue =' + thermValue);
        console.log('ControlValue =' + controlValue);
        var controlVoltage = (controlValue * 5.0)/1023;
        var thermVoltage = (thermValue * 5.0)/1023;
        var voltageDiff = controlVoltage - thermVoltage;
        console.log("DiffVoltage =" + voltageDiff);
        actualTempurature = DiffVoltageToTemp(voltageDiff);
        console.log("Actual Temperature =" + actualTempurature);
      });
    });
    return actualTempurature;
  }

  var DiffVoltageToTemp = function(DiffVoltage){
        //Constants
        var ExcitationVoltage = 5.0;
        var R = 47000; //Resistance of Known Resistors
        //Stienhart-Hart Coefficients
        var A = 0.000515942869144762;
        var B = 0.000172084582161862;
        var C = 2.38992092042526e-7;

        //Calculate Resistance of Thermistor
        var ThermistorResistance = (-2*R)*(((DiffVoltage/ExcitationVoltage)+0.5)/((2*(DiffVoltage/ExcitationVoltage))-1));

        //Calculate Temp in Kelvin
        var TempKelvin = 1/(A+(B*(math.log(ThermistorResistance)))+(C*math.pow(math.log(ThermistorResistance), 3)));

        //Convert Kelvin to Fahrenheit and return it
        return ((TempKelvin - 273.15)*1.8)+32;
};

  return {
    //Pubic functions
    GetTargetTemperature: GetTargetTemperature,
    SetTargetTemperature: SetTargetTemperature,
    IncrementTargetTemperature: IncrementTargetTemperature,
    DecrementTargetTemperature: DecrementTargetTemperature,
    GetActualTemperature: GetActualTemperature
  }
}();

module.exports = temperatureControlerObject;
