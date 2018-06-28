'use strict';
angular.module('app')
            .controller('retreatController', function ($scope, $route,$http,$rootScope,$timeout) { 
               $rootScope.leftAct = {'background':'#0258d6'};
				$rootScope.leftAct2 = {'background':'#0258d6'};
				$rootScope.leftAct3 = {'background':'#0258d6'};
				$rootScope.leftAct4 = {'background':'#0258d6'};
				$rootScope.leftAct5 = {'background':'#061054'};
				$rootScope.leftAct6 = {'background':'#0258d6'};
				$rootScope.leftAct7 = {'background':'#0258d6'};


				$scope.model=false;
				$scope.seleRoom = 0;

				$scope.data = [
                   {id:36,roomHao:8236,peole:2,color:'colBlu'},
                   {id:36,roomHao:8216,peole:1,color:'colBlu'},
                   {id:36,roomHao:8232,peole:2,color:'colBlu'},
                   {id:36,roomHao:8230,peole:2,color:'colBlu'}
				];

				$scope.showModel = function(date){
					$scope.model=true;
					$scope.seleRoom = date;				
				};
				$scope.hideModel = function(){
					$scope.model=false;	
					$scope.mesg = '退房失败';
				 	$scope.showMsg=true;
				 	 $timeout(function () {
                          $scope.showMsg=false;
                     }, 1000);						
				};
				$scope.mesg = '';
				$scope.showMsg = false;
				$scope.getData = function(){
					$scope.data = [
	                   {id:36,roomHao:8216,peole:1,color:'colBlu'},
	                   {id:36,roomHao:8232,peole:2,color:'colBlu'},
	                   {id:36,roomHao:8230,peole:2,color:'colBlu'}
					];
				 	$scope.model=false;
				 	$scope.mesg = '退房成功';
				 	$scope.showMsg=true;
				 	 $timeout(function () {
                          $scope.showMsg=false;
                     }, 1000);
				}
            })