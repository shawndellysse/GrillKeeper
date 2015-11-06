require("babel/register");
require("get-global").Promise = require("bluebird");

require("./src/index");
