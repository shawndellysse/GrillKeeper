//This code is heavily pulled from https://github.com/adamkdean/spi-mcp3008-tmp36/blob/master/src/index.js
//Credit to owner
var SPI = require('spi');
var fs = require('fs');

var device = '/dev/spidev0.0';

if (!fs.existsSync(device)) {
    throw 'Error, SPI is not activated';
}

var adcInterfaceObject = function(){

var read = function(channel, callback){
  //Open the spi for reading
  spi = new SPI.Spi(device, [], function(s) {
    s.open();
  });

  spi.transfer(tx, rx, function(dev, buffer) {
        // logic explained:

        // the buffer will hold 3 8-bit bytes (24 bits) but we only want the last 10 bits
        // this is the last byte and the last 2 bits from the second byte, we ignore the first byte

        // |   0   | |   1   | |   2   |
        // 0000 0000 0000 0000 0000 0000
        //                 ^^^ ^^^^ ^^^^

        // step 1.
        // we take the second byte and bitwise AND it with 3 (0000 0011) to extract the last two bits
        //   1010 0010 (162)  let's say the byte has some junk data and then two at the end
        // & 0000 0011 (3)    we and it with three
        // = 0000 0010 (2)    and we get the value two

        // step 2.
        // we now want to shift these bits 8 to the left to make space for the third byte
        // byte 1 = 0000 0010 (2)  <- 8 = 10 0000 0000 (512)
        // byte 2 = 0000 1111 (15)           | space |

        // step 3.
        // we can now add them together to get two bytes equaling our value:
        // 0000 0010 0000 1111 (527)

        var value = ((buffer[1] & 3) << 8) + buffer[2];
        callback(value);
    });

    spi.close();
}

  return {
    //Public functions
    read: read
  }

}();



module.export = adcInterfaceObject;