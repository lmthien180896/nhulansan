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
        $scope.AddPost = AddPost;
        $scope.GetSeoTitle = GetSeoTitle;
        $scope.ChooseImage = ChooseImage;        

        function GetSeoTitle() {
            $scope.post.Alias = commonService.getSeoTitle($scope.post.Name);
        }

        function AddPost() {
            $scope.post.MoreImages = JSON.stringify($scope.moreImages);
            apiService.post('api/post/create', $scope.post, function (result) {
                notificationService.displaySuccess(result.data.Name + ' đã được thêm mới');
                $state.go('posts');
            }, function (error) {
                notificationService.displayError('Thêm mới không thành công');
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
 
    }
})(angular.module('nlsshop.post'));