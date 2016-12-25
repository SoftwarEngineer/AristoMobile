(function () {
    "use strict";

    angular.module("myapp.controllers", [])
        .constant('ApiEndpoint', {
            url: 'http://localhost:26494/Api'
        })
    .controller("appCtrl", ["$scope", function ($scope) { }])

    //homeCtrl provides the logic for the home screen
    .controller("homeCtrl", function ($scope, todayssaleses) {
        //$scope.refresh = function () {
        //    $scope.$broadcast("scroll.refreshComplete");
        //};
        $scope.todayssales = todayssaleses;
    })


    //html sayfasındaki ng-repeat değişkenken adı ve in den sonra gelen isimle buradaki scope. isim aynı olmak zorundadır.
    .controller("ReportPendingApproveCtrl", function ($scope, allsaleses, PendingApproveSaleses) {
        $scope.saleses = allsaleses;
        $scope.Onayla = function (gelenStndntID) {
            var studentCreditId = gelenStndntID
            var url = "http://test.aristolms.com/ws_get.asmx/AppSalesApprove?UserName=sysyon&Password=413406&StudentCreditId=" + studentCreditId + "&SalesApprove=True&AccountingApprove=True";
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data === 1) {

                    }

                },

                error: function (x, y, z) {
                    alert("hata");

                }
            });

            //$scope.$broadcast();
            //Onayla butonuna basıldıgında secilen ID onaylanıyor ve guncel sayfa gelıyor
            PendingApproveSaleses.all(studentCreditId).then(function (result) {
                $scope.saleses = result;
                $scope.$broadcast('scroll.refreshComplete');
            }, function (err) {
                alert("bir hata ile karşılaşıldı");
            });
        }
    })


    .controller("ReportSalesesCtrl", function ($scope, allsaleses, Saleses) {

        $scope.saleses = allsaleses;

        //filtreleme(listele) fonksiyonu
        $scope.refresh = function () {
            var st = jQuery("#SD").val();
            var ft = jQuery("#FD").val();
            var ogrenciTipi = jQuery("#studentTypeSelect").val();
            var kaynakID = jQuery("#sourceSelect").val();
            var danisman = jQuery("#satisDanismani").val();
            var egitim = jQuery("#egitim").val();
            var dersTipi = jQuery("#courseTypeSelect").val();

            function dateReverse(date) {
                return date.split('-').reverse().join('-');
            }
            ft = dateReverse(ft);

            //$scope.$broadcast();
            //listele butonuna basıldıgında sayfa yenileyip yeni istenen tarih alıgındaki saleses'ları getiriyor
            //tarihler boş değilse listeleyecek ,tarihler boş ise hata verip boş sayfa gosterecek
            if (st !=="" && ft !== "") {
                Saleses.all(st, ft, ogrenciTipi, kaynakID, danisman, egitim, dersTipi).then(function (result) {
                    $scope.saleses = result;
                    $scope.$broadcast('scroll.refreshComplete');
                }, function (err) {
                    alert("bir hata ile karşılaşıldı");
                });
            }
            else {
                alert("Tarihler Boş");
                $scope.saleses = null;
            }
        }
    })
        //selectSource listemele
        .controller("reportSourceCtrl", function ($scope) {

            var url = "http://test.aristolms.com/ws_get.asmx/AppSource?UserName=sysyon&Password=413406";
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $scope.sources = data;
                },

                error: function (x, y, z) {
                    alert("hata");

                }
            });
        })

        //Görüşmeleri listeleme metodu
      .controller("ReportInterviewsCtrl", function ($scope, allreports, Interviews) {
          $scope.reports = allreports;

          $scope.refresh = function () {
              var st = jQuery("#SDInterviews").val();
              var ft = jQuery("#FDInterviews").val();

              function dateReverse(date) {
                  return date.split('-').reverse().join('-');
              }
              ft = dateReverse(ft);

              //$scope.$broadcast();
              //listele butonuna basıldıgında sayfa yenileyip yeni istenen tarih alıgındaki saleses'ları getiriyor             
              //tarihler boş değilse listeleyecek ,tarihler boş ise hata verip boş sayfa gosterecek
              if (st !== "" && ft !== "") {
                  Interviews.all(st, ft).then(function (result) {
                      $scope.reports = result;
                      $scope.$broadcast('scroll.refreshComplete');
                  }, function (err) {
                      alert("bir hata ile karşılaşıldı");
                  });
              }
              else {
                  alert("Tarihler Boş");
                  $scope.reports = null;
              }
          }
      })

     .controller("loginCtrl", ["$scope", "$state", function ($scope, $state) {
         $scope.$state = $state
         $scope.Login = function () {
             var email = jQuery("#username").val();
             var password = jQuery("#password").val();
             var url = "http://test.aristolms.com/ws_functions.asmx/AppLoginControl?UserName=" + email + '&Password=' + password;
             $.ajax({
                 url: url,
                 type: 'GET',
                 dataType: 'json',
                 success: function (data) {
                     if (data !== null) {

                         $state.go("app.reportsaleses");
                     }

                 },

                 error: function (x, y, z) {
                     alert("hata");

                 }
             });
         };
     }])


    .controller("errorCtrl", ["$scope", "myappService", function ($scope, myappService) {
        //public properties that define the error message and if an error is present
        $scope.error = "";
        $scope.activeError = false;

        //function to dismiss an active error
        $scope.dismissError = function () {
            $scope.activeError = false;
        };

        //broadcast event to catch an error and display it in the error section
        $scope.$on("error", function (evt, val) {
            //set the error message and mark activeError to true
            $scope.error = val;
            $scope.activeError = true;

            //stop any waiting indicators (including scroll refreshes)
            myappService.wait(false);
            $scope.$broadcast("scroll.refreshComplete");

            //manually apply given the way this might bubble up async
            $scope.$apply();
        });
    }]);
})();

/*.controller("ReportInterviewsCtrl", ["$scope", "$state", function ($scope, $state) {
    $scope.refresh = function () {
        $scope.$broadcast("scroll.refreshComplete");
    };
}])*/