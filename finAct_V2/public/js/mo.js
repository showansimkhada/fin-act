var moDate = document.getElementById('moDate');
var weekdays = document.getElementById('weekdays');
var spot = document.getElementById('spot');
var a = document.getElementById('fShift');
var b = document.getElementById('sShift');
var c = document.getElementById('tShift');
var moTotal = document.getElementById('moTotal');

if (document.getElementsByTagName('meta').item(property='name').content == 'HOME') {

    spot.value = 0;
    a.value = 0;
    b.value = 0;
    c.value = 0;
    moTotal.value = 0;
    const currentDate = formatDate(Date());

    moDate.value = currentDate;

    getWeekday();
}

function getWeekday() {
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    weekdays.value = weekDays[new Date(moDate.value).getDay()];
}

function sumMo() {
    moTotal.value = parseInt(a.value) + parseInt(b.value) + parseInt(c.value);
}

// Formating dates
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = '' + d.getFullYear();
        
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
}