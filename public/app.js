var app = angular.module('quizApp', ['ngRoute']);

app.config(['$routeProvider', function ($router) {
  $router.when('/', {
    controller: "EditCtrl",
    templateUrl: "/edit"
  })
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

app.factory("cardsFactory", function ($http) {
  var factory = {};
  factory.getCards = function () {
    return $http.get('/cards.json');
  };
  return factory;
});
