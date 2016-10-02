'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'easypiechart', 'ngMaterial', 'firebase'])


    .run(function ($rootScope, $location) {

        $rootScope.isLoggedIn = localStorage.getItem('isLoggedIn') || false;

        if (!$rootScope.isLoggedIn)
            $location.path('/login');

        $rootScope.titles = {
            '/overview': 'Profile Overview',
            '/profile': 'Profile',
            '/resume': 'Resume',
            '/portfolio': 'Portfolio'
        };

        $rootScope.getClass = function (path) {

            return ($location.path().substr(0, path.length) === path) ? 'active' : '';

        };

        $rootScope.getTitle = function () {
            return $rootScope.titles[$location.path()];
        };


        $rootScope.logout = function () {
            localStorage.clear();
            $rootScope.isLoggedIn = false;
            $location.path('/login');
        };

    })

    .controller('loginCtrl', function ($rootScope, $scope, $location) {

        $scope.username = '';
        $scope.password = '';
        $rootScope.isLoggedIn = false;


        $scope.login = function () {

            $rootScope.isLoggedIn = true;
            $location.path('/overview');
            localStorage.setItem('isLoggedIn', true);
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

    .controller('profileCtrl', function ($scope, $firebaseObject) {

        $scope.data = {
            selectedIndex: 1
        };
        $scope.next = function () {
            $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 3);
        };
        $scope.previous = function () {
            $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
        };

        $scope.basic = {
            name: 'Name Surname',
            roll_no: '2014130019',
            gender: 'Male',
            pwd: false,
            dob: new Date('1996-09-20'),
            aadhar: '123456789',

            genders: ['Male', 'Female', 'Other']
        };

        $scope.contact = {
            email: 'example@example.com',
            address: '3665 Quaking Walk, Elmo, Missouri, 65301-3520, US',
            phone: '(314) 322-8789',
            landline: '496-21-1452'
        };

        var ref = firebase.database().ref().child("users/user1/profile");
        var syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope, "contact");



        $scope.guardian = {

            father: {
                name: '',
                phone: '',
                occupation: ''
            },

            mother: {
                name: '',
                phone: '',
                occupation: ''
            }
        };

        $scope.aboutMe = 'need ipsum! very design, many text. many word! oh my full. go swag, very amet. plz ipsum! wow. oh my word! very consectetur, much lorem. i iz cute?. wow! very consectetur, wow! so ipsum! very full. much lorem. need lorem. plz ipsum! oh my full. such sit. yes master doge,';


    })

    .controller('resumeCtrl', function ($scope) {

        $scope.strengths = [
            {
                name: 'Strength 1',
                desc: 'Ubi est velox gluten?Pol, a bene exsul, bi-color imber!A falsis, clabulare magnum acipenser.'
            }
        ];

        $scope.rmStrength = function (index) {

            $scope.strengths.splice(index, 1);

        };

        $scope.addStrength = function () {
            $scope.strengths.push({name: '', desc: ''});
        };

        $scope.hobbies = ['Interset 1', 'Hobby 1'];

        $scope.rmHobby = function (index) {
            $scope.hobbies.splice(index, 1);
        };

        $scope.addHobby = function () {
            $scope.hobbies.push('');
        };


        $scope.agg = {
            marks: 8.9,
            back: 0
        };


        $scope.skills = [
            {
                title: "Aptitude",
                percent: 70
            },
            {
                title: "Soft Skills",
                percent: 60
            },
            {
                title: "Technical",
                percent: 80
            },
            {
                title: "Programming",
                percent: 50
            }
        ];


    })

    .controller('portfolioCtrl', function ($scope) {

        $scope.portfolios = [

            {
                img: 'images/washedout.png',
                title: 'Project 1',
                desc: 'Vita de azureus cottaraicus tam.Aonides salvus tabes est.Nunquam examinare boreas.Cum bulla experimentum, omnes vitaes resuscitabo fidelis, emeritis clabularees.',
                url: '#'
            },
            {
                img: 'images/washedout.png',
                title: 'Project 2',
                desc: 'Vita de azureus cottaraicus tam.Aonides salvus tabes est.Nunquam examinare boreas.Cum bulla experimentum, omnes vitaes resuscitabo fidelis, emeritis clabularees.',
                url: '#'
            },
            {
                img: 'images/washedout.png',
                title: 'Project 3',
                desc: 'Vita de azureus cottaraicus tam.Aonides salvus tabes est.Nunquam examinare boreas.Cum bulla experimentum, omnes vitaes resuscitabo fidelis, emeritis clabularees.',
                url: '#'
            },
            {
                img: 'images/washedout.png',
                title: 'Project 4',
                desc: 'Vita de azureus cottaraicus tam.Aonides salvus tabes est.Nunquam examinare boreas.Cum bulla experimentum, omnes vitaes resuscitabo fidelis, emeritis clabularees.',
                url: '#'
            }

        ];

        $scope.addPortfolio = function () {

            $scope.portfolios.push(
                {
                    img: 'images/washedout.png',
                    title: 'Project ' + ($scope.portfolios.length + 1),
                    desc: 'Vita de azureus cottaraicus tam.Aonides salvus tabes est.Nunquam examinare boreas.Cum bulla experimentum, omnes vitaes resuscitabo fidelis, emeritis clabularees.',
                    url: '#'
                }
            );

        };

        $scope.rmPortfolio = function (index) {
            $scope.portfolios.splice(index, 1);
        };

    })


    .config(function ($locationProvider, $routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'html/login.html',
                controller: 'loginCtrl'
            })
            .when('/overview', {
                templateUrl: 'html/overview.html',
                controller: 'overviewCtrl'
            })
            .when('/profile', {
                templateUrl: 'html/profile.html',
                controller: 'profileCtrl'
            })
            .when('/resume', {
                templateUrl: 'html/resume.html',
                controller: 'resumeCtrl'
            })
            .when('/portfolio', {
                templateUrl: 'html/portfolio.html',
                controller: 'portfolioCtrl'
            })
            .otherwise({redirectTo: '/login'});

        $locationProvider.hashPrefix('!');

    });
