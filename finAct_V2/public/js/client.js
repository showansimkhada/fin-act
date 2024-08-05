// Select what's inside of the input when clicked
$(function(){
    $(document).on('click','input',function(){ this.select(); });
});

// Getting page description
let check = document.querySelector('meta[name="description"]').content;

// Loading datas on the pages
$( document ).ready(function() {
    if (check === 'HOME') {
        $('#home').addClass('active').focus();
    }
    if (check === 'BS') {
        $('#balance').addClass('active').focus();
    }
    if (check === 'MO') {
        $('#mussel').addClass('active').focus();
    }
    if (check === 'PROFILE') {
        $('#profile').addClass('active').focus();
    }
    // For balance sheet and mussel opened auto complete forms
    let bsDate = $('#bsDate').val();
    if (bsDate) {
        $.getJSON('/bs/data', (data) => {
            data.map((x) => {
                if (formatDate(x.date) == bsDate) {
                    $('#fWE').val(x.fWE);
                    $('#sWE').val(x.sWE);
                    $('#ret').val(x.return);
                    $('#oB').val(x.openingBalance);
                    $('#cB').val(x.closingBalance);
                    $('#wSp').val(x.weeklySpent);
                    $('#wSa').val(x.weeklySave);
                }
            })
        })
    }
    let moDate = $('#moDate').val();
    if (moDate) {
        $.getJSON('/mo/data', (data) => {
            data.map((x) => {
                if (formatDate(x.date) == moDate) {
                    $('#spot').val(x.spot);
                    $('#fShift').val(x.fShift);
                    $('#sShift').val(x.sShift);
                    $('#tShift').val(x.tShift);
                    $('#moTotal').val(x.total);
                }
            })
        })
    }
    $('#bsDate').change(function() {
        let bsDate = $('#bsDate').val();
        $.getJSON('/bs/data', (data) => {
            data.map((x) => {
                if (formatDate(x.date) === bsDate) {
                    $('#fWE').val(x.fWE);
                    $('#sWE').val(x.sWE);
                    $('#ret').val(x.return);
                    $('#oB').val(x.openingBalance);
                    $('#cB').val(x.closingBalance);
                    $('#wSp').val(x.weeklySpent);
                    $('#wSa').val(x.weeklySave);
                }
            })
        })
    })
    $('#moDate').change(function() {
        let moDate = $('#moDate').val();
        $.getJSON('/mo/data', (data) => {
            data.map((x) => {
                if (formatDate(x.date) === moDate) {
                    $('#weekdays').val(x.weekday);
                    $('#spot').val(x.spot);
                    $('#fShift').val(x.fShift);
                    $('#sShift').val(x.sShift);
                    $('#tShift').val(x.tShift);
                    $('#moTotal').val(x.total);
                }
            })
        })
    })

    // For balance sheet
    let bS = [];
    $.getJSON('/bs/data', (data) => {
        let sumfWE = 0;
        let sumsWE = 0;
        let sumWSp = 0;
        let sumWSa = 0;
        if (data) {
            data.sort((a, b) => {
                return new Date(b.date) < new Date(a.date)
            })
        }
        if (check == 'BS') {
            $.each(data, (i, val) => {
                bS.push('<tr class="trBS"><td>' + val.date + 
                    '</td>'+ '<td>' + val.fWE + 
                    '</td>' + '<td>' + val.sWE + 
                    '</td>' + '<td>' + val.return + 
                    '</td>' + '<td>' + val.openingBalance + 
                    '</td>' + '<td>' + val.closingBalance + 
                    '</td>' + '<td>' + val.weeklySpent + 
                    '</td>' + '<td>' + val.weeklySave + 
                    '</td>' + '<td hidden>' + val._id + '</td></tr>');
                sumfWE += val.fWE;
                sumsWE += val.sWE;
                sumWSp += val.weeklySpent;
                sumWSa += val.weeklySave;
                if (i == data.length-1){
                    bS.push('<tr class="totalSum bg-warning"><td> Total</td>' +
                                '<td>' + parseFloat(sumfWE).toFixed(2) + '</td>' + 
                                '<td>' + parseFloat(sumsWE).toFixed(2) + '</td>' +
                                '<td colspan="3"></td>' + 
                                '<td>' + parseFloat(sumWSp).toFixed(2) + '</td>' +
                                '<td>' + parseFloat(sumWSa).toFixed(2) + '</td></tr>');
                    sumfWE = 0;
                    sumsWE = 0;
                    sumWSp = 0;
                    sumWSa = 0;
                }
            });
            if (data.length > 0) {
                $('#oB').val(data[data.length-1].closingBalance);
            }
        } else {
            $.each(data.reverse(), (i, val) => {
                if (i < 3) {
                    bS.push('<tr><td>' + val.date + 
                        '</td>'+ '<td>' + val.fWE + 
                        '</td>' + '<td>' + val.sWE + 
                        '</td>' + '<td>' + val.return + 
                        '</td>' + '<td>' + val.openingBalance + 
                        '</td>' + '<td>' + val.closingBalance + 
                        '</td>' + '<td>' + val.weeklySpent + 
                        '</td>' + '<td>' + val.weeklySave + 
                        '</td>' + '<td hidden>' + val._id + '</td></tr>');
                }
            });
            bS.reverse();
        }
        $('<tbody>', {
            'class': 'bsOutputData',
            html: bS.join('')
        }).appendTo('#bsOutput');
        if (data.length-1 > 1) {
            let lastEntry = data.reverse()[data.length-1];
            $('#oB').val(lastEntry.closingBalance);
        }
    });

    // For mussel opened
    let mussleOpened = [];
    $.getJSON('/mo/data', (data) => {
        // Acending order
        if (data) {
            data.sort((a, b) => {
                return new Date(b.date) < new Date(a.date)
            })
        }

        // Loading into MO page or home page
        let sum = 0;
        let CWN = -1;
        let PWN = 0;
        if (check == 'MO') {
            $.each(data, (i, val) => {
                if (CWN === -1) {
                    CWN = getWeekNumber(val.date);
                }
                PWN = getWeekNumber(val.date);
                if (PWN != CWN) {
                    mussleOpened.push('<tr class="weekSum bg-warning"><td colspan="6"> Week Total</td>' +
                                '<td>' + sum + '</td></tr>');
                    CWN = PWN;
                    sum = 0;
                }              
                mussleOpened.push('<tr class="trMO"><td>' + val.date +
                                '</td>' + '<td>' + val.weekday + 
                                '</td>' + '<td>' + val.spot + 
                                '</td>' + '<td>' + val.fShift + 
                                '</td>' + '<td>' + val.sShift + 
                                '</td>' + '<td>' + val.tShift + 
                                '</td>' + '<td>' + val.total + 
                                '</td>' + '<td hidden>' + val._id + '</td></tr>');
                if (CWN === PWN) {
                    sum += val.total;
                }
                if (i == data.length-1){
                    mussleOpened.push('<tr class="weekSum bg-warning"><td colspan="6"> Week Total</td>' +
                                '<td>' + sum + '</td></tr>');
                    CWN = PWN;
                    sum = 0;
                }
            });
        } else {
            // Loading this current week data
            $.each(data.reverse(), (i, val) => {
                if (CWN === -1) {
                    CWN = getWeekNumber(val.date);
                }
                PWN = getWeekNumber(val.date);
                if (CWN === PWN) {
                    mussleOpened.push('<tr><td>' + val.date +
                                '</td>' + '<td>' + val.spot + 
                                '</td>' + '<td>' + val.fShift + 
                                '</td>' + '<td>' + val.sShift + 
                                '</td>' + '<td>' + val.tShift + 
                                '</td>' + '<td>' + val.total + 
                                '</td>' + '<td hidden>' + val._id + '</td></tr>')
                    if (CWN === PWN) {
                        sum += val.total;
                    }
                }
            });
            $('#weekTotal').val(sum);
            // Arranging order
            mussleOpened.reverse();
        }
        $('<tbody>', {
            'class': 'moOutputData',
            html: mussleOpened.join('')
        }).appendTo('#moOutput');
    })

    // for profile
    $.getJSON('/profile/data', (data) => {
        $('#username').val(data.username);
        $('#firstname').val(data.firstname);
        $('#lastname').val(data.lastname);
        $('#sfirstname').val(data.sfirstname);
        $('#slastname').val(data.slastname);
    })
})

