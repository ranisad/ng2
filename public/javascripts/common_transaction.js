//to hide success message
window.onload = function(){
$("#flashmsg").delay(9000).hide(0);
};
$(document).ready(function () {
  //dynamically appending post data for add rr invoice
  $(".rrlistinvoiceaddsubmit,.rrlistinvoiceviewsubmit").on("click", function (data) {
     data.preventDefault();
    var classname=$(this).attr('class')
    var actionurl;
    if(classname.includes('rrlistinvoiceaddsubmit'))
      actionurl='/transaction/formslayout/addrrinvoice'
    else if(classname.includes('rrlistinvoiceviewsubmit'))
      actionurl='/transaction/view/rrdetails'
    var form=$(this).closest('form');


    var divdata=$(this).closest(".rrobjformdata").find("input");
      form.attr("method", 'POST');
      form.attr("action",actionurl );
      divdata.appendTo(form);
      form.submit();
  })

  $(".deliverychallanaddbutton,.viewrrinvoicelist").on("click", function (data) {
     data.preventDefault();
    var classname=$(this).attr('class')
    var actionurl;
    if(classname.includes('deliverychallanaddbutton'))
      actionurl='/transaction/formslayout/adddeliverychallan'
    else if(classname.includes('viewrrinvoicelist'))
      actionurl='/transaction/view/invoiceDetails'
    var form=$(this).closest('form');
    var divdata=$(this).closest(".rrobjformdata").find("input");
    form.attr("method", 'POST');
    form.attr("action",actionurl );
    divdata.appendTo(form);
    form.submit();
  })

  //to restrict Wagon file in csv format only
  $("#formAddWagon").on("submit", function (billdata) {
    if (document.getElementById("wagonfile").value.toLowerCase().lastIndexOf(".csv") == -1) {
      alert("Please upload a file with .csv extension.");
      return false;
    } else {
      $(this).submit()
    }
  })
//to convert all inputs and textareas to UpperCase
  $('input,textarea').keyup(function() {
      this.value = this.value.toLocaleUpperCase();
  });

  $('.timepicker').pickatime({
    twelvehour: true, // change to 12 hour AM/PM clock from 24 hour
    donetext: 'OK',
    autoclose: true,
    vibrate: true // vibrate the device when dragging clock hand
  });

  $(".rrqtyinbagsclass,#packagingUnit").on("change", function (billdata) {
    var rrqtybags = $(".rrqtyinbagsclass").val()
    var weightvalue = $("#packagingUnit").val()
    if (rrqtybags != '' && weightvalue !== '' && weightvalue !== 'loose') {
      var rrqtyinmetricton = parseFloat((parseFloat(rrqtybags) * parseFloat(weightvalue)) / 1000).toFixed(2)
      $(".rrqtyinmetrictonclass").val(rrqtyinmetricton);

    } else if(weightvalue == 'loose'){
        $(".rrqtyinmetrictonclass").val(rrqtybags);
    } else{
      $(".rrqtyinmetrictonclass").val('');
    }
  })
  var checkifdropdownclicked = '';
  var getidofbutton = '';
  $(".bill_category").on("change", function (billdata) {

    var bill_category = $(this).val()
    if (bill_category) {
      $.ajax({
        type: 'POST',
        data: { 'bill_category': bill_category },
        url: '/transaction/billing/getbillformatbyCategory',
        dataType: 'JSON'

      }).done(function (billdataobj) {
        $('.bill_format').find('option').remove().end()
        $('.bill_format').append($('<option>', {
          text: "Select Bill Format"
        }));
        $.each(billdataobj, function (index, object) {

          $('.bill_format').append($('<option>', {
            value: object.name,
            text: object.name
          }));
        });
      }).fail(function (employeeid) {
        $('.bill_format').css("display", "none")
      });
    } else {
      $('.bill_format').find('option').remove().end()
      $('.bill_format').append($('<option>', {
        text: "Select Bill Format"
      }));
    }
  })
  $(".bill_format").on("change", function (billformatdata) {
    var billformatvalue = $(this).val()
    if (billformatvalue == "RST") {
      $(".rakedatadiv").css("display", "block")
      $(".partyvaluediv").css("display", "none")
      $(".stockistvaluediv").css("display", "none")

    } else if (billformatvalue == "PLX") {
      $(".rakedatadiv").css("display", "none")
      $(".partyvaluediv").css("display", "block")
      $(".stockistvaluediv").css("display", "block")
    } else {
      $(".rakedatadiv").css("display", "none")
      $(".partyvaluediv").css("display", "none")
      $(".stockistvaluediv").css("display", "none")
    }
  })
  $("#inputRRQuantity").blur(function () {
    var rrqty = $(this).val()
    $("#inputbalanceQuantity").val(rrqty);
  })
  $(".invoiceQuantitycheckclass").blur(function () {
    var totalinvoicecurrentQty = 0;
    var rrbalanceqty = parseInt($(".RRbalanceQuantity").val());
    $(".invoiceQuantitycheckclass").each(function () {
      //alert($(this).val());
      totalinvoicecurrentQty = totalinvoicecurrentQty + parseInt($(this).val());

    });
    if (totalinvoicecurrentQty > rrbalanceqty) {
      alert("invoice qty cannot be greater than RR Quantity");
      $("#btnSubmitRRInvoiceadd").prop('disabled', true);
    } else {
      $("#btnSubmitRRInvoiceadd").prop('disabled', false);
    }
  })


  $(".lr_lorryQuantity").blur(function () {
    var lr_lorryQuantity = $(this).val()
    var invoicebalanceqty = parseInt($(".invoiceBalanceQuantity").val());

    if (lr_lorryQuantity > invoicebalanceqty) {
      alert("lorry qty cannot be greater than Invoice Quantity");
      $("#btnSubmitDeliveryChallanAdd").prop('disabled', true);
    } else {
      $("#btnSubmitDeliveryChallanAdd").prop('disabled', false);
    }
  })
  /*$('select').material_select();*/
  $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
  /*$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });*/
  // $(".deliverychallanaddbutton").on("click", function (data) {

  //   data.preventDefault();

  //   var form_id = $(this).closest("form").attr('id');
  //   $("#" + form_id).attr('action', "formslayout/adddeliverychallan").submit()
  // })
  $(".addwagondata").on("click", function (data) {

    data.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    $("#" + form_id).attr('action', "formslayout/addwagondetail").submit()
  })
  $(".finalchallanaddbutton").on("click", function (data) {

    data.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    $("#" + form_id).attr('action', "formslayout/addfinalchallan").submit()
  })
  $(".rentedfinalchallanaddbutton").on("click", function (data) {

    data.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    $("#" + form_id).attr('action', "formslayout/addrentedfinalchallan").submit()
  })

  $("#inputexWeight,#inputpartyWeight").on("change", function (calculateweight) {
    var calculatedweight
    var exweight = $("#inputexWeight").val()
    var partyweight = $("#inputpartyWeight").val()
    if (exweight !== '' && partyweight !== '') {
      calculatedweight = parseFloat(exweight) - parseFloat(partyweight)
    }
    $("#inputshortorexcessweight").val(calculatedweight)
  })

  $(".vehicleNumberforAttendance,.loadLRDatefordriverattndance").on("change", function (loaddriverattendance) {
    var loadingdate = $(".loadLRDatefordriverattndance").val();
    var vehicleNumber = $(".vehicleNumberforAttendance").val();
    if (loadingdate != '' && vehicleNumber !== '') {
      $.ajax({
        type: 'POST',
        data: { "loadingdate": loadingdate, "vehicleNumber": vehicleNumber },
        url: '/transaction/formslayout/getDriverbyAttendance',
        dataType: 'text'

      }).done(function (employeeid) {

        if (employeeid !== 'error') {

          $("#driverName").val(employeeid)
          $(".select2Class").select2()
        } else {
          $("#driverName").val('')
          $(".select2Class").select2()
        }

      }).fail(function (employeeid) {
        alert("error occurred")
      });
    }
  })



  // $(document).on("change",".driverselectclass",function(e){
  //   //console.log()
  //   var selected_driver=$(this).val();
  //   var driverfullname=selected_driver.split(" ");

  //       $.ajax({
  //         type: 'GET',
  //         data:{'firstname':driverfullname[0],'lastname':driverfullname[1]},
  //         url: '/formslayout/getemployeeid',
  //         dataType: 'text'

  //         }).done(function( employeeid )
  //         {
  //           if(employeeid!=='error'){
  //             //console.log(driver_rate_value)
  //             $("#employee_id").val(employeeid)
  //           }

  //         }).fail(function(employeeid) {
  //           alert("error occurred")
  //         });
  // })
  // $("#inputwagonQuantity,#inputwagonexcessQuantity,#inputwagonshortQuantity" ).change(function(){
  //   //console.log("wagon_qty")
  //     var parentdiv=$(this).parent();
  //     var wagon_qty=$(parentdiv).find("#inputwagonQuantity").val();
  //     console.log(wagon_qty)
  //      //$("#inputwagonQuantity").val();
  //     var excess_qty=$(parentdiv).find("#inputwagonexcessQuantity").val();
  //     console.log(excess_qty)
  //     var shortage_qty=$(parentdiv).find("#inputwagonshortQuantity").val();
  //     console.log(shortage_qty)
  //     if(wagon_qty && excess_qty && shortage_qty){
  //         actual_qty=parseInt(wagon_qty)+parseInt(excess_qty)-parseInt(shortage_qty);

  //         $(parentdiv).find("#inputwagonactualQuantity").val(actual_qty)
  //         //$("#inputwagonactualQuantity").val(actual_qty);
  //     }else{
  //         actual_qty='0';
  //         $(parentdiv).find("#inputwagonactualQuantity").val(actual_qty)
  //     }

  // });
  $('.modal').modal();
  $(".lrselectclassishita").click(function (e) {
    getidofbutton = $(this).attr('id')

    e.preventDefault();
    var formdata = $("#" + getidofbutton).closest("form");

    var invqty = parseInt(formdata.find(".ishitalrinvoiceQuantity").val());

    var lorryqty = parseInt(formdata.find(".ishitalrlorryQuantity").val())
    if (lorryqty > invqty) {
      $('#modaldata').modal('open');
    } else {
      $(formdata).submit();
    }
  })
  var onloadpackagetype = $("#packaging_type").val()
  if (onloadpackagetype == "loose") {
    $(".toPlacehidden").css("display", "block")
  }
  $("#packaging_type").change(function (e) {
    var valuesel = $(this).val()
    if (valuesel == "loose") {
      $(".toPlacehidden").css("display", "block")
    } else {
      $(".toPlacehidden").css("display", "none")
    }
  })
  $("#agreeLR").click(function (e) {
    var selectedlr = getidofbutton;
    var formid = $("#" + selectedlr).closest("form");

    //console.log(formid)
    $(formid).submit();


  })

  $('#btnaddrrfield').click(function () {
    var i = 0;
    var last12 = $('.groupdiv').last();
    var first = $('.groupdiv').first();
    $(last12).find("input").each(function () {
      var input_name = $(this).attr('name').match(/\[(.*?)\]/);
      //console.log(input_name[1])

    });
    $(first).clone().find("input:not(input[type=hidden])").val("").removeAttr("placeholder").removeAttr("readonly").end().find("textarea").val("").removeAttr("readonly").end().find('select').removeAttr("disabled").removeAttr("readonly").end().find('select option').removeAttr("selected").end().find("input[type='hidden']:not(input[class=status]),.masterselect,.master").remove().end().find('.select-wrapper .select-dropdown').remove().end().find('.select-wrapper .caret').remove().end().insertAfter(last12).show();

    $('.select2Class').select2({ allowClear: true });
  });

  $('#addmoretolldetails').click(function () {
    var i = 0;
    var last12 = $('.tollDetailstable').last();
    var first = $('.tollDetailstable').first();

    $(last12).clone().find("input").each(function () {
      var nameval = this.name; this.name = nameval.replace(/(\d+)+/g,
        function (match, number) {
          return parseInt(number) + 1;
        })


    }).val("").end().find("textarea").each(function () {
      var nameval = this.name; this.name = nameval.replace(/(\d+)+/g,
        function (match, number) {
          return parseInt(number) + 1;
        })


    }).val("").end().find("file").each(function () {
      var nameval = this.name; this.name = nameval.replace(/(\d+)+/g,
        function (match, number) {
          return parseInt(number) + 1;
        })


    }).val("").end().find(".appendminussign").html('<i class="material-icons actionicon">indeterminate_check_box</i>').end().insertAfter(last12).show();


  });



  $(document).on("click", ".btnSubmitSelectedLR", function (e) {
    e.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    console.log(form_id)
    $("#" + form_id).attr('action', "/transaction/billing/viewinvoicetobegenerated").submit()
  })
  $(document).on("click", "#btnSubmitdebitorinfo", function (e) {
    //console.log()
    var debitor_name = $('#debitor_name').val()
    var date_from = $("#date_from").val()
    var date_to = $("#date_to").val();
    var from_depo = $("#from_depo").val()
    var brand_value = $("#brand_value").val()
    var rake_number = $("#rake_number").val()
    var bill_format = $("#bill_format").val()
    var stockist = $("#stockistvalue").val()
    var party = $("#partyvalue").val()
    $.ajax({
      type: 'POST',
      data: { 'debitor_name': debitor_name, 'date_from': date_from, 'date_to': date_to, 'brand_value': brand_value, "from_depo": from_depo, 'rake_number': rake_number, "bill_format": bill_format, "stockist": stockist, "party": party },
      url: '/transaction/billing/',
      dataType: 'text'

    }).done(function (LRdata) {
      $("#debitordependentLRData").html(LRdata)
      //return;

    }).fail(function (employeeid) {
      // return;
    });
  })

  $(document).on("click", ".tollDetailsminustable", function (e) {

    var thisminus = $(this).closest(".tollDetailstable");

    $(thisminus).remove();



  });




  //to change the clone elements name field to create an object depending on the name given
  $(document).on('keydown', ".fieldname", function (e) {
    if (e.which === 32)
      return false;
  })
  $(document).on('blur', ".fieldname", function (e) {
    if (e.which === 32)
      return false;
    var fieldlabelvalue = $(this).val();
    var divvalue = $(this).parent().parent();

    $(divvalue).find("input").each(function () {
      if ($(this).attr('name')) {

        var input_name = $(this).attr('name').match(/\[(.*?)\]/);
        if (input_name)
          var fieldname = input_name[1];
        var namevalue = fieldlabelvalue + "[" + fieldname + "]";

        $(this).attr('name', namevalue)
      }

    })
    $(divvalue).find("select").each(function () {
      if ($(this)) {
        var input_name = $(this).attr('name').match(/\[(.*?)\]/);
        if (input_name)
          var fieldname = input_name[1];

        var namevalue = fieldlabelvalue + "[" + fieldname + "]";
        $(this).attr('name', namevalue)
      }

    })
  });
  $(document).on("change", "#fieldtype_select", function () {

    var value = $(this).val();
    var thatelementdiv = $(this).parent().parent().parent();

    var fieldname = $(thatelementdiv).find("input[class='fieldname']").val();
    var checkifmasterexists = $(this).parent().find('.masterexists').length;
    if (fieldname)
      classname = 'mastergroupdiv' + fieldname;
    else
      classname = 'mastergroupdiv';


    var classvalue = fieldname + 'div';
    if ((value == 'dropdown' || value == 'checkbox') && checkifmasterexists !== 1) {
      if (checkifdropdownclicked !== 'dropdown') {
        $('.mastergroupdiv').clone().attr('class', classname).find('select').attr('id', '').attr('class', classvalue).attr('name', fieldname + "[master]").end().css('display', 'block').appendTo($(this).parent())
        checkifdropdownclicked = 'dropdown';
      }
      //$('select#options').clone().attr('id', 'newOptions').appendTo('.blah');

    } else {
      checkifdropdownclicked = '';
      $(thatelementdiv).find("." + classname).remove()

    }
    $('select').material_select();


  })

  $("#btnaddnewrrinvoice").unbind("click").click(function () {
    $(".select2Class").select2('destroy');
    var first = $('.invoiceform').last();

    var numItems = $('.invoiceform').length;
    if (numItems < 10)
      var newDiv = $(first).clone(true).find('.select-wrapper .select-dropdown').remove().end().find('.select-wrapper .caret').remove().end().find('input').each(function () {
        var nameval = this.name;
        this.name = nameval.replace(/(\d+)+/g,
          function (match, number) {
            return parseInt(number) + 1;
          })

        if ($(this).attr('class') == 'inputnumber' && (this.id != 'inputwagonQuantity'))
          this.value = '0';
        else
          this.value = '';


      })
        .end().find('select').each(function () {
          //
          //console.log(this)
          var selectid = this.id;
          var nameval = this.name;
          this.id = selectid.replace(/(\d+)+/g,
            function (match, number) {
              return parseInt(number) + 5;
            })
          this.name = nameval.replace(/(\d+)+/g,
            function (match1, number1) {
              return parseInt(number1) + 1;
            })

        }).attr("class", "select2 select2Class").end().insertBefore($(".appenddivs"))

    newDiv.find('.datepicker').removeClass('hasDatepicker').attr('id', "").datepicker({ dateFormat: 'yy-mm-dd' })
    $('.select2Class').select2({ allowClear: true });
    //$('select').material_select();
    //newDiv.find('.inputdate').datepicker({dateFormat: 'yy-mm-dd'});

  })
  //$("#select").select2("val");
  /* edit forms start*/
  $(".rrlistedit").on("click", function (data) {

    data.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    $("#" + form_id).attr('action', "edit/rrdetails").submit()
  })
  // $(".rrlistitemview").on("click", function (data) {

  //   data.preventDefault();

  //   var form_id = $(this).closest("form").attr('id');
  //   $("#" + form_id).attr('action', "view/rrdetails").submit()
  // })
  $(".editrrinvoicelist").on("click", function (datainv) {

    datainv.preventDefault();

    var form_idinv = $(this).closest("form").attr('id');
    $("#" + form_idinv).attr('action', "edit/editrrinvoice").submit()
  })
  $(".viewrrinvoicelist").on("click", function (data) {

    data.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    $("#" + form_id).attr('action', "view/invoiceDetails").submit()
  })
  $(".editdeliverychallan").on("click", function (datainv) {

    datainv.preventDefault();

    var form_idinv = $(this).closest("form").attr('id');
    $("#" + form_idinv).attr('action', "../transaction/edit/editdeliverychallan").submit()
  })
  $(".viewdeliverychallan").on("click", function (data) {

    data.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    $("#" + form_id).attr('action', "../transaction/view/deliverychallan").submit()
  })
  $(".editfinalchallan").on("click", function (data) {

    data.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    $("#" + form_id).attr('action', "../transaction/edit/editfinalchallan").submit()
  })

  /*edit forms end */

  /* view forms start */
  $(".viewrrdetailspage").on("click", function (data) {

    data.preventDefault();

    var form_id = $(this).closest("form").attr('id');
    $("#" + form_id).attr('action', "view/rrdetails").submit()
  })
  $(".editrrinvoicelist").on("click", function (datainv) {

    datainv.preventDefault();

    var form_idinv = $(this).closest("form").attr('id');
    $("#" + form_idinv).attr('action', "edit/editrrinvoice").submit()
  })

  /*view forms end*/
  /* $("#btnSubmitRRadd").click(function(){
       //var form_postdata=JSON.stringify($('form').has(this).serialize());
       var newRR={

       }
       $.ajax({
       type: 'POST',
       data: JSON.stringify($('#formAddUser').has(this).serialize()),
       url: '/addrrinsert',
       //contentType:"application/json",
       dataType: 'text'
       }).done(function( response )
       {
           if (response.msg !== '') {
               alert('Error: ' + response.msg);
           }else{
               alert('insert successful')
           }
       });
   });*/
});

