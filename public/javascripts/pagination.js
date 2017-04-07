$(document).ready(function() {
  
    var wrapper         = $(".tableData");
    var pathname = window.location.pathname
    var link=pathname.split("/",4)[3]
    var jsonInput=new Object();
    jsonInput.count=1;
     var settings = {
            "url": "/transaction/masters/"+link,
            "method": "POST",
            "headers": {
            "content-type": "application/json"
            },
        "data":JSON.stringify(jsonInput)
        }
        request = $.ajax(settings);
        request.done(function(msg) {
            var str2="restricted to this page";
            if(msg.indexOf(str2)!=-1){
                alert("Restricted Page");
            }else{
                $(wrapper).html(msg);
            }
            });
        request.fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
        });

    
});

function onPageChange(obj){
 
    var pathname = window.location.pathname
    var link=pathname.split("/",4)[3]
  var c=$(obj).parent();
  var d=$(c).find("button");
  var a=$(obj).parent().parent();
  var b=$(a).find("li");
  $(b).removeClass("active")
  $(d).parent().addClass("active")
    var jsonInput=new Object();
    jsonInput.count=$(d)[0].innerHTML;
     var settings = {
            "url": "/transaction/masters/"+link,
            "method": "POST",
            "headers": {
            "content-type": "application/json"
            },
        "data":JSON.stringify(jsonInput)
        }
        request = $.ajax(settings);
        request.done(function(msg) {
            var str2="restricted to this page";
            if(msg.indexOf(str2)!=-1){
                alert("Restricted Page");
            }else{
                $(".tableData").html(msg);
            }
            });
        request.fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
        });
}