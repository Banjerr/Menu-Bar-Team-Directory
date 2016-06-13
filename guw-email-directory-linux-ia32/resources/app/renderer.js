'use strict'

// Define the guw email directory app module
var guw_email_directory = angular.module('guw_email_directory', ['ngMaterial', 'ngMessages', 'ngclipboard']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').dark()
    .primaryPalette('blue', {'default':'900'})
    .accentPalette('orange', {'default':'500'});
});

// Email search controller
guw_email_directory.controller('DemoCtrl', DemoCtrl);

function DemoCtrl($timeout, $q, $log, $http) {
    var array=[];
    var self = this;
    $http.get("db.json").then(function (result) {
      array = result.data;
      init();
    });
    function init(){
      self.simulateQuery = false;
      self.isDisabled = false;
      self.querySearch = querySearch;
    //   self.selectedItemChange = selectedItemChange;
    //   self.searchTextChange = searchTextChange;
    }

    function querySearch(query) {
      console.log(array);
      var results = query ? array.filter(createFilterFor(query)) : array;
      console.log(results);
      return results;
    }

    // function searchTextChange(text) {
    //     $log.info('Text changed to ' + text);
    // }
    //
    // function selectedItemChange(item) {
    //     $log.info('Item changed to ' + JSON.stringify(item.NAME));
    // }

    function createFilterFor(query) {
        //  var lowercaseQuery = angular.lowercase(query);
        var lowercaseQuery = query;
        return function filterFn(item) {
            return (item.name.indexOf(lowercaseQuery) === 0);
        };
    }
};

// toast controller
guw_email_directory.controller('ToastCtrl', ToastCtrl)

function ToastCtrl($scope, $mdToast){
  $scope.boomToast = function() {
      $mdToast.show(
         $mdToast.simple()
            .textContent('Boom-shacka-lacka! Go paste it somewhere')
            .hideDelay(3000)
      );
  }
}
