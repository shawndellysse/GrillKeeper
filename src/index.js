const temperatureController = require('./temperatureController');
const express = require('express');
const io = require('socket.io')(http);

const gatherData = function () {
    return {
        currentTemp: temperatureController.getActualTemperature(),
        targetTemp: temperatureController.getTargetTemperature(),
    };
};

const propagateData = function () {
    io.sockets.emit('dataupdate', gatherData());
};

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/../public`));
app.get('/', (req, res) => {
    res.render('index', {
        currentTemp: temperatureController.getActualTemperature(),
        targetTemp: temperatureController.getTargetTemperature(),
    });
});
app.listen(3000);


//Socket.IO
io.on('connection', socket => {
    socket.on('increment', () => {
        temperatureController.incrementTargetTemperature();
        propagateData();
    });
    socket.on('decrement', () => {
        temperatureController.decrementTargetTemperature();
        propagateData();
    })
});

