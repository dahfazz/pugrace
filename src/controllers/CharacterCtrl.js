myApp.controller('CharacterCtrl', ['$scope', function($scope) {
    
    $scope.$id = 'CharacterCtrl';

    var nbPage = 1;
    
    $scope.facesPage = 0;
    
    
    
    $scope.characters = ['blackpug', 'whitepug'];
    
    $scope.prevChar = function(event) {
        event.preventDefault();
        $scope.facesPage = ($scope.facesPage == 0) ? 0 : $scope.facesPage - 1;
    };
    
    $scope.nextChar = function(event) {
        event.preventDefault();
        $scope.facesPage = ($scope.facesPage == nbPage) ? nbPage : $scope.facesPage + 1;
    };
    
    
    $scope.selectCharacter = function(event) {
        event.preventDefault();
        
        $('.character_button').removeClass('__selected');
        event.target.classList.add('__selected');

        $scope.$emit('updateCharacter', event.target.value);
    };
}]);