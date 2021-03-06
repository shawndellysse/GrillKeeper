const readChannel = require("./readChannel");

const ExcitationVoltage = 5.0;

//Since i'm not exposing this function, it's essentially private
var diffVoltageToTemp = function(DiffVoltage){
    //Constants
    var R = 47000; //Resistance of Known Resistors

    //Steinhart-Hart Coefficients
    var A = 0.000515942869144762;
    var B = 0.000172084582161862;
    var C = 2.38992092042526e-7;

    //Calculate Resistance of Thermistor
    var ThermistorResistance = (-2*R)*(((DiffVoltage/ExcitationVoltage)+0.5)/((2*(DiffVoltage/ExcitationVoltage))-1));

    //Calculate Temp in Kelvin using the Steinhart-Hart Equation
    var TempKelvin = 1/(A+(B*(math.log(ThermistorResistance)))+(C*math.pow(math.log(ThermistorResistance), 3)));

    //Convert Kelvin to Fahrenheit and return it
    return math.round(((TempKelvin - 273.15)*1.8)+32);
};

const getActualTemperature = function () {
    //Run code to determine actual temperature
    const thermValue = readChannel(0);
    const controlValue = readChannel(1);

    var controlVoltage = (controlValue * ExcitationVoltage)/1023;
    var thermVoltage = (thermValue * ExcitationVoltage)/1023;
    var voltageDiff = thermVoltage - controlVoltage;
    actualTempurature = diffVoltageToTemp(voltageDiff);

    return actualTempurature;
};

module.exports = getActualTemperature;
