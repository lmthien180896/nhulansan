(function (app) {
    app.controller('postEditController', postEditController);

    postEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', 'commonService', '$stateParams']

    function postEditController(apiService, $scope, notificationService, $state, commonService, $stateParams) {
        $scope.post = {};            
        $scope.moreImages = [];

        $scope.ckeditorOptions = {
            language: 'vi',
            height: '200px'
        };
        $scope.UpdateProduct = UpdateProduct;
        $scope.GetSeoTitle = GetSeoTitle;
        $scope.loadProductDetail = loadProductDetail;
        $scope.ChooseImage = ChooseImage;

        function loadProductDetail() {
            apiService.get('api/post/getbyid/' + $stateParams.id, null, function (result) {
                $scope.post = result.data;
                $scope.moreImages = JSON.parse($scope.post.MoreImages);
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function ChooseImage() {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.post.Image = fileUrl;
                });                
            };
            finder.popup();
        }

        function GetSeoTitle() {
            $scope.post.Alias = commonService.getSeoTitle($scope.post.Name);
        }

        function UpdateProduct() {
            $scope.post.MoreImages = JSON.stringify($scope.moreImages);
            apiService.put('api/post/update', $scope.post, function (result) {
                notificationService.displaySuccess(result.data.Name + ' đã được cập nhật');
                $state.go('posts');
            }, function (error) {
                notificationService.displayError('Cập nhật không thành công');
            });
        }

        function loadParentCategories() {
            apiService.get('api/postcategory/getallparents', null, function (result) {
                $scope.postCategories = result.data;
            }, function () {
                console.log("Can't load parent categories");
            });
        }

        $scope.ChooseMoreImages = ChooseMoreImages;

        function ChooseMoreImages() {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.moreImages.push(fileUrl);
                });
            };
            finder.popup();
        }

        loadParentCategories();
        loadProductDetail();
    }
})(angular.module('nlsshop.post'));