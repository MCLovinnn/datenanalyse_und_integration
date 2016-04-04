// main.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var scotchApp = angular.module('filerepair', []);
// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $log) {

    $scope.fails = 0;

    $scope.message = 'Sie können hier eine Buchliste hochladen und reparieren...';
    $scope.$log = $log;
    $scope.csvfile;
    $scope.csvlines;

    var fs = new FileReader();
    /*fs.onload = function (data) {
        $scope.lines = data.split("\n");
        for (var y = 0; y < $scope.lines.length - 1; y++) {
            var line = $scope.lines[y];
            var dataset = line.split(",");
            var count = dataset[0].length;
            if (count < 9) {
                $scope.fails++;
            }
        }
    };
    */


    $scope.showfile = function() {
        var f = new FileReader();
        f.onloadend = function(){
            console.log("success");
        }
        f.readAsText($scope.csvfile);
    };

    $scope.repair = function () {
        for (var i = 1; i < $scope.csvlines.length-1; i++) {
            var line = $scope.csvlines[i];
            var dataset = line.split(",");
            var count = dataset[0].length;
            var newLine = "";
            if (count < 9) {
                var value = 8 - count;      // 9 - the last X
                var x = 0;
                while (x <= value) {
                    newLine += "0";
                    x++;
                }
                newLine += dataset[0] + "X";
                dataset[0] = newLine;
                line = dataset.join();
                $scope.csvlines[i] = line;
            }
        }
        var tmpFile;
        tmpFile = $scope.csvlines.join("\n");
        console.log(tmpFile);
    };
});