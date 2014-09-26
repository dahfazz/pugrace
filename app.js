var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var router      = express.Router();
var fs          = require('fs');
var conf        = require('./conf.json');

var RACES = {},  RUNNERS = {};

var finishStep = 80;


// SERVER
var port = process.env.PORT || conf.port;
var ip   = process.env.IP || conf.ip;

http.listen(port, function(){
  console.log('here we go on ' + ip + ':' + port);
});


/* STATIC ASSETS */
app.use('/assets',              express.static(__dirname + '/assets'));
app.use('/src',                 express.static(__dirname + '/src'));
app.use('/views',               express.static(__dirname + '/views'));
app.use('/website',             express.static(__dirname + '/website'));
app.use('/bower_components',    express.static(__dirname + '/bower_components'));


/* ROUTES */

router.get('/', function(req, res) {
    res.sendFile('/index.html', {root: __dirname + '/website/'} , function (err) {});
});

router.get('/play', function(req, res) {
    res.sendFile('/index.html', {root: __dirname + '/views/'} , function (err) {});
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

router.get('/stats', function(req, res) {
    var stats = {
        'races': Object.size(RACES),
        'runners': Object.size(RUNNERS)
    }
    res.send(stats, {}, function (err) {});
});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


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
        console.log(RACES)
        io.sockets.emit('raceStarted');
    });



    /* RESTORE KNOWN PLAYER
        - me
    */
    socket.on('restoreMe', function(data) {
        console.log('restore me')
        RUNNERS[data.me.name] = data.me;
    });



    /* WHEN RACE START
        - race
        - remainingQuizzSIze
    */
    socket.on('raceStarted', function(data) {
        RACES[data.race.name].state = 'playing';
    });



    /* WHEN GO TO NEXT QUESTION
        - race
        - remainingQuizzSIze
    */
    socket.on('nextQuestion', function(data) {
        var randomKey   = Math.floor(Math.random() * data.remainingQuizzSIze);
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

        if (goodanswer) {
            RACES[data.race.name].runners[data.runner.name].steps += 10;
            RUNNERS[data.runner.name].steps += 10;
        }

        if (RACES[data.race.name])

        io.sockets.emit('reward', obj);

        // Finish line
        if (RACES[data.race.name].runners[data.runner.name].steps == finishStep) {
            console.log('SCORE +10')
            RUNNERS[data.runner.name].score += 10;

            io.sockets.emit('finish', obj);

            delete RACES[data.race.name];
        }
    });


    /* WHEN GAME PLAYER LIST CHANGE */
    socket.on('runnerUpdated', function(runner) {
        RUNNERS[runner.name] = runner;
        io.sockets.emit('updateRunnerList', RUNNERS);
    });


    /* WHEN NEW RACE SUBMITED 
        - race
        - owner
    */
    socket.on('askNewRace', function(data) {
        RACES[data.race.name] = data.race;
        RUNNERS[data.owner.name].race_name = data.race.name;

        var obj = {
            'race': data.race,
            'races': RACES
        };

        io.sockets.emit('newRaceCreated', obj);
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