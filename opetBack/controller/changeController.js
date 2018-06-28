'use strict';
angular.module('app')
            .controller('changeController', function ($scope, $route,$http,$rootScope,$timeout) { 
               $rootScope.leftAct = {'background':'#0258d6'};
				$rootScope.leftAct2 = {'background':'#0258d6'};
				$rootScope.leftAct3 = {'background':'#0258d6'};
				$rootScope.leftAct4 = {'background':'#061054'};
				$rootScope.leftAct5 = {'background':'#0258d6'};
				$rootScope.leftAct6 = {'background':'#0258d6'};
				$rootScope.leftAct7 = {'background':'#0258d6'};
                $scope.model=false;
                $scope.model2=false;
                $scope.seleRoom1 = 0;
                $scope.seleRoom2 = 0;
                $scope.forChange = 0;
                $scope.toChange = 0;
				$scope.data1 = [
					{id:1,roomNum:8201,people:1,color:'colBlu',ss:false},
					{id:2,roomNum:8202,people:2,color:'colBlig',ss:false},
					{id:3,roomNum:8203,people:3,color:'colGren',ss:false},
					{id:4,roomNum:8204,people:1,color:'colYell',ss:false},
					{id:5,roomNum:8205,people:1,color:'colRedlig',ss:false}
				];
				$scope.data2 = [
					{id:1,roomNum:8212,ss:false},
					{id:2,roomNum:8213,ss:false},
					{id:3,roomNum:8223,ss:false},
					{id:4,roomNum:8224,ss:false},
					{id:5,roomNum:8225,ss:false}
				];
				$scope.showModel1 = function($event,date,data2){
					// $scope.model1=true;
					$scope.seleRoom1 = date;
					for(var i = 0;i<$scope.data1.length;i++){
							if($scope.data1[i].id == this.item.id){
                              $scope.data1[i].ss = !$scope.data1[i].ss;
							}else{
								$scope.data1[i].ss = false;
							}
					}
					// this.item.ss = !this.item.ss;
					// console.log(this.item)				
				};
				$scope.hideModel1 = function(){
					$scope.model1=false;
					$scope.mesg = ' 替换失败';
				 	$scope.showMsg=true;
				 	 $timeout(function () {
                          $scope.showMsg=false;
                     }, 1000);							
				};
				$scope.mesg = '';
				$scope.showMsg = false;
				$scope.getData1 = function(){
				 	$scope.forChange1=$scope.seleRoom1;
				 	$scope.model1=false;
				 	$scope.data1 = [
						{id:2,roomNum:8202,people:2},
						{id:3,roomNum:8203,people:3},
						{id:4,roomNum:8204,people:1},
						{id:5,roomNum:8205,people:1}
					];
					$scope.model=false;
				 	$scope.showMsg=true;
				 	 $timeout(function () {
                          $scope.showMsg=false;
                     }, 1000);
		
				};
				$scope.showModel2 = function($event,date){
					$scope.model2=true;
					$scope.seleRoom2 = date;
					for(var i = 0;i<$scope.data2.length;i++){
							if($scope.data2[i].id == this.item.id){
                              $scope.data2[i].ss = !$scope.data2[i].ss;
							}else{
								$scope.data2[i].ss = false;
							}
					}

				};
				// $scope.showModel2 = function($event,date){
				// 	$scope.model2=true;
				// 	$scope.seleRoom2 = date;
				// 	for(var i = 0;i<$scope.data2.length;i++){
				// 			if($scope.data2[i].id == this.item.id){
    //                           $scope.data2[i].ss = true;
				// 			}else{
				// 				$scope.data2[i].ss = false;
				// 			}
				// 	}				
				// };
				// $scope.hideModel2 = function(){
				// 	$scope.model2=false;				
				// };
				// $scope.getData2 = function(){
				//  	$scope.toChange=$scope.seleRoom2;
				//  	$scope.model2=false;
				//  	$scope.data2 = [
				// 		{id:2,roomNum:8213},
				// 		{id:3,roomNum:8223},
				// 		{id:4,roomNum:8224},
				// 		{id:5,roomNum:8225}
				// 	];
				// };
				$scope.modMesg = true;
				$scope.beTrue = function(){
					$scope.model1=true;
					if( $scope.seleRoom1!=0& $scope.seleRoom2!=0){
						$scope.modMesg = true;
						$scope.mesg = '替换成功';
					}else if($scope.seleRoom1==0&$scope.seleRoom2!=0){
						$scope.modMesg = false;
						$scope.modmsg = "已入住";
						$scope.mesg = '替换失败';
					}else if($scope.seleRoom2==0&$scope.seleRoom1!=0){
						$scope.modMesg = false;
						$scope.modmsg = "替换";
						$scope.mesg = '替换失败';
					}else{
						$scope.modMesg = false;
						$scope.modmsg = "房间";
						$scope.mesg = '替换失败';
					}

				}
            })