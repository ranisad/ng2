$(document).ready(function(){

$.validator.addClassRules({
        'required-validation': {
            required: true
        },
  'select-validation': {
    required: true
  }
    });

    $.validator.setDefaults({
        ignore: []
    });
    $(".formvalidatorclass").validate({
        errorClass: "invalid select-validation",
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        }
    });


    $( ".fieldforms" ).validate();
    $(".fieldlabel,.fieldname,.fieldtype,.required,.order_no,.formgroup,.can_delete,.prefetched,.required-validation").rules("add", {
      required:true,
      //minlength:3
    });

})