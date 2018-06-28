'use strict';
angular.module('app')
            .controller('orderController', function ($scope, $route,$http,$rootScope) { 
                $rootScope.leftAct = {'background':'#0258d6'};
				$rootScope.leftAct2 = {'background':'#0258d6'};
				$rootScope.leftAct3 = {'background':'#0258d6'};
				$rootScope.leftAct4 = {'background':'#0258d6'};
				$rootScope.leftAct5 = {'background':'#0258d6'};
				$rootScope.leftAct6 = {'background':'#061054'};
				$rootScope.leftAct7 = {'background':'#0258d6'};

				$scope.data = [
					{id:1,phonenum:15421358945,name:'1111',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'2222',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'3333',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'4444',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'5555',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'6666',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'7777',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'8888',idcard:1415666666,time:'3:00'},
					{id:1,phonenum:15421358945,name:'1010',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'1111',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'1212',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'1313',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'1414',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'15115',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'1616',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'1717',idcard:1415666666,time:'3:00'},
					{id:1,phonenum:15421358945,name:'1818',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'1919',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'2020',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'2121',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'2222',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'2323',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'2424',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'2525',idcard:1415666666,time:'3:00'},
					{id:1,phonenum:15421358945,name:'2626',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'2727',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'2828',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'2929',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'3030',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'3131',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'3232',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'3333',idcard:1415666666,time:'3:00'},
					{id:1,phonenum:15421358945,name:'3434',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'3535',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'3636',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'3737',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'3838',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'3939',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'4040',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'4141',idcard:1415666666,time:'3:00'},
					{id:1,phonenum:15421358945,name:'4242',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'4343',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'4444',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'4545',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'4646',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'4747',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'4848',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'4949',idcard:1415666666,time:'3:00'},
					{id:1,phonenum:15421358945,name:'5050',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'5151',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'5252',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'5353',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'5454',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'5555',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'5656',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'5757',idcard:1415666666,time:'3:00'},
					{id:1,phonenum:15421358945,name:'5858',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'5959',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'6060',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'6161',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'6262',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'6363',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'6464',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'6565',idcard:1415666666,time:'3:00'},
					{id:1,phonenum:15421358945,name:'6666',idcard:3415666666,time:'12:00'},
					{id:2,phonenum:14213258945,name:'6767',idcard:5415666666,time:'11:00'},
					{id:3,phonenum:12345678911,name:'6868',idcard:3415666666,time:'10:00'},
					{id:4,phonenum:12345678914,name:'6969',idcard:6415666666,time:'9:00'},
					{id:5,phonenum:12345679925,name:'7070',idcard:3415666666,time:'8:00'},
					{id:6,phonenum:12345678936,name:'7171',idcard:8415666666,time:'6:00'},
					{id:7,phonenum:12345678936,name:'7272',idcard:3415666666,time:'2:00'},
					{id:8,phonenum:12345678965,name:'7373',idcard:1415666666,time:'3:00'},
				];
				$scope.delete = function(){
					$scope.data = [
						{id:2,phonenum:14213258945,name:'2222',idcard:3415666666,time:'12:00'},
						{id:3,phonenum:12345678911,name:'3333',idcard:3415666666,time:'12:00'},
						{id:4,phonenum:12345678914,name:'4444',idcard:3415666666,time:'12:00'},
						{id:5,phonenum:12345679925,name:'5555',idcard:3415666666,time:'12:00'},
						{id:6,phonenum:12345678936,name:'6666',idcard:3415666666,time:'12:00'},
						{id:7,phonenum:12345678936,name:'7777',idcard:3415666666,time:'12:00'},
						{id:8,phonenum:12345678965,name:'8888',idcard:3415666666,time:'12:00'}
					];
				};

				$scope.bannable = true;
				$scope.nextable = false;

			  $scope.pages = Math.ceil($scope.data.length/10);
			  $scope.arr=[];
			  for(var i = 0;i<10;i++){
			  	$scope.arr.push($scope.data[i])
			  }


			  $scope.cont = 0;
			  $scope.nextPage = function(){
			  	var arr2 = [];
			  	$scope.cont++;
			  	if($scope.cont>=0&&$scope.cont<$scope.pages){
				  	var j2 = ($scope.cont+1)*10-1;
				  	var j1 = ($scope.cont+1)*10-10;
				  	for(var i = j1;i<j2+1;i++){
				  		arr2.push($scope.data[i]);
				  	}
				  	$scope.bannable = false;
					$scope.nextable = false;
			  	 	 
			  	}else{
			  		$scope.bannable = false;
					$scope.nextable = true;
			  		 $scope.cont=$scope.pages-1;
			  		 var j2 = ($scope.cont+1)*10-1;
				  	var j1 = ($scope.cont+1)*10-10;
				  	for(var i = j1;i<j2+1;i++){
				  		arr2.push($scope.data[i]);
				  	}
			  	}
			  		$scope.arr = arr2;
			}

			  $scope.beforePage = function(){
			  	var arr2 = [];
			  	if($scope.cont>0&&$scope.cont<$scope.pages){
			  		 $scope.cont--;
			  		 $scope.bannable = false;
					$scope.nextable = false;
			  		 var j2 = ($scope.cont+1)*10-1;
				  	var j1 = ($scope.cont+1)*10-10;
				  	for(var i = j1;i<j2+1;i++){
				  		arr2.push($scope.data[i]);
				  	}
			  	}else{
			  		$scope.bannable = true;
					$scope.nextable = false;
			  		$scope.cont=0;
			  		 var j2 = ($scope.cont+1)*10-1;
			  		var j1 = ($scope.cont+1)*10-10;
				  	for(var i = j1;i<j2+1;i++){
				  		arr2.push($scope.data[i]);
				  	}
			  	}

			  	$scope.arr = arr2;
			  }



				$scope.transId = function(ider){
					$rootScope.trid = ider;
				}
            })