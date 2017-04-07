/** $(function(){

	$("#stage").load('images/interactive.svg',function(response){

		$(this).addClass("svgLoaded");

		if(!response){ // Error loading SVG
			$(this).html('Error loading SVG. Be sure you are running from a the http protocol (not locally) and have read <strong><a href="http://tympanus.net/codrops/?p=13831#the-javascript">this important part of the tutorial</a></strong>');
		}

	});
});
var colors = "0f0 0ff f60 f0f 00f f00".split(' '), i=0;
jQuery(function($){
    $('path').click(function(){
        this.style.fill = "#"+colors[i++%colors.length];
    });
});
**/

       document.querySelector('object').addEventListener('load',function(){
        var p = this.contentDocument.documentElement.querySelectorAll('path');
        for(i=0;i<p.length;i++){
         p[i].addEventListener('click', function(){
              this.style.fill="#000000";
              alert("Hello my name is "+this.id+"…");
            });
        }
    });