$(document).ready(function(){
var slideIntervalId;
var clicked = false;
var $n = false;
    
/************************mouse over and mouse off functions***********/	
$('#pictures').mouseover(function() {
   clearInterval(slideIntervalId);
  }).mouseout(function(){
    slideIntervalId = setInterval(autoSlide,5000);
  });


/************************function for blinds**********************/
	 jQuery.fn.toggleTmb = function($new_name){
 		//alert($active_name);
 		var $new_tmb_name = $new_name+'_tmb';
 		var $tmb_array = $('#thumbnails').find('div')
 		var $active_tmb = $('#thumbnails .active')
	 		
 		$tmb_array.each(function(index){							
				if((this).id == $new_tmb_name){
				$(this).remove();
				$active_tmb.removeClass('active');
				$(this).addClass('active');
				$(this).bind('click', function(e) {
					  $(this).tmbClick(e,$new_name);
					});

				$('#thumbnails').append(this);							
			}
		});		
	}

/*************************function for click***********************/
	jQuery.fn.tmbClick = function(e,$clicked_tmb){
		e.preventDefault();
		clearInterval(slideIntervalId);
		$($active_img).stop(true); 
		$($next_img).stop(true); 
		clicked = true;

	 		//get the active pic		
		//alert('clicked ' + $clicked_tmb);
		$(this).toggleTmb($clicked_tmb);
		var $active_img = $('#slideshow IMG.active')	//active slide (img and a href)
		var $next_img = $('#slideshow').find('#'+$clicked_tmb);
		//alert(($next_img).attr('id') +' is the id');
		var $current_txt = $('#mask').find('.active');	//the active mask text
		$current_txt.removeClass('active');
		var $next_txt_id = '#'+$($next_img).attr('id')+'_txt';
		$next_txt = $('#mask').find($next_txt_id);
		$next_txt.removeClass('active');
		//re-order the images.
		var $image_array = $('#slideshow #pictures').find('a')
		//alert('next im'+$next_img.attr('id'))
		var $next_img_id = $next_img.attr('id');
		
		$image_array.each(function(index){	
			var $array_image_id = $(this).find('img').attr('id');			
			if($array_image_id == $next_img_id){
					$(this).remove();
					$('#slideshow #pictures').append(this);
					}
				});
						
		slideSwitch($active_img,$next_img,$current_txt,$next_txt);
		setTimeout(function() {$next_txt.addClass('active')},500);
   		slideIntervalId = setInterval(autoSlide,5000);
	}

/************************function for slideshow**********************/ 	
	var slideSwitch = function($active_img,$next_img,$current_txt,$next_txt){
	   $($current_txt).removeClass('active');
	   $($next_img).toggleTmb($next_img.attr('id'));
		
		$($next_img).animate({
		    left: '0px',
		    width:'538px',
		    height:'380px'
		  },500, function() {
			if(!clicked){		  	
			   $(this).addClass('active');
		   	$($next_txt).addClass('active');
			}
		clicked = false;	   	
		});  
		
		 if ($n){
		 
	       setTimeout(function() {$($active_img).animate({
		        left: '540px',
		        width:'104px',
		        height:'380px'
		      },10, function() {
			       $($active_img).removeClass('active');
		      		});},550)
		}
		
		$n = true;				      
	}
	
	//have JQuery call the slideshow function every x millisecs.	
	var autoSlide = function() {
		var $active = $('#slideshow IMG.active').parent();	//active slide (img and a href)
	   var $active_img = $active.children();	//active image		   
	   var $image_count = $('#slideshow #pictures a').children('img');	//an array of images used for the count thus for the loop   
	   var $current_txt = $('#mask').find('.active');	//the active mask text
	   var $next_txt;	//the new mask text
	   var $next = $('#slideshow IMG:first').parent();
	   
	   $next.remove();
	   $('#slideshow #pictures').append($next); 
	   
	   var $next_img = $next.children(); 
	   var $next_txt_id = '#'+$($next_img).attr('id')+'_txt';
	   $next_txt = $('#mask').find($next_txt_id);			   
    	
    	slideSwitch($active_img,$next_img,$current_txt,$next_txt);

	}

/******************************end slideshow stuff************************/
 		
 	$("#thumbnails div").click(function(e) { 
		e.preventDefault();
 		var $clicked_tmb = $(this).attr('id').replace('_tmb','');
 		//alert('clicked name '+$clicked_tmb);		
		$(this).tmbClick(e,$clicked_tmb);
   });
   
   slideIntervalId = setInterval(autoSlide,5000);
   autoSlide();	  
});      
 
