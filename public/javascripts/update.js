function onCallUpdate(obj,link) {
  var a=$(obj).parent().parent();
  var b=$(a).find("td");
  var previousValue=$(b[0]).find("#txtdata").text();
  var newValue=$(b[0]).find("#txtedit").val();


  var settings = {
    "url": "/transaction/masters/"+link,
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "data": "{\"previousValue\":\""+previousValue+"\",\"newValue\":\""+newValue+"\"}"
  }
  request = $.ajax(settings);
  request.done(function(msg) {
    var str2="restricted to this page";
    if(msg.indexOf(str2)!=-1){
      alert("Restricted to this page!!");
    }else{
      location.reload();
    }
      
    });
    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });
}


function onCallDelete(obj,link) {
  var a=$(obj).parent().parent();
  var b=$(a).find("td");
  var deleteVale=$(b[0]).find("#txtdata").text();
  $("#myModalDel").modal('open');
  $('#myModalDelOkBtn').attr('onclick', 'confirmDelete("'+deleteVale+'","'+link+'")');
  $('#myModalDelCanBtn').attr('onclick', 'closeModal()');
  //$("#myModalDel").modal('open',function(){
   // console.log("test");
    // var settings = {
    //     "url": "/masters/"+link,
    //     "method": "POST",
    //     "headers": {
    //       "content-type": "application/json"
    //     },
    //     "data": "{\"deletevalue\":\""+deleteVale+"\"}"
    //   }
    //   request = $.ajax(settings);
    //   request.done(function(msg) {
    //       //console.log("MSG: "+msg);
    //       location.reload();
    //     });
    //     request.fail(function(jqXHR, textStatus) {
    //       alert( "Request failed: " + textStatus );
    //     });
 // });

}
function confirmDelete(deleteVale,link) {
  var settings = {
        "url": "/transaction/masters/"+link,
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        "data": "{\"deletevalue\":\""+deleteVale+"\"}"
      }
      request = $.ajax(settings);
      request.done(function(msg) {
          //console.log("MSG: "+msg);
           var str2="restricted to this page";
            if(msg.indexOf(str2)!=-1){
              alert("Restricted to this page!!");
            }else{
              location.reload();
            }
        });
        request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        });
}

function closeModal(){
  $("#myModalDel").modal('close');
}


function onEditHide(obj){
  var a=$(obj).parent().parent();
  var b=$(a).find("td");
  $(b[0]).find("#txtdata").hide();
  $(b[0]).find("#txtedit").show();
  $(b[1]).find("#editbtn").hide();
  $(b[1]).find("#updatebtn").show();

}

function onInsert(link){
  var input=$(txtinsert).val();

    var settings = {
    "url": "/transaction/masters/"+link,
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "data": "{\"addvalue\":\""+input+"\"}"
  }

  request = $.ajax(settings);
  request.done(function(msg) {

      var str2="restricted to this page";
            if(msg.indexOf(str2)!=-1){
              alert("Restricted to this page!!");
            }else{
              location.reload();
            }
    });
    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });
}


function onCallDeleteCompany(obj) {
  var a=$(obj).parent().parent().parent();
  var b=$(a).find("input");
  var deleteVale=$(a[0][0]).val();
  $("#myModalDel").modal('open');
  $('#myModalDelOkBtn').attr('onclick', 'confirmDeleteCompany("'+deleteVale+'","deletecompany")');
  $('#myModalDelCanBtn').attr('onclick', 'closeModal()');
  
    
}
function confirmDeleteCompany(deleteVale,link) {
  var settings = {
        "url": "/transaction/formslayout/"+link,
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        "data": "{\"companyName\":\""+deleteVale+"\"}"
      }
      request = $.ajax(settings);
      request.done(function(msg) {
          //console.log("MSG: "+msg);
           var str2="restricted to this page";
            if(msg.indexOf(str2)!=-1){
              alert("Restricted to this page!!");
            }else{
              if(msg=="1"){
              location.reload();
              }else{
                alert(msg)
              }
            }
        });
        request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        });
}

function onCallDeleteEmployee(obj) {
  var a=$(obj).parent().parent().parent();
  var b=$(a).find("input");
  var deleteVale=$(a[0][0]).val();
  $("#myModalDel").modal('open');
  $('#myModalDelOkBtn').attr('onclick', 'confirmDeleteEmployee("'+deleteVale+'","deleteemployee")');
  $('#myModalDelCanBtn').attr('onclick', 'closeModal()');
  
    
}
function confirmDeleteEmployee(deleteVale,link) {
  var settings = {
        "url": "/transaction/formslayout/"+link,
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        "data": "{\"id\":\""+deleteVale+"\"}"
      }
      request = $.ajax(settings);
      request.done(function(msg) {
          //console.log("MSG: "+msg);
           var str2="restricted to this page";
            if(msg.indexOf(str2)!=-1){
              alert("Restricted to this page!!");
            }else{
              if(msg=="1"){
              location.reload();
              }else{
                alert(msg)
              }
            }
        });
        request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        });
}