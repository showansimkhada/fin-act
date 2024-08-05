const BalanceSheet = require('../Schema/model').BS;

module.exports = app => {
    app.route('/bs').get(ensureAuthenticated, (req, res) => {
        res.render('bs', {username: req.user.username, firstname: req.user.firstname, sfirstname: req.user.sfirstname})
    })

    app.route('/bs/data')
        .post(ensureAuthenticated, (req, res) => {
            let username = req.user.username;
            let bsDate = req.body.bsDate;
            let fWE = req.body.fWE;
            let sWE = req.body.sWE;
            let ret = req.body.ret;
            let oB = req.body.oB;
            let cB = req.body.cB;
            let wSp = req.body.wSp;
            let wSa = req.body.wSa;

            // create new BS
            const balanceSheet = new BalanceSheet({
                username: username,
                date: bsDate,
                fWE: fWE,
                sWE: sWE,
                return: ret,
                openingBalance: oB,
                closingBalance: cB,
                weeklySpent: wSp,
                weeklySave: wSa
            });

            BalanceSheet.findOne({username: username, date: bsDate}, (err, oldData) =>{
                if (!oldData) {
                    balanceSheet.save((err, data) => {
                        if (err || !data) {
                            console.log(err)
                            res.json("error saving new data");
                        } else {
                            res.redirect('/home');
                        }
                    })
                } else {
                    oldData.date = bsDate;
                    oldData.fWE = fWE;
                    oldData.sWE = sWE;
                    oldData.return = ret;
                    oldData.openingBalance = oB;
                    oldData.closingBalance = cB;
                    oldData.weeklySpent = wSp;
                    oldData.weeklySave = wSa;
                    oldData.save((err, data) => {
                        if (err || !data) {
                            res.json("error saving old data")
                        } else {
                            res.redirect('/home');
                        }
                    })
                }
            })            
        })

        .get(ensureAuthenticated, (req, res) => {
            BalanceSheet.find({username: req.user.username}, (err, data) => {
                if (err || !data) {
                    res.json("error loading data")
                } else {
                    res.send(data);
                }
        })

        app.route('/bs/update')
            .post(ensureAuthenticated, (req, res) => {
                var id = req.body.oID;
                BalanceSheet.findByIdAndDelete(id, (err, remove) => {
                    res.redirect('/bs');
                })
            });
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };
}