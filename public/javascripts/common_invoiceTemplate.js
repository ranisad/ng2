$('#submitInvoice').click(function () {
    $(this).attr('disabled', true);
    $.post('/transaction/billing/save/invoices/', jsonData, function (data) {
        var fd = new FormData();
        var files = $('#uplFile').get(0).files;
        if (files.length > 0) {
            for (var i in files) {
                fd.append('fileToUpload', files[i]);
            }

            fd.append('id', data.result._id)

            $.ajax({
                url: "/transaction/billing/upload/invoices/",
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: function (response) {
                    window.location.href = "/transaction/billing/getinvoicelist";
                },
                error: function (jqXHR, textStatus, errorMessage) {
                    console.log(errorMessage); // Optional
                }
            });
        } else {
            window.location.href = "/transaction/billing/getinvoicelist";
        }
        return false;
    })
})


$('#TDS, #Shortage, #roundOff').on('change', function () {
    var totalAmount = parseFloat($('#hdnTotalAmount').val());
    var tds = parseFloat($('#TDS').val() ? $('#TDS').val() : 0)
    var shortage = parseFloat($('#Shortage').val() ? $('#Shortage').val() : 0);
    var roundOff = parseFloat($('#roundOff').val() ? $('#roundOff').val() : 0);
    $('#total').val(totalAmount - (tds + shortage + roundOff));
    $('#totalInWords').text(inWords($('#total').val()))
})

$('#submitunloadingInvoice').on('click', function () {
    jsonData.tds = $('#TDS').val()
    jsonData.roundOff = $('#roundOff').val()
    jsonData.finalAmount = $('#total').val()
    jsonData.shortage = $('#Shortage').val()
    jsonData.fnlFinalAmtWord = inWords($('#total').val())
    var ids = $('#objectIds').val();
    var labourRate = $('#labourRate').val();
    $(this).attr("disabled", true);
    $.post('/transaction/savenewpurchaseinvoices', { jsonData: jsonData, ids: ids, labourRate: labourRate }, function (data) {
        window.location.href = "/transaction/getNewPurchaseInvoices";
    })
})

var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

function rentMethod() {
    $('#balAmount, #tds, #shortage, #roundOff').on('change', function () {
        var totalAmount = parseFloat($('#hdnTotalAmount').val());
        var tds = parseFloat($('#tds').val() ? $('#tds').val() : 0)
        var shortage = parseFloat($('#shortage').val() ? $('#shortage').val() : 0);
        var roundOff = parseFloat($('#roundOff').val() ? $('#roundOff').val() : 0);
        $('#finalAmount').val(totalAmount - (tds + shortage + roundOff));
        $('#finalInword').text(inWords($('#finalAmount').val()))
    })

    $('#submitRentInvoice').on('click', function () {
        jsonData.tds = $('#tds').val()
        jsonData.roundOff = $('#roundOff').val()
        jsonData.finalAmount = $('#finalAmount').val()
        jsonData.shortage = $('#shortage').val()
        jsonData.fnlFinalAmtWord = inWords($('#finalAmount').val())
        var ids = $('#objectIds').val();
        $(this).attr("disabled", true);
        $.post('/transaction/billing/saveRentInvoice', { invoiceDetail: jsonData, ids: ids }, function (data) {
            var fd = new FormData();
            var files = $('#uplRentFile').get(0).files;
            if (files.length > 0) {
                for (var i in files) {
                    fd.append('fileToUpload', files[i]);
                }

                fd.append('id', data.result._id)

                $.ajax({
                    url: "/transaction/billing/upload/rentinvoices/",
                    type: "POST",
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        window.location.href = "/transaction/billing/getRentalInvoice";
                    },
                    error: function (jqXHR, textStatus, errorMessage) {
                        console.log(errorMessage); // Optional
                    }
                });
            } else {
                window.location.href = "/transaction/billing/getRentalInvoice";
            }
            return false;
        })
    })
}