// Click event for table rows only for BS and MO page
if (check == 'MO' || check == 'BS') {
    var uBC = $('#updateBoxContainer');
    $('#ok').click(function () {
        uBC.css('display', 'none');
    });
    $(document).ready(function() {
        $('#bsOutput').on('click', 'tbody .trBS', function() {
            var row = $(this).closest('tr');
            let date = row.find('td').eq(0).text();
            let fWE = row.find('td').eq(1).text();
            let sWE = row.find('td').eq(2).text();
            let ret = row.find('td').eq(3).text();
            let oB = row.find('td').eq(4).text();
            let cB = row.find('td').eq(5).text();
            let wSp = row.find('td').eq(6).text();
            let wSa = row.find('td').eq(7).text();
            let id = row.find('td').eq(8).text();
            uBC.find('#eDate').val(date);
            uBC.find('#fWE').val(fWE);
            uBC.find('#sWE').val(sWE);
            uBC.find('#ret').val(ret);
            uBC.find('#oB').val(oB);
            uBC.find('#cB').val(cB);
            uBC.find('#wSp').val(wSp);
            uBC.find('#wSa').val(wSa);
            uBC.find('#oID').val(id);
            uBC.css('display', 'flex');
        })

        // Select table by id and select child of table (tbody and tr)
        $('#moOutput').on('click', 'tbody .trMO', function() {
            var row = $(this).closest('tr');
            let date = row.find('td').eq(0).text();
            let weekday = row.find('td').eq(1).text();
            let spot = row.find('td').eq(2).text();
            let fShift = row.find('td').eq(3).text();
            let sShift = row.find('td').eq(4).text();
            let tShift = row.find('td').eq(5).text();
            let total = row.find('td').eq(6).text();
            let id = row.find('td').eq(7).text();
            uBC.find('#moDate').val(date);
            uBC.find('#weekdays').val(weekday);
            uBC.find('#spot').val(spot);
            uBC.find('#fShift').val(fShift);
            uBC.find('#sShift').val(sShift);
            uBC.find('#tShift').val(tShift);
            uBC.find('#moTotal').val(total);
            uBC.find('#mID').val(id);
            uBC.css('display', 'flex');
        })
    })
}

// Get week number
function getWeekNumber(date) {
    let cD = new Date(date);
    let sD = new Date(cD.getFullYear(), 0, 1);
    var days = Math.floor((cD - sD) / (24 * 60 * 60 * 1000));
    var num = Math.ceil(days / 7);
    return num;
}