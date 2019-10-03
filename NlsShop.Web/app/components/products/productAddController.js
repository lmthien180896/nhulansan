(function (app) {
    app.controller('productAddController', productAddController);

    productAddController.$inject = ['apiService', '$scope', 'notificationService', '$state', 'commonService']

    function productAddController(apiService, $scope, notificationService, $state, commonService) {
        $scope.product = {
            CreatedDate: new Date(),
            Status: true,
            HomeFlag: true
        };

        $scope.ckeditorOptions = {
            language: 'vi',
            height: '200px'
        };  
        $scope.AddProduct = AddProduct;
        $scope.GetSeoTitle = GetSeoTitle;
        $scope.ChooseImage = ChooseImage;        

        function GetSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        }

        function AddProduct() {
            $scope.product.MoreImages = JSON.stringify($scope.moreImages);
            apiService.post('api/product/create', $scope.product, function (result) {
                notificationService.displaySuccess(result.data.Name + ' đã được thêm mới');
                $state.go('products');
            }, function (error) {
                notificationService.displayError('Thêm mới không thành công');
            });
        }

        function loadProductCategories() {
            apiService.get('api/productcategory/getallchildren', null, function (result) {
                $scope.productCategories = result.data;
            }, function () {
                console.log("Can't load children categories");
            });
        }

        function ChooseImage(){
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.product.Image = fileUrl;
                });
            };
            finder.popup();
        }

        $scope.moreImages = [];

        $scope.ChooseMoreImages = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.moreImages.push(fileUrl);
                });

            };
            finder.popup();
        };

        loadProductCategories();
    }
})(angular.module('nlsshop.product'));