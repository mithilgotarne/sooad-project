'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'easypiechart', 'ngMaterial'])


    .run(function ($rootScope, $location) {

        $rootScope.titles = {
          '/overview':'Profile Overview',
            '/profile':'Profile'
        };
        
        $rootScope.getClass = function (path) {

            return ($location.path().substr(0, path.length) === path) ? 'active' : '';

        };

        $rootScope.getTitle = function () {
            return $rootScope.titles[$location.path()];
        }
               
    })

    .controller('overviewCtrl', function ($scope) {

        $scope.about = "need ipsum! very design, many text. many word! oh my full. go swag, very amet. " +
            "plz ipsum! wow. oh my word! very consectetur, much lorem. i iz cute?. wow! very consectetur, " +
            "wow! so ipsum! very full. much lorem. need lorem. plz ipsum! oh my full. such sit. yes master doge,";

        $scope.academics = [
            {
                course: "S.S.C.",
                institute: "S.E.S. High School",
                city: "Thane",
                board: "Maharashtra",
                yop: "2012",
                marks: "91.45%"
            },
            {
                course: "H.S.C.",
                institute: "S.E.S. Jr. College",
                city: "Thane",
                board: "Maharashtra",
                yop: "2014",
                marks: "89.38%"
            },
            {
                course: "Such Course",
                institute: "Much Institution",
                city: "Wow City",
                board: "Such Board",
                yop: "Much year",
                marks: "Wow marks"
            }
        ];

        $scope.projects = [
            {
                title: "Popular",
                url: "https://github.com/mithilgotarne/Popular"
            },
            {
                title: "E-Cell, SPIT",
                url: "https://ecellsp.org"
            },
            {
                title: "Virtual Stock Market",
                url: "https://github.com/mithilgotarne/VSM2"
            }
        ];

        $scope.skills = [
            {
                title: "Aptitude",
                percent: 70,
                options: {
                    animate: {
                        duration: 2000,
                        enabled: true
                    },
                    barColor: '#ACEC00',
                    trackColor: '#EAFABF',
                    scaleColor: false,
                    lineWidth: 20,
                    lineCap: 'round',
                    size: 200
                }
            },
            {
                title: "Soft Skills",
                percent: 60,
                options: {
                    animate: {
                        duration: 2000,
                        enabled: true
                    },
                    barColor: '#00BBD6',
                    trackColor: '#BFEEF5',
                    scaleColor: false,
                    lineWidth: 20,
                    lineCap: 'round',
                    size: 200
                }
            },
            {
                title: "Technical",
                percent: 80,
                options: {
                    animate: {
                        duration: 2000,
                        enabled: true
                    },
                    barColor: '#BA65C9',
                    trackColor: '#EED8F1',
                    scaleColor: false,
                    lineWidth: 20,
                    lineCap: 'round',
                    size: 200
                }
            },
            {
                title: "Programming",
                percent: 50,
                options: {
                    animate: {
                        duration: 2000,
                        enabled: true
                    },
                    barColor: '#EF3C79',
                    trackColor: '#FBCEDD',
                    scaleColor: false,
                    lineWidth: 20,
                    lineCap: 'round',
                    size: 200
                }
            }
        ]

    })

    .controller('profileCtrl',function ($scope) {

        $scope.data = {
            selectedIndex: 1
        };
        $scope.next = function() {
            $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 3) ;
        };
        $scope.previous = function() {
            $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
        };

        $scope.basic = {
            name : 'Name Surname',
            roll_no: '2014130019',
            gender:'Male',
            pwd: false,
            dob: new Date('1996-09-20'),
            aadhar: '123456789',

            genders: ['Male', 'Female', 'Other']
        };

        $scope.contact = {
            email:'example@example.com',
            address:'3665 Quaking Walk, Elmo, Missouri, 65301-3520, US',
            phone:'(314) 322-8789',
            landline:'496-21-1452'
        }

    })


    .config(function ($locationProvider, $routeProvider) {

        $routeProvider
            .when('/overview', {
            templateUrl: 'html/overview.html',
            controller: 'overviewCtrl'
        })
            .when('/profile', {
            templateUrl: 'html/profile.html',
            controller: 'profileCtrl'
        }).otherwise({redirectTo: '/overview' });

        $locationProvider.hashPrefix('!');

    });
