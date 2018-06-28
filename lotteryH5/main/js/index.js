
      var swiper0 = 1;
      var swiper1 = 1;
      var swiper2 = 1;
      var swiper3 = 1;
      swiper0 = createSwiper(0);

    	var lis = $('.bat2 li');
    	var bts = ["bt1","bt2","bt3","bt4"];
    	var showTab = ["rateData","keliIndx","someBall","convert"]
    	$("#bt1").css('background','#f36201');
    	$("#bt1").css('color','white');
    	$("#bt1").css('padding','1px');
    	$("#bt1").css('border','none');
    	$("#rateData").css('display','block');
    	for(var i = 0;i<lis.length;i++){
    		$(lis[i]).click(function(){
    			for(j = 0;j<bts.length;j++){
    				if(bts[j]==this.id){
    					var k = '#'+ bts[j];
    					var l = '#'+ showTab[j];
    					$(k).css('background','#f36201');
    					$(k).css('padding','1px');
    					$(k).css('border','none');
    					$(k).css('color','white');
    					$(l).css('display','block');

    				}else{
    					var k = '#'+ bts[j];
    					var l = '#'+ showTab[j];
    					$(k).css('background','none');
    					$(k).css('padding','0px');
    					$(k).css('border-top','1px solid lightgray');
    					$(k).css('border-bottom','1px solid lightgray');
    					$(k).css('border-left','1px solid lightgray');
    					$(k).css('color','black');
    					$(l).css('display','none');
    				}
    			};
    			$(lis[3]).css('border-right','1px solid lightgray')
			  })
   		};


   		$('#eupRata1').css('background','#f36201');
   		$('#eupRata1').css('color','white');
   		$('#eupRata1').css('border','none');
   		$('#eupRata1').css('padding','1px');
   		$('#eupRata1').click(function(){
   			$(this).css('background','#f36201');
   			$(this).css('color','white');
   			$(this).css('border','none');
   			$(this).css('padding','1px');
   			$('#eupRata2').css('background','none');
   			$('#eupRata2').css('color','black');
   			$('#eupRata2').css('border','1px solid lightgray');
   			$('#eupRata2').css('padding','0');
   			$('.eupRatable1').css('display','block');
   			$('.eupRatable2').css('display','none');
		});

		$('#eupRata2').click(function(){
   			$(this).css('background','#f36201');
   			$(this).css('color','white');
   			$(this).css('border','none');
   			$(this).css('padding','1px');
   			$('#eupRata1').css('background','none');
   			$('#eupRata1').css('color','black');
   			$('#eupRata1').css('border','1px solid lightgray');
   			$('#eupRata1').css('padding','0');
   			$('.eupRatable1').css('display','none');
   			$('.eupRatable2').css('display','block');
		});
		var lis2 = $('.lotBar li');
		var bts2 = ["lb1","lb2","lb3","lb4","lb5"];
		var showTab2 =['.agist','.match','.eupRate','.yaPan','.ltoWin'];
		  	for(var i = 0;i<lis2.length;i++){
    		$(lis2[i]).click(function(){
    			for(j = 0;j<bts2.length;j++){
    				if(bts2[j]==this.id){
    					var k = '#'+ bts2[j];
    					var l = showTab2[j];
    					$(k).css('border-bottom','2px solid #ff7600');
    					$(k).css('color','#ff7600');
    					$(l).css('display','block');
    					var index = $(this).index();
              $("body").find('.swiper-wrapper').eq(index).show().siblings('.swiper-wrapper').hide();
              if(index === 0){
                if(swiper0 != 1){
                  swiper0.destroy();
                }
                swiper0 = createSwiper(0);
              }else if(index === 1){
                if(swiper1 != 1){
                  swiper1.destroy();
                }
                swiper1 = createSwiper(1);
              }else if(index === 2){
                if(swiper2 != 1){
                  swiper2.destroy();
                }
                swiper2 = createSwiper(2);
              }else if(index === 3){
                if(swiper3 != 1){
                  swiper3.destroy();
                }
                swiper3 = createSwiper(3);
              }
    				}else{
    					var k = '#'+ bts2[j];
    					var l = showTab2[j];
    					$(k).css('border','none');
    					$(k).css('color','black');
    					$(l).css('display','none');
    				}
    			}
		})
    		$('.agist').css('display','block');
         $('#lb1').css('border-bottom','2px solid #f36201');
        $('#lb1').css('color','#f36201');
    }


    var lis3 = $('.agistTal li');
    var bts3 = ["agbt1","agbt2","agbt3","agbt4"];
    var showTab3 =["agistLis","lineup","broadcast","references"];
    for(var i = 0;i<lis3.length;i++){
        $(lis3[i]).click(function(){
          for(j = 0;j<bts3.length;j++){
            if(bts3[j]==this.id){
              var k = '#'+ bts3[j];
              var l = '#'+showTab3[j];
              $(k).css('background','#f36201');
              $(k).css('color','white');
              $(k).css('border','none');
              $(k).css('padding','1px');
              $(l).css('display','block');
            }else{
              var k = '#'+ bts3[j];
              var l ='#'+ showTab3[j];
              $(k).css('background','none');
              $(k).css('color','black');
              $(k).css('border-left','1px solid lightgray');
              $(k).css('border-top','1px solid lightgray');
              $(k).css('border-bottom','1px solid lightgray');
              $(k).css('padding','0px');
              $(l).css('display','none');
            }
            $('#agbt4').css('border-right','1px solid lightgray')
          }
    })
         $('#agbt1').css('background','#f36201');
         $('#agbt1').css('border','none');
        $('#agbt1').css('padding','1px');
        $('#agbt1').css('color','white');
    }


