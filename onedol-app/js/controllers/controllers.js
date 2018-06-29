define(['app', 'baseController','indexController','rechargeController','guideController','integralController','buyRecordController','buyRecordTwoController','buyRecordDetailController','showSignHistoryController','productztController','productlistController','searchController','newproductDetailController','productQishuController','orderdetailShareController','orderShareDetailsController','userIndexController','userCardController','shopnumberController','productJisuanController','newPublishListController','cartController','orderFormController','payFinishController','myIndexController','mySetingController','accountDetailController','userAddressController','userAddressSubmitController','userAddressSelController','shaidanController','cashController','traderPassSetController','newsController','lyController','aboutController','mySetingSafeController','logPassModController','logisticsController','myInfoController','myNicknameController','mySexController','myBirthdayController','myQqController','mySignatureController','myHometownController','logController','bindingController','securityCodeController','setPasswordController','changePasswordController','registerController','registerStepTwoController','registerStepThreeController','logPassbackController','commissionController','rollOutController','inviteIntrController','customerServiceController','userVirtualAddressSubmitController','giftController','mySetingSecretController','integralDetailsController','imageTextController','proBuyDetailController','winGoodsController','luckDrawController','winGoodsDetailController','logisticsActController','shaidanActController','userAddressActSelController','userVirtualAddrActSubmitController','shareListController','shareDetailController','newbieController','newbieDetailController','newOrderFormController','newbieQishuController','noticeListController','noticeDetailController','gainerListController','snatchController','suppleController','moneygetController','gamesController','services'], function(app){
  
    'use strict';  
    var controllers = angular.module('app.controllers', ['app.services', 'app.config']);  
 
 	controllers.controller('baseController', require('baseController'));
    controllers.controller('indexController', require('indexController'));
    controllers.controller('rechargeController', require('rechargeController'));
    controllers.controller('guideController', require('guideController'));
    controllers.controller('integralController', require('integralController'));
    controllers.controller('showSignHistoryController', require('showSignHistoryController'));
    controllers.controller('buyRecordController', require('buyRecordController'));
    controllers.controller('buyRecordTwoController', require('buyRecordTwoController'));
    controllers.controller('buyRecordDetailController', require('buyRecordDetailController'));
    controllers.controller('productztController', require('productztController'));
    controllers.controller('productlistController', require('productlistController'));
    controllers.controller('searchController', require('searchController'));
    controllers.controller('newproductDetailController', require('newproductDetailController'));
    controllers.controller('productQishuController', require('productQishuController'));
    controllers.controller('orderdetailShareController', require('orderdetailShareController'));
    controllers.controller('orderShareDetailsController', require('orderShareDetailsController'));
    controllers.controller('userIndexController', require('userIndexController'));
    controllers.controller('userCardController', require('userCardController'));
    controllers.controller('shopnumberController', require('shopnumberController'));
    controllers.controller('productJisuanController', require('productJisuanController'));
    controllers.controller('newPublishListController', require('newPublishListController'));
    controllers.controller('cartController', require('cartController'));
    controllers.controller('orderFormController', require('orderFormController'));
    controllers.controller('payFinishController', require('payFinishController'));
  	controllers.controller('myIndexController', require('myIndexController'));
  	controllers.controller('mySetingController', require('mySetingController'));
  	controllers.controller('accountDetailController', require('accountDetailController'));
  	controllers.controller('userAddressController', require('userAddressController'));
  	controllers.controller('userAddressSubmitController', require('userAddressSubmitController'));
  	controllers.controller('userAddressSelController', require('userAddressSelController'));
  	controllers.controller('shaidanController', require('shaidanController'));
  	
  	controllers.controller('cashController', require('cashController'));
  	controllers.controller('traderPassSetController', require('traderPassSetController'));
  	controllers.controller('newsController', require('newsController'));
  	controllers.controller('lyController', require('lyController'));
  	controllers.controller('aboutController', require('aboutController'));
  	controllers.controller('mySetingSafeController', require('mySetingSafeController'));
  	controllers.controller('logPassModController', require('logPassModController'));
  	controllers.controller('logisticsController', require('logisticsController'));
  	controllers.controller('myInfoController', require('myInfoController'));
  	controllers.controller('myNicknameController', require('myNicknameController'));
  	controllers.controller('mySexController', require('mySexController'));
  	controllers.controller('myBirthdayController', require('myBirthdayController'));
  	controllers.controller('myQqController', require('myQqController'));
  	controllers.controller('mySignatureController', require('mySignatureController'));
  	controllers.controller('myHometownController', require('myHometownController'));
  	
  	controllers.controller('logController', require('logController'));
  	controllers.controller('bindingController', require('bindingController'));
  	controllers.controller('securityCodeController', require('securityCodeController'));
  	controllers.controller('setPasswordController', require('setPasswordController'));
  	controllers.controller('changePasswordController', require('changePasswordController'));
  	controllers.controller('registerController', require('registerController'));
  	controllers.controller('registerStepTwoController', require('registerStepTwoController'));
  	controllers.controller('registerStepThreeController', require('registerStepThreeController'));
  	controllers.controller('logPassbackController', require('logPassbackController'));
  	controllers.controller('commissionController', require('commissionController'));
  	controllers.controller('rollOutController', require('rollOutController'));
	controllers.controller('inviteIntrController', require('inviteIntrController'));
	controllers.controller('customerServiceController', require('customerServiceController'));
	controllers.controller('userVirtualAddressSubmitController', require('userVirtualAddressSubmitController'));
	controllers.controller('giftController', require('giftController'));
	controllers.controller('mySetingSecretController', require('mySetingSecretController'));
	controllers.controller('integralDetailsController', require('integralDetailsController'));

	controllers.controller('imageTextController', require('imageTextController'));
	controllers.controller('proBuyDetailController', require('proBuyDetailController'));
	controllers.controller('winGoodsController', require('winGoodsController'));
	controllers.controller('luckDrawController', require('luckDrawController'));
	controllers.controller('winGoodsDetailController', require('winGoodsDetailController'));
	controllers.controller('logisticsActController', require('logisticsActController'));
	controllers.controller('shaidanActController', require('shaidanActController'));
	controllers.controller('userAddressActSelController', require('userAddressActSelController'));
	controllers.controller('userVirtualAddrActSubmitController', require('userVirtualAddrActSubmitController'));
	controllers.controller('shareListController', require('shareListController'));
	controllers.controller('shareDetailController', require('shareDetailController'));

	controllers.controller('newbieController', require('newbieController'));
	controllers.controller('newbieDetailController', require('newbieDetailController'));
	controllers.controller('newOrderFormController', require('newOrderFormController'));
	controllers.controller('newbieQishuController', require('newbieQishuController'));
	controllers.controller('noticeListController', require('noticeListController'));
	controllers.controller('noticeDetailController', require('noticeDetailController'));
	controllers.controller('gainerListController', require('gainerListController'));
	controllers.controller('snatchController', require('snatchController'));
	controllers.controller('suppleController', require('suppleController'));
	controllers.controller('moneygetController', require('moneygetController'));
	controllers.controller('gamesController', require('gamesController'));
    controllers.run(['$rootScope','$factoryServices', function($rootScope,$factoryServices) {
        $rootScope.cartNumber = 0;
		$rootScope.checkFlag = 0; //判断第一次请求是否成功 1成功
		$factoryServices.firstCheckLogin(); // 首次进入app验证账号有效性
		$rootScope.checkFlag =  $factoryServices.hideOrShowAppContent();
    }]);  
  
    return controllers;  
  
});  