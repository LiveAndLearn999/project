'use strict';
angular.module('app')
            .controller('bulkController', function ($scope, $route,$http,$rootScope,$timeout) { 
            	$rootScope.leftAct = {'background':'#0258d6'};
				$rootScope.leftAct2 = {'background':'#061054'};
				$rootScope.leftAct3 = {'background':'#0258d6'};
				$rootScope.leftAct4 = {'background':'#0258d6'};
				$rootScope.leftAct5 = {'background':'#0258d6'};
				$rootScope.leftAct6 = {'background':'#0258d6'};
				$rootScope.leftAct7 = {'background':'#0258d6'};

				$scope.model=false;
				$scope.seleRoom = 0;

				$scope.data = [
                  
                   {id:17,roomHao:8217,peole:2,color:'colBlu'},
                   {id:18,roomHao:8218,peole:2,color:'colBlu'},
                   {id:19,roomHao:8219,peole:2,color:'colBlu'},
                   {id:20,roomHao:8220,peole:2,color:'colBlu'},
                   {id:30,roomHao:8231,peole:2,color:'colBlu'},
                   {id:32,roomHao:8232,peole:2,color:'colBlu'},
                   {id:33,roomHao:8233,peole:2,color:'colBlu'},
                   {id:34,roomHao:8234,peole:2,color:'colBlu'},
                   {id:35,roomHao:8235,peole:2,color:'colBlu'},
                   {id:36,roomHao:8236,peole:2,color:'colBlu'}
				];

				$scope.showModel = function($event,date){
					$scope.model=true;
					$scope.seleRoom = date;				
				};
				$scope.hideModel = function(){
					$scope.model=false;	
					$scope.mesg = '预定失败';
				 	$scope.showMsg=true;
				 	 $timeout(function () {
                          $scope.showMsg=false;
                     }, 1000);			
				};
				$scope.mesg = '';
				$scope.showMsg = false;
				$scope.getData = function(){
					$scope.data = [
	                  	{id:18,roomHao:8218,peole:2,color:'colBlu'},
	                   {id:19,roomHao:8219,peole:2,color:'colBlu'},
	                   {id:20,roomHao:8220,peole:2,color:'colBlu'},
	                   {id:30,roomHao:8231,peole:2,color:'colBlu'},
	                   {id:32,roomHao:8232,peole:2,color:'colBlu'},
	                   {id:33,roomHao:8233,peole:2,color:'colBlu'},
	                   {id:34,roomHao:8234,peole:2,color:'colBlu'},
	                   {id:35,roomHao:8235,peole:2,color:'colBlu'},
	                   {id:36,roomHao:8236,peole:2,color:'colBlu'}
					];
				 	$scope.model=false;
				 	$scope.mesg = '预定成功';
				 	$scope.showMsg=true;
				 	 $timeout(function () {
                          $scope.showMsg=false;
                     }, 1000);
		
				}
               
            })