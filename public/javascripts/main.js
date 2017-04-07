jQuery(document).ready(function($){
    //open popup
  // $(".select2Class").select2().select2('val','Test');

    $('.cd-popup-trigger').on('click', function(event){
        event.preventDefault();
        var hrefvalue=$(this).data("href")
        $(hrefvalue).addClass('is-visible');
    });

    //close popup
    $('.cd-popup').on('click', function(event){
        if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.cd-popup').removeClass('is-visible');
        }
    });


    //$('.modal-trigger').leanModal();

//  $('select').material_select();

/*$(".select2Class")
  .select2({
    placeholder: 'Select type',
    width: '100%',
    minimumResultsForSearch: Infinity
  })*/

$(function () {

  $(".select2Class")
  .select2({width: '100%',/*{
    placeholder: 'Select type',
    width: '100%',
    minimumResultsForSearch: Infinity
  }*/})
/*  .on('select2:close', function() {
    var el = $(this);
    if(el.val()==="NEW") {
      var newval = prompt("Enter new value: ");
      if(newval !== null) {
        el.append('<option>'+newval+'</option>')
          .val(newval);
      }
    }
  });*/
});
// $(".select2Class").select2().select2('val','asp');
});
$(document).ready(function(){
 $('.nav li a').click(function(){
   $('li a').removeClass("active");
   $(this).addClass("active");
});
});