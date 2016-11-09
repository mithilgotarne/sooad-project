'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'easypiechart', 'ngMaterial', 'firebase'])


    .run(function ($rootScope, $location, $firebaseObject) {

        $rootScope.isLoggedIn = localStorage.getItem('isLoggedIn') || false;

        if ($rootScope.isLoggedIn) {

            var ref = firebase.database().ref().child("users").child(localStorage.getItem("username"));
            $rootScope.basic = $firebaseObject(ref.child("profile/basic"));
        } else {
            $location.path('/login');
        }

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

    .controller('loginCtrl', function ($rootScope, $scope, $location, $firebaseObject) {

        $scope.username = '';
        $scope.password = '';
        $rootScope.isLoggedIn = false;


        $scope.login = function () {

            var ref = firebase.database().ref().child("users").child($scope.username);

            var user = $firebaseObject(ref);

            user.$loaded().then(function () {

                if ($scope.password == user.pass) {


                    $rootScope.isLoggedIn = true;
                    $location.path('/overview');
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('username', user.id);

                }

            });

        }

    })

    .controller('overviewCtrl', function ($scope, $firebaseObject, $firebaseArray) {

        var ref = firebase.database().ref().child("users").child(localStorage.getItem('username'));

        $scope.profile = $firebaseObject(ref.child("profile/basic"));

        $scope.about = $firebaseObject(ref.child("profile/about"));

        $scope.academics = $firebaseArray(ref.child("academics"));

        $scope.overview = $firebaseObject(ref.child("overview"));

        $scope.projects = $firebaseArray(ref.child("projects"));

        $scope.skills = $firebaseArray(ref.child("resume/skills"));

    })

    .controller('profileCtrl', function ($scope, $firebaseObject) {

        var ref = firebase.database().ref().child("users").child(localStorage.getItem('username')).child("profile");

        $scope.data = {
            selectedIndex: 1
        };
        $scope.next = function () {
            $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 3);
        };
        $scope.previous = function () {
            $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
        };

        $scope.genders = ['Male', 'Female', 'Other'];

        $firebaseObject(ref.child("basic")).$bindTo($scope, "basic");
        $firebaseObject(ref.child("contact")).$bindTo($scope, "contact");
        $firebaseObject(ref.child("guardian")).$bindTo($scope, "guardian");
        $firebaseObject(ref.child("about")).$bindTo($scope, "about");

        var date = new $firebaseObject(ref.child("basic").child("dob"));

        $scope.dob = new Date();

        date.$loaded().then(function () {
            $scope.dob = new Date(date.$value);
        });


    })

    .controller('resumeCtrl', function ($scope, $firebaseArray, $firebaseObject) {

        var ref = firebase.database().ref().child("users").child(localStorage.getItem('username')).child("resume");


        $scope.strengths = $firebaseArray(ref.child("strengths"));

        $scope.addStrength = function () {
            $scope.strengths.$add({name: '', desc: ''});
        };

        $scope.hobbies = $firebaseArray(ref.child("hobbies"));


        $scope.addHobby = function () {
            $scope.hobbies.$add({name: ''});
        };


        $scope.agg = {
            marks: 8.9,
            back: 0
        };

        $firebaseObject(ref.child("agg")).$bindTo($scope, "agg");


        $scope.skills = $firebaseArray(ref.child("skills"));


    })

    .controller('portfolioCtrl', function ($scope, $firebaseArray) {


        var ref = firebase.database().ref().child("users").child(localStorage.getItem('username'));

        $scope.portfolios = $firebaseArray(ref.child("projects"));

        $scope.addPortfolio = function () {

            $scope.portfolios.$add(
                {
                    img: 'images/washedout.png',
                    title: 'Project ' + ($scope.portfolios.length + 1),
                    desc: 'Vita de azureus cottaraicus tam.Aonides salvus tabes est.Nunquam examinare boreas.Cum bulla experimentum, omnes vitaes resuscitabo fidelis, emeritis clabularees.',
                    url: '#'
                }
            );

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