// $(document).on("change","#toPlace",function(){
//   var selectedbelt=this.value;
//   var selecteddate=$(".loadingTimestampcustomclass").val();
//   $.ajax({
//           type: 'POST',
//           data:{'selectedbelt':selectedbelt,'currentdate':selecteddate},
//           url: '/formslayout/getincentivebybelt',

//           dataType: 'text'

//           }).done(function( driver_rate_value )
//           {
//             if(driver_rate_value!=='error'){
//               //console.log(driver_rate_value)
//               $("#belt_incentive").val(driver_rate_value)
//             }

//           }).fail(function(responsedata) {
//             alert("error occurred")
//           });


// });

// $(document).on("change","#vehicleNumber",function(){
//   var selectedvehicle=this.value;
//   var selecteddate=$(".loadingTimestampcustomclass").val();
//   $.ajax({
//           type: 'POST',
//           data:{'selectedvehicle':selectedvehicle,'currentdate':selecteddate},
//           url: '/formslayout/getincentivebyvehicle',

//           dataType: 'text'

//           }).done(function( responsedata )
//           {
//             console.log(responsedata)
//             if(responsedata!=='error'){
//               $("#truck_incentive").val(responsedata)
//             }

//           }).fail(function(responsedata) {
//             alert("error occurred")
//           });


