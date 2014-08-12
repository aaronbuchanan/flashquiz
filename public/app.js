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

app.controller("QuizCtrl", function ($scope, $location) {

  $scope.total = app.cards.length;
  $scope.attemptsLeft = 3;
  $scope.secondsElapsed = 0;
  $scope.index = 0;
  $scope.card = app.cards[$scope.index];

  $scope.checkAnswer = function () {
    var input = $('#input').val();
    console.log(input, $scope.card.answer, input==$scope.card.answer);
    if (input == $scope.card.answer) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  }

  function correctAnswer() {
    $scope.attemptsLeft = 3;
    $scope.secondsElapsed = 0;
    $scope.index++;
    $scope.card = app.cards[$scope.index];
    if (!$scope.card) {
      //TODO: calculate score
      $location.path('/results');
    }
  }

  function incorrectAnswer() {
    $scope.attemptsLeft--;
  }
});

app.factory("cardsFactory", function ($http) {
  var factory = {};
  factory.getCards = function () {
    return $http.get('/cards.json');
  };
  return factory;
});
