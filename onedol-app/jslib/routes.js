define(['app'], function(app) {
    'use strict';

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("index", {
                    url: "/index",
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })
                .state("product", {
                    url: "/product",
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })
                .state("activite", {
                    url: "/activite",
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })
                .state("cart", {
                    url: "/cart",
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })
                .state("mine", {
                    url: "/mine",
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })
                .state("money", {
                    url: "/money",
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                    
                })
                //主页开始
                .state('index.index', {
                    url: '/index',
                    views: {
                        'index': {
                            templateUrl: 'templates/index/shouye.html',
                            controller: 'indexController'
                        }
                    }
                })
                /*.state("games", {
                    url: "/games"
                })*/
                .state('mine.games', {
                    url: '/games',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/games.html',
                            controller: 'gamesController'
                        }
                    }
                })
                .state('index.recharge', {
                    url: '/recharge',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/recharge.html',
                            controller: 'rechargeController'
                        }
                    }
                })
                .state('index.guide', {
                    url: '/guide',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/guide.html',
                            controller: 'guideController'
                        }
                    }
                })
                .state('index.integral', {
                    url: '/integral',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/integral.html',
                            controller: 'integralController'
                        }
                    }
                })
                .state('index.showSignHistory', {
                    url: '/showSignHistory',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/showSignHistory.html',
                            controller: 'showSignHistoryController'
                        }
                    }
                })
                .state('index.buyRecord', {
                    url: '/buyRecord',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/buyRecord.html',
                            controller: 'buyRecordController'
                        }
                    }
                })
                .state('index.buyRecordDetail', {
                    url: '/buyRecordDetail/:pid/:pterm',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/buyRecordDetail.html',
                            controller: 'buyRecordDetailController'
                        }
                    }
                })
                .state('index.product_zt', {
                    url: '/product_zt',
                    views: {
                        'index': {
                            templateUrl: 'templates/index/productlist.html',
                            controller: 'productztController'
                        }
                    }
                })
                .state('index.search', {
                    url: '/search',
                    views: {
                        'index': {
                            templateUrl: 'templates/index/search.html',
                            controller: 'searchController'
                        }
                    }
                })
                .state('index.payFinish', {
                    url: '/payFinish',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/cart/zfwcNew.html',
                            controller: 'payFinishController'
                        }
                    }
                })
                .state('index.newproductdetail', {
                    url: '/newproductdetail',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/product/newproductdetail.html',
                            controller: 'newproductDetailController'
                        }
                    }
                })
                .state('index.productQishu', {
                    url: '/productQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'productQishuController'
                        }
                    }
                })
                .state('index.orderdetailshare', {
                    url: '/orderdetailshare/:wd/:pid',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/orderdetail_share.html',
                            controller: 'orderdetailShareController'
                        }
                    }
                })
                .state('index.productorderdetailshare', {
                    url: '/productorderdetailshare/:pid/:wd',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/orderdetail_share.html',
                            controller: 'orderdetailShareController'
                        }
                    }
                })
                .state('index.orderdetail_share_detail', {
                    url: '/orderdetail_share_detail',
//              cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/orderdetail_share_detail.html',
                            controller: 'orderShareDetailsController'
                        }
                    }
                })
                .state('index.userIndex', {
                    url: '/userIndex/:u',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/userIndex.html',
                            controller: 'userIndexController'
                        }
                    }
                })
                .state('index.userCard', {
                    url: '/userCard',
                    views: {
                        'index': {
                            templateUrl: 'templates/activite/userCard.html',
                            controller: 'userCardController'
                        }
                    }
                })
                .state('index.shopnumber', {
                    url: '/shopnumber',
                    views: {
                        'index': {
                            templateUrl: 'templates/activite/shopnumber.html',
                            controller: 'shopnumberController'
                        }
                    }
                })
                .state('index.productJisuan', {
                    url: '/productJisuan/:pid/:pterm',
                    views: {
                        'index': {
                            templateUrl: 'templates/activite/productJisuan.html',
                            controller: 'productJisuanController'
                        }
                    }
                })
                .state('index.userAddress', {
                    url: '/userAddress/:type',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/userAddress.html',
                            controller: 'userAddressController'
                        }
                    }
                })
                .state('index.userAddressSubmit', {
                    url: '/userAddressSubmit',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/userAddressSubmit.html',
                            controller: 'userAddressSubmitController'
                        }
                    }
                })
                .state('index.userAddressSel', {
                    url: '/userAddressSel/:pid/:pterm',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/userAddressSel.html',
                            controller: 'userAddressSelController'
                        }
                    }
                })
                .state('index.shaidan', {
                    url: '/shaidan',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/shaidan.html',
                            controller: 'shaidanController'
                        }
                    }
                })
                //--登录开始
                .state('index.log', {
                    url: '/log',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/log.html',
                            controller: 'logController'
                        }
                    }
                })
                .state('index.binding', {
                    url: '/binding',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/binding.html',
                            controller: 'bindingController'
                        }
                    }
                })
                .state('index.SecurityCode', {
                    url: '/SecurityCode',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/securityCode.html',
                            controller: 'securityCodeController'
                        }
                    }
                })
                .state('index.setPassword', {
                    url: '/setPassword',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/setPassword.html',
                            controller: 'setPasswordController'
                        }
                    }
                })
                .state('index.changePassword', {
                    url: '/changePassword',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/changePassword.html',
                            controller: 'changePasswordController'
                        }
                    }
                })
                .state('index.register', {
                    url: '/register',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/register.html',
                            controller: 'registerController'
                        }
                    }
                })
                .state('index.registerStepTwo', {
                    url: '/registerStepTwo',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/registerStepTwo.html',
                            controller: 'registerStepTwoController'
                        }
                    }
                })
                .state('index.registerStepThree', {
                    url: '/registerStepThree',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/registerStepThree.html',
                            controller: 'registerStepThreeController'
                        }
                    }
                })
                .state('index.logPassback', {
                    url: '/logPassback',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/logPassback.html',
                            controller: 'logPassbackController'
                        }
                    }
                })
                .state('index.imageText', {
                    url: '/imageText/:pid',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/product/imageText.html',
                            controller: 'imageTextController'
                        }
                    }
                })
                .state('index.proBuyDetail', {
                    url: '/proBuyDetail/:pid/:pterm',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/product/proBuyDetail.html',
                            controller: 'proBuyDetailController'
                        }
                    }
                })
                .state('index.newbie', {
                    url: '/newbie',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/newbie.html',
                            controller: 'newbieController'
                        }
                    }
                })
                .state('index.newbieDetail', {
                    url: '/newbieDetail',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/product/newbiedetail.html',
                            controller: 'newbieDetailController'
                        }
                    }
                })
                .state('index.newOrderForm', {
                    url: '/newOrderForm/:pid/:num',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/cart/newbieOrderForm.html',
                            controller: 'newOrderFormController'
                        }
                    }
                })
                .state('index.newbieQishu', {
                    url: '/newbieQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'newbieQishuController'
                        }
                    }
                })
                //--登录结束
                .state('index.about', {
                    url: '/about',
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/about.html',
                            controller: 'aboutController'
                        }
                    }
                })
                .state('index.inviteIntr', {
                    url: '/inviteIntr',
                    views: {
                        'index': {
                            templateUrl: 'templates/index/inviteIntr.html',
                            controller: 'inviteIntrController'
                        }
                    }
                })
                // .state('index.luckDraw', {
                //     url: '/luckDraw',
                //     cache: false,
                //     views: {
                //         'index': {
                //             templateUrl: 'templates/index/luckDraw.html',
                //             controller: 'luckDrawController'
                //         }
                //     }
                // })
                .state('index.winGoods', {
                    url: '/winGoods/:hd',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/winGoods.html',
                            controller: 'winGoodsController'
                        }
                    }
                })
                .state('index.logisticsAct', {
                    url: '/logisticsAct/:id',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/logisticsAct.html',
                            controller: 'logisticsActController'
                        }
                    }
                })
                .state('index.shaidanAct', {
                    url: '/shaidanAct/:id',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/shaidanAct.html',
                            controller: 'shaidanActController'
                        }
                    }
                })
                .state('index.userAddressActSel', {
                    url: '/userAddressActSel/:id',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/userAddressActSel.html',
                            controller: 'userAddressActSelController'
                        }
                    }
                })
                .state('index.winGoodsDetail', {
                    url: '/winGoodsDetail/:id',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/winGoodsDetail.html',
                            controller: 'winGoodsDetailController'
                        }
                    }
                })
                .state('index.logistics', {
                    url: '/logistics/:pid/:pterm',
                    cache:false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/logistics.html',
                            controller: 'logisticsController'
                        }
                    }
                })
                .state('index.userVirtualAddrSubmit', {
                    url: '/userVirtualAddrSubmit/:pid/:pterm',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/userVirtualAddressSubmit.html',
                            controller: 'userVirtualAddressSubmitController'
                        }
                    }
                })
                .state('index.noticeDetail', {
                    url: '/noticeDetail/:nid',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/mine/noticeDetail.html',
                            controller: 'noticeDetailController'
                        }
                    }
                })
                .state('index.gainerList', {
                    url: '/gainerList/:pid',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/product/gainerList.html',
                            controller: 'gainerListController'
                        }
                    }
                })
                .state('index.snatch', {
                    url: '/snatch',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/snatch.html',
                            controller: 'snatchController'
                        }
                    }
                })
                // 所有商品开始
                .state('product.productlist', {
                    url: '/productlist',
                    views: {
                        'product': {
                            templateUrl: 'templates/product/newproductlist.html',
                            controller: 'productlistController'
                        }
                    }
                })
                .state('product.search', {
                    url: '/search',
                    views: {
                        'product': {
                            templateUrl: 'templates/index/search.html',
                            controller: 'searchController'
                        }
                    }
                })
                .state('product.newproductdetail', {
                    url: '/newproductdetail',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/product/newproductdetail.html',
                            controller: 'newproductDetailController'
                        }
                    }
                })
                .state('product.imageText', {
                    url: '/imageText/:pid',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/product/imageText.html',
                            controller: 'imageTextController'
                        }
                    }
                })
                .state('product.proBuyDetail', {
                    url: '/proBuyDetail/:pid/:pterm',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/product/proBuyDetail.html',
                            controller: 'proBuyDetailController'
                        }
                    }
                })
                .state('product.productQishu', {
                    url: '/productQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'productQishuController'
                        }
                    }
                })
                .state('product.productorderdetailshare', {
                    url: '/productorderdetailshare/:pid/:wd',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/index/orderdetail_share.html',
                            controller: 'orderdetailShareController'
                        }
                    }
                })
                .state('product.orderdetail_share_detail', {
                    url: '/orderdetail_share_detail',
//              cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/index/orderdetail_share_detail.html',
                            controller: 'orderShareDetailsController'
                        }
                    }
                })
                .state('product.userIndex', {
                    url: '/userIndex/:u',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/index/userIndex.html',
                            controller: 'userIndexController'
                        }
                    }
                })
                .state('product.userCard', {
                    url: '/userCard',
                    views: {
                        'product': {
                            templateUrl: 'templates/activite/userCard.html',
                            controller: 'userCardController'
                        }
                    }
                })
                .state('product.shopnumber', {
                    url: '/shopnumber',
                    views: {
                        'product': {
                            templateUrl: 'templates/activite/shopnumber.html',
                            controller: 'shopnumberController'
                        }
                    }
                })
                .state('product.productJisuan', {
                    url: '/productJisuan/:pid/:pterm',
                    views: {
                        'product': {
                            templateUrl: 'templates/activite/productJisuan.html',
                            controller: 'productJisuanController'
                        }
                    }
                })
                .state('product.newbieDetail', {
                    url: '/newbieDetail',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/product/newbiedetail.html',
                            controller: 'newbieDetailController'
                        }
                    }
                })
                .state('product.newOrderForm', {
                    url: '/newOrderForm/:pid/:num',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/cart/newbieOrderForm.html',
                            controller: 'newOrderFormController'
                        }
                    }
                })
                .state('product.newbieQishu', {
                    url: '/newbieQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'newbieQishuController'
                        }
                    }
                })
                .state('product.payFinish', {
                    url: '/payFinish',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/cart/zfwcNew.html',
                            controller: 'payFinishController'
                        }
                    }
                })
                //--登录开始
                .state('product.log', {
                    url: '/log',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/log.html',
                            controller: 'logController'
                        }
                    }
                })
                .state('product.binding', {
                    url: '/binding',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/binding.html',
                            controller: 'bindingController'
                        }
                    }
                })
                .state('product.SecurityCode', {
                    url: '/SecurityCode',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/securityCode.html',
                            controller: 'securityCodeController'
                        }
                    }
                })
                .state('product.setPassword', {
                    url: '/setPassword',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/setPassword.html',
                            controller: 'setPasswordController'
                        }
                    }
                })
                .state('product.changePassword', {
                    url: '/changePassword',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/changePassword.html',
                            controller: 'changePasswordController'
                        }
                    }
                })
                .state('product.register', {
                    url: '/register',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/register.html',
                            controller: 'registerController'
                        }
                    }
                })
                .state('product.registerStepTwo', {
                    url: '/registerStepTwo',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/registerStepTwo.html',
                            controller: 'registerStepTwoController'
                        }
                    }
                })
                .state('product.registerStepThree', {
                    url: '/registerStepThree',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/registerStepThree.html',
                            controller: 'registerStepThreeController'
                        }
                    }
                })
                .state('product.logPassback', {
                    url: '/logPassback',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/logPassback.html',
                            controller: 'logPassbackController'
                        }
                    }
                })
                .state('product.buyRecord', {
                    url: '/buyRecord',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/buyRecord.html',
                            controller: 'buyRecordController'
                        }
                    }
                })
                .state('product.about', {
                    url: '/about',
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/about.html',
                            controller: 'aboutController'
                        }
                    }
                })
                .state('product.buyRecordDetail', {
                    url: '/buyRecordDetail/:pid/:pterm',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/buyRecordDetail.html',
                            controller: 'buyRecordDetailController'
                        }
                    }
                })
                .state('product.shaidan', {
                    url: '/shaidan',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/shaidan.html',
                            controller: 'shaidanController'
                        }
                    }
                })
                .state('product.logistics', {
                    url: '/logistics/:pid/:pterm',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/logistics.html',
                            controller: 'logisticsController'
                        }
                    }
                })
                .state('product.userAddressSel', {
                    url: '/userAddressSel/:pid/:pterm',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/userAddressSel.html',
                            controller: 'userAddressSelController'
                        }
                    }
                })
                .state('product.userVirtualAddrSubmit', {
                    url: '/userVirtualAddrSubmit/:pid/:pterm',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/userVirtualAddressSubmit.html',
                            controller: 'userVirtualAddressSubmitController'
                        }
                    }
                })
                .state('product.userAddress', {
                    url: '/userAddress/:type',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/userAddress.html',
                            controller: 'userAddressController'
                        }
                    }
                })
                .state('product.userAddressSubmit', {
                    url: '/userAddressSubmit',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/userAddressSubmit.html',
                            controller: 'userAddressSubmitController'
                        }
                    }
                })
                .state('product.winGoods', {
                    url: '/winGoods/:hd',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/winGoods.html',
                            controller: 'winGoodsController'
                        }
                    }
                })
                .state('product.logisticsAct', {
                    url: '/logisticsAct/:id',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/logisticsAct.html',
                            controller: 'logisticsActController'
                        }
                    }
                })
                .state('product.shaidanAct', {
                    url: '/shaidanAct/:id',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/shaidanAct.html',
                            controller: 'shaidanActController'
                        }
                    }
                })
                .state('product.userAddressActSel', {
                    url: '/userAddressActSel/:id',
                    cache:false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/userAddressActSel.html',
                            controller: 'userAddressActSelController'
                        }
                    }
                })
                .state('product.winGoodsDetail', {
                    url: '/winGoodsDetail/:id',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/winGoodsDetail.html',
                            controller: 'winGoodsDetailController'
                        }
                    }
                })
                .state('product.noticeDetail', {
                    url: '/noticeDetail/:nid',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/noticeDetail.html',
                            controller: 'noticeDetailController'
                        }
                    }
                })
                .state('product.gainerList', {
                    url: '/gainerList/:pid',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/product/gainerList.html',
                            controller: 'gainerListController'
                        }
                    }
                })
                .state('product.recharge', {
                    url: '/recharge',
                    cache: false,
                    views: {
                        'product': {
                            templateUrl: 'templates/mine/recharge.html',
                            controller: 'rechargeController'
                        }
                    }
                })
                // 最新揭晓开始
                .state('activite.newPublishList', {
                    url: '/newPublishList',
                    views: {
                        'activite': {
                            templateUrl: 'templates/activite/newPublishList.html',
                            controller: 'newPublishListController'
                        }
                    }
                })
                .state('activite.newproductdetail', {
                    url: '/newproductdetail',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/product/newproductdetail.html',
                            controller: 'newproductDetailController'
                        }
                    }
                })
                .state('activite.productQishu', {
                    url: '/productQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'productQishuController'
                        }
                    }
                })
                .state('activite.productorderdetailshare', {
                    url: '/productorderdetailshare/:pid/:wd',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/index/orderdetail_share.html',
                            controller: 'orderdetailShareController'
                        }
                    }
                })
                .state('activite.orderdetail_share_detail', {
                    url: '/orderdetail_share_detail',
//              cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/index/orderdetail_share_detail.html',
                            controller: 'orderShareDetailsController'
                        }
                    }
                })
                .state('activite.userIndex', {
                    url: '/userIndex/:u',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/index/userIndex.html',
                            controller: 'userIndexController'
                        }
                    }
                })
                .state('activite.userCard', {
                    url: '/userCard',
                    views: {
                        'activite': {
                            templateUrl: 'templates/activite/userCard.html',
                            controller: 'userCardController'
                        }
                    }
                })
                .state('activite.shopnumber', {
                    url: '/shopnumber',
                    views: {
                        'activite': {
                            templateUrl: 'templates/activite/shopnumber.html',
                            controller: 'shopnumberController'
                        }
                    }
                })
                .state('activite.productJisuan', {
                    url: '/productJisuan/:pid/:pterm',
                    views: {
                        'activite': {
                            templateUrl: 'templates/activite/productJisuan.html',
                            controller: 'productJisuanController'
                        }
                    }
                })
                .state('activite.newbieDetail', {
                    url: '/newbieDetail',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/product/newbiedetail.html',
                            controller: 'newbieDetailController'
                        }
                    }
                })
                .state('activite.newOrderForm', {
                    url: '/newOrderForm/:pid/:num',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/cart/newbieOrderForm.html',
                            controller: 'newOrderFormController'
                        }
                    }
                })
                .state('activite.newbieQishu', {
                    url: '/newbieQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'newbieQishuController'
                        }
                    }
                })
                .state('activite.payFinish', {
                    url: '/payFinish',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/cart/zfwcNew.html',
                            controller: 'payFinishController'
                        }
                    }
                })
                .state('activite.buyRecord', {
                    url: '/buyRecord',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/buyRecord.html',
                            controller: 'buyRecordController'
                        }
                    }
                })
                //--登录开始
                .state('activite.log', {
                    url: '/log',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/log.html',
                            controller: 'logController'
                        }
                    }
                })
                .state('activite.binding', {
                    url: '/binding',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/binding.html',
                            controller: 'bindingController'
                        }
                    }
                })
                .state('activite.SecurityCode', {
                    url: '/SecurityCode',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/securityCode.html',
                            controller: 'securityCodeController'
                        }
                    }
                })
                .state('activite.setPassword', {
                    url: '/setPassword',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/setPassword.html',
                            controller: 'setPasswordController'
                        }
                    }
                })
                .state('activite.changePassword', {
                    url: '/changePassword',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/changePassword.html',
                            controller: 'changePasswordController'
                        }
                    }
                })
                .state('activite.register', {
                    url: '/register',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/register.html',
                            controller: 'registerController'
                        }
                    }
                })
                .state('activite.registerStepTwo', {
                    url: '/registerStepTwo',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/registerStepTwo.html',
                            controller: 'registerStepTwoController'
                        }
                    }
                })
                .state('activite.registerStepThree', {
                    url: '/registerStepThree',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/registerStepThree.html',
                            controller: 'registerStepThreeController'
                        }
                    }
                })
                .state('activite.logPassback', {
                    url: '/logPassback',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/logPassback.html',
                            controller: 'logPassbackController'
                        }
                    }
                })
                //--登录结束
                .state('activite.about', {
                    url: '/about',
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/about.html',
                            controller: 'aboutController'
                        }
                    }
                })
                .state('activite.imageText', {
                    url: '/imageText/:pid',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/product/imageText.html',
                            controller: 'imageTextController'
                        }
                    }
                })
                .state('activite.proBuyDetail', {
                    url: '/proBuyDetail/:pid/:pterm',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/product/proBuyDetail.html',
                            controller: 'proBuyDetailController'
                        }
                    }
                })
                .state('activite.buyRecordDetail', {
                    url: '/buyRecordDetail/:pid/:pterm',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/buyRecordDetail.html',
                            controller: 'buyRecordDetailController'
                        }
                    }
                })
                .state('activite.shaidan', {
                    url: '/shaidan',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/shaidan.html',
                            controller: 'shaidanController'
                        }
                    }
                })
                .state('activite.logistics', {
                    url: '/logistics/:pid/:pterm',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/logistics.html',
                            controller: 'logisticsController'
                        }
                    }
                })
                .state('activite.userAddressSel', {
                    url: '/userAddressSel/:pid/:pterm',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/userAddressSel.html',
                            controller: 'userAddressSelController'
                        }
                    }
                })
                .state('activite.userVirtualAddrSubmit', {
                    url: '/userVirtualAddrSubmit/:pid/:pterm',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/userVirtualAddressSubmit.html',
                            controller: 'userVirtualAddressSubmitController'
                        }
                    }
                })
                .state('activite.userAddress', {
                    url: '/userAddress/:type',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/userAddress.html',
                            controller: 'userAddressController'
                        }
                    }
                })
                .state('activite.userAddressSubmit', {
                    url: '/userAddressSubmit',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/userAddressSubmit.html',
                            controller: 'userAddressSubmitController'
                        }
                    }
                })
                .state('activite.winGoods', {
                    url: '/winGoods/:hd',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/winGoods.html',
                            controller: 'winGoodsController'
                        }
                    }
                })
                .state('activite.logisticsAct', {
                    url: '/logisticsAct/:id',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/logisticsAct.html',
                            controller: 'logisticsActController'
                        }
                    }
                })
                .state('activite.shaidanAct', {
                    url: '/shaidanAct/:id',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/shaidanAct.html',
                            controller: 'shaidanActController'
                        }
                    }
                })
                .state('activite.userAddressActSel', {
                    url: '/userAddressActSel/:id',
                    cache:false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/userAddressActSel.html',
                            controller: 'userAddressActSelController'
                        }
                    }
                })
                .state('activite.winGoodsDetail', {
                    url: '/winGoodsDetail/:id',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/winGoodsDetail.html',
                            controller: 'winGoodsDetailController'
                        }
                    }
                })
                .state('activite.noticeDetail', {
                    url: '/noticeDetail/:nid',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/noticeDetail.html',
                            controller: 'noticeDetailController'
                        }
                    }
                })
                .state('activite.gainerList', {
                    url: '/gainerList/:pid',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/product/gainerList.html',
                            controller: 'gainerListController'
                        }
                    }
                })
                .state('activite.recharge', {
                    url: '/recharge',
                    cache: false,
                    views: {
                        'activite': {
                            templateUrl: 'templates/mine/recharge.html',
                            controller: 'rechargeController'
                        }
                    }
                })
                // 购物车开始
                .state('cart.cart', {
                    url: '/cart',
                    views: {
                        'cart': {
                            templateUrl: 'templates/cart/cart.html',
                            controller: 'cartController'
                        }
                    }
                })
                .state('cart.orderForm', {
                    url: '/orderForm',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/cart/orderForm.html',
                            controller: 'orderFormController'
                        }
                    }
                })
                .state('cart.payFinish', {
                    url: '/payFinish',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/cart/zfwcNew.html',
                            controller: 'payFinishController'
                        }
                    }
                })
                .state('cart.buyRecord', {
                    url: '/buyRecord',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/buyRecord.html',
                            controller: 'buyRecordController'
                        }
                    }
                })
                .state('cart.buyRecordDetail', {
                    url: '/buyRecordDetail/:pid/:pterm',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/buyRecordDetail.html',
                            controller: 'buyRecordDetailController'
                        }
                    }
                })
                .state('cart.newproductdetail', {
                    url: '/newproductdetail',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/product/newproductdetail.html',
                            controller: 'newproductDetailController'
                        }
                    }
                })
                .state('cart.productQishu', {
                    url: '/productQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'productQishuController'
                        }
                    }
                })
                .state('cart.productorderdetailshare', {
                    url: '/productorderdetailshare/:pid/:wd',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/index/orderdetail_share.html',
                            controller: 'orderdetailShareController'
                        }
                    }
                })
                .state('cart.orderdetail_share_detail', {
                    url: '/orderdetail_share_detail',
//              cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/index/orderdetail_share_detail.html',
                            controller: 'orderShareDetailsController'
                        }
                    }
                })
                .state('cart.userIndex', {
                    url: '/userIndex/:u',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/index/userIndex.html',
                            controller: 'userIndexController'
                        }
                    }
                })
                .state('cart.userCard', {
                    url: '/userCard',
                    views: {
                        'cart': {
                            templateUrl: 'templates/activite/userCard.html',
                            controller: 'userCardController'
                        }
                    }
                })
                .state('cart.shopnumber', {
                    url: '/shopnumber',
                    views: {
                        'cart': {
                            templateUrl: 'templates/activite/shopnumber.html',
                            controller: 'shopnumberController'
                        }
                    }
                })
                .state('cart.productJisuan', {
                    url: '/productJisuan/:pid/:pterm',
                    views: {
                        'cart': {
                            templateUrl: 'templates/activite/productJisuan.html',
                            controller: 'productJisuanController'
                        }
                    }
                })
                .state('cart.userAddress', {
                    url: '/userAddress/:type',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/userAddress.html',
                            controller: 'userAddressController'
                        }
                    }
                })
                .state('cart.userAddressSubmit', {
                    url: '/userAddressSubmit',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/userAddressSubmit.html',
                            controller: 'userAddressSubmitController'
                        }
                    }
                })
                .state('cart.userVirtualAddrSubmit', {
                    url: '/userVirtualAddrSubmit/:pid/:pterm',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/userVirtualAddressSubmit.html',
                            controller: 'userVirtualAddressSubmitController'
                        }
                    }
                })
                .state('cart.userAddressSel', {
                    url: '/userAddressSel/:pid/:pterm',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/userAddressSel.html',
                            controller: 'userAddressSelController'
                        }
                    }
                })
                .state('cart.shaidan', {
                    url: '/shaidan',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/shaidan.html',
                            controller: 'shaidanController'
                        }
                    }
                })
                //--登录开始
                .state('cart.log', {
                    url: '/log',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/log.html',
                            controller: 'logController'
                        }
                    }
                })
                .state('cart.binding', {
                    url: '/binding',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/binding.html',
                            controller: 'bindingController'
                        }
                    }
                })
                .state('cart.SecurityCode', {
                    url: '/SecurityCode',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/securityCode.html',
                            controller: 'securityCodeController'
                        }
                    }
                })
                .state('cart.setPassword', {
                    url: '/setPassword',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/setPassword.html',
                            controller: 'setPasswordController'
                        }
                    }
                })
                .state('cart.changePassword', {
                    url: '/changePassword',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/changePassword.html',
                            controller: 'changePasswordController'
                        }
                    }
                })
                .state('cart.register', {
                    url: '/register',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/register.html',
                            controller: 'registerController'
                        }
                    }
                })
                .state('cart.registerStepTwo', {
                    url: '/registerStepTwo',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/registerStepTwo.html',
                            controller: 'registerStepTwoController'
                        }
                    }
                })
                .state('cart.registerStepThree', {
                    url: '/registerStepThree',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/registerStepThree.html',
                            controller: 'registerStepThreeController'
                        }
                    }
                })
                .state('cart.logPassback', {
                    url: '/logPassback',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/logPassback.html',
                            controller: 'logPassbackController'
                        }
                    }
                })
                .state('cart.newbieDetail', {
                    url: '/newbieDetail',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/product/newbiedetail.html',
                            controller: 'newbieDetailController'
                        }
                    }
                })
                .state('cart.newOrderForm', {
                    url: '/newOrderForm/:pid/:num',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/cart/newbieOrderForm.html',
                            controller: 'newOrderFormController'
                        }
                    }
                })
                .state('cart.newbieQishu', {
                    url: '/newbieQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'newbieQishuController'
                        }
                    }
                })
                //--登录结束
                .state('cart.about', {
                    url: '/about',
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/about.html',
                            controller: 'aboutController'
                        }
                    }
                })
                .state('cart.imageText', {
                    url: '/imageText/:pid',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/product/imageText.html',
                            controller: 'imageTextController'
                        }
                    }
                })
                .state('cart.proBuyDetail', {
                    url: '/proBuyDetail/:pid/:pterm',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/product/proBuyDetail.html',
                            controller: 'proBuyDetailController'
                        }
                    }
                })
                .state('cart.logistics', {
                    url: '/logistics/:pid/:pterm',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/logistics.html',
                            controller: 'logisticsController'
                        }
                    }
                })
                .state('cart.winGoods', {
                    url: '/winGoods/:hd',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/winGoods.html',
                            controller: 'winGoodsController'
                        }
                    }
                })
                .state('cart.logisticsAct', {
                    url: '/logisticsAct/:id',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/logisticsAct.html',
                            controller: 'logisticsActController'
                        }
                    }
                })
                .state('cart.shaidanAct', {
                    url: '/shaidanAct/:id',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/shaidanAct.html',
                            controller: 'shaidanActController'
                        }
                    }
                })
                .state('cart.userAddressActSel', {
                    url: '/userAddressActSel/:id',
                    cache:false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/userAddressActSel.html',
                            controller: 'userAddressActSelController'
                        }
                    }
                })
                .state('cart.winGoodsDetail', {
                    url: '/winGoodsDetail/:id',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/winGoodsDetail.html',
                            controller: 'winGoodsDetailController'
                        }
                    }
                })
                .state('cart.noticeDetail', {
                    url: '/noticeDetail/:nid',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/noticeDetail.html',
                            controller: 'noticeDetailController'
                        }
                    }
                })
                .state('cart.gainerList', {
                    url: '/gainerList/:pid',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/product/gainerList.html',
                            controller: 'gainerListController'
                        }
                    }
                })
                .state('cart.recharge', {
                    url: '/recharge',
                    cache: false,
                    views: {
                        'cart': {
                            templateUrl: 'templates/mine/recharge.html',
                            controller: 'rechargeController'
                        }
                    }
                })
                // 我的开始
                .state('mine.myIndex', {
                    url: '/myIndex',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/myIndex.html',
                            controller: 'myIndexController'
                        }
                    }
                })
                .state('mine.recharge', {
                    url: '/recharge',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/recharge.html',
                            controller: 'rechargeController'
                        }
                    }
                })
                .state('mine.payFinish', {
                    url: '/payFinish',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/cart/zfwcNew.html',
                            controller: 'payFinishController'
                        }
                    }
                })
                .state('mine.buyRecord', {
                    url: '/buyRecord',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/buyRecord.html',
                            controller: 'buyRecordController'
                        }
                    }
                })
                .state('mine.winGoods', {
                    url: '/winGoods/:hd',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/winGoods.html',
                            controller: 'winGoodsController'
                        }
                    }
                })
                .state('mine.logisticsAct', {
                    url: '/logisticsAct/:id',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/logisticsAct.html',
                            controller: 'logisticsActController'
                        }
                    }
                })
                .state('mine.shaidanAct', {
                    url: '/shaidanAct/:id',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/shaidanAct.html',
                            controller: 'shaidanActController'
                        }
                    }
                })
                .state('mine.userAddressActSel', {
                    url: '/userAddressActSel/:id',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/userAddressActSel.html',
                            controller: 'userAddressActSelController'
                        }
                    }
                })
                .state('mine.userVirtualAddrActSubmit', {
                    url: '/userVirtualAddrActSubmit/:id',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/userVirtualAddrActSubmit.html',
                            controller: 'userVirtualAddrActSubmitController'
                        }
                    }
                })
                .state('mine.buyRecordDetail', {
                    url: '/buyRecordDetail/:pid/:pterm',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/buyRecordDetail.html',
                            controller: 'buyRecordDetailController'
                        }
                    }
                })
                .state('mine.winGoodsDetail', {
                    url: '/winGoodsDetail/:id',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/winGoodsDetail.html',
                            controller: 'winGoodsDetailController'
                        }
                    }
                })
                .state('mine.newproductdetail', {
                    url: '/newproductdetail',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/product/newproductdetail.html',
                            controller: 'newproductDetailController'
                        }
                    }
                })
                .state('mine.productQishu', {
                    url: '/productQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'productQishuController'
                        }
                    }
                })
                .state('mine.productorderdetailshare', {
                    url: '/productorderdetailshare/:pid/:wd',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/index/orderdetail_share.html',
                            controller: 'orderdetailShareController'
                        }
                    }
                })
                .state('mine.shareList', {
                    url: '/shareList',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/shareList.html',
                            controller: 'shareListController'
                        }
                    }
                })
                .state('mine.shareDetail', {
                    url: '/shareDetail/:id',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/shareDetail.html',
                            controller: 'shareDetailController'
                        }
                    }
                })
                .state('mine.userIndex', {
                    url: '/userIndex/:u',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/index/userIndex.html',
                            controller: 'userIndexController'
                        }
                    }
                })
                .state('mine.userCard', {
                    url: '/userCard',
                    views: {
                        'mine': {
                            templateUrl: 'templates/activite/userCard.html',
                            controller: 'userCardController'
                        }
                    }
                })
                .state('mine.shopnumber', {
                    url: '/shopnumber',
                    views: {
                        'mine': {
                            templateUrl: 'templates/activite/shopnumber.html',
                            controller: 'shopnumberController'
                        }
                    }
                })
                .state('mine.productJisuan', {
                    url: '/productJisuan/:pid/:pterm',
                    views: {
                        'mine': {
                            templateUrl: 'templates/activite/productJisuan.html',
                            controller: 'productJisuanController'
                        }
                    }
                })
                .state('mine.accountDetail', {
                    url: '/accountDetail',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/accountDetail.html',
                            controller: 'accountDetailController'
                        }
                    }
                })
                .state('mine.userAddress', {
                    url: '/userAddress/:type',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/userAddress.html',
                            controller: 'userAddressController'
                        }
                    }
                })
                .state('mine.userAddressSubmit', {
                    url: '/userAddressSubmit',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/userAddressSubmit.html',
                            controller: 'userAddressSubmitController'
                        }
                    }
                })
                .state('mine.userAddressSel', {
                    url: '/userAddressSel/:pid/:pterm',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/userAddressSel.html',
                            controller: 'userAddressSelController'
                        }
                    }
                })
                .state('mine.cash', {
                    url: '/cash',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/cash.html',
                            controller: 'cashController'
                        }
                    }
                })
                .state('mine.traderPassSet', {
                    url: '/traderPassSet',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/traderPassSet.html',
                            controller: 'traderPassSetController'
                        }
                    }
                })
                .state('mine.shaidan', {
                    url: '/shaidan',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/shaidan.html',
                            controller: 'shaidanController'
                        }
                    }
                })
                .state('mine.news', {
                    url: '/news',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/news.html',
                            controller: 'newsController'
                        }
                    }
                })
                .state('mine.ly', {
                    url: '/ly',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/ly.html',
                            controller: 'lyController'
                        }
                    }
                })
                .state('mine.about', {
                    url: '/about',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/about.html',
                            controller: 'aboutController'
                        }
                    }
                })
                .state('mine.mySetingSafe', {
                    url: '/mySetingSafe',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/mySetingSafe.html',
                            controller: 'mySetingSafeController'
                        }
                    }
                })
                .state('mine.mySetingSecret', {
                    url: '/mySetingSecret',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/mySetingSecret.html',
                            controller: 'mySetingSecretController'
                        }
                    }
                })
                .state('mine.logPassMod', {
                    url: '/logPassMod',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/logPassMod.html',
                            controller: 'logPassModController'
                        }
                    }
                })
                .state('mine.logistics', {
                    url: '/logistics/:pid/:pterm',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/logistics.html',
                            controller: 'logisticsController'
                        }
                    }
                })
                .state('mine.myInfo', {
                    url: '/myInfo',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/myInfo.html',
                            controller: 'myInfoController'
                        }
                    }
                })
                .state('mine.myNickname', {
                    url: '/myNickname',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/myNickname.html',
                            controller: 'myNicknameController'
                        }
                    }
                })
                .state('mine.mySex', {
                    url: '/mySex',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/mySex.html',
                            controller: 'mySexController'
                        }
                    }
                })
                .state('mine.myBirthday', {
                    url: '/myBirthday',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/myBirthday.html',
                            controller: 'myBirthdayController'
                        }
                    }
                })
                .state('mine.myQq', {
                    url: '/myQq',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/myQq.html',
                            controller: 'myQqController'
                        }
                    }
                })
                .state('mine.myHometown', {
                    url: '/myHometown',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/myHomeTown.html',
                            controller: 'myHometownController'
                        }
                    }
                })
                .state('mine.mySignature', {
                    url: '/mySignature',
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/mySignature.html',
                            controller: 'mySignatureController'
                        }
                    }
                })
                .state('mine.newbieDetail', {
                    url: '/newbieDetail',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/product/newbiedetail.html',
                            controller: 'newbieDetailController'
                        }
                    }
                })
                .state('mine.newOrderForm', {
                    url: '/newOrderForm/:pid/:num',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/cart/newbieOrderForm.html',
                            controller: 'newOrderFormController'
                        }
                    }
                })
                .state('mine.newbieQishu', {
                    url: '/newbieQishu/:pid/:pterm',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/index/productQishu.html',
                            controller: 'newbieQishuController'
                        }
                    }
                })
                //--登录开始
                .state('mine.log', {
                    url: '/log',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/log.html',
                            controller: 'logController'
                        }
                    }
                })
                .state('mine.binding', {
                    url: '/binding',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/binding.html',
                            controller: 'bindingController'
                        }
                    }
                })
                .state('mine.SecurityCode', {
                    url: '/SecurityCode',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/securityCode.html',
                            controller: 'securityCodeController'
                        }
                    }
                })
                .state('mine.setPassword', {
                    url: '/setPassword',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/setPassword.html',
                            controller: 'setPasswordController'
                        }
                    }
                })
                .state('mine.changePassword', {
                    url: '/changePassword',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/changePassword.html',
                            controller: 'changePasswordController'
                        }
                    }
                })
                .state('mine.register', {
                    url: '/register',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/register.html',
                            controller: 'registerController'
                        }
                    }
                })
                .state('mine.registerStepTwo', {
                    url: '/registerStepTwo',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/registerStepTwo.html',
                            controller: 'registerStepTwoController'
                        }
                    }
                })
                .state('mine.registerStepThree', {
                    url: '/registerStepThree',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/registerStepThree.html',
                            controller: 'registerStepThreeController'
                        }
                    }
                })
                .state('mine.logPassback', {
                    url: '/logPassback',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/logPassback.html',
                            controller: 'logPassbackController'
                        }
                    }
                })
                //--登录结束
                .state('mine.mySeting', {
                    url: '/mySeting',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/mySeting.html',
                            controller: 'mySetingController'
                        }
                    }
                })
                .state('mine.commission', {
                    url: '/commission',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/commission.html',
                            controller: 'commissionController'
                        }
                    }
                })
                .state('mine.rollOut', {
                    url: '/rollOut',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/rollOut.html',
                            controller: 'rollOutController'
                        }
                    }
                })
                .state('mine.customerService', {
                    url: '/customerService',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/customerService.html',
                            controller: 'customerServiceController'
                        }
                    }
                })
                .state('mine.userVirtualAddrSubmit', {
                    url: '/userVirtualAddrSubmit/:pid/:pterm',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/userVirtualAddressSubmit.html',
                            controller: 'userVirtualAddressSubmitController'
                        }
                    }
                })
                .state('mine.gift', {
                    url: '/gift',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/gift.html',
                            controller: 'giftController'
                        }
                    }
                })
                .state('mine.integralDetails', {
                    url: '/integralDetails',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/integral.html',
                            controller: 'integralDetailsController'
                        }
                    }
                })
                .state('mine.imageText', {
                    url: '/imageText/:pid',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/product/imageText.html',
                            controller: 'imageTextController'
                        }
                    }
                })
                .state('mine.proBuyDetail', {
                    url: '/proBuyDetail/:pid/:pterm',
                    cache:false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/product/proBuyDetail.html',
                            controller: 'proBuyDetailController'
                        }
                    }
                })
                .state('mine.integral', {
                    url: '/integral',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/index/integral.html',
                            controller: 'integralController'
                        }
                    }
                })
                .state('mine.showSignHistory', {
                    url: '/showSignHistory',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/index/showSignHistory.html',
                            controller: 'showSignHistoryController'
                        }
                    }
                })
                .state('mine.noticeList', {
                    url: '/noticeList',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/noticeList.html',
                            controller: 'noticeListController'
                        }
                    }
                })
                .state('mine.noticeDetail', {
                    url: '/noticeDetail/:nid',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/noticeDetail.html',
                            controller: 'noticeDetailController'
                        }
                    }
                })
                .state('mine.gainerList', {
                    url: '/gainerList/:pid',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/product/gainerList.html',
                            controller: 'gainerListController'
                        }
                    }
                })
                .state('mine.guide', {
                    url: '/guide',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/index/guide.html',
                            controller: 'guideController'
                        }
                    }
                })
                .state('mine.supple', {
                    url: '/supple',
                    cache: false,
                    views: {
                        'mine': {
                            templateUrl: 'templates/mine/supple.html',
                            controller: 'suppleController'
                        }
                    }
                })
                 .state('index.moneyget', {
                    url: '/moneyget',
                    cache: false,
                    views: {
                        'index': {
                            templateUrl: 'templates/index/moneyget.html',
                            controller: 'moneygetController'
                        }
                    }
                })
            $urlRouterProvider.otherwise('/index/index');
        }]);
});