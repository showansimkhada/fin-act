$( document ).ready(function() {
    let balanceSheet = [];
    $.getJSON('/api/bs', (data) => {
        $.each(data, (i, val) => {
            var date = new Date(val.date);
            balanceSheet.push('<tr><td>' + formatDate(date) + 
                '</td>'+ '<td>' + val.showanWE + 
                '</td>' + '<td>' + val.swastikaWE + 
                '</td>' + '<td>' + val.return + 
                '</td>' + '<td>' + val.openingBalance + 
                '</td>' + '<td>' + val.closingBalance + 
                '</td>' + '<td>' + val.weeklySpent + 
                '</td>' + '<td>' + val.weeklySave + '</td></tr>');
        });
        $('<tbody>', {
            'class': "output",
            html: balanceSheet.join('')
        }).appendTo('#bs_output');
        let lastEntry = data[data.length-1];
        $('#opening_balance').val(lastEntry.closingBalance);
    });
    let mussleOpened = [];
    $.getJSON('/api/mo', (data) => {
        $.each(data, (i, val) => {
            var date = new Date(val.date);
            mussleOpened.push('<tr><td>' + formatDate(date) + 
                '</td>'+ '<td>' + val.weekday +
                '</td>' + '<td>' + val.fShift + 
                '</td>' + '<td>' + val.sShift + 
                '</td>' + '<td>' + val.tShift + 
                '</td>' + '<td>' + val.total + '</td></tr>')
        });
        $('<tbody>', {
            'class': "output",
            html: mussleOpened.join('')
        }).appendTo('#mo_output');
        let lastEntry = data[data.length-1];
        if (formatDate(Date()) == formatDate(lastEntry.date)) {
            console.log("true")
            $('#fShift').val(lastEntry.fShift);
            $('#sShift').val(lastEntry.sShift);
            $('#tShift').val(lastEntry.tShift);
            $('#moTotal').val(lastEntry.total);
        }
    })
});

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
        return [day, month, year].join('/');
}