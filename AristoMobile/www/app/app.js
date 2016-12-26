(function () {
    "use strict";

    angular.module("myapp", ["ionic", "myapp.controllers", "myapp.services"])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "app/templates/view-menu.html",
                controller: "appCtrl"
            })
            .state("app.home", {
                url: "/home",
                templateUrl: "app/templates/view-home.html",
                controller: "homeCtrl",
                resolve: {
                    todayssaleses: function (TodaysSales) {
                        return TodaysSales.all();
                    }
                }
            })
            .state("app.reportinterviews", {
                url: "/reportinterviews",
                templateUrl: "app/templates/report_interviews.html",
                controller: "ReportInterviewsCtrl",
                resolve: {
                    allreports: function (Interviews) {
                        return Interviews.all("01-01-2016", "22-03-2016");
                    }
                }
            })

            .state("app.reportpendingapprove", {
                url: "/reportpendingapprove",
                templateUrl: "app/templates/report_pending_approve.html",
                controller: "ReportPendingApproveCtrl",
                resolve: {
                    allsaleses: function (PendingApproveSaleses) {
                        return PendingApproveSaleses.all();
                    }
                }
            })

            .state("app.login", {
                url: "/login",
                templateUrl: "app/templates/login.html",
                controller: "loginCtrl"
            })


            .state("app.reportsaleses", {
                url: "/reportsaleses",
                templateUrl: "app/templates/report_saleses.html",
                controller: "ReportSalesesCtrl",
                resolve: {
                    allsaleses: function (Saleses) {
                        return Saleses.all(" ", " ", " ", " ", " ", " ", " ");
                    }
                }
            });
            $urlRouterProvider.otherwise("/app/login");
        });
})();