angular
    .module('app')
    .service("appService", function($http, $q) {
        var app = this;
        app.about = [];
        app.header = {};
        app.contact = {};
        app.partners = {};
        
        app.getAbout = function() {
            var defer = $q.defer();
            
            $http.get('json/about.json')
            .success(function(res){
                app.about = res;
                defer.resolve(res);
            })
            .error(function(err, status){
                defer.reject(err);
            });
            
            return defer.promise;
        };
        
        app.getHeader = function() {
            var defer = $q.defer();
            
            $http.get('json/header.json')
            .success(function(res){
                app.header = res;
                defer.resolve(res);
            })
            .error(function(err, status){
                defer.reject(err);
            });
            
            return defer.promise;
        };
        
        app.getContact = function() {
            var defer = $q.defer();
            
            $http.get('json/contact.json')
            .success(function(res){
                app.contact = res;
                defer.resolve(res);
            })
            .error(function(err, status){
                defer.reject(err);
            });
            
            return defer.promise;
        };
        
        app.getPartners = function() {
            var defer = $q.defer();
            
            $http.get('json/partners.json')
            .success(function(res){
                app.partners = res;
                defer.resolve(res);
            })
            .error(function(err, status){
                defer.reject(err);
            });
            
            return defer.promise;
        };
        
        app.postSubscrition = function(e_mail) {
            var defer = $q.defer();
            
            $http.post('resources/emailSubscription.php', e_mail)
            .success(function(res){
                defer.resolve(res);
            })
            .error(function(err, status){
                defer.reject(err);
            });
            
            return defer.promise;
        };
        
        app.postMessage = function(message) {
            var defer = $q.defer();
            
            $http.post('resources/emailMessage.php', message)
            .success(function(res){
                defer.resolve(res);
            })
            .error(function(err, status){
                defer.reject(err);
            });
            
            return defer.promise;
        };
        
        return app;
    }
);