// Get required elements for som of accounts
const go = document.getElementById('go');
const online = document.getElementById('online');
const serious = document.getElementById('serious');
const total = document.getElementById('aTotal');

// Get required elements to post data
const bsDate = document.getElementById('bsDate');
const fWE = document.getElementById('fWE');
const sWE = document.getElementById('sWE');
const ret = document.getElementById('ret');
const oB = document.getElementById('oB');
const cB = document.getElementById('cB');
const wSp = document.getElementById('wSp');
const wSa = document.getElementById('wSa');

if (document.getElementsByTagName('meta').item(property='name').content == 'HOME'){
    go.value = 0;
    online.value = 0;
    serious.value = 0;
    total.value = 0;
    const cD = formatDate(Date());
    bsDate.value = cD;

    // Set all values to 0 except closing balance
    fWE.value = 0;
    sWE.value = 0;
    ret.value = 0;
    oB.value = 0;
    wSp.value = 0;
    wSa.value = 0;
    cB.value = 0;
}


// Getting total sum of all accounts
function sumBs() {
    total.value = (parseFloat(go.value) + parseFloat(online.value) + parseFloat(serious.value)).toFixed(2);
    cB.value = total.value;
    weeklySpent();
    weeklySave();
}

function weeklySpent(){
    wSp.value = (parseFloat(fWE.value) + parseFloat(sWE.value) + parseFloat(ret.value) + parseFloat(oB.value) - parseFloat(cB.value)).toFixed(2);
}

function weeklySave() {
    wSa.value = (parseFloat(cB.value) - parseFloat(oB.value) - parseFloat(ret.value)).toFixed(2);
    weeklySpent();
}

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