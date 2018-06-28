'use strict';
angular.module('app')
            .controller('homeController', function ($scope, $route,$http,$rootScope) { 
            	$rootScope.leftAct = {'background':'#061054'};
				$rootScope.leftAct2 = {'background':'#0258d6'};
				$rootScope.leftAct3 = {'background':'#0258d6'};
				$rootScope.leftAct4 = {'background':'#0258d6'};
				$rootScope.leftAct5 = {'background':'#0258d6'};
				$rootScope.leftAct6 = {'background':'#0258d6'};
				$rootScope.leftAct7 = {'background':'#0258d6'};

				// $scope.model=false;

				$scope.data = [
                               {id:1,roomHao:8201,peole:2,color:'colBlu'},
                               {id:2,roomHao:8202,peole:2,color:'colBlu'},
                               {id:3,roomHao:8203,peole:2,color:'colBlu'},
                               {id:4,roomHao:8204,peole:2,color:'colBlu'},
                               {id:5,roomHao:8205,peole:2,color:'colBlu'},
                               {id:6,roomHao:8206,peole:2,color:'colBlu'},
                               {id:7,roomHao:8207,peole:2,color:'colBlu'},
                               {id:8,roomHao:8208,peole:2,color:'colBlu'},
                               {id:9,roomHao:8209,peole:2,color:'colBlu'},
                               {id:10,roomHao:8210,peole:2,color:'colBlig'},
                               {id:11,roomHao:8211,peole:2,color:'colBlu'},
                               {id:12,roomHao:8212,peole:2,color:'colBlu'},
                               {id:13,roomHao:8213,peole:2,color:'colGren'},
                               {id:14,roomHao:8214,peole:2,color:'colBlu'},
                               {id:15,roomHao:8215,peole:2,color:'colBlu'},
                               {id:16,roomHao:8216,peole:2,color:'colBlig'},
                               {id:17,roomHao:8217,peole:2,color:'colBlu'},
                               {id:18,roomHao:8218,peole:2,color:'colBlu'},
                               {id:19,roomHao:8219,peole:2,color:'colGren'},
                               {id:20,roomHao:8220,peole:2,color:'colBlu'},
                               {id:21,roomHao:8221,peole:2,color:'colBlu'},
                               {id:22,roomHao:8222,peole:2,color:'colBlu'},
                               {id:23,roomHao:8223,peole:2,color:'colBlu'},
                               {id:24,roomHao:8224,peole:2,color:'colBlu'},
                               {id:25,roomHao:8225,peole:2,color:'colGren'},
                               {id:26,roomHao:8226,peole:2,color:'colBlu'},
                               {id:27,roomHao:8227,peole:2,color:'colRed'},
                               {id:28,roomHao:8228,peole:2,color:'colBlu'},
                               {id:29,roomHao:8228,peole:2,color:'colBlu'},
                               {id:30,roomHao:8230,peole:2,color:'colBlu'},
                               {id:30,roomHao:8231,peole:2,color:'colRed'},
                               {id:32,roomHao:8232,peole:2,color:'colBlu'},
                               {id:33,roomHao:8233,peole:2,color:'colBlu'},
                               {id:34,roomHao:8234,peole:2,color:'colBlu'},
                               {id:35,roomHao:8235,peole:2,color:'colRed'},
                               {id:36,roomHao:8236,peole:2,color:'colBlu'}
				];



                        

				// $scope.showModel = function(){
				// 	$scope.model=true;				
				// };
				// $scope.hideModel = function(){
				// 	$scope.model=false;				
				// }
               
            })