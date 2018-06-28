'use strict';
angular.module('app')
            .controller('serchController', function ($scope, $route,$http,$rootScope,$timeout) { 
               $rootScope.leftAct = {'background':'#0258d6'};
				$rootScope.leftAct2 = {'background':'#0258d6'};
				$rootScope.leftAct3 = {'background':'#0258d6'};
				$rootScope.leftAct4 = {'background':'#0258d6'};
				$rootScope.leftAct5 = {'background':'#0258d6'};
				$rootScope.leftAct6 = {'background':'#0258d6'};
				$rootScope.leftAct7 = {'background':'#061054'};

				$scope.model=false;
				$scope.seleRoom = 0;

				$scope.data = [
                   {id:1,roomHao:8201,peole:2,color:'colBlu'},
                   {id:2,roomHao:8202,peole:2,color:'colBlu'},
                   {id:3,roomHao:8203,peole:2,color:'colBlu'},
                   {id:4,roomHao:8204,peole:2,color:'colBlu'},
                   {id:5,roomHao:8205,peole:2,color:'colBlu'},
                   {id:6,roomHao:8206,peole:2,color:'colBlu'},
                   {id:7,roomHao:8207,peole:2,color:'colBlu'},
                   {id:8,roomHao:8208,peole:2,color:'colBlu'},
                   {id:9,roomHao:8209,peole:2,color:'colBlu'}
				];

				$scope.showModel = function(date){
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
	                   {id:2,roomHao:8202,peole:2,color:'colBlu'},
	                   {id:3,roomHao:8203,peole:2,color:'colBlu'},
	                   {id:4,roomHao:8204,peole:2,color:'colBlu'},
	                   {id:5,roomHao:8205,peole:2,color:'colBlu'},
	                   {id:6,roomHao:8206,peole:2,color:'colBlu'},
	                   {id:7,roomHao:8207,peole:2,color:'colBlu'},
	                   {id:8,roomHao:8208,peole:2,color:'colBlu'},
	                   {id:9,roomHao:8209,peole:2,color:'colBlu'}
					];
				 	$scope.model=false;
				 	$scope.mesg = '预定成功';
				 	$scope.showMsg=true;
				 	 $timeout(function () {
                          $scope.showMsg=false;
                     }, 1000);
				}
            })