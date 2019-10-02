(function (app) {
    app.controller('postAddController', postAddController);

    postAddController.$inject = ['apiService', '$scope', 'notificationService', '$state', 'commonService']

    function postAddController(apiService, $scope, notificationService, $state, commonService) {
        $scope.post = {
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
            $scope.post.Alias = commonService.getSeoTitle($scope.post.Name);
        }

        function AddProduct() {
            $scope.post.MoreImages = JSON.stringify($scope.moreImages);
            apiService.post('api/post/create', $scope.post, function (result) {
                notificationService.displaySuccess(result.data.Name + ' đã được thêm mới');
                $state.go('posts');
            }, function (error) {
                notificationService.displayError('Thêm mới không thành công');
            });
        }

        function loadParentCategories() {
            apiService.get('api/postcategory/getallparents', null, function (result) {
                $scope.postCategories = result.data;
            }, function () {
                console.log("Can't load parent categories");
            });
        }

        $scope.ChooseImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.post.Image = fileUrl;
                });
            };
            finder.popup();
        };

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

        loadParentCategories();
    }
})(angular.module('nlsshop.post'));