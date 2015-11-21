function TrainersController($http, $scope, $location) {
    $scope.trainers = [];

    $scope.viewTrainer = function (id) {
        $location.path("/trainer/" + id);
    };

    $http({
        method: 'GET',
        url: 'http://bgroff-pi2.dhcp.bsu.edu/PokemonDB/backend/trainers'
    }).then(function successCallback(response) {
        $scope.trainers = response.data;
    }, function errorCallback(response) {
        alert("Database unreachable. Check console for more info.");
        console.log(response);
    });

};