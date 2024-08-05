const MusselOpened = require('../Schema/model').MO;

module.exports = app => {
    app.route('/mo').get(ensureAuthenticated, (req, res) => {
        res.render('mo', {username: req.user.username, firstname: req.user.firstname})
    })

    // Route for mo data
    app.route('/mo/data')
        .post(ensureAuthenticated, (req, res) => {
            let username = req.user.username;
            let date = req.body.moDate;
            let weekdays = req.body.weekdays;
            let spot = req.body.spot;
            let fShift = req.body.fShift;
            let sShift = req.body.sShift;
            let tShift = req.body.tShift;
            let total = req.body.moTotal;
    
            // create new MO
            const musselOpened = new MusselOpened({
                username: username,
                date: date,
                weekday: weekdays,
                spot: spot,
                fShift: fShift,
                sShift: sShift,
                tShift: tShift,
                total: total
            });

            MusselOpened.findOne({username: username, date: date}, (err, oldData) => {
                if(!oldData) {
                    musselOpened.save((err, data) => {
                        if (err || !data) {
                            console.log(err);
                            res.json("error saving new data")
                        } else {
                            res.redirect('/home');
                        }
                    });
                } else {
                    oldData.spot = spot;
                    oldData.fShift = fShift;
                    oldData.sShift = sShift;
                    oldData.tShift = tShift;
                    oldData.total = total;
                    oldData.save((err, data) => {
                        if (err || !data) {
                            res.json("error saving old data");
                        } else {
                            res.redirect('/home');
                        }
                    })
                }
            });            
        })

        .get(ensureAuthenticated, (req, res) => {
            MusselOpened.find({username: req.user.username}, (err, data) => {
                if (err || !data) {
                    res.json("error loading data")
                } else {
                    res.send(data);
                }
        })
    });

    // Route for delete bs data
    app.route('/mo/update')
        .post(ensureAuthenticated, (req, res) => {
            var id = req.body.mID;
            MusselOpened.findByIdAndDelete(id, (err, remove) => {
                res.redirect('/mo');
            })
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };
}