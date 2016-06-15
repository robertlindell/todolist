angular.module('starter.controllers', [])

.controller('ToDoListCtrl', function ($http, $scope, $ionicModal) {


// array list which will contain the items added
 $scope.ToDoListItems = null;

 var refresh = function() {

 		$http({

			method: "GET",
			url: "http://localhost:3000/api"

		}).then(function successCallback(response) {
			$scope.ToDoListItems = response.data;
		}, function errorCallback(response) {
			console.log(response);
		});

 }
       refresh();




$scope.myToggle = function(id){

	$scope.ToDoListItems[id].status = true;

}

//init the modal


$ionicModal.fromTemplateUrl('modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function (modal) {
  $scope.modal = modal;
});

// function to open the modal
$scope.openModal = function () {
  $scope.modal.show();
};

// function to close the modal
$scope.closeModal = function () {
  $scope.modal.hide();
};

//Cleanup the modal when we're done with it!
$scope.$on('$destroy', function () {
  $scope.modal.remove();
});


$ionicModal.fromTemplateUrl('modal2.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function (modal2) {
  $scope.modal2 = modal2;
});

// function to open the modal
$scope.openModal2 = function () {
  $scope.modal2.show();
};

// function to close the modal
$scope.closeModal2 = function () {
  $scope.modal2.hide();
};

//Cleanup the modal when we're done with it!
$scope.$on('$destroy', function () {
  $scope.modal2.remove();
});

//function to add items to the existing list
$scope.AddItem = function (data) {

	console.log(data);
  	$scope.ToDoListItems.push({
    task: data.newItem,
    status: false,
    done: false

  });

  var newData = data.newItem;

  data.newItem = '';
  $scope.closeModal();

  console.log(newData);
  $http.post('http://localhost:3000/api/todo', {task: newData, status: false});


};

$scope.itemRemove = function(id, item) {

	$scope.ToDoListItems[item].done = true;
	$http.delete('http://localhost:3000/api/todo/' + id)
		.success(function(response) {
			console.log(response)
		});

	}


$scope.updateStatus = function(id) {

	console.log($scope.ToDoListItems[id]);
 	console.log(id + "hej");
	$http.put('http://localhost:3000/api/todo/' + id);

}

});