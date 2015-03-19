angular
    .module('app')
    .controller('appController', function($scope, appService) {
        $scope.master = {};
        $scope.subscription = {
            email: "",
            success: false,
            fail: false,
            repsonse: ""
        };
        $scope.templates = {
          "contact": "templates/contact.html",
          "footer": "templates/footer.html",
          "header": "templates/header.html",
          "about": "templates/about.html",
          "partners": "templates/partners.html"
        };
        $scope.message = {
            name: "",
            email: "",
            phone: "",
            text: ""
        };
        $scope.emailMessage = {
            success: false,
            fail: false,
            response: ""
        };
        
        $scope.bwShow = true;
        $scope.colorShow = false;
        
        $scope.init = function() {
            $scope.getAll();
        };
        
        $scope.closeSubscriptionPopup = function() {
            $scope.subscription.success = false;
            $scope.subscription.fail = false;
            return false;
        };
        
        $scope.emalMessagePopup = function() {
            $scope.emailMessage.success = false;
            $scope.emailMessage.fail = false;
            return false;
        };
        
        $scope.logoHoverIn = function() {
            this.bwShow = false;
            this.colorShow = true;
            return false;
        };
        
        $scope.logoHoverOut = function() {
            this.colorShow = false;
            this.bwShow = true;
            return false;
        };
        
        $scope.getAll = function() {
            appService.getHeader()
                .then(function(res){
                    //success
                    $scope.header = res;
                }, function(err){
                    //error
                    alert("Server error!");
                });  
            appService.getAbout()
                .then(function(res){
                    //success
                    $scope.about = res;
                }, function(err){
                    //error
                    alert("Server error!");
                });  
            appService.getPartners()
                .then(function(res){
                    //success
                    $scope.partners = res;
                }, function(err){
                    //error
                    alert("Server error!");
                });  
            appService.getContact()
                .then(function(res){
                    //success
                    $scope.contact = res;
                }, function(err){
                    //error
                    alert("Server error!");
                });  
        };
        
        $scope.subscribe = function() {
            appService.postSubscrition($scope.subscription)
                .then(function(res){
                    //success
                    if(res === "OK") {
                        $scope.subscription.success = true;
                        $scope.subscription.fail = false;
                        $scope.subscription.response = "Your email has been subscribed.";
                        
                        $scope.subscription.email = "";
                    } else {
                        $scope.subscription.success = false;
                        $scope.subscription.fail = true;
                        $scope.subscription.response = res;
                    }
                    
                }, function(err){
                    //error
                    $scope.subscription.success = false;
                    $scope.subscription.response = err;
                    $scope.subscription.fail = true;
                });  
        };
        
        $scope.sendMessage = function() {
            appService.postMessage($scope.message)
                .then(function(res){
                    //success
                    if(res === "OK") {
                        $scope.emailMessage.success = true;
                        $scope.emailMessage.fail = false;
                        $scope.emailMessage.response = "Your message has been sent.";
                        
                        $scope.message = {
                            name: "",
                            email: "",
                            phone: "",
                            text: ""
                        };
                    } else {
                        $scope.emailMessage.success = false;
                        $scope.emailMessage.fail = true;
                        $scope.emailMessage.response = res;
                    }
                }, function(err){
                    //error
                    $scope.emailMessage.success = false;
                    $scope.emailMessage.response = err;
                    $scope.emailMessage.fail = true;
                });  
        };
        
        $scope.init();
    }
);