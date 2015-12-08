var app = angular.module('randomQuoteMachine', []);

// Config

// Services
app.service('QuoteGenerator', [function(){
  this.NewQuote = function () {
    var _quotes = [
      {'quote': 'Quote1', 'author': 'Author1'}
    , {'quote': 'Quote2', 'author': 'Author2'}
    , {'quote': 'Quote3', 'author': 'Author3'}];
    
    var idx = Math.floor( (Math.random() * 10000) ) % _quotes.length;
    
    return _quotes[idx];
  }
}]);

app.service('MashapeQuote', ['$http', function($http){
  this.NewQuote = function() {
    var quote = {
      'quote': '',
      'author': '',
    };

    $http({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Mashape-Key': 'PNhxdlDnsYmsh34boQMmaS6N5xGnp1WUkRDjsntyKkU6AV9nVN'
      },
    }).then(function(response){
      console.log(response);
      quote.quote = response.data.quote;
      quote.author = response.data.author;
      console.log(quote);
    }, function(response){
      quote.quote = "Sorry, I can't retrive a proper quote";
      quote.author = "This AWESOME application";
    });

    return quote;
  }
}]);

// Factories

// Controllers
app.controller('QuoteController', ['$scope', 'MashapeQuote', function($scope, Quote){
  $scope.quote = {
    'quote': "¿Qué hay de nuevo, viejo?",
    'author': "Bugs Bunny"
  };
  
  $scope.generateNewQuote = function() {
    var newQuote = Quote.NewQuote();
    console.log(newQuote);
    $scope.quote = newQuote;
  }
}]);