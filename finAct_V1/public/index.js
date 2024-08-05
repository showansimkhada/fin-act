const currentDate = Date(Date.now());

var go = document.getElementById('go');
var online = document.getElementById('online');
var serious = document.getElementById('serious');
var currentBalance = document.getElementById('currentBalance');

go.value = 0;
online.value = 0;
serious.value =0;
currentBalance.value = 0;

var bsDate = document.getElementById('bs_date');
var weSh = document.getElementById('weekly_earn_sh');
var weSw = document.getElementById('weekly_earn_sw');
var ret = document.getElementById('ret');
var ob = document.getElementById('opening_balance');
var cb = document.getElementById('closing_balance');
var wSp = document.getElementById('weekly_spent');
var wSa = document.getElementById('weekly_save');

bsDate.valueAsDate = currentDate;
weSh.value = 0;
weSw.value = 0;
ret.value = 0;
ob.value = 0;
cb.value = 0;
wSp.value = 0;
wSa.value = 0;

function sumBS() {
    currentBalance.value = (parseFloat(go.value) + parseFloat(online.value) + parseFloat(serious.value)).toFixed(2);
    cb.value = currentBalance.value;
}

function weeklySave() {
    wSa.value = (parseFloat(cb.value) - parseFloat(ob.value) - parseFloat(ret.value)).toFixed(2);
}

function weeklySpent(){
    wSp.value = (parseFloat(weSh.value) + parseFloat(weSw.value) + parseFloat(ret.value) + parseFloat(ob.value) - parseFloat(cb.value)).toFixed(2);
}

var moDate = document.getElementById('mo_date');
var weekdays = document.getElementById('weekdays');
var a = document.getElementById('fShift');
var b = document.getElementById('sShift');
var c = document.getElementById('tShift');
var moTotal = document.getElementById('moTotal');

moDate.valueAsDate = currentDate;
getWeekday();
a.value = 0;
b.value = 0;
c.value = 0;
moTotal.value = 0;

function getWeekday() {
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    weekdays.value = weekDays[new Date(moDate.value).getDay()];
}

function sumMO() {
    moTotal.value = parseInt(a.value) + parseInt(b.value) + parseInt(c.value);
}