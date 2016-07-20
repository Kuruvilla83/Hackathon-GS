'use strict';

/**
 * @ngdoc function
 * @name gsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gsApp
 */
angular.module('gsApp')

  .controller('reportsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };

    $scope.items = [{
        "Name": "ANC101",
            "Date": "10/02/2014",
            "Terms": ["samsung", "nokia", "apple"]
    }, {
        "Name": "ABC102",
            "Date": "10/02/2014",
            "Terms": ["motrolla", "nokia", "iPhone"]
    }]
});	
