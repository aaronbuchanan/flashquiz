var app = angular.module('quizApp', ['ngRoute']);

app.config(['$routeProvider', function ($router) {
  $router.when('/', {
    controller: "EditCtrl",
    templateUrl: "/edit"
  }).when('/quiz', {
    controller: "QuizCtrl",
    templateUrl: "/quiz"
  });
}]);

app.controller("AppCtrl", function ($scope, cardsFactory) {
  cardsFactory.getCards().success(function (data) {
    app.cards = data;
    console.log('loaded cards:', app.cards);
  });
});

app.controller("EditCtrl", function ($scope) {
  $scope.cards = app.cards;
});

app.controller("QuizCtrl", function ($scope, $location, $timeout) {

  var TOTAL_ATTEMPTS = 2;

  $scope.score = 0;
  $scope.attemptsLeft = TOTAL_ATTEMPTS;
  $scope.secondsElapsed = 0;
  $scope.index = 0;
  $scope.card = app.cards[$scope.index];
  $scope.total = app.cards.length;

  $scope.checkAnswer = function () {
    var input = $('#input').val();
    console.log(input, $scope.card.answer, input==$scope.card.answer);
    if (input == $scope.card.answer) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  }

  $scope.onTimeout = function(){
    $scope.secondsElapsed++;
    mytimeout = $timeout($scope.onTimeout, 1000);
  }
  var mytimeout = $timeout($scope.onTimeout, 1000);
  $scope.stop = function(){
    $timeout.cancel(mytimeout);
  }

  function correctAnswer() {
    addPoints();
    $scope.attemptsLeft = TOTAL_ATTEMPTS;
    $scope.secondsElapsed = 0;
    $scope.index++;
    $scope.card = app.cards[$scope.index];
    if (!$scope.card) {
      $location.path('/results');
    }
  }

  function incorrectAnswer() {
    $scope.attemptsLeft--;
  }

  function addPoints() {
    var base = 100/$scope.total;
    var time = getTimeMultiplyer($scope.secondsElapsed);
    var attempts = getAttemptsMultiplyer($scope.attemptsLeft);
    
    $scope.score += (base*time*attempts);

    debugger;
  }

  function getTimeMultiplyer(time) {
    switch (true) {
      case time <= 10:
        return 1;
      case time <= 20:
        return .9;
      case time <= 30:
        return .8;
      default:
        return .75;
    }
  }

  function getAttemptsMultiplyer(attempts) {
    return [1, .75, .5][TOTAL_ATTEMPTS-attempts];
  }
});

app.factory("cardsFactory", function ($http) {
  var factory = {};
  factory.getCards = function () {
    return $http.get('/cards.json');
  };
  return factory;
});
