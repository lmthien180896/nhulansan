(function (app) {
    app.controller('productCategoryAddController', productCategoryAddController);

    productCategoryAddController.$inject = ['apiService', '$scope']

    function productCategoryAddController(apiService, $scope) {
        $scope.productCategory = {
            CreatedDate: new Date()
        };

        $scope.parentCategories = [];

        function loadParentCategories() {
            apiService.get('api/productcategory/getallparents', null, function () {

            }, function () {

                })
        }
    }
})(angular.module('nlsshop.product_category'));