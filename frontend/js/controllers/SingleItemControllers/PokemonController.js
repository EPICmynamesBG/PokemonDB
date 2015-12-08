app.controller("PokemonController", function ($scope, $location, $route, API) {
    $scope.pokemon = [];
    $scope.nextEvolution = [];
    $scope.lastEvolution = [];
    $scope.navNext = "";
    $scope.navLast = "";

    $scope.navNextPokemon = function () {
        $location.path('/pokedex/' + $scope.navNext);
    };

    $scope.navLastPokemon = function () {
        $location.path('/pokedex/' + $scope.navLast);
    };

    $scope.openForm = function (id) {
        $location.path('/pokedex/' + id);
    }

    var id = $route.current.params.id;

    API.getPokemonById(id)
        .then(function successCallback(response) {
            $scope.pokemon = response.data;
            if ($scope.pokemon.id == "133") { //Eevee
                handleEeveeException();
            }
            loadPreEvolutionData();
            loadPostEvolutionData();
            navLoad();
            if ($scope.pokemon['nextEvolutionLevel'] == null) {
                $scope.pokemon['nextEvolutionLevel'] = "Special";
            }
            if ($scope.pokemon['lastEvolutionLevel'] == null) {
                $scope.pokemon['lastEvolutionLevel'] = "Special";
            }
        }, function errorCallback(response) {
            API.errorResponse(response);
        });


    var loadPreEvolutionData = function () {
        if ($scope.pokemon['lastEvolution'] != null) {
            var pastID = $scope.pokemon['lastEvolution'];
            API.getPokemonById(pastID)
                .then(function successCallback(response) {
                    $scope.lastEvolution = response.data;
                }, function errorCallback(response) {
                    API.errorResponse(response);
                });
        }
    };

    var loadPostEvolutionData = function () {
        if ($scope.pokemon['nextEvolution'] != null) {
            var nextID = $scope.pokemon['nextEvolution'];
            API.getPokemonById(nextID)
                .then(function successCallback(response) {
                    $scope.nextEvolution = response.data;
                }, function errorCallback(response) {
                    API.errorResponse(response);
                });
        };
    }

    var navLoad = function () {
        var id = removeLeadingZeros($scope.pokemon.id);
        $scope.navLast = --id;
        $scope.navNext = id += 2;
        id--;
        if ($scope.navLast <= 0) {
            $scope.navLast = 151;
        }
        if ($scope.navNext >= 152) {
            $scope.navNext = 1;
        }
        $scope.navLast += "";
        $scope.navNext += "";

        while ($scope.navLast.length < 3) {
            $scope.navLast = "0" + $scope.navLast;
        };
        while ($scope.navNext.length < 3) {
            $scope.navNext = "0" + $scope.navNext;
        }
    };

    var removeLeadingZeros = function (id) {
        var temp = "";
        if (id.charAt(0) == '0') {
            temp = id.substring(1, id.length);
            if (temp.charAt(0) == '0') {
                temp = temp.charAt(1);
                return temp;
            } else {
                return temp;
            }
        } else {
            return id;
        }
    };

    var handleEeveeException = function () {
        $scope.pokemon['nextEvolution'] = null;
        var temp = [];

        API.getPokemonById(134)
            .then(function successCallback(response) {
            temp[0] = response.data;
        }, function errorCallback(response) {
            API.errorResponse(response);
        });

        API.getPokemonById(135)
            .then(function successCallback(response) {
            temp[1] = response.data;
        }, function errorCallback(response) {
            API.errorResponse(response);
        });

        API.getPokemonById(136)
            .then(function successCallback(response) {
            temp[2] = response.data;
        }, function errorCallback(response) {
            API.errorResponse(response);
        });

        $scope.pokemon['eeveeEvolution'] = temp;
    };
})

;