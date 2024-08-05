'use strict';

const BalanceSheet = require('../connection/model.js').BS;
const MusselOpened = require('../connection/model.js').MO;

module.exports = app => {
    app.route('/api/bs')
        .post((req, res) => {
            let date = req.body.bs_date;
            let weSh = req.body.weekly_earn_sh;
            let weSw = req.body.weekly_earn_sw;
            let ret = req.body.ret;
            let ob = req.body.opening_balance;
            let cb = req.body.closing_balance;
            let wSp = req.body.weekly_spent;
            let wSa = req.body.weekly_save;
            let username = "showan";

            // create new BS
            const balanceSheet = new BalanceSheet({
                username: username,
                date: date,
                showanWE: weSh,
                swastikaWE: weSw,
                return: ret,
                openingBalance: ob,
                closingBalance: cb,
                weeklySpent: wSp,
                weeklySave: wSa
            });


            BalanceSheet.findOne({date: date}, (err, oldData) =>{
                if (!oldData) {
                    balanceSheet.save((err, data) => {
                        if (err || !data) {
                            res.json("error saving data");
                        } else {
                            res.redirect('/');
                        }
                    })
                } else {
                    oldData.showanWE = weSh;
                    oldData.swastikaWE = weSw;
                    oldData.return = ret;
                    oldData.openingBalance = ob;
                    oldData.closingBalance = cb;
                    oldData.weeklySpent = wSp;
                    oldData.weeklySave = wSa;
                    oldData.save((err, data) => {
                        if (err || !data) {
                            res.json("error saving data")
                        } else {
                            res.redirect("/");
                        }
                    })
                }
            })            
        })

        .get((req, res) => {
            BalanceSheet.find({}, (err, data) => {
                if (err || !data) {
                    res.json("error loading data")
                } else {
                    res.send(data);
                }
            })
        });

    app.route('/api/mo')
        .post((req, res) => {
            let username = "showan";
            let date = req.body.mo_date;
            let weekdays = req.body.weekdays;
            let fShift = req.body.fShift;
            let sShift = req.body.sShift;
            let tShift = req.body.tShift;
            let total = req.body.moTotal;

            // create new MO
            const musselOpened = new MusselOpened({
                username: username,
                date: date,
                weekday: weekdays,
                fShift: fShift,
                sShift: sShift,
                tShift: tShift,
                total: total
            });

            MusselOpened.findOne({date: date}, (err, oldData) => {
                if(!oldData) {
                    musselOpened.save((err, data) => {
                        if (err || !data) {
                            res.json("error saving data")
                        } else {
                            res.redirect('/');
                        }
                    });
                } else {
                    oldData.fShift = fShift;
                    oldData.sShift = sShift;
                    oldData.tShift = tShift;
                    oldData.total = total;
                    oldData.save((err, data) => {
                        if (err || !data) {
                            res.json("error saving data");
                        } else {
                            res.redirect('/');
                        }
                    })
                }
            })

            
        })

        .get((req, res) => {
            MusselOpened.find({}, (err, data) => {
                if (err || !data) {
                    res.json("error loading data")
                } else {
                    res.send(data);
                }
            })
        })
}