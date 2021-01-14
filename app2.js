(function () {
'use strict';

angular.module('ShoppingListComponentApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
// .directive('shoppingList', ShoppingList)
.component('shoppingList', {
    templateUrl: 'shoppingList2.html',
    controller: ShoppingListComponentController,
    bindings: {
      listComponent: '<',
      titleComponent: '@',
      onRemove: '&'
    }
})
;


ShoppingListComponentController.$inject = ['$scope', '$element']
function ShoppingListComponentController($scope, $element) {

  var $ctrl_temps = this;

  $ctrl_temps.findcookies = function () {

    for (var i = 0; i < $ctrl_temps.listComponent.getItems.length; i++) {
      var name = $ctrl_temps.listComponent.getItems[i].name;
      if(name.toLowerCase().indexOf("cookies") !== -1)
      return true;
    }
    return false;
  };

  $ctrl_temps.remove = function (myIndex) {
    $ctrl_temps.onRemove( { index_Key : myIndex } );
  };


  $ctrl_temps.$onInit = function () {
    console.log("i'm located in $onInit()");
  };

  $ctrl_temps.$onChanges = function (changeObg) {
    console.log("Changes :", changeObg);
  };

  $ctrl_temps.$postLink = function () {

    $scope.$watch('$ctrl.findcookies()', function (newValue, oldValue) {

      if(newValue === true)
      {
        // Using jQuery
        var WarningMessage = $element.find('div.error');
        WarningMessage.slideDown(800);
      }
      else {
        // Using jQuery
        var WarningMessage = $element.find('div.error');
        WarningMessage.slideUp(800);
      }

    });



  };



};





//
// function ShoppingList() {
//
//   var ddo = {
//     templateUrl: 'shoppingList2.html',
//     scope: {
//       listDirective: '<',
//       titleDirective: '@',
//       onRemove: '&'
//     },
//     controller: ShoppingListDirectiveController,
//     controllerAs: 'ListDirectiveController',
//     bindToController: true,
//     link: ShoppingListDirectiveLink,
//     transclude: true
//   };
//   return ddo;
// };
//
//
// function ShoppingListDirectiveLink(scope, element, attrs, controller) {
//
//   console.log("scope :", scope);
//   console.log("element :", element);
//   console.log("attrs :", attrs);
//   console.log("controller :", controller);
//
//   scope.$watch('ListDirectiveController.findcookies()', function (newValue, oldValue) {
//
//     console.log("Old Value ", oldValue);
//     console.log("New Value ", newValue);
//
//     if(newValue === true)
//     {
//       DisplayWarningcookies();
//     }
//     else {
//       RemoveWarningcookies();
//     }
//
//   });
//
//
//   function DisplayWarningcookies() {
//     // Using JkLite
//     // var WarningMessage = element.find('div');
//     // WarningMessage.css("display", "block");
//
//     // Using jQuery
//     var WarningMessage = element.find('div.error');
//     WarningMessage.slideDown(800);
//   };
//
//   function RemoveWarningcookies() {
//     // Using JkLite
//     // var WarningMessage = element.find('div');
//     // WarningMessage.css("display", "none");
//
//     // Using jQuery
//     var WarningMessage = element.find('div.error');
//     WarningMessage.slideUp(800);
//
//   };
//
//
// };

//
// function ShoppingListDirectiveController() {
//
//   var list_temps = this;
//
//   list_temps.findcookies = function () {
//
//     for (var i = 0; i < list_temps.listDirective.getItems.length; i++) {
//       var name = list_temps.listDirective.getItems[i].name;
//       if(name.toLowerCase().indexOf("cookies") !== -1)
//       return true;
//     }
//     return false;
//   };
//
// };




ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = "Shopping List 1 ";
  list.TitleController = Org_Title + "("+ list.getItems.length +")";

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity );
      list.TitleController = Org_Title + "("+ list.getItems.length +")";
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }
  };

  list.RemoveItem = function (indexItem) {
    console.log("this is : ", this);
    this.LastRemoved = "Last item removed was : "+ list.getItems[indexItem].name;
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
    this.TitleController = Org_Title + "("+ list.getItems.length +")";
  };


};




function ShoppingList_Service(maxItems) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {

    if( ( maxItems === undefined ) ||
        ( maxItems !== undefined && Items.length < maxItems )
    )
    {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    }
    else {
      throw new Error("Max items ("+ Items.length +") was reached ");
    }

  };

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem, 1 );
  };

};


function ShoppingListFactory() {

  var factory = function (maxItems) {
      return new ShoppingList_Service(maxItems);
  };
  return factory;
};



})();
