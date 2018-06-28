'use strict';
angular.module('app')
            .config(['$routeProvider', function($routeProvider){
                $routeProvider
                .when(
                	'/',
                	{
                		templateUrl: 'page/home.html',
                		controller: 'homeController'
                	}
                )
                .when(
                	'/bulk',
                	{
                		templateUrl: 'page/bulkGuest.html',
                		controller: 'bulkController'
                	}
				)
                .when(
                	'/hour',
                	{
                		templateUrl: 'page/hourRoom.html',
                		controller: 'hourController'
                	}
               	)
                .when(
                    '/change',
                    {
                        templateUrl: 'page/changeRoom.html',
                        controller: 'changeController'
                    }
                )
                .when(
                    '/retreat',
                    {
                        templateUrl: 'page/retreatRoom.html',
                        controller: 'retreatController'
                    }
                )
                .when(
                    '/setting',
                    {
                        templateUrl: 'page/orderQuery.html',
                        controller: 'orderController'
                    }
                )
                .when(
                    '/serch',
                    {
                        templateUrl: 'page/serchRoom.html',
                        controller: 'serchController'
                    }
                )
                .otherwise({redirectTo:'/'});
            }]);