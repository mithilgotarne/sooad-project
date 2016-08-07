'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',['ngRoute'])
    
    .controller('overviewCtrl', function($scope) {

        $scope.about = "need ipsum! very design, many text. many word! oh my full. go swag, very amet. " +
            "plz ipsum! wow. oh my word! very consectetur, much lorem. i iz cute?. wow! very consectetur, " +
            "wow! so ipsum! very full. much lorem. need lorem. plz ipsum! oh my full. such sit. yes master doge,";

        $scope.academics = [
            {
                course:"S.S.C.",
                institute:"S.E.S. High School",
                city:"Thane",
                board:"Maharashtra",
                yop:"2012",
                marks:"91.45%"
            },
            {
                course:"H.S.C.",
                institute:"S.E.S. Jr. College",
                city:"Thane",
                board:"Maharashtra",
                yop:"2014",
                marks:"89.38%"
            },
            {
                course:"Such Course",
                institute:"Much Institution",
                city:"Wow City",
                board:"Such Board",
                yop:"Much year",
                marks:"Wow marks"
            }
        ];

        $scope.projects = [
            {
                title:"Popular",
                url:"https://github.com/mithilgotarne/Popular"
            },
            {
                title:"E-Cell, SPIT",
                url:"https://ecellsp.org"
            },
            {
                title:"Virtual Stock Market",
                url:"https://github.com/mithilgotarne/VSM2"
            }
        ];

    })

    .config(function ($locationProvider, $routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl : 'html/overview.html',
                controller : 'overviewCtrl'
            });


        $locationProvider.html5Mode(true);
    });
