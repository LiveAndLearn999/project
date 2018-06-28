'use strict';
var app = angular.module('app',['ngRoute','ngCookies']);

angular.module('app').run(['$rootScope', function($rootScope){
	$rootScope.act = true;
	$rootScope.leftAct = {'background':'#061054'};
	$rootScope.leftAct2 = {'background':'#0258d6'};
	$rootScope.leftAct3 = {'background':'#0258d6'};
	$rootScope.leftAct4 = {'background':'#0258d6'};
	$rootScope.leftAct5 = {'background':'#0258d6'};
	$rootScope.leftAct6 = {'background':'#0258d6'};
	$rootScope.leftAct7 = {'background':'#0258d6'};

	$rootScope.colBlu={'background': '#0462c5'};
	$rootScope.colGren={'background': '#184714'};
	$rootScope.colYell={'background': '#a1af48'};
	$rootScope.colBlig={'background': '#14a1d7'};
	$rootScope.colRed={'background': '#c04723'};
	$rootScope.colRedlig={'background': '#cb4874'};
	   
	  
	$rootScope.leftnoAct = {
		'background':'#0258d6'
	}
 }]);
app.directive("leftDirective", function() {
    return {
        templateUrl : "template/leftTab.html"
    };
}).directive("tottDirective", function() {
    return {
        templateUrl : "template/topTit.html"
    };
});
// app.directive("leftDirective", function() {
//     return {
//         templateUrl : "template/leftBar.html"
//     };
// }).directive("lefttDirective", function() {
//     return {
//         templateUrl : "template/leftBar2.html"
//     };
// })
// .directive("firtabDirective", function() {
//     return {
//         templateUrl : "template/table1.html"
//     };
// }).directive("sedtabDirective", function() {
//     return {
//         templateUrl : "template/table2.html"
//     };
// }).directive("threDirective", function() {
//     return {
//         templateUrl : "template/table3.html"
//     };
// });