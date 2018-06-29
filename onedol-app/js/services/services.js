define(['app','config','mainServices','factoryServices','timePickerService'], function (app) {  
    'use strict';  
    var config = require('config'),  
        services = angular.module('app.services', ['app.config', 'ngResource']);

    services.service('$timePickerService', require('timePickerService'));
    services.factory('$factoryServices', require('factoryServices')); 
    services.service('$mainServices', require('mainServices'));

  	
    return services;  
});  