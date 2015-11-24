function PokemonController($http, $scope, $location, $route) {
    $scope.pokemon = [];
    $scope.type1Str = null;
    $scope.type2Str = null;
    $scope.type1Color = "#000000";
    $scope.type2Color = "#000000";

    var id = $route.current.params.id;

    $http({
        method: 'GET',
        url: 'http://bgroff-pi2.dhcp.bsu.edu/PokemonDB/backend/pokemon/' + id
    }).then(function successCallback(response) {
        $scope.pokemon = response.data;
        loadTypes();
    }, function errorCallback(response) {
        alert("Database unreachable. Check console for more info.");
        console.log(response);
    });

    var loadTypes = function () {
        console.log($scope.pokemon);
        var type1 = $scope.pokemon['type'];
        var type2 = $scope.pokemon['type2'];

        $scope.type1Str = type1['name'];
        $scope.type1Color = loadColorForType(type1['id']);

        if (type2 != null) {
            $scope.type2Str = type2['name'];
            $scope.type2Color = loadColorForType(type2['id']);
        }
    };


    var loadColorForType = function (type) {
        var temp;
        switch (type) {
        case 1:
            temp = "#8A8A59";
            break;
        case 2:
            temp = "#C03028";
            break;
        case 3:
            temp = "#A890F0";
            break;
        case 4:
            temp = "#A040A0";
            break;
        case 5:
            temp = "#E0C068";
            break;
        case 6:
            temp = "#B8A038";
            break;
        case 7:
            temp = "#A8B820";
            break;
        case 8:
            temp = "#705898";
            break;
        case 9:
            temp = "#F08030";
            break;
        case 10:
            temp = "#6890F0";
            break;
        case 11:
            temp = "#78C850";
            break;
        case 12:
            temp = "#F8D030";
            break;
        case 13:
            temp = "#F85888";
            break;
        case 14:
            temp = "#98D8D8";
            break;
        case 15:
            temp = "#7038F8";
            break;
        default:
            temp = "#000000";
            break;
        }
        return temp;

    };
};