// });



$(document).on("change", "#invoiceAssign", function () {

  var invoice_no = this.value;
  var data = ''
  $.ajax({
    type: 'POST',
    data: { 'invoice_no': invoice_no },
    url: '/formslayout/getinvoicedetailsonchange',

    dataType: 'text'
  }).done(function (responsedata) {
    objlength = Object.keys(JSON.parse(responsedata)).length
    var parseddata = JSON.parse(responsedata);
    Object.keys(parseddata).forEach(function (key, val) {
      var readonly = ''
      if (key !== 'invoiceDate' && key !== 'goodsCategory' && key !== 'invoiceGrade' && key !== 'deliveryChallan' && key !== 'invoiceBalanceQuantity' && key !== 'stockist' && key !== 'party' && key !== 'RRNumber') {
        data = data + '<div class="input-field col s6 m6 l6">'
        if (key == 'invoiceNumber')
          readonly = 'readonly'
        data = data + '<input id="' + key + '" type="text" name="invoiceDetails[' + key + ']" value="' + parseddata[key] + '" ' + readonly + '>'
        data = data + '<label class="active" for=' + key + '>' + key + '</label>'
        data = data + '</div>'
      } else {
        if (key == 'RRNumber') {
          data = data + '<input id="' + key + '" type="hidden" name=' + key + ' value="' + parseddata[key] + '">'
        } else {
          data = data + '<input id="' + key + '" type="hidden" name="invoiceDetails[' + key + ']" value="' + parseddata[key] + '">'
        }

      }

    })

    $(".appendinvoicedetails").html(data)
  });


})

