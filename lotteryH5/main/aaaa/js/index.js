var swiper = new Swiper('.aa', {
      			pagination: {
		        	el: '.aa .swiper-pagination',
		        	clickable: true,
		        	observer: true,//修改swiper自己或子元素时，自动初始化swiper
　　　　　　observeParents: true,//修改swiper的父元素时，自动初始化swiper
		       		 renderBullet: function (index, className) {
		          	 return '<span class="' + className + '">' + '</span>';
	        	},
      		},
    	});

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
		var bts2 = ["lb1","lb2","lb3","lb4","lb5","lb6"];
		var showTab2 =['.agist','.match','.eupRate','.yaPan','.lotExclu','.ltoWin'];
		  	for(var i = 0;i<lis2.length;i++){
    		$(lis2[i]).click(function(){
    			for(j = 0;j<bts2.length;j++){
    				if(bts2[j]==this.id){
    					var k = '#'+ bts2[j];
    					var l = showTab2[j];
    					$(k).css('border-bottom','1px solid #f36201');
    					$(k).css('color','#f36201');
    					$(l).css('display','block');
    					var swp = 'swiper'+j;
    					swiper.destroy();
						swiper = new Swiper(l+' .swiper-container', {
				      			pagination: {
						        	el: l+' .swiper-pagination',
						        	clickable: true,
						        	observer: true,
				　　　　　　		observeParents: true,
						       		 renderBullet: function (index, className) {
						          	 return '<span class="' + className + '">' + '</span>';
					        	},
				      		},
				    	});


    				}else{
    					var k = '#'+ bts2[j];
    					var l = showTab2[j];
    					$(k).css('border','none');
    					$(k).css('color','black');
    					$(l).css('display','none');
    				}
    			}
		})
    		$('.agist').css('color','black');

    	}
    	// var bts = ["bt1","bt2","bt3","bt4"];
    	// var showTab = ["rateData","keliIndx","someBall","convert"]
    	// $("#bt1").css('background','#f36201');
    	// $("#bt1").css('color','white');
    	// $("#bt1").css('padding','1px');
    	// $("#bt1").css('border','none');
    	// $("#rateData").css('display','block');
   //  	for(var i = 0;i<lis.length;i++){
   //  		$(lis[i]).click(function(){
   //  			for(j = 0;j<bts.length;j++){
   //  				if(bts[j]==this.id){
   //  					var k = '#'+ bts[j];
   //  					var l = '#'+ showTab[j];
   //  					$(k).css('background','#f36201');
   //  					$(k).css('padding','1px');
   //  					$(k).css('border','none');
   //  					$(k).css('color','white');
   //  					$(l).css('display','block');

   //  				}else{
   //  					var k = '#'+ bts[j];
   //  					var l = '#'+ showTab[j];
   //  					$(k).css('background','none');
   //  					$(k).css('padding','0px');
   //  					$(k).css('border-top','1px solid lightgray');
   //  					$(k).css('border-bottom','1px solid lightgray');
   //  					$(k).css('border-left','1px solid lightgray');
   //  					$(k).css('color','black');
   //  					$(l).css('display','none');
   //  				}
   //  			};
   //  			$(lis[3]).css('border-right','1px solid lightgray')
			// })
   // 		};
