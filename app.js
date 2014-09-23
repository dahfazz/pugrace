var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var router      = express.Router();
var fs          = require('fs');

var RACES = {},  RUNNERS = {};


// SERVER
var port = process.env.PORT || 8880;
var ip   = process.env.IP || '192.168.2.188';

http.listen(port, function(){
  console.log('here we go');
});


/* STATIC ASSETS */
app.use('/assets',              express.static(__dirname + '/assets'));
app.use('/src',                 express.static(__dirname + '/src'));
app.use('/views',               express.static(__dirname + '/views'));
app.use('/website',             express.static(__dirname + '/website'));
app.use('/bower_components',    express.static(__dirname + '/bower_components'));


/* ROUTES */
var routingOptions = {root: __dirname + '/views/'};
router.get('/', function(req, res) {
    res.sendFile('index.html', routingOptions , function (err) {});
});

router.get('/allraces', function(req, res) {
    res.send(JSON.stringify(RACES));
});

router.get('/race/:name', function(req, res) {
    res.send(JSON.stringify(RACES[req.params.name]), {}, function (err) {});
});

router.get('/allrunners', function(req, res) {
    res.send(JSON.stringify(RUNNERS), {}, function (err) {});
});

router.get('/runner/:name', function(req, res) {
    res.send(JSON.stringify(RUNNERS[req.params.name]), {}, function (err) {});
});


app.use('/', router);


/* GENERATE WEB COMPONENTS CORE-STYLE */
function generateComponent(name) {
    fs.readFile('./assets/css/webcomponents/' + name + '.css', function (err, data) {
        if (err) {
            throw err;
        }       
        var contentHolder = "<core-style id='" + name + "'>" + data.toString() + "</core-style>";
        fs.writeFile('./assets/components/' + name + '/style.html', contentHolder, function (err) {
            if (err) {
                throw err;
            }
        });
    });
}
generateComponent('profile');
generateComponent('gamepad');
generateComponent('racerunners');



/* WEB SOCKET COMMUNICATION */
io.on('connection', function(socket) {

    /* WHEN NEW PLAYER SUBMITED */
    socket.on('askCreateRunner', function(runner) {
        if (RUNNERS[runner.name]) {
            socket.emit('unavailableName', runner);
        } else {
            RUNNERS[runner.name] = runner;
            socket.emit('runnerCreated', runner);
        }
    });


    /* WHEN START GAME */
    socket.on('startRace', function(race_name) {
        RACES[race_name].state = 'playing';
        io.sockets.emit('raceStarted');
    });



    /* WHEN GAME HAS A WINNER */
    socket.on('winner', function(data) {
        io.sockets.emit('finished', data);
    });



    /* WHEN GO TO NEXT QUESTION
        - race
        - remainingQuizzSIze
    */
    socket.on('nextQuestion', function(data) {
        var randomKey   = Math.floor(Math.random() * data.remainingQuizzSIze);
        console.log('HERE')
        io.sockets.emit('goToNextQuestion', {'race': data.race, 'question_key': randomKey});
    });



    /* WHEN RECEIVE A ANSWER
        - race
        - runner
        - question_key
        - option_key
        - timestamp
    */
    socket.on('sendAnswer', function(data) {

        var goodanswer = (RACES[data.race.name].quizz.items[data.question_key].answer === data.option_key);

        var obj = {
            'runner': data.runner,
            'race': data.race,
            'question_key': data.question_key,
            'goodanswer': goodanswer
        };

        io.sockets.emit('reward', obj);

        //io.sockets.emit('questionHandled', obj);
    });


    /* WHEN GAME PLAYER LIST CHANGE */
    socket.on('runnerUpdated', function(runner) {
        RUNNERS[runner.name] = runner;
        io.sockets.emit('updateRunnerList', RUNNERS);
    });


    /* WHEN NEW RACE SUBMITED */
    socket.on('askNewRace', function(race) {
        RACES[race.name] = race;

        var data = {
            'race': race,
            'races': RACES
        };

        io.sockets.emit('newRaceCreated', data);
    });



    /* WHEN PLAYER WANTS TO JOIN A GAME 
        - runner
        - race
     */
    socket.on('joinRace', function(data) {
        RACES[data.race.name].runners[data.runner.name] = data.runner;
        var _runnerNb = 0;
        for (var i = 0 in RACES[data.race.name].runners) {
            _runnerNb++;
        }

        if (_runnerNb == 6) {
            RACES[data.race.name].state = 'full';
        }

        RACES[data.race.name].runnerNb = _runnerNb;
        io.sockets.emit('newChallenger', RACES[data.race.name]);
        io.sockets.emit('updateRaces', RACES);
    });


    /* WHEN LOGIN SUBMITED */
    socket.on('tryLogin', function(data) {
        if (RUNNERS[data.name] && RUNNERS[data.name].pwd === data.password) {
            socket.emit('logginOK', RUNNERS[data.name]);
        }
    });
});