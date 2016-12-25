(function () {
    "use strict";

    angular.module("myapp.services", []).factory("myappService", ["$rootScope", "$http", function ($rootScope, $http) {
        var myappService = {};

        //starts and stops the application waiting indicator
        myappService.wait = function (show) {
            if (show)
                $(".spinner").show();
            else
                $(".spinner").hide();
        };

        return myappService;
    }])

    //.factory('Friends', function ($http, $rootScope, $stateParams) {
    //    return {
    //        all: function () {
    //            return $http.get('http://localhost:26494/Api/MonthlySales')
    //        },
    //        get: function () {
    //            return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })
    //        },
    //        add: function (id) {
    //            return $http.get('https://friends.json/new', { params: { idfriends: id } })
    //        }
    //    };
    //});

    //.factory('Saleses', function ($http) {
    //    return {
    //        all: function() {
    //            return $http.get("http://localhost:26494/Api/MonthlySales");
    //            //return $http.get("http://test.aristolms.com/ws_get.asmx?op=AppReportInterviews", { params: { username: 'sysyon', password: '413400', startdate: '2015-01-01', finishdate: '2017-01-01' } });
    //        }
    //    };
    //});


    .factory('Saleses', function ($http, $q) {
        var saleses = [];
        return {
            all: function (startDate, endDate, studentTypeId, sourceId, consultantId, courseId, isPrivateLesson) {
                var dfd = $q.defer();
                $http.get("http://test.aristolms.com/ws_get.asmx/AppReportSaleses?UserName=sysyon&Password=413406&Language=Tr&StartDate=" + startDate + "&FinishDate=" + endDate + "&StudentTypeId=" + studentTypeId + "&SourceId=" + sourceId + "&ConsultantId=" + consultantId + "&CourseId=" + courseId + "&IsPrivateLesson=" + isPrivateLesson + "").then(function (response) {
                    saleses = response.data;
                    if (saleses.length != undefined) {
                        dfd.resolve(saleses);
                    }
                    else {
                        dfd.resolve(null);
                    }
                });
                return dfd.promise;
            },
            get: function (friendId) {
                for (var i = 0; i < saleses.length; i++) {
                    if (saleses[i].id === parseInt(friendId)) {
                        return saleses[i];
                    }
                }
                return null;
            }
        }
    })

    .factory('TodaysSales', function ($http, $q) {
        var todayssales = [];
        return {
            all: function () {
                var dfd = $q.defer();
                $http.get("http://test.aristolms.com/ws_get.asmx/AppReportSaleses?UserName=sysyon&Password=413406&Language=Tr&StartDate=17-03-2016&FinishDate=20-03-2016").then(function (response) {
                    todayssales = response.data;
                    console.log(todayssales);
                    dfd.resolve(todayssales);
                });
                return dfd.promise;
            },
            get: function (friendId) {
                for (var i = 0; i < todayssales.length; i++) {
                    if (todayssales[i].id === parseInt(friendId)) {
                        return todayssales[i];
                    }
                }
                return null;
            }
        }
    })

        //app.js nin içindeki function ismiyle factory ismi kesinlikle aynı olmalıdır.
    .factory('PendingApproveSaleses', function ($http, $q) {
        var saleses = [];
        return {
            all: function () {
                var dfd = $q.defer();
                $http.get("http://test.aristolms.com/ws_get.asmx/AppPendingApproveSaleses?UserName=sysyon&Password=413406&Language=Tr").then(function (response) {
                    saleses = response.data;
                    //console.log(saleses);
                    if (saleses.length == undefined) {
                        dfd.resolve(null);
                    }
                    dfd.resolve(saleses);
                });
                return dfd.promise;
            },
            get: function (friendId) {
                for (var i = 0; i < saleses.length; i++) {
                    if (saleses[i].id === parseInt(friendId)) {
                        return saleses[i];
                    }
                }
                return null;
            }

        }
    })

    .factory('Interviews', function ($http, $q) {
        var reports = [];
        return {
            all: function (startDate, endDate) {
                var dfd = $q.defer();
                $http.get("http://test.aristolms.com/ws_get.asmx/AppReportInterviews?UserName=sysyon&Password=413406&Language=tr&StartDate=" + startDate + "&FinishDate=" + endDate + "").then(function (response) {
                    reports = response.data;
                    //console.log(reports);

                    if (reports.length == undefined) {
                        dfd.resolve(null);
                    }
                    dfd.resolve(reports);
                });
                return dfd.promise;
            },
            get: function (friendId) {
                for (var i = 0; i < reports.length; i++) {
                    if (reports[i].id === parseInt(friendId)) {
                        return reports[i];
                    }
                }
                return null;
            }
        }
    })

})();