function removerrfield(obj) {
  var entirediv = $(obj).parent();
  $(entirediv).css("display", "none")
  $(entirediv).children('.status').val(0);
}
$(document).ready(function () {
  $('.nav li a').click(function () {
    $('li a').removeClass("active");
    $(this).addClass("active");
  });


  $('#btnSubmit').click(function () {
    var tollyId = $('#tollyId'), tollyRate = $('#tollyRate');
    if (tollyId.val() && tollyRate.val()) {
      var obj = {
        tollyId: tollyId.val(),
        tollyRate: tollyRate.val()
      }

      $.post('/transaction/masters/addTolly', obj, function (data) {
        var res = data.result;
        tollyId.val('');
        tollyRate.val('')
        // $('#tollyData').append('<tr><td><div class="vehiclemaster"><span id="txtdata" class="spanclass tollyId">' + res.tollyId + '</span><input id="txtedit" type="text" class="tollyId" value="' + res.tollyId + '" style="display: none; height: 2rem;" class="showbutton center-align"></div></td><td><div class="vehiclemaster"><span id="txtdata" class="spanclass tollyRate">' + res.tollyRate + '</span><input id="txtedit" class="tollyRate" type="text" value="' + res.tollyRate + '" style="display: none; height: 2rem;" class="showbutton center-align"></div></td><td><button id="editbtn" type="button" value="Edit" class="actionbtn"><i title="edit" class="material-icons actionicon editbtn">edit</i></button><button id="updatebtn" type="button" value="Update" style="display: none;" class="actionbtn"><i title="Update" class="material-icons actionicon updatebtn">update</i></button><button type="button" value="Delete" class="actionbtn"><i title="Delete" class="material-icons actionicon deletebtn">delete</i></button></td></tr>')
        $('#tollyData').append('<tr></tr><tr><td><div class="vehiclemaster">'
          + '<span id="txtdata" class="spanclass tollyId">' + res.tollyId + '</span>'
          + '<input id="txtedit" type="text" value="' + res.tollyId + '" style="display: none; height: 2rem;" class="showbutton center-align tollyId">'
          + '</div></td><td><div class="vehiclemaster"><span id="txtdata" class="spanclass tollyRate">' + res.tollyRate + '</span>'
          + '<input id="txtedit" type="text" value="' + res.tollyRate + '" style="display: none; height: 2rem;" class="showbutton center-align tollyRate">'
          + '</div></td><td><button type="button" value="Edit" class="editbtn actionbtn">'
          + '<i title="edit" class="material-icons actionicon">edit</i></button>'
          + '<button type="button" value="Update" style="display: none;" class="updatebtn actionbtn">'
          + '<i title="Update" class="material-icons actionicon">update</i></button>'
          + '<button type="button" value="Delete" class="actionbtn deletebtn">'
          + '<i title="Delete" class="material-icons actionicon">delete</i></button></td></tr>');
      })
    } else {
      alert('Please enter detail.')
    }
  })

  $(document).on('click', '.editbtn', function () {
    var node = $(this);
    var td = node.parent();
    var tr = td.parent();

    td.find('.editbtn').hide();
    td.find('.updatebtn').show();
    tr.find('span.tollyId, span.tollyRate').hide();
    tr.find('input.tollyId, input.tollyRate').show();
  })

  $(document).on('click', '.updatebtn', function () {
    var node = $(this);
    var td = node.parent();
    var tr = td.parent();

    td.find('.editbtn').show();
    td.find('.updatebtn').hide();
    tr.find('span.tollyId, span.tollyRate').show();
    tr.find('input.tollyId, input.tollyRate').hide();
    var obj = {
      prevTollyId: tr.find('span.tollyId').text(),
      tollyId: tr.find('input.tollyId').val(),
      tollyRate: tr.find('input.tollyRate').val()
    }
    $.post('/transaction/masters/updateTolly', obj, function (data) {
      tr.find('span.tollyId').text(obj.tollyId);
      tr.find('span.tollyRate').text(obj.tollyRate);
    })
  })

  $(document).on('click', '.deletebtn', function () {
    var node = $(this);
    var td = node.parent();
    var tr = td.parent();
    var tollyId = tr.find('input.tollyId').val();
    $.post('/transaction/masters/deleteTolly/' + tollyId, function (data) {
      tr.remove();
    })
  })

  $('#drpTolly').on('change', function () {
    var node = $(this);
    $('#hdnTolly').val(node.val());
    $('#formAddLabour').show();
    var table = $('#LabourData');
    // table.append('<tbody></tbody>')

    $.get('/transaction/masters/labourDetail/' + node.val(), function (data) {
      table.html(data);
    })
  })

  $(document).on('click', '.laboureditbtn', function () {
    var node = $(this);
    var td = node.parent();
    var tr = td.parent();

    td.find('.laboureditbtn').hide();
    td.find('.labourupdatebtn').show();
    tr.find('span.name, span.pan').hide();
    tr.find('input.name, input.pan').show();
  })

  $(document).on('click', '.labourupdatebtn', function () {
    var node = $(this);
    var td = node.parent();
    var tr = td.parent();

    td.find('.laboureditbtn').show();
    td.find('.labourupdatebtn').hide();
    tr.find('span.name, span.pan').show();
    tr.find('input.name, input.pan').hide();
    var obj = {
      name: tr.find('input.name').val(),
      pan: tr.find('input.pan').val(),
      reg: tr.find('span.reg').text()
    }
    $.post('/transaction/masters/updateLabour', obj, function (data) {
      tr.find('span.name').text(obj.name);
      tr.find('span.pan').text(obj.pan);
    })
  })

  $(document).on('click', '.labourdeletebtn', function () {
    var node = $(this);
    var td = node.parent();
    var tr = td.parent();
    var obj = {
      tollyId: $('#hdnTolly').val(),
      reg: tr.find('span.reg').text()
    }
    $.post('/transaction/masters/deleteLabour', obj, function (data) {
      tr.remove();
    })
  })

  if (getParameterByName('tollyId')) {
    $('#drpTolly').val(getParameterByName('tollyId'));
    $('#drpTolly').trigger('change')
  }

  $('#btnplaceSubmit').on('click', function () {
    var name = $('#placeName'),
      type = $('#placeType'),
      address = $('#address');
    var table = $('#placeData')
    if (name.val() && type.val()) {
      var obj = {
        name: name.val().toUpperCase(),
        placeType: type.val(),
        address: address.val()
      }
      $.post('/transaction/masters/addPlace', obj, function (response) {

        if (response.success == true) {
          var resJson = response.result;
          table.append('<tr>\
                        <td>\
                            <div class="vehiclemaster"><span id="txtdata" class="spanclass placename">'+ resJson.name + '</span>\
                                <input id="txtedit" type="text" value="'+ resJson.name + '" style="display: none; height: 2rem;" class="showbutton center-align placename">\
                            </div>\
                        </td>\
                        <td>\
                            <div class="vehiclemaster"><span id="txtdata" class="spanclass placetype">'+ resJson.placeType + '</span>\
                                <input id="txtedit" list="suggestions" type="text" value="'+ resJson.placeType + '" style="display: none; height: 2rem;" class="showbutton center-align placetype">\
                            </div>\
                        </td>\
                        <td>\
                            <div class="vehiclemaster"><span id="txtdata" class="spanclass address">'+ resJson.address + '</span>\
                                <input id="txtedit" type="text" value="'+ resJson.address + '" style="display: none; height: 2rem;" class="showbutton center-align address">\
                            </div>\
                        </td>\
                        <td>\
                            <button type="button" value="Edit" class="placeeditbtn actionbtn"><i title="edit" class="material-icons actionicon">edit</i></button>\
                            <button type="button" value="Update" style="display: none;" documentid="'+ resJson._id + '" class="placeupdatebtn actionbtn"><i title="Update" class="material-icons actionicon">update</i></button>\
                            <button type="button" value="Delete" documentid="'+ resJson._id + '" class="actionbtn placedeletebtn"><i title="Delete" class="material-icons actionicon">delete</i></button>\
                        </td>\
                    </tr>')
        } else {
          alert(response.result.toString())
        }
      })
    } else {
      alert('Please enter detail.')
    }
  })

  $(document).on('click', '.placedeletebtn', function () {
    var node = $(this);
    var documentId = node.attr('documentId');
    $.get('/transaction/masters/deletePlace/' + documentId, function (data) {
      node.parent().parent().remove()
    })
  })

  $(document).on('click', '.placeeditbtn', function () {
    var node = $(this);
    var td = node.parent();
    var tr = td.parent();

    td.find('.placeeditbtn').hide();
    td.find('.placeupdatebtn').show();
    tr.find('span.placename,  span.address').hide();
    tr.find('input.placename, input.address').show();
  })

  $(document).on('click', '.placeupdatebtn', function () {
    var node = $(this);
    var td = node.parent();
    var tr = td.parent();

    td.find('.placeeditbtn').show();
    td.find('.placeupdatebtn').hide();
    tr.find('span.placename, span.address').show();
    tr.find('input.placename, input.address').hide();
    var obj = {
      name: tr.find('input.placename').val().toUpperCase(),
      placeType: tr.find('input.placetype').val(),
      address: tr.find('input.address').val()
    }
    $.post('/transaction/masters/updatePlace/' + node.attr('documentId'), obj, function (data) {
      if (data.success == true) {
        tr.find('span.placename').text(obj.name);
        tr.find('span.placetype').text(obj.placeType);
        tr.find('span.address').text(obj.address)
      }
      else {
        tr.find('input.placename').val(tr.find('span.placename').text());
        tr.find('input.placetype').val(tr.find('span.placetype').text());
        tr.find('input.address').val(tr.find('span.address').text());
        alert(data.result.toString())
      }
    })
  })

  $('#drpTolly_lr').on('change', function () {
    var node = $(this);
    var tollyId = node.val();
    var labourDrp = $('#drpLabour_lr');
    labourDrp.find("option:not(:first)").remove();
    $.get('/transaction/masters/getlabourbytolly/' + tollyId, function (data) {
      $.each(data.result, function (key, val) {
        labourDrp.append('<option value="' + val + '">' + val + '</option>')
      });
    })
  })

  $('#drpLabour_lr').on('change', function () {
    var node = $(this);
    var tollyId = $('#drpTolly_lr').val();


    $.get('/transaction/masters/getlabourdetail/' + tollyId + '/' + node.val(), function (data) {
      var response = data.result[0];
      $('#panno_lr').val(response.labours[0].pan).focus().attr('disabled', true);
      $('#regno_lr').val(response.labours[0].reg).focus().attr('disabled', true);
      $('#labourrate_lr').val(response.tollyRate).focus();
      $('#hdnRate').val(response.tollyRate)
    })
  })

  $('#btnOpenModal').on('click', function () {
    var node = $(this);
    var table = $('#LRData');
    var checkedInput = table.find('input[type=checkbox]:checked');
    if (checkedInput.length > 0) {

      var selectedLR = [];
      checkedInput.each(function () {
        selectedLR.push($(this).val())
      })
      $('#hdnLrIds').val(selectedLR);
      $('#HamaliRatemodal').modal('open');
    } else {
      alert('Please select LR to update');
    }
  })

  $('#btnGenerateInvoice').on('click', function () {
    var node = $(this);
    var table = $('#LRData');
    var checkedInput = table.find('input[type=checkbox]:checked');
    if (checkedInput.length > 0) {

      var selectedLR = [];
      checkedInput.each(function () {
        selectedLR.push($(this).val())
      })
      var form = document.createElement("form");
      form.setAttribute("method", 'POST');
      form.setAttribute("action", '/transaction/billing/generaterentperchaseinvoice');
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", 'id');
      hiddenField.setAttribute("value", selectedLR);

      form.appendChild(hiddenField);
      document.body.appendChild(form);
      form.submit();
      // $.get('/transaction/billing/generaterentperchaseinvoice', { id: selectedLR }, function (data) {

      // })
    } else {
      alert('Please select LR to update');
    }
  })

  $('#drpOwner').on('change', function () {
    var apiPath = $('#postApiPath').attr('value')
    var node = $(this);

    var vehicleDrp = $('#drpVehicle');
    var table = $('#addUnloadingTable');
    vehicleDrp.find("option:not(:first)").remove();
    if (node.val()) {
      var obj = {
        owner: node.val(),
        datefrom: $('#dateFrom').val(),
        dateto: $('#dateto').val()
      }
      $.post(apiPath, obj, function (data) {
        table.html(data);
      })
      $.get('/transaction/getVehicleByOwner?owner=' + node.val(), function (data) {
        $.each(data.result, function (key, val) {
          vehicleDrp.append('<option value="' + val + '">' + val + '</option>')
        });
      })
    }
  });

  $('#drpVehicle').on('change', function () {
    var apiPath = $('#postApiPath').attr('value')
    var node = $(this);
    var table = $('#addUnloadingTable');
    var obj = {
      datefrom: $('#dateFrom').val(),
      dateto: $('#dateto').val(),
      vehicleNo: node.val()
    }
    $.post(apiPath, obj, function (data) {
      table.html(data);
    })
  });
  $('#dateFrom, #dateto').on('change', function () {
    var apiPath = $('#postApiPath').attr('value')
    var invoiceType = $('#postApiPath').attr('invoiceType')
    var table = $('#addUnloadingTable');
    if ($('#drpOwner').val() || $('#drpVehicle').val()) {
      var obj = {
        datefrom: $('#dateFrom').val(),
        dateto: $('#dateto').val(),
        owner: $('#drpOwner').val(),
        vehicleNo: $('#drpVehicle').val()
      }
      $.post(apiPath, obj, function (data) {
        table.html(data);
      })
    } else if (!invoiceType && ($('#dateFrom').val() && $('#dateto').val())) {
      var obj = {
        datefrom: $('#dateFrom').val(),
        dateto: $('#dateto').val(),
      }
      $.post(apiPath, obj, function (data) {
        table.html(data);
      })
    }
  })
});

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function minmax(value, min, max) {
  if (!max)
    max = $('#hdnRate').val()
  if (parseInt(value) < min || isNaN(parseInt(value)))
    return '';
  else if (parseInt(value) > max) {
    alert('maximum hamali amount for tolly is ' + max);
    return max;
  }
  else return value;
}

function printInvoice(e) {
  var node = $(e);
  window.location.href = "/transaction/newpurchaseInvoice/" + node.attr("objectId");
}

function printBillingInvoices(e) {
  var node = $(e);
  window.location.href = "/transaction/billing/generateSubmittedInvoice/" + node.attr("objectId");
}

function printrentalInvoices(e) {
  var node = $(e);
  window.location.href = "/transaction/billing/generateSubmittedRentalInvoice/" + node.attr("objectId");
}