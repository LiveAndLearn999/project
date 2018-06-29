define(['app', 'ionic'], function (app) {  
    'use strict';  
    return angular.module('app.config', ['ionic']).config(function($ionicConfigProvider) {  
        $ionicConfigProvider.templates.maxPrefetch(0);
        $ionicConfigProvider.views.maxCache(5);
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText(' ').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText(' ').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.scrolling.jsScrolling(true);
    });  
}); 