$(function(){
        // $('#agistLi1h').hide();
        // $('#agistLi1c').hide();
        // $('#agistLi2h').hide();
        // $('#agistLi2c').hide();
        // $('#agistLi3h').hide();
        // $('#agistLi3c').hide();
        // $('#agistLi4h').hide();
        // $('#agistLi4c').hide();
        // $('#agistLi5h').hide();
        // $('#agistLi5c').hide();


        // $('#agistLi6h').hide();
        // $('#agistLi6c').hide();
        // $('#agistLi7h').hide();
        // $('#agistLi7c').hide();
        // $('#agistLi8h').hide();
        // $('#agistLi8c').hide();
        // $('#agistLi9h').hide();
        // $('#agistLi9c').hide();
        // $('#agistLi10h').hide();
        // $('#agistLi10c').hide();

        // $('#agistLi11h').hide();
        // $('#agistLi11c').hide();
        // $('#agistLi12h').hide();
        // $('#agistLi12c').hide();








    
        $('#agistLi1').hide();
        $('#agistLi2').hide();
        $('#agistLi3').hide();
        $('#agistLi4').hide();
        $('#agistLi5').hide();

        $('#agistLi6').hide();
        $('#agistLi7').hide();
        $('#agistLi8').hide();
        $('#agistLi9').hide();
        $('#agistLi10').hide();

        $('#agistLi11').hide();
        $('#agistLi12').hide();

})
      function showIco(id){
        var d = id + 'c';
        var d2 = id + 'h';
         $('#'+d).show(); 
         $('#'+id).hide();
         $('#'+d2).show();
      }

      function hideIco(clas){
        var d = clas + 'c';
        var h = clas + 'h';
        $('#'+d).hide();
        $('#'+clas).show();
        $('#'+h).hide();
      }





function createSwiper(index) {
  var swiper = new Swiper('#swiper' + index, {
     pagination: {
              el: '.pagination' + index,
              clickable: true,
               renderBullet: function (index, className) {
                 return '<span class="' + className+ '">'  + '</span>';
            },
          },
    observer: true,
    observerParents: true,
  });
  return swiper;
}